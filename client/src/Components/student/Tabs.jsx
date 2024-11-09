import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AboutSociety from './AboutSociety';
import Bulletins from './Bulletins';

export default function LabTabs({societyId}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} className="w-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: 'white',
                borderBottom: '2px solid transparent',
                         // Border radius for all tabs
              },
              '& .Mui-selected': {
                color: '#4c82ff',
                
                borderRadius: '10px',              // Border radius for selected tab
                borderBottom: '2px solid transparent',
              },
              '& .MuiTab-root:not(.Mui-selected)': {
                borderBottom: '2px solid gray',
                
                
              },
            }}
          >
            <Tab label="About Society" value="1" />
            <Tab label="Bulletins" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><AboutSociety /></TabPanel>
        <TabPanel value="2"><Bulletins societyId={societyId}></Bulletins></TabPanel>
      </TabContext>
    </Box> 
  );
}
