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
import GridOnIcon from '@mui/icons-material/GridOn';

export const WarehouseLocationMaster = () => {
  const [orgId, setOrgId] = useState(1000000001);
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState('Karupu');

  const [formData, setFormData] = useState({
    branch: '',
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
  const [locationTableData, setLocationTableData] = useState([
    {
      id: 1,
      location: '',
      height: '',
      weight: '',
      cellCategory: '',
      status: '',
      core: ''
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
    setLocationTableData([...locationTableData, newRow]);
    setLocationTableErrors([
      ...locationTableErrors,
      {
        location: '',
        height: '',
        weight: '',
        cellCategory: '',
        status: '',
        core: ''
      }
    ]);
  };

  const [locationTableErrors, setLocationTableErrors] = useState([
    {
      location: '',
      height: '',
      weight: '',
      cellCategory: '',
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
    setLocationTableData(locationTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === locationTableData[locationTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

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
    setLocationTableData([
      {
        id: 1,
        location: '',
        height: '',
        weight: '',
        cellCategory: '',
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
    if (!formData.levelIdentity) {
      errors.levelIdentity = 'Level Identity is required';
    }
    if (!formData.cellFrom) {
      errors.cellFrom = 'Cell From is required';
    }
    if (!formData.cellTo) {
      errors.cellTo = 'Cell To is required';
    }

    let locationTableDataValid = true;
    const newTableErrors = locationTableData.map((row) => {
      const rowErrors = {};
      if (!row.location) {
        rowErrors.location = 'Location is required';
        locationTableDataValid = false;
      }
      if (!row.height) {
        rowErrors.height = 'Height is required';
        locationTableDataValid = false;
      }
      if (!row.weight) {
        rowErrors.weight = 'Weight is required';
        locationTableDataValid = false;
      }
      if (!row.cellCategory) {
        rowErrors.cellCategory = 'Cell Category is required';
        locationTableDataValid = false;
      }
      if (!row.status) {
        rowErrors.status = 'Status is required';
        locationTableDataValid = false;
      }
      if (!row.core) {
        rowErrors.core = 'Core is required';
        locationTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);
    setLocationTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && locationTableDataValid) {
      setIsLoading(true);
      const locationVo = locationTableData.map((row) => ({
        location: row.location,
        height: row.height,
        weight: row.weight,
        cellCategory: row.cellCategory,
        status: row.status,
        core: row.core
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        branch: formData.branch,
        warehouse: formData.warehouse,
        locationType: formData.locationType,
        rowNo: formData.rowNo,
        levelIdentity: formData.levelIdentity,
        cellFrom: formData.cellFrom,
        cellTo: formData.cellTo,
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
            showToast('success', editId ? ' Warehouse Location Updated Successfully' : 'Warehouse Location created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Warehouse Location creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Warehouse Location creation failed');
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
              <Box sx={{ padding: 2 }}>
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
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Location</th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 130 }}>
                                    Height(feet)
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 130 }}>
                                    Weight(kg)
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Cell Category</th>
                                  <th className="px-2 py-2 text-white text-center">Status</th>
                                  <th className="px-2 py-2 text-white text-center">Core</th>
                                </tr>
                              </thead>
                              <tbody>
                                {locationTableData.map((row, index) => (
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
                                        value={row.location}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, location: value } : r))
                                          );
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], location: !value ? 'Gst In is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationTableErrors[index]?.location ? 'error form-control' : 'form-control'}
                                      />
                                      {locationTableErrors[index]?.location && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].location}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.height}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, height: value } : r)));
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], height: !value ? 'height is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationTableErrors[index]?.height ? 'error form-control' : 'form-control'}
                                      />
                                      {locationTableErrors[index]?.height && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].height}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.weight}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, weight: value } : r)));
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], weight: !value ? 'weight is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationTableErrors[index]?.weight ? 'error form-control' : 'form-control'}
                                      />
                                      {locationTableErrors[index]?.weight && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].weight}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.cellCategory}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, cellCategory: value } : r))
                                          );
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              cellCategory: !value ? 'Cell Category is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationTableErrors[index]?.cellCategory ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Acitve">Acitve</option>
                                        <option value="In-Acitve">In-Acitve</option>
                                        <option value="Block">Block</option>
                                        <option value="Open">Way</option>
                                      </select>
                                      {locationTableErrors[index]?.cellCategory && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].cellCategory}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.status}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: value } : r)));
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              status: !value ? 'Status is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={locationTableErrors[index]?.status ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                      </select>
                                      {locationTableErrors[index]?.status && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].status}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.core}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLocationTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, core: value } : r)));
                                          setLocationTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              core: !value ? 'Core is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={locationTableErrors[index]?.core ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                      </select>
                                      {locationTableErrors[index]?.core && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {locationTableErrors[index].core}
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
