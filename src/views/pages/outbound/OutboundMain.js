import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import BuyerOrder from './BuyerOrder';
import PickRequest from './PickRequest';
import ReversePick from './ReversePick';

const OutboundMain = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl mb-3" style={{ padding: '20px' }}>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
            <Tab value={0} label="Buyer Order" />
            <Tab value={1} label="Pick Request" />
            <Tab value={2} label="Reverse Pick" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && <BuyerOrder />}
          {value === 1 && <PickRequest />}
          {value === 2 && <ReversePick />}
        </Box>
      </div>
    </>
  );
};

export default OutboundMain;
