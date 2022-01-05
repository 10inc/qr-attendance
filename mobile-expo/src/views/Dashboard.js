import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Card, Title, ActivityIndicator } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import { useNavigate } from 'react-router-native';

import { eventService } from '../api/events';

import { useAuth } from '../auth';

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const toaster = useToast();
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    eventService.getAll()
      .then(res => {
        console.log(res);
        setEvents(res);
        setLoader(false);
      })
      .catch(() => {
        toaster.show({ message: "Session Expired", duration: 2000 })
        signOut()
      })
  }, []);
  // TODO: Add useMemo for events

  return (
    <View>
      {/* TODO: Generic component for auth view */}
      <Appbar style={styles.top}>
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar>


      <Card style={styles.events}>
        <Card.Content>
          <Title>Events</Title>
        </Card.Content>

        <Card.Content>
          {loader && <ActivityIndicator size="large" />}
          {!loader && (
            <List.Section>
              {/* TODO: Add loader */}
              {events.map(event => {
                return (
                  <List.Item
                    key={event.id}
                    title={event.name}
                    description={new Date(event.date).toLocaleDateString("fr-CA")}
                    onPress={() => navigate('/event', { state: { event: event } })}
                  />
                );
              })}
            </List.Section>
          )}
        </Card.Content>
      </Card>
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
  events: {
    margin: 24,
  }
});
