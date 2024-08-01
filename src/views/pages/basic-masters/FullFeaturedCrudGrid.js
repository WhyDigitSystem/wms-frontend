import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';
import { getAllActiveBranches, getAllActiveEmployees } from 'utils/CommonFunctions';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { encryptPassword } from 'views/utilities/encryptPassword';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
////
import { DatePicker } from '@mui/x-date-pickers';

export const FullFeaturedCrudGrid = () => {
  const [orgId, setOrgId] = useState(1000000001);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    dob: ''
  });
  const [value, setValue] = useState(0);
  const [branchTableData, setBranchTableData] = useState([
    {
      id: 1,
      branchCode: '',
      branch: ''
    }
  ]);
  const [roleTableData, setRoleTableData] = useState([{ id: 1, name: '', role: '', roleId: '', startDate: null, endDate: null }]);
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      name: '',
      role: '',
      roleId: '',
      startDate: '',
      endDate: ''
    };
    setRoleTableData([...roleTableData, newRow]);
    setRoleTableDataErrors([...roleTableDataErrors, { name: '', role: '', roleId: '', startDate: '', endDate: '' }]);
  };

  const [roleTableDataErrors, setRoleTableDataErrors] = useState([
    {
      name: '',
      role: '',
      roleId: '',
      startDate: '',
      endDate: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    dob: ''
  });
  const [listView, setListView] = useState(false);

  const [roleList, setRoleList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // getAllEmployees();
    // getAllRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    let errorMessage = '';

    // Validation based on field name
    switch (name) {
      case 'reportingTo':
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
      case 'pwdExpDays':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        } else if (value.length > 6) {
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
    }

    // Update field errors and form data
    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      const updatedValue = name === 'email' ? value : value.toUpperCase();
      setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));

      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
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

  // const handleSave = async () => {
  //   const errors = {};
  //   let roleTableDataValid = true;
  //   const newTableErrors = roleTableData.map((row, index) => {
  //     const rowErrors = {};
  //     if (!row.name) {
  //       rowErrors.name = 'Name is required';
  //       roleTableDataValid = false;
  //     }
  //     if (!row.role) {
  //       rowErrors.role = 'Role is required';
  //       roleTableDataValid = false;
  //     }
  //     if (!row.startDate || row.startDate.trim() === '') {
  //       // Check for empty or null startDate
  //       rowErrors.startDate = 'Start Date is required';
  //       roleTableDataValid = false;
  //     }
  //     if (!row.endDate || row.endDate.trim() === '') {
  //       rowErrors.endDate = 'End Date is required';
  //       roleTableDataValid = false;
  //     }
  //     return rowErrors;
  //   });

  //   // Set errors in the state
  //   setFieldErrors(errors);
  //   setRoleTableDataErrors(newTableErrors);

  //   if (Object.keys(errors).length === 0) {
  //     // setIsLoading(true);
  //     const roleVo = roleTableData.map((row) => ({
  //       role: row.role,
  //       roleId: row.roleId,
  //       startDate: dayjs(row.startDate).format('YYYY-MM-DD'),
  //       endDate: dayjs(row.endDate).format('YYYY-MM-DD')
  //     }));
  //     const saveFormData = {
  //       ...(editId && { id: editId }),
  //       dob: formData.dob,
  //       roleAccessDTO: roleVo
  //     };
  //     console.log('DATA TO SAVE IS:', saveFormData);
  //   } else {
  //     setFieldErrors(errors);
  //   }
  // };

  const handleSave = async () => {
    const errors = {};
    let roleTableDataValid = true;
    const newTableErrors = roleTableData.map((row, index) => {
      const rowErrors = {};
      if (!row.name) {
        rowErrors.name = 'Name is required';
        roleTableDataValid = false;
      }
      if (!row.role) {
        rowErrors.role = 'Role is required';
        roleTableDataValid = false;
      }
      if (!row.startDate || row.startDate.trim() === '') {
        rowErrors.startDate = 'Start Date is required';
        roleTableDataValid = false;
      }
      if (!row.endDate || row.endDate.trim() === '') {
        rowErrors.endDate = 'End Date is required';
        roleTableDataValid = false;
      }
      return rowErrors;
    });

    // Set errors in the state
    setRoleTableDataErrors(newTableErrors);

    if (roleTableDataValid) {
      // setIsLoading(true);
      const roleVo = roleTableData.map((row) => ({
        role: row.role,
        roleId: row.roleId,
        startDate: dayjs(row.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        endDate: dayjs(row.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
      }));
      const saveFormData = {
        ...(editId && { id: editId }),
        dob: formData.dob,
        roleAccessDTO: roleVo
      };
      console.log('DATA TO SAVE IS:', saveFormData);
    } else {
      setFieldErrors(errors);
    }
  };

  const handleDateChange = (date, index, fieldName) => {
    const formattedDate = date ? date.format('DD-MM-YYYY') : '';
    setRoleTableData((prev) => prev.map((r, i) => (i === index ? { ...r, [fieldName]: formattedDate } : r)));
    const newErrors = [...roleTableDataErrors];
    newErrors[index] = {
      ...newErrors[index],
      [fieldName]: !formattedDate ? `${fieldName.replace(/([A-Z])/g, ' $1')} is required` : ''
    };
    setRoleTableDataErrors(newErrors);
  };

  const handleView = () => {
    setListView(!listView);
  };

  // const handleDateChange = (field, date) => {
  //   const formattedDate = dayjs(date).format('DD-MM-YYYY');
  //   setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  // };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
        <div className="row d-flex ml">
          <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
            <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
            <ActionButton title="Clear" icon={ClearIcon} />
            <ActionButton title="List View" icon={FormatListBulletedTwoToneIcon} onClick={handleView} />
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <FormControl fullWidth variant="filled" size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob ? dayjs(formData.dob, 'DD-MM-YYYY') : null}
                  onChange={(date) => handleDateChange('dob', date)}
                  slotProps={{
                    textField: { size: 'small', clearable: true }
                  }}
                  format="DD/MM/YYYY"
                  error={fieldErrors.dob}
                  helperText={fieldErrors.dob && 'Required'}
                />
              </LocalizationProvider>
            </FormControl>
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
            </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
            {value === 0 && (
              <>
                <div className="row d-flex ml">
                  <div className="mb-1">
                    <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                  </div>
                  <div className="row mt-2">
                    <div className="col-lg-10">
                      <div className="table-responsive">
                        <table className="table table-bordered ">
                          <thead>
                            <tr style={{ backgroundColor: '#673AB7' }}>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                Action
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                S.No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Role
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Name
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Start Date
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                End Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {roleTableData.map((row, index) => (
                              <tr key={row.id}>
                                <td className="border px-2 py-2 text-center">
                                  <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                </td>
                                <td className="text-center">
                                  <div className="pt-2">{index + 1}</div>
                                </td>
                                <td className="border px-2 py-2">
                                  <FormControl size="small" fullWidth error={!!roleTableDataErrors[index]?.name}>
                                    <TextField
                                      value={row.name || ''}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: value } : r)));
                                        setRoleTableDataErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = {
                                            ...newErrors[index],
                                            name: !value.trim() ? 'Name is required' : ''
                                          };
                                          return newErrors;
                                        });
                                      }}
                                      error={!!roleTableDataErrors[index]?.name}
                                      helperText={roleTableDataErrors[index]?.name}
                                      // className={roleTableDataErrors[index]?.name ? 'error' : ''}
                                      variant="outlined" // or "filled" depending on your design preference
                                      size="small"
                                    />
                                  </FormControl>
                                </td>

                                <td className="border px-2 py-2">
                                  <FormControl size="small" fullWidth error={!!roleTableDataErrors[index]?.role}>
                                    <Select
                                      displayEmpty
                                      value={row.role}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, role: value } : r)));
                                        setRoleTableDataErrors((prev) => {
                                          const newErrors = [...prev];
                                          newErrors[index] = {
                                            ...newErrors[index],
                                            role: !value ? 'Role is required' : ''
                                          };
                                          return newErrors;
                                        });
                                      }}
                                      className={roleTableDataErrors[index]?.role ? 'error' : ''}
                                    >
                                      <MenuItem value="DEVELOPER">Developer</MenuItem>
                                      <MenuItem value="Full Stack">Full Stack</MenuItem>
                                      <MenuItem value="Manager">Manager</MenuItem>
                                      {roleList.map((role) => (
                                        <MenuItem key={role.id} value={role.role}>
                                          {role.role}
                                        </MenuItem>
                                      ))}
                                    </Select>

                                    {roleTableDataErrors[index]?.role && <FormHelperText>{roleTableDataErrors[index].role}</FormHelperText>}
                                  </FormControl>
                                </td>

                                <td>
                                  <div style={{ marginTop: '0px' }}>
                                    <FormControl fullWidth size="small" error={!!roleTableDataErrors[index]?.startDate}>
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                          value={row.startDate ? dayjs(row.startDate, 'DD-MM-YYYY') : null}
                                          onChange={(date) => handleDateChange(date, index, 'startDate')}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              size="small"
                                              error={!!roleTableDataErrors[index]?.startDate}
                                              helperText={roleTableDataErrors[index]?.startDate}
                                              sx={{
                                                '& .MuiOutlinedInput-root': {
                                                  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'red'
                                                  }
                                                }
                                              }}
                                            />
                                          )}
                                          slotProps={{
                                            textField: { size: 'small', clearable: true }
                                          }}
                                          inputFormat="DD-MM-YYYY"
                                        />
                                      </LocalizationProvider>
                                    </FormControl>
                                  </div>
                                </td>

                                <td>
                                  <div style={{ marginTop: '0px' }}>
                                    <FormControl fullWidth variant="filled" size="small">
                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                          value={row.endDate ? dayjs(row.endDate, 'DD-MM-YYYY') : null}
                                          onChange={(date) => {
                                            const formattedDate = date ? date.format('DD-MM-YYYY') : null;
                                            setRoleTableData((prev) =>
                                              prev.map((r, i) => (i === index ? { ...r, endDate: formattedDate } : r))
                                            );
                                            setRoleTableDataErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                endDate: !formattedDate ? 'Start Date is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          slotProps={{
                                            textField: { size: 'small', clearable: true }
                                          }}
                                          format="DD/MM/YYYY"
                                          error={!!roleTableDataErrors[index]?.endDate}
                                          helperText={roleTableDataErrors[index]?.endDate}
                                        />
                                      </LocalizationProvider>
                                    </FormControl>
                                  </div>
                                </td>
                                {/* <td className="border px-2 py-2">
                                  <DatePicker
                                    selected={row.endDate}
                                    className={roleTableDataErrors[index]?.endDate ? 'error form-control' : 'form-control'}
                                    onChange={(date) => {
                                      setRoleTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, endDate: date } : r)));
                                      setRoleTableDataErrors((prev) => {
                                        const newErrors = [...prev];
                                        newErrors[index] = {
                                          ...newErrors[index],
                                          endDate: !date ? 'End Date is required' : ''
                                        };
                                        return newErrors;
                                      });
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={row.startDate || new Date()}
                                    disabled={!row.startDate}
                                  />
                                  {roleTableDataErrors[index]?.endDate && (
                                    <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                      {roleTableDataErrors[index].endDate}
                                    </div>
                                  )}
                                </td> */}
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
      </div>
      <ToastContainer />
    </>
  );
};
export default FullFeaturedCrudGrid;
