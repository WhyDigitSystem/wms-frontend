import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import EarningCard from './EarningCard';
import GaugeValueRangeNoSnap from './Gauge';
import GaugeValueRangeNoSnapOut from './GaugeOut';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={4}>
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={7} md={8} sm={8} xs={12}>
            {/* <EarningCard isLoading={isLoading} /> */}
            <GaugeValueRangeNoSnap />
          </Grid>
          <Grid item sm={5} xs={12} md={4} lg={5}>
            <TotalIncomeLightCard isLoading={isLoading} />
            {/* <div style={{ marginTop: '7px' }}>
              {' '}
             
              <TotalIncomeLightCard1 isLoading={isLoading} />
            </div> */}
            {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
          </Grid>
          {/* <Grid item sm={5} xs={12} md={4} lg={4}>
            <TotalIncomeLightCard isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item lg={2} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/* <Grid item lg={7} md={8} sm={8} xs={12}>
            <EarningCard isLoading={isLoading} /> <GaugeValueRangeNoSnapOut />
          </Grid> */}
          <Grid item lg={7} md={8} sm={8} xs={12}>
            {/* <EarningCard isLoading={isLoading} /> */}
            <GaugeValueRangeNoSnapOut />
          </Grid>
          {/* <Grid item sm={6} xs={12} md={6} lg={5}>
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item lg={2} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid> */}
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
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
