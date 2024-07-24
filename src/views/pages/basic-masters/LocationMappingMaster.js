import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState } from 'react';
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

export const LocationMappingMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    branch: '',
    warehouse: '',
    locationType: '',
    clientType: '',
    rowNo: '',
    levelNo: '',
    client: '',
    active: true,
    orgId: 1
  });
  const [value, setValue] = useState(0);
  const [locationMappingTableData, setLocationMappingTableData] = useState([
    {
      id: 1,
      rowNo: '',
      levelNo: '',
      palletNo: '',
      multiCore: '',
      LocationStatus: '',
      vasBinSeq: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      location: '',
      height: '',
      weight: '',
      cellCategory: '',
      status: '',
      core: ''
    };
    setLocationMappingTableData([...locationMappingTableData, newRow]);
    setLocationMappingTableErrors([
      ...locationMappingTableErrors,
      {
        rowNo: '',
        levelNo: '',
        palletNo: '',
        multiCore: '',
        LocationStatus: '',
        vasBinSeq: ''
      }
    ]);
  };

  const [locationMappingTableErrors, setLocationMappingTableErrors] = useState([
    {
      rowNo: '',
      levelNo: '',
      palletNo: '',
      multiCore: '',
      LocationStatus: '',
      vasBinSeq: ''
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    branch: '',
    warehouse: '',
    locationType: '',
    clientType: '',
    rowNo: '',
    levelNo: '',
    client: ''
  });
  const listViewColumns = [
    { accessorKey: 'branch', header: 'Branch', size: 140 },
    { accessorKey: 'warehouse', header: 'Warehouse', size: 140 },
    { accessorKey: 'locationType', header: 'Location Type', size: 140 },
    { accessorKey: 'clientType', header: 'Client Type', size: 140 },
    { accessorKey: 'rowNo', header: 'Row', size: 140 },
    { accessorKey: 'identityLevel', header: 'Identity Level', size: 140 },
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
      active: 'Active'
    },
    {
      id: 2,
      branch: 'Branch2',
      warehouse: 'Warehouse2',
      locationType: 'locationType2',
      rowNo: 'rowNo2',
      identityLevel: 'identityLevel2',
      active: 'Active'
    }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const specialCharsRegex = /^[A-Za-z0-9@_\-*]*$/;

    let errorMessage = '';

    switch (name) {
      case 'cellFrom':
      case 'cellTo':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only Numbers are allowed';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      setFormData({ ...formData, [name]: value });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleDeleteRow = (id) => {
    setLocationMappingTableData(locationMappingTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === locationMappingTableData[locationMappingTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setFormData({
      branch: '',
      warehouse: '',
      locationType: '',
      clientType: '',
      rowNo: '',
      levelNo: '',
      client: '',
      active: true
    });
    setLocationMappingTableData([
      {
        id: 1,
        rowNo: '',
        levelNo: '',
        palletNo: '',
        multiCore: '',
        LocationStatus: '',
        vasBinSeq: ''
      }
    ]);
    setFieldErrors({
      branch: '',
      warehouse: '',
      locationType: '',
      clientType: '',
      rowNo: '',
      levelNo: '',
      client: ''
    });
    setLocationMappingTableErrors('');
  };

  const handleSave = () => {
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
    if (!formData.levelNo) {
      errors.levelNo = 'Level Identity is required';
    }

    let locationMappingTableDataValid = true;
    const newTableErrors = locationMappingTableData.map((row) => {
      const rowErrors = {};
      if (!row.rowNo) {
        rowErrors.rowNo = 'rowNo is required';
        locationMappingTableDataValid = false;
      }
      if (!row.levelNo) {
        rowErrors.levelNo = 'levelNo is required';
        locationMappingTableDataValid = false;
      }
      if (!row.palletNo) {
        rowErrors.palletNo = 'PalletNo is required';
        locationMappingTableDataValid = false;
      }
      if (!row.multiCore) {
        rowErrors.multiCore = 'Multi Core is required';
        locationMappingTableDataValid = false;
      }
      if (!row.LocationStatus) {
        rowErrors.LocationStatus = 'LocationStatus is required';
        locationMappingTableDataValid = false;
      }
      if (!row.vasBinSeq) {
        rowErrors.vasBinSeq = 'VasBinSeq is required';
        locationMappingTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);
    setLocationMappingTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && locationMappingTableDataValid) {
      setIsLoading(true);
      const locationVo = locationMappingTableData.map((row) => ({
        rowNo: row.rowNo,
        levelNo: row.levelNo,
        palletNo: row.palletNo,
        multiCore: row.multiCore,
        LocationStatus: row.LocationStatus,
        vasBinSeq: row.vasBinSeq
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        branch: formData.branch,
        warehouse: formData.warehouse,
        locationType: formData.locationType,
        rowNo: formData.rowNo,
        levelNo: formData.levelNo,
        locationVo: locationVo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/location`, saveFormData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' LocationMapping Updated Successfully' : 'LocationMapping created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'LocationMapping creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'LocationMapping creation failed');
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
      locationType: '',
      clientType: '',
      rowNo: '',
      levelNo: '',
      client: '',
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
                    <MenuItem value="Warehouse 1">Warehouse 1</MenuItem>
                    <MenuItem value="Warehouse 2">Warehouse 2</MenuItem>
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
                    <MenuItem value="Type 1">Type 1</MenuItem>
                    <MenuItem value="Type 2">Type 2</MenuItem>
                  </Select>
                  {fieldErrors.locationType && <FormHelperText error>{fieldErrors.locationType}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.clientType}>
                  <InputLabel id="clientType-label">Client Type</InputLabel>
                  <Select
                    labelId="clientType-label"
                    id="clientType"
                    name="clientType"
                    label="client Type"
                    value={formData.clientType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Client Type 1">Client Type 1</MenuItem>
                    <MenuItem value="Client Type 2">Client Type 2</MenuItem>
                  </Select>
                  {fieldErrors.clientType && <FormHelperText error>{fieldErrors.clientType}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.rowNo}>
                  <InputLabel id="rowNo-label">Row No</InputLabel>
                  <Select labelId="rowNo-label" id="rowNo" name="rowNo" label="Row No" value={formData.rowNo} onChange={handleInputChange}>
                    <MenuItem value="Row No 1">Row No 1</MenuItem>
                    <MenuItem value="Row No 2">Row No 2</MenuItem>
                  </Select>
                  {fieldErrors.rowNo && <FormHelperText error>{fieldErrors.rowNo}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.levelNo}>
                  <InputLabel id="levelNo-label">Level No</InputLabel>
                  <Select
                    labelId="levelNo-label"
                    id="levelNo"
                    name="levelNo"
                    label="Level No"
                    value={formData.levelNo}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="levelNo 1">levelNo 1</MenuItem>
                    <MenuItem value="levelNo 2">levelNo 2</MenuItem>
                  </Select>
                  {fieldErrors.levelNo && <FormHelperText error>{fieldErrors.levelNo}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.client}>
                  <InputLabel id="client-label">Client</InputLabel>
                  <Select
                    labelId="client-label"
                    id="client"
                    name="client"
                    label="Client"
                    value={formData.client}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Client 1">Client 1</MenuItem>
                    <MenuItem value="Client 2">Client 2</MenuItem>
                  </Select>
                  {fieldErrors.client && <FormHelperText error>{fieldErrors.client}</FormHelperText>}
                </FormControl>
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
              {/* <Box className="mt-4"> */}
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} />
                        <ActionButton title="Clear" icon={ClearIcon} />
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-12">
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
                                  <th className="px-2 py-2 text-white text-center">Row No</th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 130 }}>
                                    Level No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 130 }}>
                                    Pallet No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Multi Core</th>
                                  <th className="px-2 py-2 text-white text-center">Location Status</th>
                                  <th className="px-2 py-2 text-white text-center">VAS Bin Seq</th>
                                </tr>
                              </thead>
                              <tbody>
                                {locationMappingTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.rowNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, rowNo: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], rowNo: !value ? 'Row No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationMappingTableErrors[index]?.rowNo ? 'error form-control' : 'form-control'}
                                      />
                                      {locationMappingTableErrors[index]?.rowNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].rowNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.levelNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, levelNo: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], levelNo: !value ? 'levelNo is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationMappingTableErrors[index]?.levelNo ? 'error form-control' : 'form-control'}
                                      />
                                      {locationMappingTableErrors[index]?.levelNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].levelNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.palletNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, palletNo: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], palletNo: !value ? 'palletNo is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationMappingTableErrors[index]?.palletNo ? 'error form-control' : 'form-control'}
                                      />
                                      {locationMappingTableErrors[index]?.palletNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].palletNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.multiCore}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, multiCore: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              multiCore: !value ? 'Cell Category is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationMappingTableErrors[index]?.multiCore ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Single">Single</option>
                                        <option value="Multi">Multi</option>
                                      </select>
                                      {locationMappingTableErrors[index]?.multiCore && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].multiCore}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.LocationStatus}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, LocationStatus: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              LocationStatus: !value ? 'LocationStatus is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={
                                          locationMappingTableErrors[index]?.LocationStatus ? 'error form-control' : 'form-control'
                                        }
                                      />
                                      {locationMappingTableErrors[index]?.LocationStatus && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].LocationStatus}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.vasBinSeq}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationMappingTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, vasBinSeq: value } : r))
                                          );
                                          setLocationMappingTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], vasBinSeq: !value ? 'vasBinSeq is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationMappingTableErrors[index]?.vasBinSeq ? 'error form-control' : 'form-control'}
                                      />
                                      {locationMappingTableErrors[index]?.vasBinSeq && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationMappingTableErrors[index].vasBinSeq}
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

export default LocationMappingMaster;
