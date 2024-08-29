import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { encryptPassword } from 'views/utilities/encryptPassword';
import ActionButton from 'utils/ActionButton';
import ToastComponent, { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';

const CreateCompany = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [editId, setEditId] = useState('');
  const [formData, setFormData] = useState({
    companyCode: '',
    companyName: '',
    companyAdminName: '',
    companyAdminEmail: '',
    companyAdminPwd: '',
    active: true
  });

  const [fieldErrors, setFieldErrors] = useState({
    companyCode: '',
    companyName: '',
    companyAdminName: '',
    companyAdminEmail: '',
    companyAdminPwd: '',
    active: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'companyCode', header: 'Company Code', size: 140 },
    {
      accessorKey: 'companyName',
      header: 'Company',
      size: 140
    },
    {
      accessorKey: 'employeeName',
      header: 'Admin',
      size: 140
    },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  useEffect(() => {
    getAllCompanies();
  }, []);
  const getAllCompanies = async () => {
    try {
      const response = await apiCalls('get', `commonmaster/company`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.companyVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getCompanyById = async (row) => {
    console.log('THE SELECTED COMPANY ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `commonmaster/company/${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularCompany = response.paramObjectsMap.companyVO[0];
        console.log('THE PARTICULAR COMPANY DETAILS ARE:', particularCompany);

        setFormData({
          companyCode: particularCompany.companyCode,
          companyName: particularCompany.companyName,
          companyAdminName: particularCompany.employeeName,
          companyAdminEmail: particularCompany.email,
          active: particularCompany.active === 'Active' ? true : false
        });
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const nameRegex = /^[A-Za-z ]*$/;
    const companyNameRegex = /^[A-Za-z 0-9@_\-*]*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const companyCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    if (name === 'companyName' && !companyNameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Only alphabetic characters and @*_- are allowed' });
    } else if (name === 'companyCode' && !companyCodeRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else if (name === 'companyAdminName' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else {
      if (name === 'active') {
        setFormData({ ...formData, [name]: checked });
      } else if (name === 'companyAdminEmail') {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value.toUpperCase() });
      }

      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      companyCode: '',
      companyName: '',
      companyAdminName: '',
      companyAdminEmail: '',
      companyAdminPwd: '',
      active: true
    });
    setFieldErrors({
      companyCode: '',
      companyName: '',
      companyAdminName: '',
      companyAdminEmail: '',
      companyAdminPwd: ''
    });
    setEditId('');
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.companyCode) {
      errors.companyCode = 'Company Code is required';
    }
    if (!formData.companyName) {
      errors.companyName = 'Company is required';
    }
    if (!formData.companyAdminName) {
      errors.companyAdminName = 'Admin Name is required';
    }
    if (!formData.companyAdminEmail) {
      errors.companyAdminEmail = 'Email Id is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      const saveData = {
        ...(editId && { id: editId }),
        active: formData.active,
        address: '',
        city: '',
        companyCode: formData.companyCode,
        companyName: formData.companyName,
        ceo: '',
        country: '',
        createdBy: loginUserName,
        currency: '',
        email: formData.companyAdminEmail,
        employeeCode: '',
        employeeName: formData.companyAdminName,
        mainCurrency: '',
        note: '',
        password: encryptPassword('Wds@2022'),
        phone: '',
        state: '',
        gst: '',
        webSite: '',
        zip: '',
        orgId: orgId
      };
      console.log('DATA TO SAVE IS:', saveData);

      try {
        const method = editId ? 'put' : 'post';
        const url = editId ? 'commonmaster/updateCompany' : 'commonmaster/company';

        const response = await apiCalls(method, url, saveData);
        if (response.status === true) {
          console.log('Response:', response);
          showToast('success', editId ? ' Company Updated Successfully' : 'Company created successfully');

          handleClear();
          getAllCompanies();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Company creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Company creation failed');

        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
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
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              // editCallback={editEmployee}
              blockEdit={true} // DISAPLE THE MODAL IF TRUE
              toEdit={getCompanyById}
            />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyCode"
                  value={formData.companyCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyCode}
                  helperText={fieldErrors.companyCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyName}
                  helperText={fieldErrors.companyName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Admin Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminName"
                  value={formData.companyAdminName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminName}
                  helperText={fieldErrors.companyAdminName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Admin Email Id"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminEmail"
                  value={formData.companyAdminEmail}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminEmail}
                  helperText={fieldErrors.companyAdminEmail}
                />
              </div>
              {/* <div className="col-md-3 mb-3">
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="companyAdminPwd"
                  value={formData.companyAdminPwd}
                  onChange={handleInputChange}
                  error={!!fieldErrors.companyAdminPwd}
                  helperText={fieldErrors.companyAdminPwd}
                />
              </div> */}
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleInputChange} name="active" />}
                  label="Active"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <ToastComponent />
    </>
  );
};

export default CreateCompany;
