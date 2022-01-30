import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  HomeOutlined as HomeIcon,
  AccountCircleOutlined as UserIcon,
  AssignmentOutlined as AdminIcon,
  LeaderboardOutlined as AnalyticsIcon,
  LogoutOutlined as LogoutIcon,
  GroupsOutlined as StudentsIcon
} from '@mui/icons-material';
import config from 'config';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';

export function SideBar({ open, toggle }) {
  const items = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      path: "/"
    }, {
      text: "Profile",
      icon: <UserIcon />,
      path: "/profile"
    }, {
      text: "Admin",
      icon: <AdminIcon />,
      path: "/admin",
      admin: true
    }, {
      text: "Students",
      icon: <StudentsIcon />,
      path: "/admin/students",
      admin: true
    }, {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
      admin: true
    }
  ]

  const user = accountService.userValue
  const history = useHistory()

  return (
    <Drawer
      sx={{
        width: config.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: config.drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent" anchor="left"
      open={open} onClose={toggle}
    >
      <Box sx={{
        backgroundColor: '#009c85',
        color: 'white',
        height: '100%',
      }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => history.push('/')}
        >
          <Box
            component="img"
            sx={{
              height: '3em',
              width: '3em',
              margin: '0.5em'
            }}
            alt="QR CodeIn"
            src="/logo.png"
          />
          <h2 styles={{fontWeight: '700'}}>QR CodeIn</h2>
        </Box>
        <List>
          {items.map((item) => {
            if (!item?.admin || item?.admin && user.role === Role.Admin) {
              return (
                <ListItem button key={item.text} onClick={() => history.push(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{color: 'white'}}
                    primary={item.text}
                  />
                </ListItem>
              )
            }
            return <></>
          })}
          <ListItem button key="Logout" >
            <ListItemIcon>
              <LogoutIcon color="inherit" />
            </ListItemIcon>
            <ListItemText onClick={accountService.logout}>
              <a>Logout</a>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}