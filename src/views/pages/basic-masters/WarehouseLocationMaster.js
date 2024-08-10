import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
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
import GridOnIcon from '@mui/icons-material/GridOn';
import { getAllActiveLocationTypes } from 'utils/CommonFunctions';
import apiCalls from 'apicall';

export const WarehouseLocationMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [warehouseList, setWarehouseList] = useState([]);
  const [locationTypeList, setLocationTypeList] = useState([]);
  const [binCategoryList, setBinCategoryList] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchCode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [formData, setFormData] = useState({
    branch: localStorage.getItem('branch'),
    warehouse: '',
    locationType: '',
    rowNo: '',
    levelIdentity: '',
    cellFrom: '',
    cellTo: '',
    active: true,
    orgId: 1
  });
  const [value, setValue] = useState(0);
  const [binTableData, setBinTableData] = useState([
    {
      id: 1,
      bin: '',
      binCategory: '',
      status: '',
      core: ''
    }
  ]);

  // const handleAddRow = () => {
  //   const newRow = {
  //     id: Date.now(),
  //     bin: '',
  //     binCategory: '',
  //     status: '',
  //     core: ''
  //   };
  //   setBinTableData([...binTableData, newRow]);
  //   setBinTableErrors([
  //     ...binTableErrors,
  //     {
  //       bin: '',
  //       binCategory: '',
  //       status: '',
  //       core: ''
  //     }
  //   ]);
  // };

  const [binTableErrors, setBinTableErrors] = useState([
    {
      bin: '',
      binCategory: '',
      status: '',
      core: ''
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    branch: '',
    warehouse: '',
    locationType: '',
    rowNo: '',
    levelIdentity: '',
    cellFrom: '',
    cellTo: ''
  });
  const listViewColumns = [
    { accessorKey: 'branch', header: 'Branch', size: 140 },
    { accessorKey: 'warehouse', header: 'Warehouse', size: 140 },
    { accessorKey: 'locationType', header: 'Location Type', size: 140 },
    { accessorKey: 'rowNo', header: 'Row', size: 140 },
    { accessorKey: 'identityLevel', header: 'Identity Level', size: 140 },
    { accessorKey: 'start', header: 'Start', size: 140 },
    { accessorKey: 'end', header: 'End', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([
    {
      id: 1,
      branch: 'Branch1',
      warehouse: 'Warehouse1',
      locationType: 'locationType1',
      rowNo: 'rowNo1',
      identityLevel: 'identityLevel1',
      start: 'start1',
      end: 'end1',
      active: 'Active'
    },
    {
      id: 2,
      branch: 'Branch2',
      warehouse: 'Warehouse2',
      locationType: 'locationType2',
      rowNo: 'rowNo2',
      identityLevel: 'identityLevel2',
      start: 'start2',
      end: 'end1',
      active: 'Active'
    }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllWarehousesByLoginBranch();
    getAllLocationTypes();
    getAllCellCategories();
  }, []);

  const getAllWarehousesByLoginBranch = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/warehouse/branch?branchcode=${loginBranchCode}&orgid=${orgId}`);
      console.log('THE WAREHOUSEES IS:', response);
      if (response.status === true) {
        setWarehouseList(response.paramObjectsMap.Warehouse);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getAllCellCategories = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/getAllCellTypeByOrgId?orgId=${orgId}`);
      console.log('THE CELL CATEGORIES IS:', response);
      if (response.status === true) {
        setBinCategoryList(response.paramObjectsMap.cellTypeVO);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const getAllLocationTypes = async () => {
    try {
      const locationTypeData = await getAllActiveLocationTypes(orgId);
      console.log('THE LOCATIONTYPE IS:', locationTypeData);

      setLocationTypeList(locationTypeData);
    } catch (error) {
      console.error('Error fetching locationType data:', error);
    }
  };

  const getAllBinDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/getPalletno?endno=${formData.cellTo}&level=${formData.levelIdentity}&rowno=${formData.rowNo}&startno=${formData.cellFrom}`
      );
      console.log('THE WAREHOUSE IS:', response);
      if (response.status === true) {
        const palletDetails = response.paramObjectsMap.pallet;
        console.log('THE PALLET DETAILS ARE:', palletDetails);

        setBinTableData(
          palletDetails.map((plt) => ({
            id: plt.id,
            bin: plt.bin,
            binCategory: plt.binCategory,
            status: plt.status === 'T' ? 'True' : 'False',
            core: plt.core
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9 ]*$/;
    const specialCharsRegex = /^[A-Za-z0-9#_\-/\\]*$/;

    let errorMessage = '';

    switch (name) {
      case 'cellFrom':
      case 'cellTo':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only Numbers are allowed';
        }
        break;
      case 'rowNo':
        if (!specialCharsRegex.test(value)) {
          errorMessage = 'Only alphaNumeric and /,,-_  are allowed';
        }
        break;
      case 'cellFrom':
      case 'cellTo':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only Numeric are allowed';
        }
        break;
      case 'levelIdentity':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only alphaNumeric are allowed';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  // const handleDeleteRow = (id) => {
  //   setBinTableData(binTableData.filter((row) => row.id !== id));
  // };
  const handleKeyDown = (e, row, table) => {
    if (e.key === 'Tab' && row.id === table[table.length - 1].id) {
      e.preventDefault();
      if (isLastRowEmpty(table)) {
        displayRowError(table);
      } else {
        // if (table === roleTableData) handleAddRow();
        // else if (table === branchTableData) handleAddRow1();
        // else handleAddRow();
        handleAddRow();
      }
    }
  };

  // const handleKeyDown = (e, row) => {
  //   if (e.key === 'Tab' && row.id === binTableData[binTableData.length - 1].id) {
  //     e.preventDefault();
  //     handleAddRow();
  //   }
  // };
  const handleAddRow = () => {
    if (isLastRowEmpty(binTableData)) {
      displayRowError(binTableData);
      return;
    }
    const newRow = {
      id: Date.now(),
      bin: '',
      binCategory: '',
      status: '',
      core: ''
    };
    setBinTableData([...binTableData, newRow]);
    setBinTableErrors([
      ...binTableErrors,
      {
        bin: '',
        binCategory: '',
        status: '',
        core: ''
      }
    ]);
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;

    if (table === binTableData) {
      return !lastRow.bin || !lastRow.binCategory || !lastRow.status || !lastRow.core;
      // } else if (table === branchTableData) {
      //   return !lastRow.branchCode;
      // } else if (table === clientTableData) {
      //   return !lastRow.customer || !lastRow.client;
    }
    return false;
  };

  const displayRowError = (table) => {
    if (table === binTableData) {
      setBinTableErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[table.length - 1] = {
          ...newErrors[table.length - 1],
          bin: !table[table.length - 1].bin ? 'Bin is required' : '',
          binCategory: !table[table.length - 1].binCategory ? 'Bin Category is required' : '',
          status: !table[table.length - 1].status ? 'Status is required' : '',
          core: !table[table.length - 1].core ? 'Core is required' : ''
        };
        return newErrors;
      });
    }
  };

  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  // const handleDeleteRow = (id) => {
  //   setBinTableData(binTableData.filter((row) => row.id !== id));
  // };

  const handleClear = () => {
    setFormData({
      branch: '',
      warehouse: '',
      locationType: '',
      rowNo: '',
      levelIdentity: '',
      cellFrom: '',
      cellTo: '',
      active: true
    });
    setBinTableData([
      {
        id: 1,
        bin: '',
        binCategory: '',
        status: '',
        core: ''
      }
    ]);
    setFieldErrors({
      branch: '',
      warehouse: '',
      locationType: '',
      rowNo: '',
      levelIdentity: '',
      cellFrom: '',
      cellTo: ''
    });
    setBinTableErrors('');
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.branch) {
      errors.branch = 'Branch is required';
    }
    if (!formData.warehouse) {
      errors.warehouse = 'Warehouse is required';
    }
    if (!formData.locationType) {
      errors.locationType = 'Location Type is required';
    }
    if (!formData.rowNo) {
      errors.rowNo = 'Row Number is required';
    }
    if (!formData.levelIdentity) {
      errors.levelIdentity = 'Level Identity is required';
    }
    if (!formData.cellFrom) {
      errors.cellFrom = 'Cell From is required';
    }
    if (!formData.cellTo) {
      errors.cellTo = 'Cell To is required';
    }

    let binTableDataValid = true;
    const newTableErrors = binTableData.map((row) => {
      const rowErrors = {};
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        binTableDataValid = false;
      }
      // if (!row.binCategory) {
      //   rowErrors.binCategory = 'Bin Category is required';
      //   binTableDataValid = false;
      // }
      if (!row.status) {
        rowErrors.status = 'Status is required';
        binTableDataValid = false;
      }
      if (!row.core) {
        rowErrors.core = 'Core is required';
        binTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);
    setBinTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && binTableDataValid) {
      // setIsLoading(true);
      const binVo = binTableData.map((row) => ({
        id: row.id,
        bin: row.bin,
        binCategory: row.binCategory,
        status: row.status,
        core: row.core
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        branch: loginBranch,
        branchcode: loginBranchCode,
        warehouse: formData.warehouse,
        locationtype: formData.locationType,
        rowno: formData.rowNo,
        level: formData.levelIdentity,
        cellfrom: formData.cellFrom,
        cellto: formData.cellTo,
        warehouseLocationDetailsVO: binVo,
        orgId: orgId,
        createdby: loginUserName,
        userid: loginUserId,
        warehouse: loginWarehouse
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      // try {
      //   const method = editId ? 'put' : 'post';
      //   const response = await apiCalls(method, `warehousemastercontroller/warehouselocation`, saveFormData);

      //   if (response.status === true) {
      //     console.log('Response:', response);
      //     handleClear();
      //     showToast('success', editId ? ' Warehouse Location Updated Successfully' : 'Warehouse Location created successfully');
      //     setIsLoading(false);
      //   } else {
      //     showToast('error', response.data.paramObjectsMap.errorMessage || 'Warehouse Location creation failed');
      //     setIsLoading(false);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      //   showToast('error', 'Warehouse Location creation failed');
      //   setIsLoading(false);
      // }
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
      locationType: '',
      rowNo: '',
      levelIdentity: '',
      cellFrom: '',
      cellTo: '',
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.warehouse}>
                  <InputLabel id="warehouse-label">Warehouse</InputLabel>
                  <Select
                    labelId="warehouse-label"
                    id="warehouse"
                    name="warehouse"
                    label="Warehouse"
                    value={formData.warehouse}
                    onChange={handleInputChange}
                  >
                    {warehouseList?.map((row, index) => (
                      <MenuItem key={index} value={row.Warehouse.toUpperCase()}>
                        {row.Warehouse.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.warehouse && <FormHelperText error>{fieldErrors.warehouse}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.locationType}>
                  <InputLabel id="locationType-label">Location Type</InputLabel>
                  <Select
                    labelId="locationType-label"
                    id="locationType"
                    name="locationType"
                    label="Location Type"
                    value={formData.locationType}
                    onChange={handleInputChange}
                  >
                    {locationTypeList?.map((row) => (
                      <MenuItem key={row.id} value={row.binType.toUpperCase()}>
                        {row.binType.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.locationType && <FormHelperText error>{fieldErrors.locationType}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Row No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="rowNo"
                  value={formData.rowNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.rowNo}
                  helperText={fieldErrors.rowNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Level Identity"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="levelIdentity"
                  value={formData.levelIdentity}
                  onChange={handleInputChange}
                  error={!!fieldErrors.levelIdentity}
                  helperText={fieldErrors.levelIdentity}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Cell From"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="cellFrom"
                  value={formData.cellFrom}
                  onChange={handleInputChange}
                  error={!!fieldErrors.cellFrom}
                  helperText={fieldErrors.cellFrom}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Cell To"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="cellTo"
                  value={formData.cellTo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.cellTo}
                  helperText={fieldErrors.cellTo}
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

            <div className="row ">
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value={0} label="Location Details" />
                </Tabs>
              </Box>
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={getAllBinDetails} />
                        <ActionButton title="Clear" icon={ClearIcon} />
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-10">
                          <div className="table-responsive">
                            <table className="table table-bordered" style={{ width: '100%' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    Bin
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    Bin Category
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    Status
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    Core
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {binTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, binTableData, setBinTableData)}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.bin}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBinTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, bin: value } : r)));
                                          setBinTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], bin: !value ? 'Gst In is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={binTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      />
                                      {binTableErrors[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {binTableErrors[index].bin}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.binCategory}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBinTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, binCategory: value } : r)));
                                          setBinTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              binCategory: !value ? 'Cell Category is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={binTableErrors[index]?.binCategory ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">--Select--</option>
                                        {binCategoryList?.map((row) => (
                                          <option key={row.id} value={row.cellType}>
                                            {row.cellType}
                                          </option>
                                        ))}
                                      </select>
                                      {binTableErrors[index]?.binCategory && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {binTableErrors[index].binCategory}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.status}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBinTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: value } : r)));
                                          setBinTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              status: !value ? 'Status is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={binTableErrors[index]?.status ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                      </select>
                                      {binTableErrors[index]?.status && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {binTableErrors[index].status}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.core}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setBinTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, core: value } : r)));
                                          setBinTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              core: !value ? 'Core is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row, binTableData)}
                                        className={binTableErrors[index]?.core ? 'error form-control' : 'form-control'}
                                      >
                                        {/* <option value="">Select Option</option> */}
                                        <option value="Multi">Multi</option>
                                        <option value="Single">Single</option>
                                      </select>
                                      {binTableErrors[index]?.core && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {binTableErrors[index].core}
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
    </>
  );
};

export default WarehouseLocationMaster;
