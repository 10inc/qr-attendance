import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import {useLocation, useNavigate} from 'react-router-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {eventService} from '../api/events';

import {useAuth} from '../auth';

const Event = () => {
  const {signOut} = useAuth();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [scan, setScan] = useState(false);
  const [, setResult] = useState();

  const onSuccess = e => {
    eventService.attend(state.event.id, e.data);
    setResult(e.data);
    setScan(false);
  };

  const startScan = () => {
    setScan(true);
    setResult();
  };

  return (
    <View style={styles.container}>
      <Appbar style={styles.top}>
        <Appbar.Action icon="subdirectory-arrow-left" onPress={() => navigate(-1)} />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>
      {scan && (
        <View style={styles.sectionContainer}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            topContent={<Text>Scan your QRCode!</Text>}
            bottomContent={
              <TouchableOpacity onPress={() => setScan(false)}>
                <Text>Cancel Scan</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}
      <View>
        <Card>
          <Card.Content>
            <Title>{state.event.name}</Title>
            <Paragraph>{state.event.date}</Paragraph>
            {!scan && (
              <Button mode="contained" style={styles.input} onPress={startScan}>
                Start Scan
              </Button>
            )}
            {scan && (
              <Button mode="contained" style={styles.input} onPress={() => setScan(false)}>
                Stop Scan
              </Button>
            )}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 40,
    justifyContent: 'center',
  },
  top: {
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
  },
});

export default Event;
