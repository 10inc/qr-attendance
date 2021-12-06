import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

import {eventService} from '../api/events';

import {useAuth} from '../auth';

const Dashboard = () => {
  const user = null;
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
    <View style={styles.container}>
      {/* TODO: Generic component for auth view */}
      <Appbar style={styles.top}>
        <Appbar.Content title={`Hello ${user?.name || 'Organizer'}.`} />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>

      <List.Section>
        {/* TODO: Add loader */}
        <List.Subheader style={styles.listHeader}>Events</List.Subheader>
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
  container: {
    marginTop: 50,
  },
  top: {
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    textAlign: 'left',
    fontSize: 'large',
    marginLeft: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 10,
    justifyContent: 'center',
  },
  container: {
    marginTop: 50,
  },
  content: {
    marginLeft: '15%',
    marginRight: '15%',
  },
  listHeader: {
    borderBottomWidth: 0.5,
    borderColor: 'black',
    color: 'black',
  },
  red: {
    color: 'red',
  },
});
