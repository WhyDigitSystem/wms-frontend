import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, ButtonBase, Chip, Grid, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Responsibilities from './Responsibilities';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import ActionButton from 'utils/ActionButton';
import apiCalls from 'apicall';
import { showToast } from 'utils/toast-component';

const Roles = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [listView, setListView] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [data, setData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [value, setValue] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    role: '',
    active: true
  });

  const [fieldErrors, setFieldErrors] = useState({
    role: false
  });

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
    height: 28
  };

  const columns = [
    { accessorKey: 'role', header: 'Role', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  useEffect(() => {
    getAllRoles();
  }, [listView]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClear = () => {
    setFormData({
      role: '',
      active: true
    });

    setFieldErrors({
      role: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    let newValue = value;

    // Transform value to uppercase
    newValue = newValue.toUpperCase();

    // Validate value to allow only alphabetic characters
    newValue = newValue.replace(/[^A-Z ]/g, '');

    // Update the value of newValue instead of redeclaring it
    newValue = name === 'active' ? checked : newValue;

    setFormData({ ...formData, [name]: newValue });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleView = () => {
    setListView(!listView);
  };

  const getAllRoles = async () => {
    try {
      const response = await apiCalls('get', `commonmaster/country?orgid=${orgId}`);
      console.log('API Response:', response);

      if (response.status === 200) {
        setData(response.paramObjectsMap.roleVO);
        setRoleData(response.paramObjectsMap.roleVO.map((list) => list.role));

        console.log(
          'Test',
          response.paramObjectsMap.roleMasterVO.map((list) => list.role)
        );
      } else {
        // Handle error
        console.error('API Error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getRoleById = async (row) => {
    console.log('THE SELECTED ROW ID IS:', row.original.id);
    try {
      const result = await apiCalls('get', `basicMaster/updateCreateRoleMaster`);

      console.log('API Response:', result);

      if (result.status === 200) {
        const particularRole = result.paramObjectsMap.Role;
        setFormData({
          role: particularRole.role,
          active: particularRole.active === 'Active' ? true : false
        });
        setListView(false);
      } else {
        // Handle error
        console.error('API Error:', result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    // Check if any field is empty
    const errors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) {
        acc[key] = true;
      }
      return acc;
    }, {});
    // If there are errors, set the corresponding fieldErrors state to true
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return; // Prevent API call if there are errors
    }
    setIsLoading(false);
    const saveFormData = {
      ...(editId && { id: editId }),
      active: formData.active,
      role: formData.role,
      orgId: orgId,
      createdby: loginUserName
    };

    try {
      const result = await apiCalls('put', `basicMaster/updateCreateRoleMaster`, saveFormData);
      if (result.status === true) {
        console.log('Response:', result);
        showToast('success', editId ? ' Role Updated Successfully' : 'Role created successfully');
        handleClear();
        getAllRoles();
        setIsLoading(false);
      } else {
        showToast('error', result.paramObjectsMap.errorMessage || 'Role creation failed');
        setIsLoading(false);
      }
    } catch (err) {
      console.log('error', err);
      showToast('error', 'Role creation failed');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <div className="card w-full p-6 bg-base-100 shadow-xl mb-3" style={{ padding: '20px' }}>
        <div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example">
                  <Tab label="Roles" value="1" />
                  <Tab label="Responsibilities" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="d-flex flex-wrap justify-content-start mb-4">
                  <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
                  <ActionButton title="Clear" icon={ClearIcon} onClick={handleClear} />
                  <ActionButton title="List View" icon={FormatListBulletedTwoToneIcon} onClick={handleView} />
                  <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={() => handleSave()} margin="0 10px 0 10px" />
                </div>
                {listView ? (
                  <CommonListViewTable data={data} columns={columns} editCallback={getRoleById} />
                ) : (
                  <div className="row d-flex">
                    <div className="col-md-3 mb-3">
                      <FormControl fullWidth variant="filled">
                        <TextField
                          id="account"
                          label="Role"
                          size="small"
                          required
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          inputProps={{ maxLength: 30 }}
                          helperText={<span style={{ color: 'red' }}>{fieldErrors.role ? 'This field is required' : ''}</span>}
                        />
                      </FormControl>
                    </div>
                    <div className="col-md-3 mb-3">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.active}
                              onChange={handleInputChange}
                              name="active"
                              sx={{ '& .MuiSvgIcon-root': { color: '#5e35b1' } }}
                            />
                          }
                          label="Active"
                        />
                      </FormGroup>
                    </div>

                    <div>
                      <Typography variant="subtitle1">Available Roles</Typography>

                      <Grid item xs={12} sx={{ marginTop: '10px', gap: '5px' }}>
                        <Grid container>
                          {roleData.map((role, index) => (
                            <Grid item key={index} sx={{ marginLeft: index > 0 ? '5px' : '0' }}>
                              <Chip label={role} sx={chipSuccessSX} />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="2">
                <Responsibilities />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Roles;
