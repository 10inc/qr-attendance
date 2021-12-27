import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Box, Button, CircularProgress,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { TableActions } from '@/_components';
import { accountService } from '@/_services';

function List({ match }) {
  const { path } = match;
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    accountService.getAll().then((res) => {
      setUsers(res)
      setLoading(false)
    });
  }, []);

  function deleteUser(id) {
    setUsers(users.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    accountService.delete(id)
      .then(() => {
        enqueueSnackbar('User deleted successfully', { 'variant': 'success' })
        setUsers(users => users.filter(x => x.id !== id));
      })
      .catch(error => {
        enqueueSnackbar(error, { 'variant': 'error' })
      });
  }

  if (loading) return <CircularProgress className="loader" />
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <h1>Users</h1>
        <Button
          variant="contained"
          onClick={() => { history.push(`${path}/add`) }}
        >
          Add User
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user =>
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <TableActions actions={{
                    edit: {
                      handle: () => history.push(`${path}/edit/${user.id}`)
                    },
                    del: {
                      handle: () => deleteUser(user.id),
                      loader: user?.isDeleting
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