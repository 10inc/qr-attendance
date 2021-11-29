import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import {eventService} from '../api/events';

import {useAuth} from '../auth';

const Dashboard = () => {
  const {signOut} = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll().then(res => {
      console.log(res);
      setEvents(res);
    });
  }, []);
  // TODO: Add useMemo for events

  return (
    <View>
      {/* TODO: Generic component for auth view */}
      <Appbar style={styles.top}>
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>

      <List.Section>
        {/* TODO: Add loader */}
        <List.Subheader>Events</List.Subheader>
        {events.map(event => {
          return (
            <List.Item
              key={event.id}
              title={event.name}
              description={event.date}
              onPress={() => navigate('/event', {state: {event: event}})}
            />
          );
        })}
      </List.Section>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  top: {
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
