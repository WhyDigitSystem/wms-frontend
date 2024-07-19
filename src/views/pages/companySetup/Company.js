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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';

const Company = () => {
  const [orgId, setOrgId] = useState('1');
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyCode: '',
    companyName: '',
    ceo: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    gst: '',
    website: '',
    active: '',
    orgId: 1,
    createdby: 'Karupu'
  });

  const [fieldErrors, setFieldErrors] = useState({
    companyCode: '',
    ceo: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    gst: '',
    website: '',
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
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;

    if (name === 'ceo' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphabetic characters are allowed' });
    } else if (name === 'pincode' && !numericRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only numeric are allowed' });
    } else if (name === 'pincode' && value.length > 6) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only 6 Digits are allowed' });
    } else if (name === 'gst' && !alphanumericRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Special Characters are not allowed' });
    } else if (name === 'gst' && value.length > 15) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only 15 Digits only allowed' });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      companyCode: '',
      ceo: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      gst: '',
      website: ''
    });
    setFieldErrors({
      companyCode: '',
      companyName: '',
      ceo: '',
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      gst: '',
      website: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.companyCode) {
      errors.companyCode = 'Company Code is required';
    }
    if (!formData.ceo) {
      errors.ceo = 'CEO is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.state) {
      errors.state = 'State is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.gst) {
      errors.gst = 'GST is required';
    } else if (formData.gst.length < 15) {
      errors.gst = 'Invalid GST No';
    }
    if (formData.pincode.length < 6 && formData.pincode.length >= 1) {
      errors.pincode = 'Invalid Pincode';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/country`, formData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);

            showToast('success', ' Company updated Successfully');
            handleClear();
            setIsLoading(false);
            setFormData({
              country: '',
              countryCode: ''
            });
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Country creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Company updation failed');

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
                  label="Company Name"
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
                  label="CEO"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="ceo"
                  value={formData.ceo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.ceo}
                  helperText={fieldErrors.ceo}
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
                    error={!!fieldErrors.country}
                    helperText={fieldErrors.country}
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
                    error={!!fieldErrors.state}
                    helperText={fieldErrors.state}
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
                    error={!!fieldErrors.city}
                    helperText={fieldErrors.city}
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
                <TextField
                  label="Pincode"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="pincode"
                  value={formData.pincode}
                  maxLength={6}
                  onChange={handleInputChange}
                  error={!!fieldErrors.pincode}
                  helperText={fieldErrors.pincode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="GST"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  error={!!fieldErrors.gst}
                  helperText={fieldErrors.gst}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Official Website"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  error={!!fieldErrors.website}
                  helperText={fieldErrors.website}
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

export default Company;
