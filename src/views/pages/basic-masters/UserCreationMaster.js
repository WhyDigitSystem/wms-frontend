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
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';

export const UserCreationMaster = () => {
  const [orgId, setOrgId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState('Karupu');

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeCode: '',
    reportingTo: '',
    userGroup: '',
    email: '',
    groupNo: '',
    pwdExpDays: '',
    password: '',
    active: true,
    isFirstTime: true,
    orgId: 1
  });
  const [value, setValue] = useState(0);
  const [branchTableData, setBranchTableData] = useState([
    {
      id: 1,
      branchCode: '',
      branch: ''
    }
  ]);
  const [roleTableData, setRoleTableData] = useState([{ id: 1, role: '', startDate: '', endDate: '' }]);
  const [clientTableData, setClientTableData] = useState([{ id: 1, customer: '', client: '' }]);
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      role: '',
      startDate: '',
      endDate: ''
    };
    setRoleTableData([...roleTableData, newRow]);
    setRoleTableDataErrors([...roleTableDataErrors, { role: '', startDate: '', endDate: '' }]);
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
  const handleAddRow2 = () => {
    const newRow = {
      id: Date.now(),
      customer: '',
      client: ''
    };
    setClientTableData([...clientTableData, newRow]);
    setClientTableErrors([
      ...clientTableErrors,
      {
        customer: '',
        client: ''
      }
    ]);
  };

  const [roleTableDataErrors, setRoleTableDataErrors] = useState([
    {
      role: '',
      startDate: '',
      endDate: ''
    }
  ]);
  const [branchTableErrors, setBranchTableErrors] = useState([
    {
      branchCode: '',
      branch: ''
    }
  ]);
  const [clientTableErrors, setClientTableErrors] = useState([
    {
      customer: '',
      client: ''
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    employeeName: '',
    employeeCode: '',
    reportingTo: '',
    userGroup: '',
    email: '',
    groupNo: '',
    pwdExpDays: '',
    active: '',
    isFirstTime: '',
    password: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'employeeName', header: 'Customer', size: 140 },
    { accessorKey: 'employeeCode', header: 'Employee Code', size: 140 },
    { accessorKey: 'reportingTo', header: 'Reporting To', size: 140 },
    { accessorKey: 'userGroup', header: 'UserGroup', size: 140 },
    { accessorKey: 'email', header: 'Email', size: 140 },
    { accessorKey: 'groupNo', header: 'Group No', size: 140 },
    { accessorKey: 'pwdExpDays', header: 'PWD Exp Days', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 },
    { accessorKey: 'isFirstTime', header: 'IsFirstTime', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    let errorMessage = '';

    switch (name) {
      case 'customer':
      case 'shortName':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only alphabetic characters are allowed';
        }
        break;
      case 'pan':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;
      case 'branchName':
        if (!branchNameRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters and @, _, -, * are allowed';
        }
        break;
      case 'mobile':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;
      case 'gst':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        } else if (value.length > 15) {
          errorMessage = 'Invalid Format';
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

  const handleActiveChange = (event) => {
    setFormData({
      ...formData,
      active: event.target.checked
    });
  };
  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      isFirstTime: event.target.checked
    });
  };

  const handleDeleteRow = (id) => {
    setRoleTableData(roleTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === roleTableData[roleTableData.length - 1].id) {
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
      employeeName: '',
      state: '',
      city: '',
      gst: '',
      active: true
    });
    setRoleTableData([{ id: 1, client: '', clientCode: '', clientType: '', fifoFife: '' }]);
    setBranchTableData([{ id: 1, branchCode: '', branchName: '' }]);
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
      employeeName: '',
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
    if (!formData.employeeName) {
      errors.employeeName = 'Employee Name is required';
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
      errors.gst = 'Invalid GST Format';
    }
    if (!formData.mobile) {
      errors.mobile = 'mobile is required';
    } else if (formData.mobile.length < 10) {
      errors.mobile = 'Invalid Mobile Format';
    }
    if (formData.pan.length < 10) {
      errors.pan = 'Invalid PAN Format';
    }

    let roleTableDataValid = true;
    const newTableErrors = roleTableData.map((row) => {
      const rowErrors = {};
      if (!row.client) {
        rowErrors.client = 'Client is required';
        roleTableDataValid = false;
      }
      if (!row.clientCode) {
        rowErrors.clientCode = 'Client Code is required';
        roleTableDataValid = false;
      }
      if (!row.clientType) {
        rowErrors.clientType = 'Client Type is required';
        roleTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);

    setRoleTableDataErrors(newTableErrors);

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
      setIsLoading(true);
      const clientVo = roleTableData.map((row) => ({
        client: row.client,
        clientCode: row.clientCode,
        clientType: row.clientType,
        fifoFife: row.fifoFife
      }));
      const branchVo = branchTableData.map((row) => ({
        client: row.branchCode,
        clientCode: row.branchName
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        customer: formData.customer,
        shortName: formData.shortName,
        pan: formData.pan,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        gstReg: formData.gstReg,
        email: formData.email,
        groupOf: formData.groupOf,
        tanNo: formData.tanNo,
        address: formData.address,
        employeeName: formData.employeeName,
        state: formData.state,
        city: formData.city,
        gst: formData.gst,
        clientVo: clientVo,
        branchVo: branchVo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/customer`, formData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' Customer Updated Successfully' : 'Customer created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Customer creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Customer creation failed');
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
      employeeName: '',
      state: '',
      city: '',
      gst: '',
      active: true
    });
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.employeeName}>
                  <InputLabel id="employeeName-label">Employee Name</InputLabel>
                  <Select
                    labelId="employeeName-label"
                    label="EmployeeName"
                    value={formData.employeeName}
                    onChange={handleInputChange}
                    name="employeeName"
                  >
                    <MenuItem value="Justin">Justin</MenuItem>
                    <MenuItem value="Mani">Mani</MenuItem>
                  </Select>
                  {fieldErrors.employeeName && <FormHelperText>{fieldErrors.employeeName}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="EmployeeCode"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.employeeCode}
                  helperText={fieldErrors.employeeCode}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Reporting To"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="reportingTo"
                  value={formData.reportingTo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.reportingTo}
                  helperText={fieldErrors.reportingTo}
                />
              </div>

              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.userGroup}>
                  <InputLabel id="userGroup-label">User Group</InputLabel>
                  <Select
                    labelId="userGroup-label"
                    label="UserGroup"
                    value={formData.userGroup}
                    onChange={handleInputChange}
                    name="userGroup"
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="DEVELOPER">DEVELOPER</MenuItem>
                  </Select>
                  {fieldErrors.userGroup && <FormHelperText>{fieldErrors.userGroup}</FormHelperText>}
                </FormControl>
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
                  label="Group No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="groupNo"
                  value={formData.groupNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.groupNo}
                  helperText={fieldErrors.groupNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="PWDExpDays"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="pwdExpDays"
                  value={formData.pwdExpDays}
                  onChange={handleInputChange}
                  error={!!fieldErrors.pwdExpDays}
                  helperText={fieldErrors.pwdExpDays}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password}
                />
              </div>

              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleActiveChange} name="active" color="primary" />}
                  label="Active"
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.isFirstTime} onChange={handleCheckboxChange} name="isFirstTime" color="primary" />}
                  label="Is First Time"
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
                  <Tab value={0} label="Roles" />
                  <Tab value={1} label="Branch Accessible" />
                  <Tab value={2} label="Client Access" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Role</th>
                                  <th className="px-2 py-2 text-white text-center">Start Date</th>
                                  <th className="px-2 py-2 text-white text-center">End Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {roleTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      {/* <input type="text" value={`${index + 1}`} readOnly style={{ width: '100%' }} /> */}
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.role}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, role: value } : r)));
                                          setRoleTableDataErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], role: !value ? 'Role is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={roleTableDataErrors[index]?.role ? 'error form-control' : 'form-control'}
                                        // //style={{ marginBottom: '10px' }}
                                      />
                                      {roleTableDataErrors[index]?.role && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {roleTableDataErrors[index].role}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.startDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, startDate: value } : r)));
                                          setRoleTableDataErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], startDate: !value ? 'Start Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={roleTableDataErrors[index]?.startDate ? 'error form-control' : 'form-control'}
                                      />
                                      {roleTableDataErrors[index]?.startDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {roleTableDataErrors[index].startDate}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.endDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, endDate: value } : r)));
                                          setRoleTableDataErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], endDate: !value ? 'End Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={roleTableDataErrors[index]?.endDate ? 'error form-control' : 'form-control'}
                                      />
                                      {roleTableDataErrors[index]?.endDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {roleTableDataErrors[index].endDate}
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
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow1} />
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6">
                          <div className="table-responsive">
                            <table className="table table-bordered table-responsive">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Branch Code
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Branch</th>
                                </tr>
                              </thead>
                              <tbody>
                                {branchTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow1(row.id)} />
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
                {value === 2 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow2} />
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-6">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Customer</th>
                                  <th className="px-2 py-2 text-white text-center">Client</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clientTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      {/* <input type="text" value={`${index + 1}`} readOnly style={{ width: '100%' }} /> */}
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.customer}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, customer: value } : r)));
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], customer: !value ? 'Customer In is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={clientTableErrors[index]?.customer ? 'error form-control' : 'form-control'}
                                        // //style={{ marginBottom: '10px' }}
                                      />
                                      {clientTableErrors[index]?.customer && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {clientTableErrors[index].customer}
                                        </div>
                                      )}
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
                                            newErrors[index] = { ...newErrors[index], client: !value ? 'Client is required' : '' };
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
      <ToastContainer />
    </>
  );
};
export default UserCreationMaster;
