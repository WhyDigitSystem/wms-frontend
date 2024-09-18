import CloseIcon from '@mui/icons-material/Close';
import InventoryIcon from '@mui/icons-material/Inventory'; // Example icon for Part No.
import { Box, Card, CardContent, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Popover, Typography } from '@mui/material';
import apiCalls from 'apicall';
import { useEffect, useState } from 'react';

const WarehouseDialog = ({ open, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverData, setPopoverData] = useState(null);
  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseClientData, setWarehouseClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBin, setSelectedBin] = useState('');
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [warehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [client, setClient] = useState(localStorage.getItem('client'));

  // Fetch the warehouse data when dialog opens
  useEffect(() => {
    if (open) {
      const fetchWarehouseData = async () => {
        setLoading(true);
        try {
          const response = await apiCalls(
            'get',
            `dashboardController/getStorageDetails?orgId=${orgId}&branchCode=${branchCode}&warehouse=${warehouse}`
          );
          if (response.status === true) {
            setWarehouseData(response.paramObjectsMap.storageDetails);
          } else {
            console.error('Failed to fetch warehouse data:', response);
          }
        } catch (error) {
          console.error('Error fetching warehouse data:', error);
        } finally {
          setLoading(false);
        }
      };

      const fetchWarehouseDataForClient = async () => {
        setLoading(true);
        try {
          const response = await apiCalls(
            'get',
            `dashboardController/getBinDetailsForClientWise?orgId=${orgId}&branchCode=${branchCode}&warehouse=${warehouse}&client=${client}`
          );
          if (response.status === true) {
            setWarehouseClientData(response.paramObjectsMap.binDetails);
          } else {
            console.error('Failed to fetch warehouse client data:', response);
          }
        } catch (error) {
          console.error('Error fetching warehouse client data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWarehouseData();
      fetchWarehouseDataForClient();
    }
  }, [open, orgId, branchCode, warehouse, client]);

  const getBinDetail = async (bin) => {
    // setLoading(true);
    setSelectedBin(bin);
    try {
      const response = await apiCalls(
        'get',
        `dashboardController/getBinDetails?orgId=${orgId}&branchCode=${branchCode}&warehouse=${warehouse}&client=${client}&bin=${bin}`
      );

      if (response.status === true) {
        setPopoverData(response.paramObjectsMap.binDetails);
      } else {
        console.error('Failed to fetch warehouse client data:', response);
      }
    } catch (error) {
      console.error('Error fetching warehouse client data:', error);
    } finally {
      // setLoading(false);
    }
  };

  // Find common bins between warehouseData and warehouseClientData
  const getCommonBins = () => {
    const warehouseBins = new Set(warehouseData.map((location) => location.bin));
    const clientBins = new Set(warehouseClientData.map((location) => location.bin));
    return new Set([...warehouseBins].filter((bin) => clientBins.has(bin)));
  };

  const commonBins = getCommonBins();

  const handleClick = (event, location) => {
    setAnchorEl(event.currentTarget);
    getBinDetail(location);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverData(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  const getColorByAvailability = (bin) => {
    return commonBins.has(bin) ? 'green' : 'grey';
  };

  // Group warehouse data by levels (A, B, C)
  const groupByLevel = (data) => {
    return data.reduce((acc, location) => {
      const { level } = location;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(location);
      return acc;
    }, {});
  };

  const groupedData = groupByLevel(warehouseData); // Group the warehouse data by level

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <h5>Warehouse Location</h5>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Grid container spacing={2}>
              {Object.keys(groupedData).map((level) => (
                <Grid container item xs={12} spacing={2} key={level}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Level {level}</Typography>
                  </Grid>
                  {groupedData[level].map((location, index) => (
                    <Grid
                      item
                      xs={1}
                      key={index}
                      style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: getColorByAvailability(location.bin),
                        border: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '5px'
                      }}
                      onClick={(event) => handleClick(event, location.bin)}
                    >
                      {location.bin}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {popoverData && popoverData.length > 0 ? (
          <Box sx={{ p: 1, maxWidth: 300 }}>
            {popoverData.map((data, index) => (
              <Card>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <InventoryIcon color="secondary" />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" component="div">
                        Part No: {data.partNo || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.partDesc || 'No description available'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">
                      <strong>Location:</strong> {selectedBin || 'N/A'}
                    </Typography>
                    <Typography variant="subtitle2">
                      <strong>Part Qty:</strong> {data.avilQty || 'N/A'}
                    </Typography>
                    <Typography variant="subtitle2">
                      <strong>Batch:</strong>
                      {data.batch || 'N/A'}
                    </Typography>
                    <Typography variant="subtitle2">
                      <strong>Status:</strong> {data.status || 'N/A'}
                    </Typography>
                  </Box>

                  {index < popoverData.length - 1 && <Divider sx={{ my: 2 }} />}
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography sx={{ p: 2 }}>
            <strong>Bin Empty!</strong>
          </Typography>
        )}
      </Popover>
    </>
  );
};

export default WarehouseDialog;
