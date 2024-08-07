// import React, { useState, useRef, useEffect } from 'react';
// import ClearIcon from '@mui/icons-material/Clear';
// import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
// import SaveIcon from '@mui/icons-material/Save';
// import SearchIcon from '@mui/icons-material/Search';
// import { TextField, Checkbox, FormControlLabel, FormHelperText, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers';
// import CommonListViewTable from './CommonListViewTable';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import ActionButton from 'utils/ActionButton';
// import { showToast } from 'utils/toast-component';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import { getAllActiveBranches } from 'utils/CommonFunctions';
// import apiCalls from 'apicall';

// export const FinYearMaster = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [editId, setEditId] = useState('');
//   const [branchList, setBranchList] = useState([]);
//   const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
//   const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

//   const [formData, setFormData] = useState({
//     empCode: '',
//     empName: '',
//     gender: '',
//     branch: '',
//     branchCode: '',
//     dept: '',
//     designation: '',
//     startDate: null,
//     endDate: null,
//     active: true
//   });

//   const theme = useTheme();
//   const anchorRef = useRef(null);

//   const [fieldErrors, setFieldErrors] = useState({
//     empCode: '',
//     empName: '',
//     gender: '',
//     branch: '',
//     branchCode: '',
//     dept: '',
//     designation: '',
//     startDate: '',
//     endDate: ''
//   });
//   const [listView, setListView] = useState(false);
//   const [listViewData, setListViewData] = useState([]);

//   useEffect(() => {
//     getAllBranches();
//     getAllEmployees();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, checked } = e.target;
//     const codeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;
//     const nameRegex = /^[A-Za-z ]*$/;

//     if (name === 'empCode' && !codeRegex.test(value)) {
//       setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
//     } else if (name === 'empName' && !nameRegex.test(value)) {
//       setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
//     } else if (name === 'branch') {
//       const selectedBranch = branchList.find((br) => br.branch === value);
//       if (selectedBranch) {
//         setFormData((prevData) => ({
//           ...prevData,
//           branch: value,
//           branchCode: selectedBranch.branchCode
//         }));
//       }
//     } else {
//       setFormData({ ...formData, [name]: value.toUpperCase() });
//       setFieldErrors({ ...fieldErrors, [name]: '' });
//     }
//   };

//   // const handleDateChange = (field, date) => {
//   //   const formattedDate = date ? dayjs(date).format('DD-MM-YYYY') : null;

//   //   setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));

//   //   // Update validation errors
//   //   setFieldErrors((prevErrors) => {
//   //     const newErrors = { ...prevErrors };
//   //     if (field === 'startDate') {
//   //       // If Start Date is updated, clear End Date if it's before the new Start Date
//   //       if (formData.endDate && dayjs(formData.endDate, 'DD-MM-YYYY').isBefore(dayjs(date))) {
//   //         newErrors.endDate = 'End Date cannot be before Start Date';
//   //         setFormData((prev) => ({ ...prev, endDate: null }));
//   //       } else {
//   //         newErrors.startDate = !date ? 'Start Date is required' : '';
//   //       }
//   //     } else if (field === 'endDate') {
//   //       // Validate End Date against Start Date
//   //       if (date && formData.startDate && dayjs(date).isBefore(dayjs(formData.startDate))) {
//   //         newErrors.endDate = 'End Date cannot be before Start Date';
//   //       } else {
//   //         newErrors.endDate = !date ? 'End Date is required' : '';
//   //       }
//   //     }
//   //     return newErrors;
//   //   });
//   // };

//   const handleDateChange = (field, date) => {
//     // Ensure date is formatted correctly
//     const formattedDate = date ? dayjs(date).format('DD-MM-YYYY') : null;

//     setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));

//     setFieldErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };

