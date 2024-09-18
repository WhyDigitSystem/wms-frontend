import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import WarehouseDialog from './WarehouseDialog';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  padding: '1px', // Increased padding for better content spacing

  width: '320px', // Fixed width for the card
  height: '185px', // Increased height for a better layout
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 120, // Larger size for the background circle
    height: 120,
    // background: `linear-gradient(210.04deg, ${theme.palette.primary.main} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -10, // Adjusted position of the circle
    right: -50
  }
}));

const data = [
  { name: 'Occupied', value: 80 },
  { name: 'Available', value: 20 }
];

const COLORS = ['#00C49F', '#FFBB28'];

const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

const TotalIncomeDarkCard = ({ isLoading }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                Warehouse Occupancy
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, cursor: 'pointer' }} onClick={handleDialogOpen}>
                View Details
              </Typography>
            </Box>

            <Box sx={{ width: '100%', height: 120, mt: 1 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={5}
                    label={renderCustomLabel}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            {/* <Box mt={0}>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                80% Occupied
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.primary.main, cursor: 'pointer', mt: 0 }} onClick={handleDialogOpen}>
                View Details
              </Typography>
            </Box> */}
          </Box>
          <WarehouseDialog open={dialogOpen} onClose={handleDialogClose} />
        </CardWrapper>
      )}
    </>
  );
};

export default TotalIncomeDarkCard;
