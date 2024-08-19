import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import CodeConversion from './CodeConversion';
import CycleCount from './CycleCount';
import DeKitting from './DeKitting';
import LocationMovement from './LocationMovement';
import StockConsolidation from './StockConsolidation';
import StockRestate from './StockRestate';

const StockProcessMain = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl mb-3" style={{ padding: '20px' }}>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
            <Tab value={0} label="Location Movement" />
            <Tab value={1} label="Stock Restate" />
            <Tab value={2} label="Code Conversion" />
            <Tab value={3} label="Cycle Count" />
            <Tab value={5} label="De-Kitting" />
            <Tab value={6} label="Stock Consolidtion" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && <LocationMovement />}
          {value === 1 && <StockRestate />}
          {value === 2 && <CodeConversion />}
          {value === 3 && <CycleCount />}
          {value === 5 && <DeKitting />}
          {value === 6 && <StockConsolidation />}
        </Box>
      </div>
    </>
  );
};

export default StockProcessMain;
