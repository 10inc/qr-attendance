import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Grid, Divider, CircularProgress,
  List, ListItem, ListItemText, ListItemButton,
} from '@mui/material';
import {
  Groups as StudentIcon,
  Assignment as EventIcon,
  Redeem as CertificateIcon,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { accountService, eventService } from '@/_services';
import { Role } from '@/_helpers';

export function Home() {
  const user = accountService.userValue;

  if (!user) return <CircularProgress className="loader" />
  if (user.role === Role.Admin) return <AdminHome />

  return (
    <Paper>
      <Box sx={{ p: 2, position: 'relative' }}>
        Hi {user.name}! You are logged in as an Organizer. <br/>
        The web control panel is mainly for Admins.
      </Box>
    </Paper>
  )
}


function AdminHome() {
  const [data, setData] = useState({});
  const [events, setEvents] = useState([]);
  const history = useHistory()

  useEffect(() => {
    eventService.getAnalytics().then(setData);
    eventService.getAll().then(setEvents);
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <Box sx={{ p: 2, position: 'relative' }}>
              <h2>{data?.students || '-'}</h2>
              <h3>Students Listed</h3>
              <StudentIcon className="dashboard-icon" fontSize="large" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            <Box sx={{ p: 2, position: 'relative' }}>
              <h2>{data?.events || '-'}</h2>
              <h3>Events Listed</h3>
              <EventIcon className="dashboard-icon" fontSize="large" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            <Box sx={{ p: 2, position: 'relative' }}>
              <h2>{data?.attendees || '-'}</h2>
              <h3>Certificates Generated</h3>
              <CertificateIcon className="dashboard-icon" fontSize="large" />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <Paper sx={{ height: '65vh' }}>
            <Box sx={{ p: 2, position: 'relative' }}>
              <h3>Ongoing Seminars</h3>
              <List>
                {events.filter(e => new Date(e.date) >= new Date()).map(event => {
                  return (
                    <React.Fragment key={event.id}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push(`admin/events/${event.id}`)}>
                          <ListItemText primary={event.name} />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  )
                })}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ height: '65vh' }}>
            <Box sx={{ p: 2, position: 'relative' }}>
              <h3>Completed Events</h3>
              <List>
                {events.filter(e => new Date(e.date) < new Date()).map(event => {
                  return (
                    <React.Fragment key={event.id}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => history.push(`admin/events/${event.id}`)}>
                          <ListItemText primary={event.name} />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  )
                })}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
