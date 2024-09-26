import { useEffect, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// project imports
import apiCalls from 'apicall';
import { gridSpacing } from 'store/constant';
import CalendarTimeComponent from './CalenderTime';
import EarningCard from './EarningCard';
import GaugeValueRangeNoSnap from './Gauge';
import GaugeValueRangeNoSnapOut from './GaugeOut';
import HoldMeterial from './HoldMeterial';
import LowStockDashboard from './LowStockDashboard';
import PopularCard from './PopularCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard1 from './TotalIncomeLightCard1';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingg, setLoadingg] = useState(true); // To track loading state
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [finYear, setFinYear] = useState('2024');
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [lowStockData, setLowStockData] = useState([]);
  const [putAwayData, setPutAwayData] = useState([]);
  const [pickRequestData, setPickRequestData] = useState([]);
  const [pendingGRNData, setPendingGRNData] = useState([]);
  const [completedGRNData, setCompletedGRNData] = useState([]);
  const [pendingPutawayData, setPendingPutawayData] = useState([]);
  const [completedPutawayData, setCompletedPutawayData] = useState([]);

  const [pendingGRNData1, setPendingGRNData1] = useState([]);
  const [completedGRNData1, setCompletedGRNData1] = useState([]);
  const [pendingPutawayData1, setPendingPutawayData1] = useState([]);
  const [completedPutawayData1, setCompletedPutawayData1] = useState([]);

  const [monthData, setMonthData] = useState('');
  const [yearData, setYearData] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [month1, setMonth1] = useState(new Date().getMonth() + 1);
  const [monthData1, setMonthData1] = useState('');
  const [yearData1, setYearData1] = useState('');

  useEffect(() => {
    if (month) {
      getAllGRNData(month);
      getAllPutawayData(month);
      getAllPickRequestData(month);
      getAllBuyerOrderData(month);
      getInboundMonth(month);
    }
  }, [month]);

  useEffect(() => {
    if (month1) {
      getAllPickRequestData(month1);
      getAllBuyerOrderData(month1);
      getAllGRNData(month);
      getAllPutawayData(month);
    }
  }, [month1]);

  useEffect(() => {
    setLoading(false);
    getAllLowStockData();
    getPerDayPutAwayCount();
    getPerDayPickRequestCount();
    getAllPutawayData();
    getAllBuyerOrderData();
    getAllPickRequestData();
    getInboundYear();
    getOutboundMonth();
    getOutboundYear();
  }, []);

  const getInboundMonth = async (data) => {
    setMonth(data);
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getInBoundOrderPerMonth?orgId=${orgId}&branchCode=${branchCode}&warehouse=${loginWarehouse}&client=${client}&finYear=${finYear}&month=${data ? data : month}`
      );

      if (response.status === true) {
        setMonthData(response.paramObjectsMap.grnVo[0].count);
        // getAllGRNData(month);
      } else {
        console.error('Failed to fetch warehouse client data:', response);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    }
  };

  const getInboundYear = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getInBoundOrderPerYear?orgId=${orgId}&branchCode=${branchCode}&warehouse=${loginWarehouse}&client=${client}&finYear=${finYear}`
      );

      if (response.status === true) {
        setYearData(response.paramObjectsMap.grnVo[0].count);
      } else {
        console.error('Failed to fetch warehouse client data:', response);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    }
  };

  const getOutboundMonth = async (month) => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getOutBoundOrderPerMonth?orgId=${orgId}&branchCode=${branchCode}&warehouse=${loginWarehouse}&client=${client}&finYear=${finYear}&month=${month ? month : 9}`
      );

      if (response.status === true) {
        setMonthData1(response.paramObjectsMap.buyerorderVO[0].count);
      } else {
        console.error('Failed to fetch warehouse client data:', response);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    }
  };

  const getOutboundYear = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getOutBoundOrderPerYear?orgId=${orgId}&branchCode=${branchCode}&warehouse=${loginWarehouse}&client=${client}&finYear=${finYear}`
      );

      if (response.status === true) {
        setYearData1(response.paramObjectsMap.buyerorderVO[0].count);
      } else {
        console.error('Failed to fetch warehouse client data:', response);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    }
  };

  const getAllLowStockData = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getStockLowVolume?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}`
      );
      if (response.status === true) {
        const grnData = response.paramObjectsMap.putawayDashboard;
        setLowStockData(grnData);
        console.log('Data ====>:', response.paramObjectsMap.putawayDashboard);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPerDayPutAwayCount = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getPutAwayOrderPerDay?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}`
      );
      if (response.status === true) {
        const grnData = response.paramObjectsMap.putAwayOrderPerDay;
        setPutAwayData(grnData);
        console.log('Data ====>:', response.paramObjectsMap.putAwayOrderPerDay);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPerDayPickRequestCount = async () => {
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getPickRequestOrderPerDay?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}`
      );
      if (response.status === true) {
        const grnData = response.paramObjectsMap.pickRequestOrderPerDay;
        setPickRequestData(grnData);
        console.log('Data ====>:', response.paramObjectsMap.pickRequestOrderPerDay);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllGRNData = async (data) => {
    setLoadingg(true); // Set loading to true when API call starts
    try {
      const monthValue = data === null || data === undefined ? null : data; // Check for null or undefined

      // Build the URL conditionally, excluding the month if it's null
      let url = `grn/getGrnStatusForDashBoard?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}`;
      if (monthValue !== null) {
        url += `&month=${monthValue}`; // Append the month param only if it's not null
      }

      const response = await apiCalls('get', url);

      if (response.status === true) {
        const grnData = response.paramObjectsMap.grnDashboard;
        const pendingList = grnData.filter((item) => item.status === 'Pending');
        const completedList = grnData.filter((item) => item.status === 'Complete');

        setPendingGRNData(pendingList);
        setCompletedGRNData(completedList);
      } else {
        console.error('API Error or No Data:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingg(false); // Set loading to false after the API call finishes
    }
  };

  const getAllPutawayData = async (data) => {
    setLoadingg(true); // Set loading to true when API call starts
    try {
      // Build the URL conditionally, excluding the month if it's not provided
      let url = `buyerOrder/getBuyerorderDashboard?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}`;

      // Append the month parameter only if data is provided
      if (data !== null && data !== undefined) {
        url += `&month=${data}`;
      }

      const response = await apiCalls('get', url);

      if (response.status === true) {
        const putawayData = response.paramObjectsMap.buyerorderDashboard;
        const pendingList = putawayData.filter((item) => item.status === 'Pending');
        const completedList = putawayData.filter((item) => item.status === 'Complete');

        setPendingPutawayData(pendingList);
        setCompletedPutawayData(completedList);
      } else {
        console.error('API Error or No Data:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingg(false); // Set loading to false after the API call finishes
    }
  };

  //second Pie

  const getAllBuyerOrderData = async (data) => {
    setLoadingg(true);
    try {
      const response = await apiCalls(
        'get',
        `putaway/getPutawayForDashBoard?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finYear=${finYear}&warehouse=${loginWarehouse}&month=${data ? data : month1}`
      );
      if (response.status === true) {
        const grnData = response.paramObjectsMap.putawayDashboard;
        const pendingList = grnData.filter((item) => item.status === 'Pending');
        const completedList = grnData.filter((item) => item.status === 'Complete');

        setPendingGRNData1(pendingList);
        setCompletedGRNData1(completedList);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllPickRequestData = async (data) => {
    setLoadingg(true);
    try {
      const response = await apiCalls(
        'get',
        `pickrequest/getPicrequestDashboard?orgId=${orgId}&branchCode=${branchCode}&client=${client}&finyear=${finYear}&month=${data ? data : month1}`
      );
      if (response.status === true) {
        const putawayData = response.paramObjectsMap.picrequestDashboard;
        const pendingList = putawayData.filter((item) => item.status === 'Pending');
        const completedList = putawayData.filter((item) => item.status === 'Complete');

        setPendingPutawayData1(pendingList);
        setCompletedPutawayData1(completedList);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              monthData={monthData}
              yearData={yearData}
              getInboundMonth={getInboundMonth}
              getAllGRNData={getAllGRNData}
              getAllPutawayData={getAllPutawayData}
              getInboundYear={getInboundYear}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard
              isLoading={isLoading}
              monthData={monthData1}
              yearData={yearData1}
              getOutboundMonth={getOutboundMonth}
              getAllBuyerOrderData={getAllBuyerOrderData}
              getAllPickRequestData={getAllPickRequestData}
              getOutboundYear={getOutboundYear}
            />
          </Grid>
          <Grid item sm={12} xs={12} md={6} lg={4}>
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={7} md={8} sm={8} xs={12}>
            {(!loadingg && completedGRNData.length > 0) || pendingGRNData.length > 0 ? (
              <GaugeValueRangeNoSnap
                completedGRNData={completedGRNData}
                pendingGRNData={pendingGRNData}
                pendingPutawayData={pendingPutawayData}
                completedPutawayData={completedPutawayData}
              />
            ) : (
              <p>No data available for the selected month</p>
            )}
          </Grid>
          <Grid item sm={5} xs={12} md={4} lg={5}>
            <Box>
              {' '}
              <CalendarTimeComponent />{' '}
            </Box>
            <Box sx={{ mt: 2 }}>
              {' '}
              <TotalIncomeLightCard1 isLoading={isLoading} data={putAwayData} pickRequestData={pickRequestData} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={7} md={8} sm={8} xs={12}>
            {(!loadingg && completedGRNData1.length > 0) || pendingGRNData1.length > 0 ? (
              <GaugeValueRangeNoSnapOut
                completedGRNData={completedGRNData1}
                pendingGRNData={pendingGRNData1}
                pendingPutawayData={pendingPutawayData1}
                completedPutawayData={completedPutawayData1}
              />
            ) : (
              <p>No GRN or Putaway data available for the selected month</p>
            )}
          </Grid>
          <Grid item sm={5} xs={12} md={4} lg={5}>
            <HoldMeterial isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {lowStockData.length > 0 ? <LowStockDashboard data={lowStockData} /> : ''}
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
