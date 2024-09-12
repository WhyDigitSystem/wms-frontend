import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, TextField, Checkbox, FormControlLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';
import { getAllActivePartDetails } from 'utils/CommonFunctions';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import CommonReportTable from 'utils/CommonReportTable';

export const StockConsolidationBinWise = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchcode'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [partList, setPartList] = useState([]);
  //   const [formData, setFormData] = useState({
  //     selectedDate: null,
  //     partNo: ''
  //   });
  const [formData, setFormData] = useState({
    selectedDate: dayjs(),
    partNo: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    selectedDate: '',
    partNo: ''
  });
  const [listView, setListView] = useState(false);
  const [rowData, setRowData] = useState([]);
  const reportColumns = [
    { accessorKey: 'partNo', header: 'Part No', size: 140 },
    { accessorKey: 'partDesc', header: 'Part Desc', size: 140 },
    { accessorKey: 'avlQty', header: 'QTY', size: 140 }
  ];

  useEffect(() => {
    getAllPartNo();
  }, []);

  const getAllPartNo = async () => {
    try {
      const partData = await getAllActivePartDetails(loginBranchCode, loginClient, orgId);
      console.log('THE PART DATA ARE:', partData);
      setPartList(partData);
    } catch (error) {
      console.error('Error fetching part data:', error);
    }
  };

  const handleClear = () => {
    // setFormData({
    //   selectedDate: null,
    //   partNo: ''
    // });
    setFormData({
      selectedDate: dayjs(),
      partNo: ''
    });
    setFieldErrors({
      selectedDate: '',
      partNo: ''
    });
    setListView(false);
  };

  const handleSearch = async () => {
    const errors = {};
    if (!formData.selectedDate || formData.selectedDate === null) {
      errors.selectedDate = 'Data is required';
    }
    if (!formData.partNo) {
      errors.partNo = 'partNo is required';
    }

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await apiCalls(
          'get',
          `Reports/getStockConsolidation?branchCode=${loginBranchCode}&client=${loginClient}&customer=${loginCustomer}&orgId=${orgId}&partNo=${formData.partNo}&warehouse=${loginWarehouse}`
        );
        if (response.status === true) {
          console.log('Response:', response);
          setRowData(response.paramObjectsMap.stockDetails);
          setIsLoading(false);
          setListView(true);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Report Fetch failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Report Fetch failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleInputChange = (fieldName) => (event, value) => {
    if (value) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value.partno
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: ''
      }));
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: ''
    }));
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
        <div className="row d-flex ml">
          <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
            <ActionButton title="Search" icon={SearchIcon} onClick={handleSearch} isLoading={isLoading} />
            <ActionButton title="Clear" icon={ClearIcon} onClick={handleClear} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-3">
            <FormControl fullWidth variant="filled" size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Effective Date"
                  value={formData.selectedDate ? dayjs(formData.selectedDate, 'DD-MM-YYYY') : null}
                  onChange={(date) => handleDateChange('selectedDate', date)}
                  slotProps={{
                    textField: { size: 'small', clearable: true }
                  }}
                  format="DD/MM/YYYY"
                  error={fieldErrors.selectedDate}
                  helperText={fieldErrors.selectedDate && 'Required'}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          {/* <div className="col-md-3 mb-3">
            <FormControl fullWidth variant="filled" size="small" error={!!fieldErrors.selectedDate}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Effective Date"
                  value={formData.selectedDate ? dayjs(formData.selectedDate, 'DD-MM-YYYY') : null}
                  onChange={(date) => handleDateChange('selectedDate', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      error={!!fieldErrors.selectedDate} // Apply error styling here
                      helperText={fieldErrors.selectedDate} // Apply helper text here
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 40 } // Consistent height
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-error': {
                          '& fieldset': {
                            borderColor: 'error.main'
                          }
                        }
                      }} // Custom styling for error state
                    />
                  )}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              {fieldErrors.selectedDate && <FormHelperText error>{fieldErrors.selectedDate}</FormHelperText>}
            </FormControl>
          </div> */}

          <div className="col-md-3 mb-3">
            <Autocomplete
              disablePortal
              options={partList}
              getOptionLabel={(option) => option.partno}
              sx={{ width: '100%' }}
              size="small"
              value={formData.partNo ? partList.find((p) => p.partno === formData.partNo) : null}
              onChange={handleInputChange('partNo')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Part No"
                  error={!!fieldErrors.partNo}
                  helperText={fieldErrors.partNo}
                  InputProps={{
                    ...params.InputProps,
                    style: { height: 40 }
                  }}
                />
              )}
            />
          </div>
        </div>
        {listView && (
          <div className="mt-4">
            <CommonReportTable data={rowData} columns={reportColumns} />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default StockConsolidationBinWise;
