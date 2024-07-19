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

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';

const Branch = () => {
  const [orgId, setOrgId] = useState('1');
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    branchCode: '',
    branchName: '',
    branchHead: '',
    mobile: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    active: '',
    orgId: 1,
    createdby: 'Karupu'
  });

  const [fieldErrors, setFieldErrors] = useState({
    companyName: '',
    branchCode: '',
    branchName: '',
    branchHead: '',
    mobile: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
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
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    if (name === 'branchCode' && !branchCodeRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphanumeric characters and @, _, -, /, are allowed' });
    } else if (name === 'branchHead' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphabetic characters are allowed' });
    } else if (name === 'branchName' && !branchNameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphanumeric characters and @, _, -, * are allowed' });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      companyName: '',
      branchCode: '',
      branchName: '',
      branchHead: '',
      mobile: '',
      email: '',
      address: '',
      country: ''
    });
    setFieldErrors({
      companyName: '',
      branchCode: '',
      branchName: '',
      branchHead: '',
      mobile: '',
      email: '',
      address: '',
      country: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.branchCode) {
      errors.branchCode = 'Company Code is required';
    }
    if (!formData.branchName) {
      errors.branchName = 'Company is required';
    }
    if (!formData.branchHead) {
      errors.branchHead = 'Admin Name is required';
    }
    if (!formData.mobile) {
      errors.mobile = 'Email Id is required';
    }
    if (!formData.email) {
      errors.email = 'Password is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/country`, formData)
        .then((response) => {
          if (response.data.status === true) {
            showToast('success', editId ? ' Branch Updated Successfully' : 'Branch created successfully');
            handleClear();
            setFormData({
              country: '',
              state: '',
              city: '',
              countryCode: ''
            });
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Branch creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Branch creation failed');
          setIsLoading(false);
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
            <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
            <ActionButton title="Clear" icon={ClearIcon} onClick={handleClear} />
            <ActionButton title="List View" icon={FormatListBulletedTwoToneIcon} onClick={handleView} />
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={() => handleSave()} margin="0 10px 0 10px" />
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
                  label="Company"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyName"
                  value={formData.companyName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Branch Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="branchCode"
                  value={formData.branchCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.branchCode}
                  helperText={fieldErrors.branchCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Branch Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.branchName}
                  helperText={fieldErrors.branchName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Branch Head"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="branchHead"
                  value={formData.branchHead}
                  onChange={handleInputChange}
                  error={!!fieldErrors.branchHead}
                  helperText={fieldErrors.branchHead}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Mobile"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  error={!!fieldErrors.mobile}
                  helperText={fieldErrors.mobile}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Email ID"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!fieldErrors.email}
                  helperText={fieldErrors.email}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!fieldErrors.address}
                  helperText={fieldErrors.address}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">Country</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.country}
                    label="Country"
                    name="country"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select Country</em>
                    </MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">State</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.state}
                    label="State"
                    name="state"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select State</em>
                    </MenuItem>
                    <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                    <MenuItem value="Karnataka">Karnataka</MenuItem>
                    <MenuItem value="Kerala">Kerala</MenuItem>
                    <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small-label">City</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.city}
                    label="city"
                    name="city"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Select City</em>
                    </MenuItem>
                    <MenuItem value="Madurai">Madurai</MenuItem>
                    <MenuItem value="Dindigul">Dindigul</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                  </Select>
                </FormControl>
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

export default Branch;
