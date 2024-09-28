import PropTypes from 'prop-types';
import { useState } from 'react';

// Material-UI
import { Avatar, Box, Button, Grid, List, ListItem, Popover, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Third-party
import Chart from 'react-apexcharts';

// Project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// Assets
import { IconArrowDownFromArc } from '@tabler/icons-react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({
  isLoading,
  monthData,
  yearData,
  getOutboundMonth,
  // getAllBuyerOrderData,
  getAllPickRequestData,
  getOutboundYear,
  // getAllGRNData,
  getAllPutawayData
}) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  const [selectedMonthNumber, setSelectedMonthNumber] = useState(null); // New state for month number

  const monthNumberMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
    if (newValue) {
      // If month button clicked, open popover
      setAnchorEl(event.currentTarget);
    }
    getOutboundYear();
    // getAllBuyerOrderData(null);
    getAllPutawayData(null);
    getAllPickRequestData(null);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setSelectedMonthNumber(monthNumberMap[month]);
    handleClosePopover();
    // Add any additional logic to update monthData based on selectedMonth if needed
    // console.log('Month', selectedMonthNumber);
    getOutboundMonth(monthNumberMap[month]);
    // getAllBuyerOrderData(monthNumberMap[month]);
    getAllPickRequestData(monthNumberMap[month]);
    // getAllGRNData(monthNumberMap[month]);
    getAllPutawayData(monthNumberMap[month]);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <IconArrowDownFromArc fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      Year
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.1 }}>
                          {timeValue ? monthData : yearData} &nbsp;{' '}
                          <span style={{ fontSize: '18px' }}> {selectedMonth && selectedMonth}</span>
                        </Typography>
                      </Grid>
                      {/* <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.secondary[200],
                            color: theme.palette.secondary.dark
                          }}
                        >
                          <ArrowDownwardOutlined fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#fff'
                          }}
                        >
                          Outwards
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <List sx={{ padding: '16px' }}>
                {months.map((month) => (
                  <ListItem button key={month} onClick={() => handleMonthSelect(month)}>
                    {month}
                  </ListItem>
                ))}
              </List>
            </Popover>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.defaultProps = {
  getOutboundMonth: () => {} // No-op function as a default
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
  monthData: PropTypes.string, // Ensure that monthData is of type string
  yearData: PropTypes.string,
  getOutboundMonth: PropTypes.func.isRequired // Ensure that yearData is of type string
};

export default TotalOrderLineChartCard;
