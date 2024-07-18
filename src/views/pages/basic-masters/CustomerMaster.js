import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { showErrorToast, showSuccessToast } from 'utils/toastUtils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

export const CustomerMaster = () => {
  const [orgId, setOrgId] = useState('1');
  const [formData, setFormData] = useState({
    customer: '',
    shortName: '',
    pan: '',
    contactPerson: '',
    mobile: '',
    gstReg: '',
    email: '',
    groupOf: '',
    tanNo: '',
    address: '',
    country: '',
    state: '',
    city: '',
    gst: '',
    active: false,
    orgId: 1,
    createdby: 'Karupu'
  });
  const [value, setValue] = useState(0);
  const [branchTableData, setBranchTableData] = useState([
    {
      id: 1,
      branchCode: '',
      branch: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      client: '',
      clientCode: '',
      clientType: '',
      fifoFife: ''
    };
    setClientTableData([...clientTableData, newRow]);
    setClientTableErrors([...clientTableErrors, { client: '', clientCode: '', clientType: '', fifoFife: '' }]);
  };
  const handleAddRow1 = () => {
    const newRow = {
      id: Date.now(),
      branchCode: '',
      branch: ''
    };
    setBranchTableData([...branchTableData, newRow]);
    setBranchTableErrors([
      ...branchTableErrors,
      {
        branchCode: '',
        branch: ''
      }
    ]);
  };

  const [clientTableErrors, setClientTableErrors] = useState([
    {
      client: '',
      clientCode: '',
      clientType: '',
      fifoFife: ''
    }
  ]);
  const [branchTableErrors, setBranchTableErrors] = useState([
    {
      branchCode: '',
      branch: ''
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    customer: '',
    shortName: '',
    pan: '',
    contactPerson: '',
    mobile: '',
    gstReg: '',
    email: '',
    groupOf: '',
    tanNo: '',
    address: '',
    country: '',
    state: '',
    city: '',
    gst: ''
  });
  const [listView, setListView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const listViewColumns = [
    { accessorKey: 'customer', header: 'Customer', size: 140 },
    { accessorKey: 'shortName', header: 'Short Name', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);
  const [clientTableData, setClientTableData] = useState([{ id: 1, client: '', clientCode: '', clientType: '', fifoFife: '' }]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const nameRegex = /^[A-Za-z ]*$/;
  //   const alphaNumericRegex = /^[A-Za-z0-9]*$/;
  //   const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
  //   const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

  //   if (name === 'customer' && !nameRegex.test(value)) {
  //     setFieldErrors({ ...fieldErrors, [name]: 'Only alphanumeric characters are allowed' });
  //   } else if (name === 'shortName' && !nameRegex.test(value)) {
  //     setFieldErrors({ ...fieldErrors, [name]: 'Only alphanumeric characters are allowed' });
  //   } else if (name === 'pan' && !alphaNumericRegex.test(value)) {
  //     setFieldErrors({ ...fieldErrors, [name]: 'Only alphabetic characters are allowed' });
  //   } else if (name === 'pan' && value.length > 10) {
  //     setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
  //   } else if (name === 'branchName' && !branchNameRegex.test(value)) {
  //     setFieldErrors({ ...fieldErrors, [name]: 'Only alphanumeric characters and @, _, -, * are allowed' });
  //   }
  //   // else if (type === 'checkbox') {
  //   //   setFormData({ ...formData, [name]: checked });
  //   // }
  //   else {
  //     setFormData({ ...formData, [name]: value.toUpperCase() });
  //     setFieldErrors({ ...fieldErrors, [name]: '' });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const validationRules = {
      customer: {
        regex: /^[A-Za-z ]*$/,
        errorMessage: 'Only alphabetic characters are allowed'
      },
      shortName: {
        regex: /^[A-Za-z ]*$/,
        errorMessage: 'Only alphabetic characters are allowed'
      },
      pan: {
        regex: /^[A-Za-z0-9]*$/,
        errorMessage: 'Only alphanumeric characters are allowed',
        lengthCheck: (value) => value.length > 10,
        lengthErrorMessage: 'PAN must be exactly 10 characters'
      },
      contactPerson: {
        regex: /^[A-Za-z ]*$/,
        errorMessage: 'Only alphabetic characters are allowed'
      }
    };

    const rule = validationRules[name];

    if (rule) {
      if (!rule.regex.test(value)) {
        setFieldErrors({ ...fieldErrors, [name]: rule.errorMessage });
      } else if (rule.lengthCheck && rule.lengthCheck(value)) {
        setFieldErrors({ ...fieldErrors, [name]: rule.lengthErrorMessage });
      } else {
        const { [name]: removedError, ...rest } = fieldErrors;
        setFormData({ ...formData, [name]: value.toUpperCase() });
        setFieldErrors(rest);
      }
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    }
  };

  const handleDeleteRow = (id) => {
    setClientTableData(clientTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === clientTableData[clientTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };
  const handleDeleteRow1 = (id) => {
    setBranchTableData(branchTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown1 = (e, row) => {
    if (e.key === 'Tab' && row.id === branchTableData[branchTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow1();
    }
  };

  const handleClear = () => {
    setFormData({
      customer: '',
      shortName: '',
      pan: '',
      contactPerson: '',
      mobile: '',
      gstReg: '',
      email: '',
      groupOf: '',
      tanNo: '',
      address: '',
      country: '',
      state: '',
      city: '',
      gst: '',
      active: false
    });
    setFieldErrors({
      customer: '',
      shortName: '',
      pan: '',
      contactPerson: '',
      mobile: '',
      gstReg: '',
      email: '',
      groupOf: '',
      tanNo: '',
      address: '',
      country: '',
      state: '',
      city: '',
      gst: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.customer) {
      errors.customer = 'Customer is required';
    }
    if (!formData.shortName) {
      errors.shortName = 'Short Name is required';
    }
    if (!formData.contactPerson) {
      errors.contactPerson = 'Contact Person is required';
    }
    if (!formData.email) {
      errors.email = 'Email ID is required';
    }
    if (!formData.groupOf) {
      errors.groupOf = 'Group Of is required';
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
    }

    let clientTableDataValid = true;
    const newTableErrors = clientTableData.map((row) => {
      const rowErrors = {};
      if (!row.client) {
        rowErrors.client = 'Client is required';
        clientTableDataValid = false;
      }
      if (!row.clientCode) {
        rowErrors.clientCode = 'Client Code is required';
        clientTableDataValid = false;
      }
      if (!row.clientType) {
        rowErrors.clientType = 'Client Type is required';
        clientTableDataValid = false;
      }
      if (!row.fifoFife) {
        rowErrors.fifoFife = 'FIFO / FIFE is required';
        clientTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);

    setClientTableErrors(newTableErrors);

    let branchTableDataValid = true;
    const newTableErrors1 = branchTableData.map((row) => {
      const rowErrors = {};
      if (!row.branchCode) {
        rowErrors.branchCode = 'Branch Code is required';
        branchTableDataValid = false;
      }
      return rowErrors;
    });
    // setFieldErrors(errors);

    setBranchTableErrors(newTableErrors1);

    if (Object.keys(errors).length === 0) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/customer`, formData)
        .then((response) => {
          if (response.data.statusFlag === 'Error') {
            console.log('Response:', response.data);
            showErrorToast(response.data.paramObjectsMap.errorMessage);
          } else {
            setFormData({
              customer: '',
              shortName: '',
              pan: '',
              contactPerson: '',
              mobile: '',
              gstReg: '',
              email: '',
              groupOf: '',
              tanNo: '',
              address: '',
              country: '',
              state: '',
              city: '',
              gst: '',
              active: false
            });
            showSuccessToast(response.data.paramObjectsMap.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('An error occurred while saving the customer');
        });
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClose = () => {
    setEditMode(false);
    setFormData({
      customer: '',
      shortName: '',
      pan: '',
      contactPerson: '',
      mobile: '',
      gstReg: '',
      email: '',
      groupOf: '',
      tanNo: '',
      address: '',
      country: '',
      state: '',
      city: '',
      gst: '',
      active: false
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 50,
        muiTableHeadCellProps: {
          align: 'center'
        },
        muiTableBodyCellProps: {
          align: 'center'
        },
        enableSorting: false,
        enableColumnOrdering: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <div>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        )
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        size: 50,
        muiTableHeadCellProps: {
          align: 'center'
        },
        muiTableBodyCellProps: {
          align: 'center'
        }
      },
      {
        accessorKey: 'shortName',
        header: 'Short Name',
        size: 50,
        muiTableHeadCellProps: {
          align: 'center'
        },
        muiTableBodyCellProps: {
          align: 'center'
        }
      }
    ],
    []
  );

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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Customer"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="customer"
                  value={formData.customer}
                  onChange={handleInputChange}
                  error={!!fieldErrors.customer}
                  helperText={fieldErrors.customer}
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
              </div>
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
                  label="GST Registration"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="gstReg"
                  value={formData.gstReg}
                  onChange={handleInputChange}
                  error={!!fieldErrors.gstReg}
                  helperText={fieldErrors.gstReg}
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
                  <Select labelId="country-label" label="Country" value={formData.country} onChange={handleInputChange} name="country">
                    <MenuItem value="INDIA">INDIA</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                  </Select>
                  {fieldErrors.country && <FormHelperText>{fieldErrors.country}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.state}>
                  <InputLabel id="state-label">State</InputLabel>
                  <Select labelId="state-label" label="State" value={formData.state} onChange={handleInputChange} name="state">
                    <MenuItem value="TAMILNADU">TAMILNADU</MenuItem>
                    <MenuItem value="KARNATAKA">KARNATAKA</MenuItem>
                    <MenuItem value="KERALA">KERALA</MenuItem>
                    <MenuItem value="ANDRAPRADESH">ANDRAPRADESH</MenuItem>
                  </Select>
                  {fieldErrors.state && <FormHelperText>{fieldErrors.state}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.state}>
                  <InputLabel id="city-label">City</InputLabel>
                  <Select labelId="city-label" label="City" value={formData.city} onChange={handleInputChange} name="city">
                    <MenuItem value="TAMILNADU">TAMILNADU</MenuItem>
                    <MenuItem value="KARNATAKA">KARNATAKA</MenuItem>
                    <MenuItem value="KERALA">KERALA</MenuItem>
                    <MenuItem value="ANDRAPRADESH">ANDRAPRADESH</MenuItem>
                  </Select>
                  {fieldErrors.city && <FormHelperText>{fieldErrors.city}</FormHelperText>}
                </FormControl>
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
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleInputChange} name="active" color="primary" />}
                  label="Active"
                />
              </div>
            </div>
            <div className="row mt-2">
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value={0} label="Client" />
                  <Tab value={1} label="Branch" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <Tooltip title="Add" placement="top">
                          <ButtonBase sx={{ borderRadius: '12px', marginLeft: '10px' }} onClick={handleAddRow}>
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
                              <AddIcon size="1.3rem" stroke={1.5} />
                            </Avatar>
                          </ButtonBase>
                        </Tooltip>
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center">Action</th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Client</th>
                                  <th className="px-2 py-2 text-white text-center">Client Code</th>
                                  <th className="px-2 py-2 text-white text-center">Client Type</th>
                                  <th className="px-2 py-2 text-white text-center">FIFO / FIFE</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clientTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <Tooltip title="Delete" placement="top">
                                        <ButtonBase
                                          sx={{ borderRadius: '12px', marginLeft: '4px' }}
                                          onClick={() => handleDeleteRow(row.id)}
                                        >
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
                                            <DeleteIcon size="1.3rem" stroke={1.5} />
                                          </Avatar>
                                        </ButtonBase>
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      {/* <input type="text" value={`${index + 1}`} readOnly style={{ width: '100%' }} /> */}
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.client}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, client: value } : r)));
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], client: !value ? 'Gst In is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={clientTableErrors[index]?.client ? 'error form-control' : 'form-control'}
                                        // //style={{ marginBottom: '10px' }}
                                      />
                                      {clientTableErrors[index]?.client && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {clientTableErrors[index].client}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.clientCode}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, clientCode: value } : r))
                                          );
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], clientCode: !value ? 'clientCode is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={clientTableErrors[index]?.clientCode ? 'error form-control' : 'form-control'}
                                      />
                                      {clientTableErrors[index]?.clientCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {clientTableErrors[index].clientCode}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.clientType}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, clientType: value } : r))
                                          );
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              clientType: !value ? 'State Code is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={clientTableErrors[index]?.clientType ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Fixed">Fixed</option>
                                        <option value="Open">Open</option>
                                      </select>
                                      {clientTableErrors[index]?.clientType && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {clientTableErrors[index].clientType}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.fifoFife}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, fifoFife: value } : r)));
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              fifoFife: !value ? 'FIFE FIFO is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={clientTableErrors[index]?.fifoFife ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="FIFO">FIFO</option>
                                        <option value="FIFE">FIFE</option>
                                      </select>
                                      {clientTableErrors[index]?.fifoFife && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {clientTableErrors[index].fifoFife}
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {value === 1 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <Tooltip title="Add" placement="top">
                          <ButtonBase sx={{ borderRadius: '12px', marginLeft: '10px' }} onClick={handleAddRow1}>
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
                              <AddIcon size="1.3rem" stroke={1.5} />
                            </Avatar>
                          </ButtonBase>
                        </Tooltip>
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered table-responsive">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center">Action</th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Branch Code</th>
                                  <th className="px-2 py-2 text-white text-center">Branch</th>
                                </tr>
                              </thead>
                              <tbody>
                                {branchTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <Tooltip title="Delete" placement="top">
                                        <ButtonBase
                                          sx={{ borderRadius: '12px', marginLeft: '4px' }}
                                          onClick={() => handleDeleteRow1(row.id)}
                                        >
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
                                            <DeleteIcon size="1.3rem" stroke={1.5} />
                                          </Avatar>
                                        </ButtonBase>
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      {/* <input type="text" value={`${index + 1}`} readOnly style={{ width: '100%' }} /> */}
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.branchCode}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBranchTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, branchCode: value } : r))
                                          );
                                          setBranchTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              branchCode: !value ? 'Branch Code is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown1(e, row)}
                                        className={branchTableErrors[index]?.branchCode ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Fixed">MAA</option>
                                        <option value="Open">KA</option>
                                      </select>
                                      {branchTableErrors[index]?.branchCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {branchTableErrors[index].branchCode}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">{row.branch}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Box>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CustomerMaster;