//       if (field === 'startDate') {
//         // Clear End Date if it's before the new Start Date
//         if (formData.endDate && dayjs(formData.endDate, 'DD-MM-YYYY').isBefore(dayjs(date))) {
//           newErrors.endDate = 'End Date cannot be before Start Date';
//           setFormData((prev) => ({ ...prev, endDate: null }));
//         }
//         newErrors.startDate = !date ? 'Start Date is required' : '';
//       } else if (field === 'endDate') {
//         // Validate End Date against Start Date
//         if (date && formData.startDate && dayjs(date).isBefore(dayjs(formData.startDate, 'DD-MM-YYYY'))) {
//           newErrors.endDate = 'End Date cannot be before Start Date';
//         } else {
//           newErrors.endDate = !date ? 'End Date is required' : '';
//         }
//       }
//       return newErrors;
//     });
//   };

//   const handleClear = () => {
//     setFormData({
//       empCode: '',
//       empName: '',
//       gender: '',
//       branch: '',
//       branchCode: '',
//       dept: '',
//       designation: '',
//       startDate: null,
//       endDate: null,
//       active: true
//     });
//     setFieldErrors({
//       empCode: '',
//       empName: '',
//       gender: '',
//       branch: '',
//       branchCode: '',
//       dept: '',
//       designation: '',
//       startDate: '',
//       endDate: ''
//     });
//   };

//   const getAllBranches = async () => {
//     try {
//       const branchData = await getAllActiveBranches(orgId);
//       setBranchList(branchData);
//     } catch (error) {
//       console.error('Error fetching country data:', error);
//     }
//   };

//   const getAllEmployees = async () => {
//     try {
//       const response = await apiCalls('get', `warehousemastercontroller/getAllEmployeeByOrgId?orgId=${orgId}`);
//       console.log('API Response:', response);

//       if (response.status === true) {
//         setListViewData(response.paramObjectsMap.employeeVO);
//       } else {
//         console.error('API Error:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const getEmployeeById = async (row) => {
//     console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
//     setEditId(row.original.id);
//     try {
//       const response = await apiCalls('get', `warehousemastercontroller/employee/${row.original.id}`);
//       console.log('API Response:', response);

//       if (response.status === true) {
//         setListView(false);
//         const particularEmp = response.paramObjectsMap.Employee;
//         const selectedBranch = branchList.find((br) => br.branch === particularEmp.branch);
//         console.log('THE SELECTED BRANCH IS:', selectedBranch);

//         setFormData({
//           empCode: particularEmp.employeeCode,
//           empName: particularEmp.employeeName,
//           gender: particularEmp.gender,
//           dept: particularEmp.department,
//           designation: particularEmp.designation,
//           branch: particularEmp.branch,
//           branchCode: selectedBranch ? selectedBranch.branchCode : '', // Handle case where selectedBranch might be undefined
//           startDate: particularEmp.dateOfBirth,
//           endDate: particularEmp.joiningDate,
//           active: particularEmp.active === 'Active' ? true : false
//         });
//       } else {
//         console.error('API Error:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSave = async () => {
//     const errors = {};
//     if (!formData.empCode) {
//       errors.empCode = 'Employee Code is required';
//     }
//     if (!formData.empName) {
//       errors.empName = 'Employee Name is required';
//     }
//     if (!formData.gender) {
//       errors.gender = 'Gender is required';
//     }
//     if (!formData.branch) {
//       errors.branch = 'Branch is required';
//     }
//     if (!formData.dept) {
//       errors.dept = 'Department is required';
//     }
//     if (!formData.designation) {
//       errors.designation = 'Designation is required';
//     }
//     if (!formData.startDate) {
//       errors.startDate = 'Date of Birth is required';
//     }
//     if (!formData.endDate) {
//       errors.endDate = 'Date of Joining is required';
//     }

