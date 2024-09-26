import { Box, Card, Chip, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import CloseIcon from '@mui/icons-material/Close';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const GaugeValueRangeNoSnapOut = ({ completedGRNData, pendingGRNData, pendingPutawayData, completedPutawayData }) => {
  const theme = useTheme();
  const [openCompletedDialog, setOpenCompletedDialog] = useState(false);
  const [openPendingDialog, setOpenPendingDialog] = useState(false);
  const [openCompletedDialogPutaway, setOpenCompletedDialogPutaway] = useState(false);
  const [openPendingDialogPutaway, setOpenPendingDialogPutaway] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [data, setData] = useState([]);
  const [grnChartSeries, setGrnChartSeries] = useState([0, 0]);
  const [putawayChartSeries, setPutawayChartSeries] = useState([0, 0]);

  useEffect(() => {
    if (completedGRNData.length > 0 || pendingGRNData.length > 0) {
      // Update chart series when the data is ready
      console.log('Completed GRN Data:', completedGRNData); // Add this
      console.log('Pending GRN Data:', pendingGRNData); // Add this
      setGrnChartSeries([completedGRNData.length, pendingGRNData.length]);
    }
  }, [completedGRNData, pendingGRNData]);

  useEffect(() => {
    if (completedPutawayData.length > 0 || pendingPutawayData.length > 0) {
      // Update chart series when the data is ready
      console.log('Completed Putaway Data:', completedPutawayData); // Add this
      console.log('Pending Putaway Data:', pendingPutawayData); // Add this
      setPutawayChartSeries([completedPutawayData.length, pendingPutawayData.length]);
    }
  }, [completedPutawayData, pendingPutawayData]);

  const commonChartOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const { dataPointIndex } = config;
          const isCompleted = dataPointIndex === 0;
          const title = isCompleted ? 'Completed Items' : 'Pending Items';
          const data = isCompleted ? completedGRNData : pendingGRNData;

          console.log('DataPointIndex:', dataPointIndex); // Log the index
          console.log('Data selected:', data); // Log selected data

          handleOpenDialog(isCompleted ? 'Completed Items' : 'Pending Items', isCompleted);
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(0)}%`;
      }
    }
  };

  const commonChartOptionsPutaway = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const { dataPointIndex } = config;
          const isCompleted = dataPointIndex === 0;
          const title = isCompleted ? 'Completed Items' : 'Pending Items';
          const data = isCompleted ? completedPutawayData : pendingPutawayData;

          console.log('DataPointIndex:', dataPointIndex); // Log the index
          console.log('Data selected:', data); // Log selected data

          handleOpenDialogPutaway(isCompleted ? 'Completed Items' : 'Pending Items', isCompleted);
        }
      }
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(0)}%`;
      }
    }
  };
  const handleOpenDialog = (title, isCompleted) => {
    setDialogTitle(title);
    if (isCompleted) {
      setOpenCompletedDialog(true);
    } else {
      setOpenPendingDialog(true);
    }
  };

  const handleOpenDialogPutaway = (title, isCompleted) => {
    setDialogTitle(title);
    if (isCompleted) {
      setOpenCompletedDialogPutaway(true);
    } else {
      setOpenPendingDialogPutaway(true);
    }
  };

  const handleCloseCompletedDialog = () => {
    setOpenCompletedDialog(false);
    setOpenCompletedDialogPutaway(false);
  };

  const handleClosePendingDialog = () => {
    setOpenPendingDialog(false);
    setOpenPendingDialogPutaway(false);
  };

  const grnChartOptions = {
    ...commonChartOptions,
    labels: ['Completed', 'Pending'],
    colors: ['#6DD5ED', '#2193B0']
  };

  const putawayChartOptions = {
    ...commonChartOptionsPutaway,
    labels: ['Completed', 'Pending'],
    colors: ['#00C49F', '#FFBB28']
  };
  // const putawayChartSeries = [completedPutawayData.length, pendingPutawayData.length];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
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
          Putaway
        </Typography>
        <Box sx={{ width: '100%', height: '100%' }}>
          <ReactApexChart options={grnChartOptions} series={grnChartSeries} type="pie" height={200} />
        </Box>
      </Card>

      {/* Putaway Chart */}
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

      {/* Completed GRN Dialog */}
      <Dialog open={openCompletedDialog} onClose={handleCloseCompletedDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Completed BuyerOrder &nbsp; &nbsp; <Chip label={completedGRNData.length} color={'success'} />
          <IconButton onClick={handleCloseCompletedDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {completedGRNData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Putaway No
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Ref No{' '}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Qty
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedGRNData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.putawayNo}</TableCell>
                      <TableCell>{item.refNo}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                      {/* <TableCell>
                        <Chip
                          icon={item.status === 'Complete' ? <CheckCircleOutlineIcon /> : <PendingActionsIcon />}
                          label={item.status}
                          color={item.status === 'Complete' ? 'success' : 'warning'}
                        />
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            'No data found!'
          )}
        </DialogContent>
      </Dialog>

      {/* Pending GRN Dialog */}
      <Dialog open={openPendingDialog} onClose={handleClosePendingDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Pending Buyer Order &nbsp; &nbsp; <Chip label={pendingGRNData.length} color={'warning'} />
          <IconButton onClick={handleClosePendingDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {pendingGRNData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Putaway No
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Ref No
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Qty
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingGRNData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.putawayNo}</TableCell>
                      <TableCell>{item.refNo}</TableCell>
                      <TableCell>{item.qty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>

      {/* Completed Putaway Dialog */}
      <Dialog open={openCompletedDialogPutaway} onClose={handleCloseCompletedDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Completed Items &nbsp; &nbsp; <Chip label={completedPutawayData.length} color={'success'} />
          <IconButton onClick={handleCloseCompletedDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Pick No
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Order Qty
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Pick Qty
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedPutawayData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.pickNo}</TableCell>
                    <TableCell>{item.orderQty}</TableCell>
                    <TableCell>{item.pickQty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      {/* Pending Putaway Dialog */}
      <Dialog open={openPendingDialogPutaway} onClose={handleClosePendingDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Pending Items &nbsp; &nbsp; <Chip label={pendingPutawayData.length} color={'warning'} />
          <IconButton onClick={handleClosePendingDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Pick No
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Order Qty
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Pick Qty
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingPutawayData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.pickNo}</TableCell>
                    <TableCell>{item.orderQty}</TableCell>
                    <TableCell>{item.pickQty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GaugeValueRangeNoSnapOut;
