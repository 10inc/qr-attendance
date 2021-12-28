import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
import {Appbar, Text, Card, Title, Paragraph} from 'react-native-paper';
import {useLocation, useNavigate} from 'react-router-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import {eventService} from '../api/events';

import {useAuth} from '../auth';

const Event = () => {
  const {signOut} = useAuth();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    eventService.attend(state.event.id, data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
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


      <Card>
        <Card.Content>
          <Title>{state.event.name}</Title>
          <Paragraph>{state.event.date}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
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
  scannerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  scanner: {
    height: Dimensions.get('screen').height/2,
    width: Dimensions.get('screen').width,
  },
});
