import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  HomeOutlined as HomeIcon,
  AccountCircleOutlined as UserIcon,
  AssignmentOutlined as AdminIcon,
  LeaderboardOutlined as AnalyticsIcon,
  LogoutOutlined as LogoutIcon
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
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
      admin: true
    }
  ]

  const user = accountService.userValue

  return (
    <Drawer
      sx={{
        width: config.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: config.drawerWidth,
          boxSizing: 'border-box',
        },
      }
      }
      variant="persistent" anchor="left"
      open={open} onClose={toggle}
    >
      <Box>
        <List>
          {items.map((item) => {
            if (!item?.admin || item?.admin && user.role === Role.Admin) {
              return (
                <ListItem button key={item.text}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <NavLink to={item.path}>{item.text}</NavLink>
                  </ListItemText>
                </ListItem>
              )
            }
            return <></>
          })}
          <ListItem button key="Logout">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>
              <a onClick={accountService.logout}>Logout</a>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}