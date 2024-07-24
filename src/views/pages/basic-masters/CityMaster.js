import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, TextField, Checkbox, FormControlLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';

export const CityMaster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    cityCode: '',
    cityName: '',
    state: '',
    country: '',
    active: true
  });

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    cityCode: '',
    cityName: '',
    state: '',
    country: ''
  });
  const [listView, setListView] = useState(false);
  const [listViewData, setListViewData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const codeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;
    const nameRegex = /^[A-Za-z ]*$/;

    if (name === 'cityCode' && !codeRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else if (name === 'cityCode' && value.length > 3) {
      setFieldErrors({ ...fieldErrors, [name]: 'Max Length is 3' });
    } else if (name === 'cityName' && !nameRegex.test(value)) {
      setFieldErrors({ ...fieldErrors, [name]: 'Invalid Format' });
    } else {
      setFormData({ ...formData, [name]: name === 'active' ? checked : value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleClear = () => {
    setFormData({
      cityCode: '',
      cityName: '',
      state: '',
      country: '',
      active: true
    });
    setFieldErrors({
      cityCode: '',
      cityName: '',
      state: '',
      country: ''
    });
  };

  const getAllCities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commonmaster/city?orgid=1000000001`);
      console.log('API Response:', response);

      if (response.status === 200) {
        setListViewData(response.data.paramObjectsMap.cityVO);
      } else {
        console.error('API Error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCityById = async (row) => {
    console.log('THE SELECTED CITY ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commonmaster/city/${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === 200) {
        setListView(false);
        const particularCity = response.data.paramObjectsMap.city;

        setFormData({
          cityCode: particularCity.cityCode,
          cityName: particularCity.cityName,
          active: particularCity.active === 'Active' ? true : false
        });
      } else {
        console.error('API Error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.cityCode) {
      errors.cityCode = 'City Code is required';
    }
    if (!formData.cityName) {
      errors.cityName = 'City Name is required';
    }
    if (!formData.state) {
      errors.state = 'State is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const saveData = {
        ...(editId && { id: editId }),
        active: formData.active,
        cityCode: formData.cityCode,
        cityName: formData.cityName,
        state: formData.state,
        country: formData.country,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE', saveData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/commonmaster/createUpdateCity`, formData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            showToast('success', editId ? ' City Updated Successfully' : 'City created successfully');
            handleClear();
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'City creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'City creation failed');
          setIsLoading(false);
        });
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const listViewColumns = [
    { accessorKey: 'cityCode', header: 'Code', size: 140 },
    { accessorKey: 'cityName', header: 'City', size: 140 },
    { accessorKey: 'state', header: 'State', size: 140 },
    { accessorKey: 'country', header: 'Country', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140, Cell: ({ cell: { value } }) => (value ? 'Active' : 'Inactive') }
  ];

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
                  label="Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="cityCode"
                  value={formData.cityCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.cityCode}
                  helperText={fieldErrors.cityCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.cityName}
                  helperText={fieldErrors.cityName}
                />
              </div>

              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.country}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select labelId="country-label" label="Country" value={formData.country} onChange={handleInputChange} name="country">
                    <MenuItem value="INDIA">INDIA</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                  </Select>
                  {fieldErrors.country && <FormHelperText>{fieldErrors.country}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.state}>
                  <InputLabel id="state-label">State</InputLabel>
                  <Select labelId="state-label" label="State" value={formData.state} onChange={handleInputChange} name="state">
                    <MenuItem value="TAMILNADU">TAMILNADU</MenuItem>
                    <MenuItem value="KARNATAKA">KARNATAKA</MenuItem>
                    <MenuItem value="KERALA">KERALA</MenuItem>
                    <MenuItem value="ANDRAPRADESH">ANDRAPRADESH</MenuItem>
                  </Select>
                  {fieldErrors.state && <FormHelperText>{fieldErrors.state}</FormHelperText>}
                </FormControl>
              </div>
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
      <ToastContainer />
    </>
  );
};

export default CityMaster;
