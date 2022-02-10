import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Grid, Divider, CircularProgress,
  List, ListItem, ListItemText, ListItemButton,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



import { Bar } from 'react-chartjs-2';

import { eventService } from '@/_services';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [analytics, setAnalytics] = useState({});
  const [barData, setBarData] = useState([]);
  const history = useHistory()

  useEffect(() => {
    eventService.getAnalytics().then((res) => {
      setAnalytics(res)
      let events = res.events
      let labels = []
      let dataset = [
        { label: 'Attended', data: [], backgroundColor: '#4472c4' },
        { label: 'Not Attended', data: [], backgroundColor: '#ed7d31' }
      ]

      events.forEach((event) => {
        labels.push(event._id)
        dataset[0].data.push(event.sum)
        dataset[1].data.push(res.students - event.sum)
      });

      setBarData({
        labels: labels,
        datasets: dataset
      })

    })
  }, []);



  return (
    <React.Fragment>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Paper sx={{ height: '45vh' }}>
            <Box sx={{ height: '100%' }}>
              { Object.keys(barData).length !== 0 && <EventSummaryBarGraph data={barData} /> }
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export { Analytics };


const EventSummaryBarGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Event Summary',
      },
    },
  }

  return (
    <Bar options={options} data={data} />
  )
}