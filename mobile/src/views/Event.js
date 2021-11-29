import React, {useState} from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Appbar, Text, Card, Title, Paragraph} from 'react-native-paper';
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
    <View>
      <Appbar style={styles.top}>
        <Appbar.Action
          icon="subdirectory-arrow-left"
          onPress={() => navigate(-1)}
        />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>

      <View>
        <Card>
          <Card.Content>
            <Title>{state.event.name}</Title>
            <Paragraph>{state.event.date}</Paragraph>
            {!scan && <Button title="Start Scan" onPress={startScan} />}
            {scan && (
              <Button title="Stop Scan" onPress={() => setScan(false)} />
            )}
          </Card.Content>
        </Card>
      </View>
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
  right: {
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
  },
});
