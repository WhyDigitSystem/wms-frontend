import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Company from './Company';
import Branch from './Branch';

const CompanySetup = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab value={0} label="Company" />
          <Tab value={1} label="Branch" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {value === 0 && <Company />}
        {value === 1 && <Branch />}
      </Box>
    </>
  );
};

export default CompanySetup;
