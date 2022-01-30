import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Text, Card, Button, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import { useLocation, useNavigate } from 'react-router-native';
import {useToast} from 'react-native-paper-toast';

import { BarCodeScanner } from 'expo-barcode-scanner';

import { eventService } from '../api/events';

import { useAuth } from '../auth';

const Event = () => {
  const {signOut} = useAuth();
  const navigate = useNavigate();
  const {state} = useLocation();
  const toaster = useToast();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanner, setScanner] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanner(false);
    if (type === '256' || type === 256) {
      eventService.attend(state.event.id, data)
        .then(() => {
          toaster.show({ message: "Successfully scanned QR code", duration: 2000, type: 'success' })
        })
        .catch((err) => {
          toaster.show({ message: JSON.stringify(err), duration: 2000, type: 'error' })
        })
    } else {
      toaster.show({ message: "Scanned item is not a QR code", duration: 2000, type: 'error' })
    }
  };

  if (hasPermission === null) {
    // Requesting for camera permission
    return <ActivityIndicator size="large" />
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <Appbar style={styles.top}>
        <Appbar.Action
          icon="subdirectory-arrow-left"
          onPress={() => navigate(-1)}
        />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>

      <Card style={styles.scannerCard} elevation={4}>
        <View style={styles.scannerContainer}>
          {scanner && (
            <BarCodeScanner
              onBarCodeScanned={scanner ? handleBarCodeScanned : undefined}
              style={styles.scanner}
            />
          )}
          {scanner && (
            <Button labelStyle={{ fontSize: 124 }} style={styles.scannerCrop} icon="crop-free"></Button>
          )}
          {!scanner && (
            <Button labelStyle={{ fontSize: 108 }} icon="qrcode-scan"></Button>
          )}
        </View>
      </Card>

      <Card style={styles.details} elevation={4}>
        <Card.Content>
          <Title>{state.event.name}</Title>
          <Paragraph>{new Date(state.event.date).toLocaleDateString("fr-CA")}</Paragraph>
          {!scanner && (
            <Button
              mode="contained"
              onPress={() => setScanner(true)}
            >
              Start Scan
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  top: {
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '100%',
  },
  scannerCard: {
    margin: 24
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height*.60,
    position: 'relative',
  },
  scanner: {
    position: 'absolute',
    height: "75%",
    width: "60%",
  },
  scannerCrop: {
    marginLeft: 20,
  },
  details: {
    height: Dimensions.get('screen').height * .30
  }
});
