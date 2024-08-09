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

export const LocationTypeMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    active: true,
    binType: ''
  });
  const [editId, setEditId] = useState('');

  const theme = useTheme();
  const anchorRef = useRef(null);
  const inputRef = useRef(null);
  const [fieldErrors, setFieldErrors] = useState({
    binType: ''
  });
  const [listView, setListView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const listViewColumns = [
    { accessorKey: 'binType', header: 'Bin Type', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];
  const [listViewData, setListViewData] = useState([]);

  useEffect(() => {
    console.log('LISTVIEW FIELD CURRENT VALUE IS', listView);
    getAllLocationTypes();
  }, []);

  const getAllLocationTypes = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/locationType?orgid=${orgId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.locationTypeVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const getAllLocationTypes = async () => {
  //   try {
  //     const response = await apiCalls('get', `warehousemastercontroller/locationType?orgId=${orgId}`);

  //     console.log('API Response:', response);

  //     if (response.status === 200) {
  //       setListViewData(response.paramObjectsMap.countryVO);
  //     } else {
  //       console.error('API Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const getLocationTypeById = async (row) => {
    console.log('THE SELECTED COUNTRY ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/warehousemastercontroller/locationType/${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === 200) {
        setListView(false);
        const particularLocationType = response.data.paramObjectsMap.locationTypeVO;

        setFormData({
          binType: particularLocationType.binType,
          active: particularLocationType.active === 'Active' ? true : false
        });
      } else {
        console.error('API Error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, selectionStart, selectionEnd } = e.target;

    const nameRegex = /^[A-Za-z0-9  ]*$/;
    // const numericRegex = /^[0-9]*$/;

    let errorMessage = '';

    switch (name) {
      case 'binType':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only Alphanumeric characters are allowed';
        }
        // else if (value.length > 10) {
        //   errorMessage = 'Invalid Format';
        // }
        break;

      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

      // Convert the input value to uppercase
      const upperCaseValue = value.toUpperCase();

      // Set the form data and preserve the cursor position
      setFormData((prevData) => ({ ...prevData, [name]: upperCaseValue }));

      // Use a timeout to ensure the cursor position is set after the state update
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }, 0);
    }
  };

  const handleClear = () => {
    setFormData({
      binType: ''
    });
    setFieldErrors({
      binType: ''
    });
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.binType) {
      errors.binType = 'Bin Type is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        binType: formData.binType,
        orgId: orgId,
        createdBy: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `warehousemastercontroller/createUpdateLocationType`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response.data);

          showToast('success', editId ? ' LocationType Updated Successfully' : 'LocationType created successfully');

          handleClear();
          getAllLocationTypes();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'LocationType creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', error.message);
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
      binType: ''
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
            <ActionButton
              title="Save"
              icon={SaveIcon}
              isLoading={isLoading}
              onClick={() => handleSave()}
              margin="0 10px 0 10px"
            /> &nbsp;{' '}
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true} // DISAPLE THE MODAL IF TRUE
              toEdit={getLocationTypeById}
            />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Bin Type"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="binType"
                  value={formData.binType}
                  onChange={handleInputChange}
                  error={!!fieldErrors.binType}
                  helperText={fieldErrors.binType}
                  inputRef={inputRef}
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
export default LocationTypeMaster;
