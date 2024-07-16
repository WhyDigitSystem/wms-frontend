import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo } from 'react';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { showErrorToast, showSuccessToast } from 'utils/toastUtils';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const CreateCompany = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);

  const [formData, setFormData] = useState({
    companyCode: '',
    companyName: '',
    companyAdminName: '',
    companyAdminEmail: '',
    companyAdminPwd: '',
    active: '',
    orgId: 1,
    createdby: 'Karupu'
  });

  const [fieldErrors, setFieldErrors] = useState({
    companyCode: '',
    companyName: '',
    companyAdminName: '',
    companyAdminEmail: '',
    companyAdminPwd: '',
    active: ''
  });
  const [listView, setListView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const listViewColumns = [
    { accessorKey: 'companyId', header: 'CompanyId', size: 140 },
    {
      accessorKey: 'company',
      header: 'Company',
      size: 140
    },
    {
      accessorKey: 'adminName',
      header: 'Admin',
      size: 140
    },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-z ]*$/;
    const companyNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const companyCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    if (name === 'companyName' && !companyNameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphabetic characters and @*_- are allowed' });
    }
    //  else if (name === 'companyAdminEmail' && !emailRegex.test(value)) {
    //   setFieldErrors({ ...fieldErrors, [name]: 'Invalid Email Id' });
    // }
    else if (name === 'companyCode' && !companyCodeRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else if (name === 'companyAdminName' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      companyCode: '',
      companyName: '',
      companyAdminName: '',
      companyAdminEmail: '',
      companyAdminPwd: ''
    });
    setFieldErrors({
      companyCode: '',
      companyName: '',
      companyAdminName: '',
      companyAdminEmail: '',
      companyAdminPwd: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.companyCode) {
      errors.companyCode = 'Company Code is required';
    }
    if (!formData.companyName) {
      errors.companyName = 'Company is required';
    }
    if (!formData.companyAdminName) {
      errors.companyAdminName = 'Admin Name is required';
    }
    if (!formData.companyAdminEmail) {
      errors.companyAdminEmail = 'Email Id is required';
    }
    if (!formData.companyAdminPwd) {
      errors.companyAdminPwd = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      console.log('DATA TO SAVE IS:', formData);

      axios
        .post(`${process.env.REACT_APP_API_URL}/api/commonmaster/company`, formData)
        .then((response) => {
          if (response.data.statusFlag === 'Error') {
            console.log('Response:', response.data);
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            showSuccessToast(response.data.paramObjectsMap.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('An error occurred while saving the country');
        });
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  return (
    <>
      <div>{/* <ToastContainer /> */}</div>
      <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
        <div className="row d-flex ml">
          <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
            <Tooltip title="Search" placement="top">
              <ButtonBase sx={{ borderRadius: '12px', marginRight: '10px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  ref={anchorRef}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <SearchIcon size="1.3rem" stroke={1.5} />
                </Avatar>
              </ButtonBase>
            </Tooltip>

            <Tooltip title="Clear" placement="top">
              {' '}
              <ButtonBase sx={{ borderRadius: '12px', marginRight: '10px' }} onClick={handleClear}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  ref={anchorRef}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <ClearIcon size="1.3rem" stroke={1.5} />
                </Avatar>
              </ButtonBase>
            </Tooltip>

            <Tooltip title="List View" placement="top">
              {' '}
              <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleView}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  ref={anchorRef}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <FormatListBulletedTwoToneIcon size="1.3rem" stroke={1.5} />
                </Avatar>
              </ButtonBase>
            </Tooltip>
            <Tooltip title="Save" placement="top">
              {' '}
              <ButtonBase sx={{ borderRadius: '12px', marginLeft: '10px' }} onClick={handleSave}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  ref={anchorRef}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <SaveIcon size="1.3rem" stroke={1.5} />
                </Avatar>
              </ButtonBase>
            </Tooltip>
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              // editCallback={editEmployee}
              blockEdit={true} // DISAPLE THE MODAL IF TRUE
              // toEdit={getCustomerById}
            />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyCode"
                  value={formData.companyCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyCode}
                  helperText={fieldErrors.companyCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyName}
                  helperText={fieldErrors.companyName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Admin Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminName"
                  value={formData.companyAdminName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminName}
                  helperText={fieldErrors.companyAdminName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Admin Email Id"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminEmail"
                  value={formData.companyAdminEmail}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminEmail}
                  helperText={fieldErrors.companyAdminEmail}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminPwd"
                  value={formData.companyAdminPwd}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminPwd}
                  helperText={fieldErrors.companyAdminPwd}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel value="start" control={<Checkbox />} label="Active" labelPlacement="end" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateCompany;
