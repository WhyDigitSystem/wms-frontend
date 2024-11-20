import { Lock, LockOpen } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import apiCalls from 'apicall';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'; // Import Confetti
import { useWindowSize } from 'react-use'; // To handle screen size for confetti
import ToastComponent, { showToast } from 'utils/toast-component';

const ActionCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: '1px dashed grey'
}));

export const StockFreeze = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State to show confetti
  const theme = useTheme();
  const { width, height } = useWindowSize(); // Get screen dimensions

  const [orgId] = useState(localStorage.getItem('orgId'));
  const [branchCode] = useState(localStorage.getItem('branchcode'));
  const [branch] = useState(localStorage.getItem('branch'));
  const [client] = useState(localStorage.getItem('client'));

  useEffect(() => {
    getStockFreezeStatus();
  }, []);

  const getStockFreezeStatus = async () => {
    try {
      const result = await apiCalls(
        'get',
        `stockRestate/getStockFreezeStatus?orgId=${parseInt(orgId)}&branchCode=${branchCode}&branch=${branch}&client=${client}`
      );
      setIsFrozen(result.paramObjectsMap.message);
      console.log('Test', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleToggleFreeze = async () => {
    setIsLoading(true);
    try {
      const result = await apiCalls(
        'put',
        `stockRestate/createStockFreeze?orgId=${parseInt(orgId)}&branchCode=${branchCode}&branch=${branch}&client=${client}&freezeStatus=${isFrozen ? 'unFreeze' : 'freeze'}`
      );
      if (result.status === true) {
        showToast('success', `Stock Status ${isFrozen ? 'Unfreeze' : 'Freeze'} Updated Successfully`);
        setIsFrozen((prev) => !prev);
        setShowConfetti(true); // Show confetti on success
        setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
        getStockFreezeStatus();
      } else {
        showToast('error', result.paramObjectsMap.errorMessage || 'Stock Status failed');
      }
    } catch (err) {
      showToast('error', 'Stock Status failed');
    } finally {
      setIsLoading(false);
    }
  };

  const chipSX = {
    height: 30,
    padding: '0 6px'
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light
  };

  return (
    <Box
      sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#f5f5f5' }}
    >
      {showConfetti && <Confetti width={width} height={height} />} {/* Render Confetti */}
      <ActionCard>
        <CardContent>
          <Grid item>
            <Chip
              icon={isFrozen ? <Lock /> : <LockOpen />}
              label={isFrozen ? 'Stock is Frozen' : 'Stock is Active'}
              sx={isFrozen ? chipWarningSX : chipSuccessSX}
            />
          </Grid>
          <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
            Use the button below to toggle the stock freeze status.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color={isFrozen ? 'secondary' : 'primary'}
              onClick={handleToggleFreeze}
              disabled={isLoading}
              startIcon={isFrozen ? <LockOpen /> : <Lock />}
              endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isFrozen ? 'Unfreeze' : 'Freeze'}
            </Button>
          </Box>
        </CardContent>
      </ActionCard>
      <ToastComponent />
    </Box>
  );
};
