import { Box, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const GaugeValueRangeNoSnapOut = () => {
  const theme = useTheme();

  // Common Apex chart data and configuration
  const commonChartOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(0)}%`; // Show percentage values
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  // GRN Data
  const grnChartOptions = {
    ...commonChartOptions,
    labels: ['Completed', 'Pending'],
    colors: ['#6DD5ED', '#2193B0'] // GRN colors
  };
  const grnChartSeries = [60, 40]; // GRN: 60% Completed, 40% Pending

  // Putaway Data
  const putawayChartOptions = {
    ...commonChartOptions,
    labels: ['Completed', 'Pending'],
    colors: ['#00C49F', '#FFBB28'] // Putaway colors
  };
  const putawayChartSeries = [30, 70]; // Putaway: 50% Completed, 50% Pending

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
      {/* GRN Card */}
      <Card
        sx={{
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: theme.palette.background.paper,
          width: '300px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '600', mb: 1 }}>
          Buyer Order
        </Typography>
        <Box sx={{ width: '100%', height: '100%' }}>
          <ReactApexChart options={grnChartOptions} series={grnChartSeries} type="pie" height={200} />
        </Box>
      </Card>

      {/* Putaway Card */}
      <Card
        sx={{
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: theme.palette.background.paper,
          width: '300px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '600', mb: 1 }}>
          Pick Request
        </Typography>
        <Box sx={{ width: '100%', height: '100%' }}>
          <ReactApexChart options={putawayChartOptions} series={putawayChartSeries} type="pie" height={200} />
        </Box>
      </Card>
    </Box>
  );
};

export default GaugeValueRangeNoSnapOut;
