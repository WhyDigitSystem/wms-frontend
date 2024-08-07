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
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { getAllActiveBranches, getAllActiveEmployees } from 'utils/CommonFunctions';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { decryptPassword, encryptPassword } from 'views/utilities/encryptPassword';
import GridOnIcon from '@mui/icons-material/GridOn';

export const DocumentTypeMappingMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    branchName: '',
    branchCode: '',
    finYr: '',
    finYrId: ''
  });
  const [value, setValue] = useState(0);

  const [mapTableData, setMapTableData] = useState([
    {
      id: 1,
      screenName: '',
      screenCode: '',
      client: '',
      clientCode: '',
      docCode: '',
      branch: '',
      branchCode: '',
      prefix: '',
      finyr: '',
      identifier: ''
    }
  ]);
  const [mapTableDataErrors, setMapTableDataErrors] = useState([
    {
      screenName: '',
      screenCode: '',
      client: '',
      clientCode: '',
      docCode: '',
      branch: '',
      branchCode: '',
      prefix: '',
      finyr: '',
      identifier: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    branchName: '',
    branchCode: '',
    finYr: '',
    finYrId: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'branchName', header: 'Employee', size: 140 },
    { accessorKey: 'userName', header: 'Emp Code', size: 140 },
    { accessorKey: 'userType', header: 'User Type', size: 140 },
    { accessorKey: 'email', header: 'Email', size: 140 },
    {
      accessorKey: 'roleAccessVO',
      header: 'Roles',
      Cell: ({ cell }) => {
        const roles = cell
          .getValue()
          .map((role) => role.role)
          .join(', ');
        return roles;
      }
    },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];
  const [listViewData, setListViewData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [clientList, setClientList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getAllBranches();
    // getAllUsers();
  }, []);

  const getAllBranches = async () => {
    try {
      const branchData = await getAllActiveBranches(orgId);
      console.log('THE BRANCH LIST IS:', branchData);

      setBranchList(branchData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };
  const getAllCustomers = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/customer?orgid=${orgId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setCustomerList(response.paramObjectsMap.CustomerVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getAllClientsByCustomer = async (customer) => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/client?customer=${customer}&orgid=${orgId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setClientList(response.paramObjectsMap.clientVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await apiCalls('get', `auth/allUsersByOrgId?orgId=${orgId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.userVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getUserById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `auth/getUserById?userId=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularUser = response.paramObjectsMap.userVO;
        const foundBranch1 = branchList.find((branch) => branch.branchCode === particularUser.branchAccessibleVO.branchcode);
        console.log('THE FOUND BRANCH 1 IS:', foundBranch1);

        setFormData({
          branchCode: particularUser.userName,
          branchName: particularUser.branchName,
          active: particularUser.active === 'Active' ? true : false
        });
        setMapTableData(
          particularUser.roleAccessVO.map((role) => ({
            id: role.id,
            role: role.role,
            roleId: role.roleId,
            startDate: role.startDate,
            endDate: role.endDate
          }))
        );

        // const alreadySelectedBranch = particularUser.branchAccessibleVO.map((role) => {
        //   const foundBranch = branchList.find((branch) => branch.branchCode === role.branchcode);
        //   console.log(`Searching for branch with code ${role.branchcode}:`, foundBranch);
        //   return {
        //     id: role.id,
        //     branchCode: foundBranch ? foundBranch.branchCode : 'Not Found',
        //     branch: foundBranch.branch ? foundBranch.branch : 'Not Found'
        //   };
        // });
        // setBranchTableData(alreadySelectedBranch);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    let errorMessage = '';
    switch (name) {
      case 'mobileNo':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;

      case 'nickName':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only alphabet are allowed';
        }
        break;
    }

    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      if (name === 'branchName') {
        const selectedBranch = branchList.find((branch) => branch.branch === value);
        if (selectedBranch) {
          setFormData((prevData) => ({
            ...prevData,
            branchName: selectedBranch.branch,
            branchCode: selectedBranch.branchCode
          }));
        }
      } else if (name === 'finYr') {
        const selectedFinYr = branchList.find((branch) => branch.branch === value);
        if (selectedFinYr) {
          setFormData((prevData) => ({
            ...prevData,
            finYr: selectedFinYr.branch,
            finYrId: selectedFinYr.branchCode
          }));
        }
      }
      setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleClear = () => {
    setFormData({
      branchName: '',
      branchCode: '',
      active: true
    });
    setMapTableData([
      {
        id: 1,
        screenName: '',
        screenCode: '',
        client: '',
        clientCode: '',
        docCode: '',
        branch: '',
        branchCode: '',
        prefix: '',
        finyr: '',
        identifier: ''
      }
    ]);
    setFieldErrors({
      branchName: '',
      branchCode: ''
    });
    setMapTableDataErrors('');
    setEditId('');
  };

  const handleSave = async () => {
    console.log('handle save is working');

    const errors = {};
    if (!formData.branchName) {
      errors.branchName = 'Employee Name is required';
    }

    setFieldErrors(errors);

    // setMapTableDataErrors(newTableErrors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const mappingVo = mapTableData.map((row) => ({
        screenName: row.screenName,
        screenCode: row.screenCode,
        client: row.client,
        clientCode: row.clientCode,
        docCode: row.docCode,
        branch: row.branch,
        branchCode: row.branchCode,
        prefix: row.prefix,
        finyr: row.finyr,
        identifier: row.identifier
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        branchName: formData.branchName,
        userType: formData.userType,
        email: formData.email,
        password: encryptPassword(formData.password),
        mobileNo: formData.mobileNo,
        nickName: formData.nickName,
        userName: formData.branchCode,
        mapVo: mappingVo,
        active: formData.active,
        orgId: orgId,
        createdBy: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `auth/signup`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          showToast('success', editId ? 'User Updated Successfully' : 'User created successfully');
          handleClear();
          getAllUsers();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'User creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'User creation failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClose = () => {
    setFormData({
      branchName: '',
      branchCode: ''
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
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" />
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getUserById} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.branchName}>
                  <InputLabel id="branchName-label">Branch Name</InputLabel>
                  <Select
                    labelId="branchName-label"
                    label="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    name="branchName"
                  >
                    {branchList?.map((row) => (
                      <MenuItem key={row.id} value={row.branch}>
                        {row.branch}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.branchName && <FormHelperText>{fieldErrors.branchName}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.finYr}>
                  <InputLabel id="finYr-label">Fin Year</InputLabel>
                  <Select labelId="finYr-label" label="finYr" value={formData.finYr} onChange={handleInputChange} name="finYr">
                    {branchList?.map((row) => (
                      <MenuItem key={row.id} value={row.branch}>
                        {row.branch}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.finYr && <FormHelperText>{fieldErrors.finYr}</FormHelperText>}
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
                  <Tab value={0} label="Mapping Details" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        {/*<ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} /> */}

                        <ActionButton title="Fill Grid" icon={GridOnIcon} />
                      </div>

                      {/* <div className="row mt-2">
                        <div className="col-lg-12"> */}
                      <div className="table-responsive mt-3">
                        <table className="table table-bordered ">
                          <thead>
                            <tr style={{ backgroundColor: '#673AB7' }}>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                S.No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Screen Name
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Screen Code
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Client
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Client Code
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Doc Code
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Branch
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                Branch Code
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Prefix
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Fin Yr
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                Identifier
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {mapTableData > 0 &&
                              mapTableData.map((row, index) => (
                                <tr key={row.id}>
                                  {/* <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, roleTableData, setRoleTableData)}
                                      />
                                    </td> */}
                                  <td className="text-center">
                                    <div className="pt-2">{index + 1}</div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {/* </div>
                      </div> */}
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
export default DocumentTypeMappingMaster;
