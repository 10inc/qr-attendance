import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import {
  Groups as StudentIcon,
  Assignment as EventIcon,
  Redeem as CertificateIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

import { eventService } from '@/_services';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [analytics, setAnalytics] = useState({});
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const colours = ['#4472c4', '#ed7d31', '#ffc000', '#543c2a', '#54bdc6']

  useEffect(() => {

    function generateBarChartDataset(events, studentCount) {
      let labels = []
      let dataset = [
        { label: 'Attended', data: [], backgroundColor: colours[0] },
        { label: 'Not Attended', data: [], backgroundColor: colours[1] }
      ]

      events.forEach((event) => {
        labels.push(event._id)
        dataset[0].data.push(event.sum)
        dataset[1].data.push(studentCount - event.sum)
      });

      setBarData({
        labels: labels,
        datasets: dataset
      })
    }
    // export const data = {
    //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //   datasets: [
    //     {
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)',
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)',
    //       ],
    //       borderWidth: 1,
    //     },
    //   ],
    // };
    function generatePieChartDataset(years) {
      let data = []
      years.map((event) => {
        let count = {}
        event.attendees.map((a) => count[a.year] = (count[a.year] || 0) + 1)
        let labels = Object.keys(count)

        if (labels.length) {
          data.push({
            labels: labels,
            datasets: [{
              label: 'Students Attended per Year Level (' + event.name + ')',
              data: labels.map((l) => count[l]),
              backgroundColor: [...Array(labels.length)].map((_, i) => colours[i])
            }],
          })
        }
      })

      setPieData(data)
    }

    eventService.getAnalytics().then((res) => {
      setAnalytics(res)

      // Event Summary Bar Chart
      generateBarChartDataset(res.events, res.students)
      // Event-Years Pie Graph
      generatePieChartDataset(res.years)
    })
  }, []);

  return (
    <Grid container spacing={4}>

      <Grid item xs={4}>
        <Paper>
          <Box sx={{ p: 2, position: 'relative' }}>
            <h2>{analytics?.students || '-'}</h2>
            <h3>Students Listed</h3>
            <StudentIcon className="dashboard-icon" fontSize="large" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper>
          <Box sx={{ p: 2, position: 'relative' }}>
            <h2>{analytics?.events?.length || '-'}</h2>
            <h3>Events Listed</h3>
            <EventIcon className="dashboard-icon" fontSize="large" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper>
          <Box sx={{ p: 2, position: 'relative' }}>
            <h2>{analytics?.attendees || '-'}</h2>
            <h3>Certificates Generated</h3>
            <CertificateIcon className="dashboard-icon" fontSize="large" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ height: '45vh' }}>
          <Box sx={{ height: '100%' }}>
            {Object.keys(barData).length !== 0 && <EventSummaryBarGraph data={barData} />}
          </Box>
        </Paper>
      </Grid>

      {pieData.length && ( pieData.map((data) => {
        return(
          <Grid item xs={6}>
            <Paper sx={{ height: '45vh' }}>
              <Box sx={{ height: '90%', position: 'relative' }}>
                <YearPieGraph data={data} />
              </Box>
            </Paper>
          </Grid>
        )
      }))}
    </Grid>
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

const YearPieGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: data.datasets[0].label
      }
    }
  }
  return (
    <Pie options={options} data={data} />
  )
}
