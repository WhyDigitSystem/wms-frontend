import React, { useRef, useState } from 'react';
import axios from 'axios';
import { TextField, FormControl, InputLabel, MenuItem, Select, Button, ButtonBase, Avatar, Tooltip, FormHelperText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import CommonListViewTable from './CommonListViewTable';
import { useTheme } from '@mui/material/styles';

const StateMaster = () => {
  const [orgId, setOrgId] = useState('1');
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [formData, setFormData] = useState({
    stateNo: '',
    stateCode: '',
    stateName: '',
    country: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    stateNo: '',
    stateCode: '',
    stateName: '',
    country: ''
  });

  const [listView, setListView] = useState(false);
  const [listViewData, setListViewData] = useState([]);
  const listViewColumns = [
    { accessorKey: 'stateCode', header: 'Code', size: 140 },
    { accessorKey: 'stateName', header: 'State', size: 140 },
    { accessorKey: 'country', header: 'Country', size: 140 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      stateNo: '',
      stateCode: '',
      stateName: '',
      country: ''
    });
    setFieldErrors({
      stateNo: '',
      stateCode: '',
      stateName: '',
      country: ''
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!formData.stateNo) {
      errors.stateNo = 'State Number is required';
    }
    if (!formData.stateCode) {
      errors.stateCode = 'State Code is required';
    }
    if (!formData.stateName) {
      errors.stateName = 'State Name is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (Object.keys(errors).length === 0) {
      const saveData = {};
      console.log('DATA TO SAVE IS:', formData);

      // axios
      //   .post(`${process.env.REACT_APP_API_URL}/api/state`, formData)
      //   .then((response) => {
      //     console.log('Response:', response.data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    // Implement view functionality
    setListView(!listView);
  };

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
      <div className="row d-flex ml">
        <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
          <Tooltip title="Search" placement="top">
            <ButtonBase sx={{ borderRadius: '12px', marginRight: '10px' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                ref={anchorRef}
                aria-haspopup="true"
                color="inherit"
              >
                <SearchIcon size="1.3rem" stroke={1.5} />
              </Avatar>
            </ButtonBase>
          </Tooltip>

          <Tooltip title="Clear" placement="top">
            {' '}
            <ButtonBase sx={{ borderRadius: '12px', marginRight: '10px' }} onClick={handleClear}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                ref={anchorRef}
                aria-haspopup="true"
                color="inherit"
              >
                <ClearIcon size="1.3rem" stroke={1.5} />
              </Avatar>
            </ButtonBase>
          </Tooltip>

          <Tooltip title="List View" placement="top">
            {' '}
            <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleView}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                ref={anchorRef}
                aria-haspopup="true"
                color="inherit"
              >
                <FormatListBulletedTwoToneIcon size="1.3rem" stroke={1.5} />
              </Avatar>
            </ButtonBase>
          </Tooltip>
          <Tooltip title="Save" placement="top">
            {' '}
            <ButtonBase sx={{ borderRadius: '12px', marginLeft: '10px' }} onClick={handleSave}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                ref={anchorRef}
                aria-haspopup="true"
                color="inherit"
              >
                <SaveIcon size="1.3rem" stroke={1.5} />
              </Avatar>
            </ButtonBase>
          </Tooltip>
        </div>
      </div>

      {listView ? (
        <div className="mt-4">
          <CommonListViewTable
            data={listViewData}
            columns={listViewColumns}
            // Other props as needed
          />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-3 mb-3">
            <TextField
              label="State Number"
              variant="outlined"
              size="small"
              fullWidth
              name="stateNo"
              value={formData.stateNo}
              onChange={handleInputChange}
              error={!!fieldErrors.stateNo}
              helperText={fieldErrors.stateNo}
            />
          </div>
          <div className="col-md-3 mb-3">
            <TextField
              label="State Code"
              variant="outlined"
              size="small"
              fullWidth
              name="stateCode"
              value={formData.stateCode}
              onChange={handleInputChange}
              error={!!fieldErrors.stateCode}
              helperText={fieldErrors.stateCode}
            />
          </div>
          <div className="col-md-3 mb-3">
            <TextField
              label="State Name"
              variant="outlined"
              size="small"
              fullWidth
              name="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
              error={!!fieldErrors.stateName}
              helperText={fieldErrors.stateName}
            />
          </div>
          <div className="col-md-3 mb-3">
            <FormControl variant="outlined" size="small" fullWidth error={!!fieldErrors.country}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select labelId="country-label" label="Country" value={formData.country} onChange={handleInputChange} name="country">
                <MenuItem value="INDIA">INDIA</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
              </Select>
              {fieldErrors.country && <FormHelperText>{fieldErrors.country}</FormHelperText>}
            </FormControl>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateMaster;