//     if (Object.keys(errors).length === 0) {
//       setIsLoading(true);
//       const saveFormData = {
//         ...(editId && { id: editId }),
//         // active: formData.active,
//         active: true,
//         employeeCode: formData.empCode,
//         employeeName: formData.empName,
//         gender: formData.gender,
//         branch: formData.branch,
//         branchCode: formData.branchCode,
//         department: formData.dept,
//         designation: formData.designation,
//         dateOfBirth: formData.startDate,
//         joiningdate: formData.endDate,
//         orgId: orgId,
//         createdBy: loginUserName
//       };
//       console.log('DATA TO SAVE', saveFormData);

//       try {
//         const response = await apiCalls('put', `warehousemastercontroller/createUpdateEmployee`, saveFormData);
//         if (response.status === true) {
//           console.log('Response:', response);
//           showToast('success', editId ? 'Employee Updated Successfully' : 'Employee created successfully');
//           handleClear();
//           getAllEmployees();
//           setIsLoading(false);
//         } else {
//           showToast('error', response.paramObjectsMap.errorMessage || 'Employee creation failed');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         showToast('error', 'Employee creation failed');
//         setIsLoading(false);
//       }
//     } else {
//       setFieldErrors(errors);
//     }
//   };

//   const handleView = () => {
//     setListView(!listView);
//   };

//   const listViewColumns = [
//     { accessorKey: 'employeeCode', header: 'Emp Code', size: 140 },
//     { accessorKey: 'employeeName', header: 'Employee', size: 140 },
//     { accessorKey: 'branch', header: 'Branch', size: 140 },
//     { accessorKey: 'department', header: 'Dept', size: 140 },
//     { accessorKey: 'designation', header: 'Designation', size: 140 },
//     { accessorKey: 'joiningDate', header: 'Joining Date', size: 140 },
//     { accessorKey: 'active', header: 'Active', size: 140 }
//   ];

//   return (
//     <>
//       <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
//         <div className="row d-flex ml">
//           <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
//             <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
//             <ActionButton title="Clear" icon={ClearIcon} onClick={handleClear} />
//             <ActionButton title="List View" icon={FormatListBulletedTwoToneIcon} onClick={handleView} />
//             <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" />
//           </div>
//         </div>
//         {listView ? (
//           <div className="mt-4">
//             <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getEmployeeById} />
//           </div>
//         ) : (
//           <>
//             <div className="row">
//               <div className="col-md-3 mb-3">
//                 <TextField
//                   label="Code"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   name="empCode"
//                   value={formData.empCode}
//                   onChange={handleInputChange}
//                   error={!!fieldErrors.empCode}
//                   helperText={fieldErrors.empCode}
//                 />
//               </div>
//               <div className="col-md-3 mb-3">
//                 <TextField
//                   label="Name"
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   name="empName"
//                   value={formData.empName}
//                   onChange={handleInputChange}
//                   error={!!fieldErrors.empName}
//                   helperText={fieldErrors.empName}
//                 />
//               </div>

