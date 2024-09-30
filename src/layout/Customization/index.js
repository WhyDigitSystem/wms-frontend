import { Button, Drawer, Fab, Grid, IconButton, Tab, Tabs, TextField, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconHelp } from '@tabler/icons-react';
import apiCalls from 'apicall';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import EmailConfig from 'utils/EmailConfig';
import ToastComponent, { showToast } from 'utils/toast-component';
import TicketList from './List';

function valueText(value) {
  return `${value}px`;
}

const Customization = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [newMess, setNewMess] = useState(false);
  const [listViewData, setListViewData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [branchCode, setLoginBranchCode] = useState(localStorage.getItem('branchcode'));
  const [branch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [customer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [client, setLoginClient] = useState(localStorage.getItem('client'));
  const [warehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [finYear, setLoginFinYear] = useState(localStorage.getItem('finYear'));

  const handleToggle = () => {
    setOpen(!open);
  };

  const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
  const handleBorderRadius = (event, newValue) => {
    setBorderRadius(newValue);
  };

  const [fileName, setFileName] = useState('');
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  useEffect(() => {
    dispatch({ type: SET_BORDER_RADIUS, borderRadius });
  }, [dispatch, borderRadius]);

  let initialFont;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Roboto', sans-serif`:
      initialFont = 'Roboto';
      break;
    case `' Poppins', sans-serif`:
    default:
      initialFont = 'Poppins';
      break;
  }

  const [fontFamily, setFontFamily] = useState('Poppins');
  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'Roboto':
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
  }, [dispatch, fontFamily]);

  // Help form state variables
  const [helpFormData, setHelpFormData] = useState({
    name: '',
    email: '',
    message: '',
    attachments: null
  });

  // const handleHelpInputChange = (event) => {
  //   const { name, value, files } = event.target;
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileName(file.name);
  //   } else {
  //     setHelpFormData({
  //       ...helpFormData,
  //       [name]: value
  //     });
  //   }
  // };

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleHelpInputChange = (event) => {
    const { name, value, files } = event.target;
    const file = files && files[0];

    if (file) {
      setFileName(file.name);

      // Check if the selected file is an image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle other form fields if needed
      setHelpFormData({
        ...helpFormData,
        [name]: value
      });
    }
  };

  // const handleHelpSubmit = async (event) => {
  //   event.preventDefault();
  //   // Add your submit logic here

  //   console.log('help', helpFormData);

  //   // Corrected template literals
  //   const newMessage = `
  //     You have a new message from: ${helpFormData.name}
  //     Message: ${helpFormData.message}
  //     Email: ${helpFormData.email}
  //   `;

  //   // Setting the new message
  //   setNewMess(newMessage);

  //   // Indicating that an email needs to be sent
  //   setSendMail(true);

  //   // Delay the handleToggle function by 2 seconds
  //   setTimeout(() => {
  //     handleToggle();
  //     setHelpFormData({
  //       name: '',
  //       email: '',
  //       message: ''
  //     });
  //     showToast('success', 'Ticket Created Successfully');
  //   }, 1000); // 2000 milliseconds = 2 seconds
  // };

  const handleHelpSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!helpFormData.name) {
      errors.name = 'Name is required';
    }
    if (!helpFormData.email) {
      errors.email = 'Email is required';
    }
    if (!helpFormData.message) {
      errors.message = 'Message is required';
    }

    if (Object.keys(errors).length === 0) {
      const saveData = {
        branch: branch,
        branchCode: branchCode,
        client: client,
        customer: customer,
        email: helpFormData.email,
        finYear: finYear,
        issueDesc: helpFormData.message,
        name: helpFormData.name,
        orgId: orgId,
        warehouse: warehouse,
        createdBy: loginUserId
      };

      console.log('DATA TO SAVE', saveData);

      try {
        const response = await apiCalls('put', `ticket/createUpdateTicket`, saveData);
        if (response.status === true) {
          setSendMail(true);
          console.log('Response:', response);
          showToast('success', ' Ticket Created Successfully');
          getAllTickets();
          handleToggle();
          setHelpFormData({
            name: '',
            email: '',
            message: ''
          });
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Ticket creation failed');
          // setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'City creation failed');
        // setIsLoading(false);
      }
    } else {
      // setFieldErrors(errors);
    }
  };

  const getAllTickets = async () => {
    try {
      const response = await apiCalls('get', `ticket/getAllTicketByOrgIdAndUserId?orgId=${orgId}&userId=${loginUserId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.ticketVO);
        console.log('Test===>', response.paramObjectsMap.ticketVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(''); // Clear the image preview URL
    setFileName(''); // Clear the file name
  };

  return (
    <>
      <div>
        <ToastComponent />
      </div>
      <Tooltip title="Help">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '2%',
            position: 'fixed',
            right: 10
          }}
        >
          <IconButton color="inherit" size="large" disableRipple>
            <IconHelp stroke={2} />
          </IconButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 370
          }
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                aria-label="Ticket Tabs"
              >
                <Tab label="Ticket" />
                <Tab label="Ticket List" />
                {/* <Tab label="Quick chat" /> */}
              </Tabs>
              <br></br>

              {selectedTab === 0 && (
                <SubCard title="Leave us a message">
                  <form onSubmit={(event) => handleHelpSubmit(event)}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          size="small"
                          value={helpFormData.name}
                          onChange={handleHelpInputChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email ID"
                          name="email"
                          size="small"
                          value={helpFormData.email}
                          onChange={handleHelpInputChange}
                          type="email"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="How can I help you?"
                          name="message"
                          size="small"
                          value={helpFormData.message}
                          onChange={handleHelpInputChange}
                          multiline
                          rows={4}
                          required
                        />
                      </Grid>
                      {/* <Grid item spacing={2}>
                        <Grid item xs={12}>
                          <Button variant="contained" component="label" fullWidth sx={{ textTransform: 'none' }}>
                            Attach File
                            <input type="file" hidden name="attachments" onChange={handleHelpInputChange} />
                          </Button>
                        </Grid>

                        {fileName && (
                          <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Attached File: {fileName}
                            </Typography>
                          </Grid>
                        )}

                        {imagePreviewUrl && (
                          <Grid item xs={12} sx={{ position: 'relative', maxWidth: '50%' }}>
                            <img src={imagePreviewUrl} alt={fileName} style={{ width: '50%', marginTop: '10px' }} />
                            <IconButton
                              onClick={handleRemoveImage}
                              sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                }
                              }}
                              size="small"
                            >
                              <IconXboxX stroke={2} />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid> */}

                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ textTransform: 'none' }}>
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </SubCard>
              )}

              {selectedTab === 1 && <TicketList listViewData={listViewData} />}

              {/* {selectedTab === 2 && (
                <Grid item xs={12}>
                  <QuickChat />
                </Grid>
              )} */}
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>

      {sendMail && (
        <EmailConfig
          updatedEmployee={'Admin'}
          toEmail={'krishnan@whydigit.in'}
          message={newMess}
          title={'you have a new ticket'}
          // description={description}
        />
      )}
    </>
  );
};

export default Customization;
