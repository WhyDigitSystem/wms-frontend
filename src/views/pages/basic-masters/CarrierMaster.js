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

export const CarrierMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    carrierName: '',
    shortName: '',
    shipmentMode: '',
    controlBranch: '',
    active: true,
    orgId: 1000000001
  });
  const [value, setValue] = useState(0);
  const [carrierDetailsData, setCarrierDetailsData] = useState([
    {
      id: 1,
      addressType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      contact: '',
      phone: '',
      email: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      addressType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      contact: '',
      phone: '',
      email: ''
    };
    setCarrierDetailsData([...carrierDetailsData, newRow]);
    setCarrierDetailTableErrors([
      ...carrierDetailTableErrors,
      {
        addressType: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        contact: '',
        phone: '',
        email: ''
      }
    ]);
  };

  const [carrierDetailTableErrors, setCarrierDetailTableErrors] = useState([
    {
      addressType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      contact: '',
      phone: '',
      email: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    carrierName: '',
    shortName: '',
    shipmentMode: '',
    controlBranch: ''
  });
  const listViewColumns = [
    { accessorKey: 'carrierName', header: 'Carrier Name', size: 140 },
    { accessorKey: 'shortName', header: 'Short Name', size: 140 },
    { accessorKey: 'shipmentMode', header: 'Shipment Mode', size: 140 },
    { accessorKey: 'controlBranch', header: 'Control Branch', size: 140 }
  ];

  //   const [listViewData, setListViewData] = useState([
  //     {
  //       id: 1,
  //       carrierName: 'carrierName1',
  //       shortName: 'shortName1',
  //       shipmentMode: 'shipmentMode1',
  //       controlBranch: 'controlBranch1',
  //       active: 'Active'
  //     },
  //     {
  //       id: 1,
  //       carrierName: 'carrierName2',
  //       shortName: 'shortName2',
  //       shipmentMode: 'shipmentMode2',
  //       controlBranch: 'controlBranch2',
  //       active: 'Active'
  //     }
  //   ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-z ]*$/;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const specialCharsRegex = /^[A-Za-z0-9@_\-*]*$/;

    let errorMessage = '';

    switch (name) {
      case 'carrierName':
      case 'shortName':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only alphabetic characters are allowed';
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

  const handleDeleteRow = (id) => {
    setCarrierDetailsData(carrierDetailsData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === carrierDetailsData[carrierDetailsData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setFormData({
      carrierName: '',
      shortName: '',
      shipmentMode: '',
      controlBranch: '',
      active: true
    });
    setCarrierDetailsData([
      {
        id: 1,
        addressType: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        contact: '',
        phone: '',
        email: ''
      }
    ]);
    setFieldErrors({
      carrierName: '',
      shortName: '',
      shipmentMode: '',
      controlBranch: ''
    });
    setCarrierDetailTableErrors('');
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.carrierName) {
      errors.carrierName = 'Carrier Name is required';
    }
    if (!formData.shortName) {
      errors.shortName = 'Short Name is required';
    }
    if (!formData.shipmentMode) {
      errors.shipmentMode = 'Shipment Mode is required';
    }
    if (!formData.controlBranch) {
      errors.controlBranch = 'Control Branch is required';
    }

    let carrierDetailsDataValid = true;
    const newTableErrors = carrierDetailsData.map((row) => {
      const rowErrors = {};
      if (!row.addressType) {
        rowErrors.addressType = 'Address Type is required';
        carrierDetailsDataValid = false;
      }
      if (!row.address) {
        rowErrors.address = 'Address is required';
        carrierDetailsDataValid = false;
      }
      if (!row.city) {
        rowErrors.city = 'City is required';
        carrierDetailsDataValid = false;
      }
      if (!row.state) {
        rowErrors.state = 'State is required';
        carrierDetailsDataValid = false;
      }
      if (!row.zipCode) {
        rowErrors.zipCode = 'Zip Code is required';
        carrierDetailsDataValid = false;
      }
      if (!row.country) {
        rowErrors.country = 'Country is required';
        carrierDetailsDataValid = false;
      }
      if (!row.contact) {
        rowErrors.contact = 'Contact is required';
        carrierDetailsDataValid = false;
      }
      if (!row.core) {
        rowErrors.core = 'Core is required';
        carrierDetailsDataValid = false;
      }
      if (!row.phone) {
        rowErrors.phone = 'Phone is required';
        carrierDetailsDataValid = false;
      }
      if (!row.email) {
        rowErrors.email = 'Email is required';
        carrierDetailsDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);
    setCarrierDetailTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && carrierDetailsDataValid) {
      setIsLoading(true);
      const locationVo = carrierDetailsData.map((row) => ({
        addressType: row.addressType,
        address: row.address,
        city: row.city,
        state: row.state,
        zipCode: row.zipCode,
        country: row.country,
        contact: row.contact,
        phone: row.phone,
        email: row.email
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        carrierName: formData.carrierName,
        shortName: formData.shortName,
        shipmentMode: formData.shipmentMode,
        controlBranch: formData.controlBranch,
        locationVo: locationVo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/carrierMaster`, saveFormData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' Carrier Master Updated Successfully' : 'Carrier Master created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Warehouse Location creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Carrier Master creation failed');
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
      carrierName: '',
      shortName: '',
      shipmentMode: '',
      controlBranch: '',
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
            {/* <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} /> */}
            <CommonListViewTable columns={listViewColumns} blockEdit={true} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Carrier Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="carrierName"
                  value={formData.carrierName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.carrierName}
                  helperText={fieldErrors.carrierName}
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.shipmentMode}>
                  <InputLabel id="shipmentMode-label">Shipment Mode</InputLabel>
                  <Select
                    labelId="shipmentMode-label"
                    id="shipmentMode"
                    name="shipmentMode"
                    label="Warehouse"
                    value={formData.shipmentMode}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="SHIPMENTMODE1">SHIPMENTMODE1</MenuItem>
                    <MenuItem value="SHIPMENTMODE2">SHIPMENTMODE2</MenuItem>
                  </Select>
                  {fieldErrors.shipmentMode && <FormHelperText error>{fieldErrors.shipmentMode}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.controlBranch}>
                  <InputLabel id="controlBranch-label">Control Branch</InputLabel>
                  <Select
                    labelId="controlBranch-label"
                    id="controlBranch"
                    name="controlBranch"
                    label="Location Type"
                    value={formData.controlBranch}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="CONTROLBRANCH1">CONTROLBRANCH1</MenuItem>
                    <MenuItem value="CONTROLBRANCH2">CONTROLBRANCH2</MenuItem>
                  </Select>
                  {fieldErrors.controlBranch && <FormHelperText error>{fieldErrors.controlBranch}</FormHelperText>}
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
                  <Tab value={0} label="Carrier Details" />
                </Tabs>
              </Box>
              {/* <Box className="mt-4"> */}
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="">
                      <div className="d-flex justify-content-start">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} />
                        <ActionButton title="Clear" icon={ClearIcon} />
                      </div>
                      <div className="mt-3">
                        {/* <div className="col-lg-12"> */}
                        <div style={{ overflowX: 'auto' }}>
                          <table className="table table-bordered">
                            <thead>
                              <tr style={{ backgroundColor: '#673AB7' }}>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                  Action
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                  S.No
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Address Type
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Address
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  City
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  State
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Zip Code
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Country
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Contact
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Phone
                                </th>
                                <th className="px-2 py-2 text-white text-center" style={{ width: '300px' }}>
                                  Email
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {carrierDetailsData.map((row, index) => (
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
                                      value={row.addressType}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) =>
                                          prev.map((r) => (r.id === row.id ? { ...r, addressType: value } : r))
                                        );
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = {
                                            ...newErrors[index],
                                            addressType: !value ? 'Address Type is required' : ''
                                          };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.addressType ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.addressType && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].addressType}
                                      </div>
                                    )}
                                  </td>

                                  <td className="border px-2 py-2">
                                    <input
                                      type="text"
                                      value={row.address}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, address: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], address: !value ? 'Address is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.address ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.address && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].address}
                                      </div>
                                    )}
                                  </td>

                                  <td className="border px-2 py-2">
                                    <select
                                      value={row.city}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, city: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = {
                                            ...newErrors[index],
                                            city: !value ? 'City is required' : ''
                                          };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.city ? 'error form-control' : 'form-control'}
                                    >
                                      <option value="">Select Option</option>
                                      <option value="Bengaluru">Bengaluru</option>
                                      <option value="Chennai">Chennai</option>
                                    </select>
                                    {carrierDetailTableErrors[index]?.city && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].city}
                                      </div>
                                    )}
                                  </td>

                                  <td className="border px-2 py-2">
                                    <input
                                      type="text"
                                      value={row.state}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, state: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], state: !value ? 'State is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.state ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.state && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].state}
                                      </div>
                                    )}
                                  </td>
                                  <td className="border px-2 py-2">
                                    <input
                                      type="number"
                                      value={row.zipCode}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, zipCode: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], zipCode: !value ? 'Zip Code is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.zipCode ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.zipCode && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].zipCode}
                                      </div>
                                    )}
                                  </td>
                                  <td className="border px-2 py-2">
                                    <input
                                      type="text"
                                      value={row.country}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, country: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], country: !value ? 'Country is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.country ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.country && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].country}
                                      </div>
                                    )}
                                  </td>
                                  <td className="border px-2 py-2">
                                    <input
                                      type="text"
                                      value={row.contact}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, contact: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], contact: !value ? 'Contact is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.contact ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.contact && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].contact}
                                      </div>
                                    )}
                                  </td>
                                  <td className="border px-2 py-2">
                                    <input
                                      type="number"
                                      value={row.phone}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, phone: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], phone: !value ? 'Phone is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.phone ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.phone && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].phone}
                                      </div>
                                    )}
                                  </td>
                                  <td className="border px-2 py-2">
                                    <input
                                      type="text"
                                      value={row.email}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setCarrierDetailsData((prev) => prev.map((r) => (r.id === row.id ? { ...r, email: value } : r)));
                                        setCarrierDetailTableErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = { ...newErrors[index], email: !value ? 'Email is required' : '' };
                                          return newErrors;
                                        });
                                      }}
                                      className={carrierDetailTableErrors[index]?.email ? 'error form-control' : 'form-control'}
                                    />
                                    {carrierDetailTableErrors[index]?.email && (
                                      <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                        {carrierDetailTableErrors[index].email}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* </div> */}
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

export default CarrierMaster;
