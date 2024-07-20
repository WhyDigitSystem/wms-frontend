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
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';

export const WarehouseMaster = () => {
  const [orgId, setOrgId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState('Karupu');

  const [formData, setFormData] = useState({
    branch: 'Chennai-UILP',
    warehouse: '',
    active: true,
    orgId: 1
  });
  const [value, setValue] = useState(0);
  const [branchTableData, setBranchTableData] = useState([
    {
      id: 1,
      customerBranchCode: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      client: '',
      clientCode: ''
    };
    setClientTableData([...clientTableData, newRow]);
    setClientTableErrors([...clientTableErrors, { client: '', clientCode: '' }]);
  };
  const handleAddRow1 = () => {
    const newRow = {
      id: Date.now(),
      customerBranchCode: ''
    };
    setBranchTableData([...branchTableData, newRow]);
    setBranchTableErrors([
      ...branchTableErrors,
      {
        customerBranchCode: ''
      }
    ]);
  };

  const [clientTableErrors, setClientTableErrors] = useState([
    {
      client: '',
      clientCode: ''
    }
  ]);
  const [branchTableErrors, setBranchTableErrors] = useState([
    {
      customerBranchCode: ''
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    warehouse: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'branch', header: 'Branch', size: 140 },
    { accessorKey: 'warehouse', header: 'Warehouse', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);
  const [clientTableData, setClientTableData] = useState([{ id: 1, client: '', clientCode: '' }]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let errorMessage = '';

    switch (name) {
      case 'branch':
      case 'warehouse':
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
      branch: '',
      warehouse: '',
      active: true
    });
    setClientTableData([{ id: 1, client: '', clientCode: '' }]);
    setBranchTableData([{ id: 1, customerBranchCode: '' }]);
    setFieldErrors({
      branch: '',
      warehouse: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.warehouse) {
      errors.warehouse = 'Warehouse is required';
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

      return rowErrors;
    });
    setFieldErrors(errors);

    setClientTableErrors(newTableErrors);

    let branchTableDataValid = true;
    const newTableErrors1 = branchTableData.map((row) => {
      const rowErrors = {};
      if (!row.customerBranchCode) {
        rowErrors.customerBranchCode = 'Customer Branch Code is required';
        branchTableDataValid = false;
      }
      return rowErrors;
    });
    // setFieldErrors(errors);

    setBranchTableErrors(newTableErrors1);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const clientVo = clientTableData.map((row) => ({
        client: row.client,
        clientCode: row.clientCode
      }));
      const branchVo = branchTableData.map((row) => ({
        client: row.customerBranchCode
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        branch: formData.branch,
        warehouse: formData.warehouse,
        clientVo: clientVo,
        branchVo: branchVo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/createUpdateWarehouse`, formData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' Warehouse Updated Successfully' : 'Warehouse created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Warehouse creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', error.message);
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
      branch: '',
      warehouse: '',
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
                <TextField
                  label="Branch"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  error={!!fieldErrors.branch}
                  helperText={fieldErrors.branch}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Warehouse"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleInputChange}
                  error={!!fieldErrors.warehouse}
                  helperText={fieldErrors.warehouse}
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
                        <div className="col-lg-6">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '15%' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '14%' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 225 }}>
                                    Client
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Client Code</th>
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
                                      <select
                                        value={row.client}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setClientTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, client: value } : r)));
                                          setClientTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              client: !value ? 'Client is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={clientTableErrors[index]?.client ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="DENSO CHENNAI">DENSO CHENNAI</option>
                                        <option value="CASINO">CASINO</option>
                                      </select>
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
                                            newErrors[index] = { ...newErrors[index], clientCode: !value ? 'Client Code is required' : '' };
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
                        <div className="col-lg-6">
                          <div className="table-responsive">
                            <table className="table table-bordered table-responsive">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '15%' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '14%' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Customer Branch Code
                                  </th>
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
                                        value={row.customerBranchCode}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBranchTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, customerBranchCode: value } : r))
                                          );
                                          setBranchTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              customerBranchCode: !value ? 'Customer Branch Code is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown1(e, row)}
                                        className={branchTableErrors[index]?.customerBranchCode ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Fixed">MAA</option>
                                        <option value="Open">KA</option>
                                      </select>
                                      {branchTableErrors[index]?.customerBranchCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {branchTableErrors[index].customerBranchCode}
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
export default WarehouseMaster;