//               <div className="col-md-3 mb-3">
//                 <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.gender}>
//                   <InputLabel id="gender-label">Gender</InputLabel>
//                   <Select labelId="gender-label" label="Gender" value={formData.gender} onChange={handleInputChange} name="gender">
//                     <MenuItem value="MALE">Male</MenuItem>
//                     <MenuItem value="FEMALE">Female</MenuItem>
//                   </Select>
//                   {fieldErrors.gender && <FormHelperText>{fieldErrors.gender}</FormHelperText>}
//                 </FormControl>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.branch}>
//                   <InputLabel id="branch-label">Branch</InputLabel>
//                   <Select labelId="branch-label" label="Branch" value={formData.branch} onChange={handleInputChange} name="branch">
//                     {branchList?.map((row) => (
//                       <MenuItem key={row.id} value={row.branch}>
//                         {row.branch}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   {fieldErrors.branch && <FormHelperText>{fieldErrors.branch}</FormHelperText>}
//                 </FormControl>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.dept}>
//                   <InputLabel id="dept-label">Department</InputLabel>
//                   <Select labelId="dept-label" label="Department" value={formData.dept} onChange={handleInputChange} name="dept">
//                     <MenuItem value="DEPT1">DEPT1</MenuItem>
//                     <MenuItem value="DEPT2">DEPT2</MenuItem>
//                   </Select>
//                   {fieldErrors.dept && <FormHelperText>{fieldErrors.dept}</FormHelperText>}
//                 </FormControl>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.designation}>
//                   <InputLabel id="designation-label">Designation</InputLabel>
//                   <Select
//                     labelId="designation-label"
//                     label="Designation"
//                     value={formData.designation}
//                     onChange={handleInputChange}
//                     name="designation"
//                   >
//                     <MenuItem value="DESIGNATION1">DESIGNATION1</MenuItem>
//                     <MenuItem value="DESIGNATION2">DESIGNATION2</MenuItem>
//                   </Select>
//                   {fieldErrors.designation && <FormHelperText>{fieldErrors.designation}</FormHelperText>}
//                 </FormControl>
//               </div>
//               {/* <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Date of Birth"
//                       value={formData.startDate ? dayjs(formData.startDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('startDate', date)}
//                       slotProps={{
//                         textField: { size: 'small', clearable: true }
//                       }}
//                       format="DD/MM/YYYY"
//                       error={fieldErrors.startDate}
//                       helperText={fieldErrors.startDate && 'Required'}
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div>
//               <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Date of Join"
//                       value={formData.endDate ? dayjs(formData.endDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('endDate', date)}
//                       slotProps={{
//                         textField: { size: 'small', clearable: true }
//                       }}
//                       format="DD/MM/YYYY"
//                       error={fieldErrors.endDate}
//                       helperText={fieldErrors.endDate && 'Required'}
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div> */}
//               {/* <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Start Date"
//                       value={formData.startDate ? dayjs(formData.startDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('startDate', date)}
//                       slotProps={{
//                         textField: { size: 'small', clearable: true }
//                       }}
//                       // renderInput={(params) => (
//                       //   <TextField {...params} size="small" error={!!fieldErrors.startDate} helperText={fieldErrors.startDate} />
//                       // )}
//                       format="DD/MM/YYYY"
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div>

//               <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="End Date"
//                       value={formData.endDate ? dayjs(formData.endDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('endDate', date)}
//                       // renderInput={(params) => (
//                       //   <TextField {...params} size="small" error={!!fieldErrors.endDate} helperText={fieldErrors.endDate} fullWidth />
//                       // )}
//                       slotProps={{
//                         textField: { size: 'small', clearable: true }
//                       }}
//                       format="DD/MM/YYYY"
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div> */}

//               <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Start Date"
//                       value={formData.startDate ? dayjs(formData.startDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('startDate', date)}
//                       renderInput={(params) => (
//                         <TextField {...params} size="small" error={!!fieldErrors.startDate} helperText={fieldErrors.startDate} />
//                       )}
//                       format="DD/MM/YYYY"
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div>

//               <div className="col-md-3 mb-3">
//                 <FormControl fullWidth variant="filled" size="small">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="End Date"
//                       value={formData.endDate ? dayjs(formData.endDate, 'DD-MM-YYYY') : null}
//                       onChange={(date) => handleDateChange('endDate', date)}
//                       renderInput={(params) => (
//                         <TextField {...params} size="small" error={!!fieldErrors.endDate} helperText={fieldErrors.endDate} />
//                       )}
//                       format="DD/MM/YYYY"
//                       minDate={formData.startDate ? dayjs(formData.startDate, 'DD-MM-YYYY').toDate() : new Date()}
//                       disabled={!formData.startDate}
//                     />
//                   </LocalizationProvider>
//                 </FormControl>
//               </div>

//               <div className="col-md-3 mb-3">
//                 <FormControlLabel
//                   control={<Checkbox checked={formData.active} onChange={handleInputChange} name="active" />}
//                   label="Active"
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default FinYearMaster;
import React from 'react';

const FinYearMaster = () => {
  return <div>FinYearMaster</div>;
};

export default FinYearMaster;
