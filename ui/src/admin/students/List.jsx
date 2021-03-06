import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Button, CircularProgress,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { TableActions } from '@/_components';
import { studentService } from '@/_services';

function List({ match }) {
  const { path } = match;
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getAll().then((res) => {
      setStudents(res)
      setLoading(false)
    });
  }, []);

  function deleteStudent(id) {
    setStudents(students.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    studentService.delete(id)
      .then(() => {
        setStudents(students => students.filter(x => x.id !== id));
        enqueueSnackbar('Student deleted successfully', { 'variant': 'success' })
      })
      .catch(error => {
        enqueueSnackbar(error, { 'variant': 'error' })
      });
  }

  if (loading) return <CircularProgress className="loader" />
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <h1>Students</h1>
        <Button
          variant="contained"
          onClick={() => { history.push(`${path}/add`) }}
        >
          Add Student
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students && students.map(student =>
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>
                  <TableActions actions={{
                    show: {
                      handle: () => history.push(`${path}/${student.id}`)
                    },
                    edit: {
                      handle: () => history.push(`${path}/edit/${student.id}`)
                    },
                    del: {
                      handle: () => deleteStudent(student.id),
                      loader: student?.isDeleting
                    }
                  }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export { List };