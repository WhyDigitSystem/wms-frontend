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
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ActionButton from 'utils/ActionButton';
import ToastComponent, { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';

export const DesignationMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    active: true,
    designationCode: '',
    designationName: ''
  });
  const [editId, setEditId] = useState('');

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    designationName: '',
    designationCode: ''
  });
  const [listView, setListView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const listViewColumns = [
    { accessorKey: 'designationCode', header: 'Code', size: 140 },
    {
      accessorKey: 'designationName',
      header: 'Designation Name',
      size: 140
    },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];
  const [listViewData, setListViewData] = useState([]);

  useEffect(() => {
    getAllDesignation();
  }, []);

  const getAllDesignation = async () => {
    try {
      const result = await apiCalls('get', `commonmaster/country?orgid=1000000001`);
      setListViewData(result.paramObjectsMap.designationVO);
      console.log('Test', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  const getDesignationById = async (row) => {
    console.log('THE SELECTED COUNTRY ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `commonmaster/country/${row.original.id}`);

      if (response.status === true) {
        const particulardesignation = response.paramObjectsMap.Country;
        setFormData({
          designationCode: particulardesignation.designationCode,
          designationName: particulardesignation.designationName,
          active: particulardesignation.active === 'Active' ? true : false
        });
        setListView(false);
      } else {
        console.error('API Error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const codeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;
    const nameRegex = /^[A-Za-z ]*$/;

    if (name === 'designationCode' && !codeRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else if (name === 'designationName' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      designationName: '',
      designationCode: '',
      active: true
    });
    setFieldErrors({
      designationName: '',
      designationCode: ''
    });
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.designationCode) {
      errors.designationCode = 'Designation Code is required';
    }
    if (!formData.designationName) {
      errors.designationName = 'Designation is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        designationCode: formData.designationCode,
        designationName: formData.designationName,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const result = await apiCalls('post', `commonmaster/createUpdateDesignationCode`, saveFormData);

        if (result.status === true) {
          console.log('Response:', result);
          showToast('success', editId ? ' DesignationCode Updated Successfully' : 'DesignationCode created successfully');
          handleClear();
          getAllDesignation();
          setIsLoading(false);
        } else {
          showToast('error', result.paramObjectsMap.errorMessage || 'DesignationCode creation failed');
          setIsLoading(false);
        }
      } catch (err) {
        console.log('error', err);
        showToast('error', 'DesignationCode creation failed');
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
    setEditMode(false);
    setFormData({
      designationName: '',
      designationCode: ''
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      active: event.target.checked
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
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" /> &nbsp;{' '}
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true} // DISAPLE THE MODAL IF TRUE
              toEdit={getDesignationById}
            />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Designation Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="designationCode"
                  value={formData.designationCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.designationCode}
                  helperText={fieldErrors.designationCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Designation Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="designationName"
                  value={formData.designationName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.designationName}
                  helperText={fieldErrors.designationName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleCheckboxChange} />}
                  label="Active"
                  labelPlacement="end"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <ToastComponent />
      </div>
    </>
  );
};
export default DesignationMaster;
