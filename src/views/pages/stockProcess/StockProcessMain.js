import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LocationMovement from './LocationMovement';
import StockRestate from './StockRestate';
import CodeConversion from './CodeConversion';
import Kitting from './Kitting';
import DeKitting from './DeKitting';
import StockConsolidation from './StockConsolidation';
import CycleCount from './CycleCount';

const StockProcessMain = () => {
  const [value, setValue] = React.useState(0);

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
            <Tab value={4} label="Kitting" />
            <Tab value={5} label="De-Kitting" />
            <Tab value={6} label="Stock Consolidtion" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && <LocationMovement />}
          {value === 1 && <StockRestate />}
          {value === 2 && <CodeConversion />}
          {value === 3 && <CycleCount />}
          {value === 4 && <Kitting />}
          {value === 5 && <DeKitting />}
          {value === 6 && <StockConsolidation />}
        </Box>
      </div>
    </>
  );
};

export default StockProcessMain;
