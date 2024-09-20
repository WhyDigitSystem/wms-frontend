import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import apiCalls from 'apicall';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import WarehouseDialog from './WarehouseDialog';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderRadius: '12px',
  overflow: 'hidden',
  padding: '4px',
  width: '320px',
  height: '190px',
  textAlign: 'center'
}));

// Define a vibrant color palette
const COLORS = ['#FFBB28', '#58F7CE'];

const TotalIncomeDarkCard = ({ isLoading }) => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [warehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [occupancyData, setOccupancyData] = useState({ occupied: 0, available: 0 });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    fetchWarehouseDataForClient();
  }, []);

  const fetchWarehouseDataForClient = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getBinDetailsForClientWise?orgId=${orgId}&branchCode=${branchCode}&warehouse=${warehouse}&client=${client}`
      );
      if (response.status) {
        calculateOccupancy(response.paramObjectsMap.binDetails);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    }
  };

  const calculateOccupancy = (binDetails) => {
    const occupied = binDetails.filter((bin) => bin.binStatus === 'Occupied').length;
    const available = binDetails.filter((bin) => bin.binStatus === 'Empty').length;
    setOccupancyData({ occupied, available });
  };

  const data = [
    { name: 'Occupied', value: occupancyData.occupied },
    { name: 'Available', value: occupancyData.available }
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper>
          <Box
            sx={{
              cursor: 'pointer',
              mb: 0,
              display: 'flex',
              alignItems: 'center', // Aligns items vertically in the center
              justifyContent: 'space-between' // Ensures that items are on the same line and spaced
            }}
            onClick={handleDialogOpen}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Warehouse Occupancy
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
              <PreviewIcon sx={{ marginRight: 0 }} /> {/* Icon with margin */} View
            </Typography>
          </Box>

          <Box sx={{ width: '100%', height: '100px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="70%"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={5}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {occupancyData.occupied} Occupied / {occupancyData.available} Available
          </Typography>
          <WarehouseDialog open={dialogOpen} onClose={handleDialogClose} occupancyData={occupancyData} />
        </CardWrapper>
      )}
    </>
  );
};

export default TotalIncomeDarkCard;
