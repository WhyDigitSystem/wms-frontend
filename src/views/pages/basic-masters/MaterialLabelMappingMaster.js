import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ActionButton from 'utils/ActionButton';
import ToastComponent, { showToast } from 'utils/toast-component';
import 'react-datepicker/dist/react-datepicker.css';
import apiCalls from 'apicall';

export const MaterialLabelMappingMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    supplierName: '',
    shortName: '',
    supplierType: '',
    pan: '',
    tanNo: '',
    contactPerson: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    city: '',
    controlBranch: '',
    pincode: '',
    email: '',
    gst: '',
    eccNo: '',
    active: true
  });
  const [value, setValue] = useState(0);

  const [fieldErrors, setFieldErrors] = useState({
    supplierName: '',
    shortName: '',
    supplierType: '',
    pan: '',
    tanNo: '',
    contactPerson: '',
    mobile: '',
    address: '',
    country: '',
    state: '',
    city: '',
    controlBranch: '',
    pincode: '',
    email: '',
    gst: '',
    eccNo: '',
    active: true
  });
  const listViewColumns = [
    { accessorKey: 'supplierName', header: 'Supplier Name', size: 140 },
    { accessorKey: 'shortName', header: 'Part Desc', size: 140 },
    { accessorKey: 'supplierType', header: 'Supplier Type', size: 140 },
    { accessorKey: 'contactPerson', header: 'contact Person', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([
    {
      id: 1,
      supplierName: 'supplierName1',
      shortName: 'shortName1',
      supplierType: 'supplierType1',
      contactPerson: 'contactPerson1',
      active: 'Active'
    },
    {
      id: 2,
      partNo: 'partNo2',
      shortName: 'shortName2',
      supplierType: 'supplierType2',
      contactPerson: 'contactPerson2',
      active: 'Active'
    }
  ]);
  useEffect(() => {
    console.log('LISTVIEW FIELD CURRENT VALUE IS', listView);
    // getAllSuppliers();
  }, []);

  const getAllSuppliers = async () => {
    try {
      const result = await apiCalls('get', `getAllSuppliersByorgId?${orgId}`);
      setListViewData(result);
      console.log('TEST LISTVIEW DATA', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  const getSupplierById = async () => {
    try {
      const result = await apiCalls('get', `getSupplierByorgId?${orgId}`);
      setListView(false);
      setFormData({
        supplierName: result.supplierName,
        shortName: result.shortName,
        supplierType: result.supplierType,
        category: result.category,
        pan: result.pan,
        tanNo: result.tanNo,
        contactPerson: result.contactPerson,
        mobile: result.mobile,
        address: result.address,
        country: result.country,
        state: result.state,
        city: result.city,
        controlBranch: result.controlBranch,
        pincode: result.pincode,
        email: result.email,
        gst: result.gst,
        eccNo: result.eccNo,
        active: result.active === 'Active' ? true : false
      });
      console.log('TEST LISTVIEW DATA', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const specialCharsRegex = /^[A-Za-z0-9@_\-*]*$/;
    const nameRegex = /^[A-Za-z ]*$/;

    let errorMessage = '';

    switch (name) {
      case 'supplierName':
      case 'shortName':
      case 'contactPerson':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only Alphabet are allowed';
        }
        break;
      case 'mobile':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only Numbers are allowed';
        } else if (value.length > 10) {
          errorMessage = 'max Length is 10';
        }
        break;
      case 'pan':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only AlphaNumeric are allowed';
        } else if (value.length > 10) {
          errorMessage = 'max Length is 10';
        }
        break;
      case 'pincode':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only AlphaNumeric are allowed';
        } else if (value.length > 6) {
          errorMessage = 'max Length is 6';
        }
        break;
      case 'gst':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only AlphaNumeric are allowed';
        } else if (value.length > 15) {
          errorMessage = 'max Length is 15';
        }
      case 'eccNo':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only AlphaNumeric are allowed';
        } else if (value.length > 15) {
          errorMessage = 'max Length is 15';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      const updatedValue = name === 'email' ? value : value.toUpperCase();
      setFormData({ ...formData, [name]: updatedValue });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      supplierName: '',
      shortName: '',
      supplierType: '',
      pan: '',
      tanNo: '',
      contactPerson: '',
      mobile: '',
      address: '',
      country: '',
      state: '',
      city: '',
      controlBranch: '',
      pincode: '',
      email: '',
      gst: '',
      eccNo: '',
      active: true
    });

    setFieldErrors({
      supplierName: '',
      shortName: '',
      supplierType: '',
      pan: '',
      tanNo: '',
      contactPerson: '',
      mobile: '',
      address: '',
      country: '',
      state: '',
      city: '',
      controlBranch: '',
      pincode: '',
      email: '',
      gst: '',
      eccNo: '',
      active: true
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.supplierName) {
      errors.supplierName = 'Supplier Name is required';
    }
    if (!formData.shortName) {
      errors.shortName = 'Short Name is required';
    }
    if (formData.gst.length < 15) {
      errors.gst = 'Invalid GST Format';
    }
    if (formData.pan.length < 10) {
      errors.pan = 'Invalid PAN Format';
    }
    if (formData.mobile.length < 10) {
      errors.mobile = 'Invalid Mobile Format';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        supplierName: formData.supplierName,
        shortName: formData.shortName,
        supplierType: formData.supplierType,
        pan: formData.pan,
        tanNo: formData.tanNo,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        controlBranch: formData.controlBranch,
        pincode: formData.pincode,
        email: formData.email,
        gst: formData.gst,
        eccNo: formData.eccNo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/supplier`, saveFormData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' Supplier Updated Successfully' : 'Supplier created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Supplier creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Supplier creation failed');
          setIsLoading(false);
        });
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClose = () => {
    setFormData({
      supplierName: '',
      shortName: '',
      supplierType: '',
      pan: '',
      tanNo: '',
      contactPerson: '',
      mobile: '',
      address: '',
      country: '',
      state: '',
      city: '',
      controlBranch: '',
      pincode: '',
      email: '',
      gst: '',
      eccNo: '',
      active: true
    });
  };
  return (
    <>
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Supplier Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.supplierName}
                  helperText={fieldErrors.supplierName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Short Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.shortName}
                  helperText={fieldErrors.shortName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.supplierType}>
                  <InputLabel id="supplierType-label">Supplier Type</InputLabel>
                  <Select
                    labelId="supplierType-label"
                    id="supplierType"
                    name="supplierType"
                    label="Supplier Type"
                    value={formData.supplierType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="VENDOR">VENDOR</MenuItem>
                    <MenuItem value="SUB CONTRACTOR">SUB CONTRACTOR</MenuItem>
                  </Select>
                  {fieldErrors.supplierType && <FormHelperText error>{fieldErrors.supplierType}</FormHelperText>}
                </FormControl>
              </div>
              {/* <div className="col-md-3 mb-3">
                <TextField
                  label="Group Of"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="groupOf"
                  value={formData.groupOf}
                  onChange={handleInputChange}
                  error={!!fieldErrors.groupOf}
                  helperText={fieldErrors.groupOf}
                />
              </div> */}
              {/* <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.category}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    label="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="CATEGORY 1">CATEGORY 1</MenuItem>
                    <MenuItem value="CATEGORY 2">CATEGORY 2</MenuItem>
                  </Select>
                  {fieldErrors.category && <FormHelperText error>{fieldErrors.category}</FormHelperText>}
                </FormControl>
              </div> */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="PAN"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  error={!!fieldErrors.pan}
                  helperText={fieldErrors.pan}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="TAN No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="tanNo"
                  value={formData.tanNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.tanNo}
                  helperText={fieldErrors.tanNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Contact Person"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  error={!!fieldErrors.contactPerson}
                  helperText={fieldErrors.contactPerson}
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.country}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="COUNTRY 1">COUNTRY 1</MenuItem>
                    <MenuItem value="COUNTRY 2">COUNTRY 2</MenuItem>
                  </Select>
                  {fieldErrors.country && <FormHelperText error>{fieldErrors.country}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.state}>
                  <InputLabel id="state-label">State</InputLabel>
                  <Select labelId="state-label" id="state" name="state" label="State" value={formData.state} onChange={handleInputChange}>
                    <MenuItem value="STATE 1">STATE 1</MenuItem>
                    <MenuItem value="STATE 2">STATE 2</MenuItem>
                  </Select>
                  {fieldErrors.state && <FormHelperText error>{fieldErrors.state}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.city}>
                  <InputLabel id="city-label">City</InputLabel>
                  <Select labelId="city-label" id="city" name="city" label="City" value={formData.city} onChange={handleInputChange}>
                    <MenuItem value="CITY 1">CITY 1</MenuItem>
                    <MenuItem value="CITY 2">CITY 2</MenuItem>
                  </Select>
                  {fieldErrors.city && <FormHelperText error>{fieldErrors.city}</FormHelperText>}
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
                  onChange={handleInputChange}
                  error={!!fieldErrors.pincode}
                  helperText={fieldErrors.pincode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Email"
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.city}>
                  <InputLabel id="controlBranch-label">Control Branch</InputLabel>
                  <Select
                    labelId="controlBranch-label"
                    id="controlBranch"
                    name="controlBranch"
                    label="Control Branch"
                    value={formData.controlBranch}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="CONTROL BRANCH 1">CONTROL BRANCH 1</MenuItem>
                    <MenuItem value="ALL">ALL</MenuItem>
                  </Select>
                  {fieldErrors.controlBranch && <FormHelperText error>{fieldErrors.controlBranch}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="ECC No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="eccNo"
                  value={formData.eccNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.eccNo}
                  helperText={fieldErrors.eccNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.active}
                      onChange={() => setFormData({ ...formData, active: !formData.active })}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </div>
            </div>
            {/* <p className="mt-2 fw-bold">Range Details</p> */}
            {/* <div className="row mt-2">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Range"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="range"
                  value={formData.range}
                  onChange={handleInputChange}
                  error={!!fieldErrors.range}
                  helperText={fieldErrors.range}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Range Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="rangeAddress"
                  value={formData.rangeAddress}
                  onChange={handleInputChange}
                  error={!!fieldErrors.rangeAddress}
                  helperText={fieldErrors.rangeAddress}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Pincode 1"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="pincode1"
                  value={formData.pincode1}
                  onChange={handleInputChange}
                  error={!!fieldErrors.pincode1}
                  helperText={fieldErrors.pincode1}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Division"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  error={!!fieldErrors.division}
                  helperText={fieldErrors.division}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Commissionerate"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="commissionerate"
                  value={formData.commissionerate}
                  onChange={handleInputChange}
                  error={!!fieldErrors.commissionerate}
                  helperText={fieldErrors.commissionerate}
                />
              </div>
            </div> */}
          </>
        )}
      </div>
      <ToastComponent />
    </>
  );
};

export default MaterialLabelMappingMaster;
