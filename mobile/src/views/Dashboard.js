import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

import {useAuth} from '../auth';

const Dashboard = () => {
  const {signOut} = useAuth();

  return (
    <View>
      <Appbar style={styles.top}>
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>

      <Text>HELLO WORLD</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
