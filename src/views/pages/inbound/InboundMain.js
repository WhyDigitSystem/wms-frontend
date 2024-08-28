import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import GatePassIn from './GatePassIn';
import Grn from './Grn';
import Putaway from './Putaway';

const InboundMain = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl mb-3" style={{ padding: '20px' }}>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
            <Tab
              value={0}
              icon={
                <Tooltip title="Gate Pass In">
                  <img src="https://cdn-icons-png.flaticon.com/128/5208/5208307.png" alt="Gate Pass In" style={{ width: 34, height: 34 }} />
                </Tooltip>
              }
              iconPosition="start"
            />
            <Tab value={1} label="GRN" />
            <Tab value={2} label="Put Away" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && <GatePassIn />}
          {value === 1 && <Grn />}
          {value === 2 && <Putaway />}
        </Box>
      </div>
    </>
  );
};

export default InboundMain;
