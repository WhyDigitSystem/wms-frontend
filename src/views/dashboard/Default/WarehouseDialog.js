// import { Dialog, DialogContent, DialogTitle, Grid, Popover, Typography } from '@mui/material';
// import { useState } from 'react';
// import { generateGridData } from 'utils/CommonFunctions';

// const WarehouseDialog = ({ open, onClose }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [popoverData, setPopoverData] = useState(null);

//   const mockData = generateGridData(3, ['A', 'B', 'C', 'D', 'E', 'F'], 10);

//   const handleClick = (event, data) => {
//     setAnchorEl(event.currentTarget);
//     setPopoverData(data);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setPopoverData(null);
//   };

//   const popoverOpen = Boolean(anchorEl); // Renamed variable
//   const id = popoverOpen ? 'simple-popover' : undefined;

//   const getColorByAvailability = (percentage) => {
//     if (percentage === 100) return 'green';
//     if (percentage > 90) return 'green';
//     if (percentage > 60) return 'green';
//     return 'green';
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//         <DialogTitle>
//           <h5>Warehouse Location</h5>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             {mockData.map((row, rowIndex) => (
//               <Grid container item xs={12} key={rowIndex}>
//                 {row.map((location, colIndex) => (
//                   <Grid
//                     item
//                     xs={1}
//                     key={colIndex}
//                     style={{
//                       width: '45px',
//                       height: '45px',
//                       backgroundColor: getColorByAvailability(location.percentage),
//                       border: '1px solid #ccc',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '12px',
//                       color: 'white',
//                       cursor: 'pointer'
//                     }}
//                     onClick={(event) => handleClick(event, location)}
//                   >
//                     {location.id}
//                   </Grid>
//                 ))}
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>
//       </Dialog>

//       <Popover
//         id={id}
//         open={popoverOpen} // Use the renamed variable
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left'
//         }}
//       >
//         <Typography sx={{ p: 2 }}>
//           <strong>Location:</strong> {popoverData?.id}
//           <br />
//           <strong>Availability:</strong> {popoverData?.percentage.toFixed()} %
//           <br />
//           <strong>Part No:</strong> {popoverData?.partno}
//           <br />
//           <strong>Part Qty:</strong> {popoverData?.partQty}
//         </Typography>
//       </Popover>
//     </>
//   );
// };

// export default WarehouseDialog;

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { generateGridData } from 'utils/CommonFunctions';

const WarehouseDialog = ({ open, onClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverData, setPopoverData] = useState(null);

  const mockData = generateGridData(3, ['A', 'B', 'C', 'D', 'E', 'F'], 10);

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setPopoverData(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverData(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  const getColorByAvailability = (percentage) => {
    if (percentage === 100) return 'green';
    if (percentage > 90) return 'green';
    if (percentage > 60) return 'green';
    return 'green';
  };

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
          <Grid container spacing={2}>
            {mockData.map((row, rowIndex) => (
              <Grid container item xs={12} key={rowIndex}>
                {row.map((location, colIndex) => (
                  <Grid
                    item
                    xs={1}
                    key={colIndex}
                    style={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: getColorByAvailability(location.percentage),
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                    onClick={(event) => handleClick(event, location)}
                  >
                    {location.id}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
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
        <Typography sx={{ p: 2 }}>
          <strong>Location:</strong> {popoverData?.id}
          <br />
          <strong>Availability:</strong> {popoverData?.percentage.toFixed()} %
          <br />
          <strong>Part No:</strong> {popoverData?.partno}
          <br />
          <strong>Part Qty:</strong> {popoverData?.partQty}
        </Typography>
      </Popover>
    </>
  );
};

export default WarehouseDialog;
