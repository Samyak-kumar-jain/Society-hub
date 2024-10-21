import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../Features/AuthSlice/slideBarSlice';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Magnet, Calendar, Users, User, School2Icon, School, GraduationCapIcon, Grid } from 'lucide-react';

const TemporaryDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState('/admin/dashboard'); // Default to Dashboard

  const handleNavigation = (path) => {
    setActivePath(path); // Set active path on click
    navigate(path);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon/> },
    { text: 'Societies', path: '/admin/socities', icon: <Users /> },
    { text: 'Student', path: '/admin/student', icon: <GraduationCapIcon/> },
    { text: 'Event', path: '/admin/event', icon: <Calendar /> },
    { text: 'Member', path: '/admin/members', icon: <Users /> },
    
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: '#002356',
        height: '100%',
        color: 'white',
        padding: '16px',
      }}
      role="presentation"
    >
      {/* Admin Panel Icon and Text */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AdminPanelSettingsIcon sx={{ color: '#4880FF', mr: 1 }} fontSize="large" />
        <h1 style={{ color: 'white', fontSize: '1.25rem', margin: 0 }}>Admin Panel</h1>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                bgcolor: activePath === item.path ? '#4880FF' : 'inherit', // Active color
                '&:hover': { bgcolor: '#4880FF' }, // Hover color
                borderRadius: '8px', // Apply border radius
                marginY: 0.9, // Add vertical margin between items
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={isOpen} onClose={() => dispatch(closeDrawer())}>
      {DrawerList}
    </Drawer>
  );
};

export default TemporaryDrawer;
