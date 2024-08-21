import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const LocationMovement = () => {
  const [orgId, setOrgId] = useState(parseInt(localStorage.getItem('orgId')));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [branchList, setBranchList] = useState([]);
  const [docId, setDocId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [branch, setBranch] = useState(localStorage.getItem('branch'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));
  // const [finYear, setFinYear] = useState(localStorage.getItem('finYear') ? localStorage.getItem('finYear') : '2024');
  const [finYear, setFinYear] = useState('2024');
  const [warehouse, setWarehouse] = useState(localStorage.getItem('warehouse'));
  const [selectedBin, setSelectedBin] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [formData, setFormData] = useState({
    docId: docId,
    docDate: dayjs(),
    movedQty: ''
  });
  const [value, setValue] = useState(0);
  const [partNoOptions, setPartNoOptions] = useState([]);
  const [partNoOptionsNew, setPartNoOptionsNew] = useState([]);
  const [partNoOptionsBin, setPartNoOptionsBin] = useState([]);
  const [fillGridData, setFillGridData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [childTableData, setChildTableData] = useState([
    {
      batchDate: '',
      batchNo: '',
      bin: '',
      binClass: '',
      binType: '',
      cellType: '',
      clientCode: '',
      core: '',
      expDate: '',
      fromQty: '',
      grnDate: '',
      grnNo: '',
      lotNo: '',
      partDesc: '',
      partNo: '',
      pcKey: '',
      qcFlag: '',
      remainingQty: '',
      sku: '',
      ssku: '',
      status: '',
      stockDate: '',
      toBin: '',
      toQty: '',
      toBinClass: '',
      toCellType: '',
      toBinType: ''
    }
  ]);

  const [modalTableData, setModalTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      batchNo: '',
      batchDate: null,
      palletNo: '',
      sQty: '',
      cellType: '',
      core: '',
      sku: '',
      expDate: null,
      pickQty: '',
      avlQty: '',
      runQty: '',
      qcFlag: '',
      stockDate: null,
      grnNo: '',
      grnDate: null,
      lotNo: ''
    }
  ]);
  const [modalTableErrors, setModalTableErrors] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      batchNo: '',
      batchDate: null,
      palletNo: '',
      sQty: '',
      cellType: '',
      core: '',
      sku: '',
      expDate: null,
      pickQty: '',
      avlQty: '',
      runQty: '',
      qcFlag: '',
      stockDate: null,
      grnNo: '',
      grnDate: null,
      lotNo: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      batchDate: '',
      batchNo: '',
      bin: '',
      binClass: '',
      binType: '',
      cellType: '',
      clientCode: '',
      core: '',
      expDate: '',
      fromQty: '',
      grnDate: '',
      grnNo: '',
      lotNo: '',
      partDesc: '',
      partNo: '',
      pcKey: '',
      qcFlag: '',
      remainingQty: '',
      sku: '',
      ssku: '',
      status: '',
      stockDate: '',
      toBin: '',
      toQty: ''
    };
    setChildTableData([...childTableData, newRow]);
    setChildTableErrors([
      ...childTableErrors,
      {
        batchDate: '',
        batchNo: '',
        bin: '',
        fromQty: '',
        grnDate: '',
        grnNo: '',
        lotNo: '',
        partDesc: '',
        partNo: '',
        remainingQty: '',
        sku: '',
        toBin: '',
        toQty: ''
      }
    ]);
  };

  const [childTableErrors, setChildTableErrors] = useState([
    {
      batchDate: '',
      batchNo: '',
      bin: '',
      fromQty: '',
      grnDate: '',
      grnNo: '',
      lotNo: '',
      partDesc: '',
      partNo: '',
      remainingQty: '',
      sku: '',
      toBin: '',
      toQty: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'docId', header: 'DocId', size: 140 },
    { accessorKey: 'docDate', header: 'docDate', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  useEffect(() => {
    getAllLocationMovement();
    getDocId();
    getAllBin();
    getAllPartNo();
    getAllToBin();
  }, []);

  // Example usage:

  const getDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getLocationMovementDocId?orgId=${orgId}&branchCode=${branchCode}&client=${client}&branch=${branch}&finYear=${finYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setDocId(response.paramObjectsMap.locationMovementDocId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          docId: response.paramObjectsMap.locationMovementDocId
        }));
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllLocationMovement = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getAllLocationMovementByOrgId?orgId=${orgId}&branchCode=${branchCode}&branch=${branch}&client=${client}&customer=${customer}&warehouse=${warehouse}&finYear=${finYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.locationMovementVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllFillGrid = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getAllForLocationMovementDetailsFillGrid?orgId=${orgId}&branchCode=${branchCode}&branch=${branch}&client=${client}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setFillGridData(response.paramObjectsMap.locationMovementDetailsVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllBin = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getBinFromStockForLocationMovement?&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        const options = response.paramObjectsMap.locationMovementDetailsVO.map((item) => ({
          value: item.bin,
          avlQty: item.avlQty, // Ensure these fields exist in the response
          binClass: item.binClass, // Ensure these fields exist in the response
          binType: item.binType
        }));
        setPartNoOptions(options);
        console.log('Mapped Part No Options:', options);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllPartNo = async (bin) => {
    setSelectedBin(bin);

    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getPartNoAndPartDescFromStockForLocationMovement?&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}&bin=${bin}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        const options = response.paramObjectsMap.locationMovementDetailsVO.map((item) => ({
          value: item.partNo,
          avlQty: item.avlQty, // Ensure these fields exist in the response
          partDesc: item.partDesc, // Ensure these fields exist in the response
          sku: item.sku
        }));
        setPartNoOptionsNew(options);
        console.log('Mapped toBin No Options:', options);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const getAllAvlQty = async (grnNo, selectedPart, partNo) => {
  //   try {
  //     const response = await apiCalls(
  //       'get',
  //       `vascontroller/getSqtyByKitting?orgId=${orgId}&branchCode=${branchCode}&client=${client}&partNo=${partNo}&warehouse=${warehouse}&grnno=${grnNo.grnNo}`
  //     );
  //     console.log('API Responseqq:', grnNo);

  //     if (response.status === true) {
  //       const avlQty = response.paramObjectsMap.kittingVO[0].sQTY;
  //       setChildTableData((prevData) =>
  //         prevData.map((row) =>
  //           row.partNo === partNo
  //             ? {
  //                 ...row,
  //                 avlQty: avlQty
  //               }
  //             : row
  //         )
  //       );
  //     } else {
  //       console.error('API Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const getAllToBin = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getToBinFromLocationStatusForLocationMovement?orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}&warehouse=${warehouse}`
      );

      if (response.status === true) {
        const options = response.paramObjectsMap.locationMovementDetailsVO.map((item) => ({
          value: item.toBin,
          // Ensure these fields exist in the response
          toBinClass: item.toBinClass,
          toCellType: item.toCellType,
          toBinType: item.toBinType // Ensure these fields exist in the response
        }));
        setPartNoOptionsBin(options);
        console.log('Mapped To bin No Options:', options);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to append "GN" to the document ID

  const getAllChildGRnNo = async (selectedPart, partNo) => {
    try {
      const response = await apiCalls(
        'get',
        `stockprocess/getGrnNoAndBatchAndBatchDateAndLotNoFromStockForLocationMovement?bin=${selectedBin}&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}&partDesc=${selectedPart.partDesc}&partNo=${partNo}&sku=${selectedPart.sku}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        // Extract data from response
        const grnData = response.paramObjectsMap.locationMovementDetailsVO[0];
        const { grnNo, grnDate, batchNo, batchDate, lotNo } = grnData;

        // Update the childTableData
        setChildTableData((prevData) =>
          prevData.map((row) =>
            row.partNo === partNo
              ? {
                  ...row,
                  grnNo: grnNo,
                  grnDate: grnDate,
                  batchNo: batchNo,
                  batchDate: batchDate,
                  lotNo: lotNo
                }
              : row
          )
        );
        // getAllAvlQty(grnData, selectedPart, partNo);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getLocationMovementById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `stockprocess/getLocationMovementById?id=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const locationMovement = response.paramObjectsMap.locationMovementVO;
        console.log('THE PARTICULAR LOCATION MOVEMENT IS:', locationMovement);

        // Update form data
        setFormData({
          docId: locationMovement.docId,
          docDate: locationMovement.docDate ? dayjs(locationMovement.docDate) : dayjs(),
          refNo: locationMovement.refNo || '',
          refDate: locationMovement.refDate ? dayjs(locationMovement.refDate) : '',
          active: locationMovement.active === true,
          customer: locationMovement.customer,
          branch: locationMovement.branch,
          warehouse: locationMovement.warehouse
        });

        // Update childTableData with locationMovementDetailsVO data
        setChildTableData(
          locationMovement.locationMovementDetailsVO.map((detail) => ({
            id: detail.id,
            bin: detail.bin || '',
            partNo: detail.partNo || '',
            partDesc: detail.partDesc || '',
            batchNo: detail.batchNo || '',
            batchDate: detail.batchDate || '',
            lotNo: detail.lotNo || '', // Corrected from lotNo to lotNo
            grnNo: detail.grnNo || '',
            grnDate: detail.grnDate || '',
            sku: detail.sku || '',
            avlQty: detail.fromQty || '', // Assuming fromQty is the available quantity
            toQty: detail.toQty || '',
            remainingQty: detail.remainingQty || '',
            toBin: detail.toBin
          }))
        );

        // Update parentTableData with any other necessary data, similar to above if needed
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
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    let errorMessage = '';

    switch (name) {
      case 'customer':
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
      case 'gst':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        } else if (value.length > 15) {
          errorMessage = 'Invalid Format';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      if (name === 'active') {
        setFormData({ ...formData, [name]: checked });
      } else if (name === 'email') {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value.toUpperCase() });
      }

      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleDeleteRow = (id) => {
    setChildTableData(childTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === childTableData[childTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setFormData({
      // docId: '',
      docDate: null,
      refNo: '',
      refDate: '',
      active: true
    });
    setChildTableData([
      {
        id: 1,
        batchDate: '',
        batchNo: '',
        bin: '',
        fromQty: '',
        grnDate: '',
        grnNo: '',
        lotNo: '',
        partDesc: '',
        partNo: '',
        remainingQty: '',
        sku: '',
        toBin: '',
        toQty: ''
      }
    ]);

    setFieldErrors({
      docId: '',
      docDate: ''
    });
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.docId) {
      errors.docId = 'Doc Id is required';
    }
    // if (!formData.docDate) {
    //   errors.docDate = ' DocDate is required';
    // }

    let childTableDataValid = true;
    const newTableErrors = childTableData.map((row) => {
      const rowErrors = {};
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        childTableDataValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'PartNo is required';
        childTableDataValid = false;
      }
      // if (!row.qty) {
      //   rowErrors.qty = 'qty Type is required';
      //   childTableDataValid = false;
      // }
      return rowErrors;
    });
    // setFieldErrors(errors);

    setChildTableErrors(newTableErrors);

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0 && childTableDataValid) {
      setIsLoading(true);
      const childVO = childTableData.map((row) => ({
        bin: row.bin,
        partNo: row.partNo,
        partDesc: row.partDesc,
        batchNo: row.batchNo,
        batchDate: row.batchDate,
        lotNo: row.lotNo,
        grnNo: row.grnNo,
        grnDate: row.grnDate,
        sku: row.sku,
        ssku: row.sku,
        fromQty: parseInt(row.avlQty),
        // qty: parseInt(row.qty),
        toBin: row.toBin,
        binClass: row.binClass,
        binType: row.binType,
        remainingQty: row.remainingQty,
        toQty: parseInt(row.toQty),
        toBinClass: row.toBinClass,
        toCellType: row.toCellType,
        toBinType: row.toBinType,
        qcFlag: 'T'
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        // docId: formData.docId,
        docDate: formData.docDate,
        movedQty: formData.movedQty,
        locationMovementDetailsDTO: childVO,
        orgId: orgId,
        createdBy: loginUserName,
        branch: branch,
        branchCode: branchCode,
        client: client,
        customer: customer,
        finYear: finYear,
        warehouse: warehouse
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `stockprocess/createUpdateLocationMovement`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Location Movement Updated Successfully' : 'Location Movement created successfully');
          getAllLocationMovement();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Location Movement failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Location Movement failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleFullGrid = () => {
    setModalOpen(true);
    getAllFillGrid();
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(fillGridData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleSaveSelectedRows = () => {
    const selectedData = selectedRows.map((index) => fillGridData[index]);

    // Extract the bin values from the selected data
    const binValues = selectedData.map((row) => row.bin);

    // Pass the bin values to the getAllPartNo function
    getAllPartNo(binValues);

    // Add the selected data to childTableData
    setChildTableData([...childTableData, ...selectedData]);

    console.log('Selected Data:', selectedData);

    // Clear selections and close the modal
    setSelectedRows([]);
    setSelectAll(false);
    handleCloseModal();
  };

  const handleToQtyChange = (e, row, index) => {
    const value = e.target.value;
    const numericValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10); // Ensure value is a number
    const numericFromQty = isNaN(parseInt(row.avlQty, 10)) ? 0 : parseInt(row.avlQty, 10); // Ensure fromQty is a number
    const intPattern = /^\d*$/;

    if (intPattern.test(value) || value === '') {
      setChildTableData((prev) => {
        const updatedData = prev.map((r) => {
          if (r.id === row.id) {
            let newRemainQty = numericFromQty - numericValue; // Initial remainQty calculation

            // Check if selected partNo is already in another row
            const existingRow = prev.find((item) => item.partNo === r.partNo && item.id !== r.id);

            if (existingRow) {
              // If partNo exists in another row, update remainQty based on that row's remainQty
              const existingRemainQty = isNaN(existingRow.remainingQty) ? 0 : existingRow.remainingQty;
              newRemainQty = existingRemainQty - numericValue;
            }

            // Ensure remainQty is non-negative
            newRemainQty = Math.max(newRemainQty, 0);

            return {
              ...r,
              toQty: value,
              remainingQty: newRemainQty
            };
          }
          return r;
        });

        return updatedData;
      });

      // Clear the error if input is valid
      setChildTableErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = {
          ...newErrors[index],
          toQty: ''
        };
        return newErrors;
      });
    } else {
      // Set error if input is invalid
      setChildTableErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = {
          ...newErrors[index],
          toQty: 'Only numbers are allowed'
        };
        return newErrors;
      });
    }
  };

  return (
    <>
      <div>{/* <ToastContainer /> */}</div>
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getLocationMovementById} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Doc Id"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="docId"
                  disabled
                  value={formData.docId}
                  onChange={handleInputChange}
                  error={!!fieldErrors.docId}
                  helperText={fieldErrors.docId}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Doc Date"
                      value={formData.docDate}
                      disabled
                      onChange={(date) => handleDateChange('docDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.docDate}
                      helperText={fieldErrors.docDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Moved Qty"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                  name="movedQty"
                  value={formData.movedQty}
                  onChange={handleInputChange}
                  error={!!fieldErrors.movedQty}
                  helperText={fieldErrors.movedQty}
                />
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
                  <Tab value={0} label="Details" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={handleFullGrid} />
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered" style={{ width: '100%' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">Bin</th>
                                  <th className="px-2 py-2 text-white text-center">Part No</th>
                                  <th className="px-2 py-2 text-white text-center">Part Description</th>
                                  <th className="px-2 py-2 text-white text-center">SKU</th>
                                  <th className="px-2 py-2 text-white text-center">GRN No</th>
                                  <th className="px-2 py-2 text-white text-center">GRN Date</th>
                                  <th className="px-2 py-2 text-white text-center">Batch No</th>
                                  <th className="px-2 py-2 text-white text-center">Batch Date</th>
                                  <th className="px-2 py-2 text-white text-center">Lot No</th>
                                  <th className="px-2 py-2 text-white text-center">To Bin</th>
                                  <th className="px-2 py-2 text-white text-center">From Qty</th>
                                  <th className="px-2 py-2 text-white text-center">To Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Remaining Qty</th>
                                  {/* <th className="px-2 py-2 text-white text-center">Unit Rate</th>
                                  <th className="px-2 py-2 text-white text-center">Amount</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {childTableData.length === 0 ? (
                                  <tr>
                                    <td colSpan="18" className="text-center py-2">
                                      No Data Found
                                    </td>
                                  </tr>
                                ) : (
                                  childTableData.map((row, index) => (
                                    <tr key={row.id}>
                                      <td className="border px-2 py-2 text-center">
                                        <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                      </td>
                                      <td className="text-center">
                                        <div className="pt-2">{index + 1}</div>
                                      </td>

                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.bin}
                                          style={{ width: '130px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            console.log('Selected Part No:', value);

                                            const selectedPart = partNoOptions.find((option) => String(option.value) === String(value));
                                            console.log('Selected Part Details:', selectedPart);

                                            if (selectedPart) {
                                              setChildTableData((prev) => {
                                                return prev.map((r) =>
                                                  r.id === row.id
                                                    ? {
                                                        ...r,
                                                        bin: value,
                                                        binClass: selectedPart.binClass,
                                                        binType: selectedPart.binType,
                                                        avlQty: selectedPart.avlQty
                                                      }
                                                    : r
                                                );
                                              });
                                              getAllPartNo(value);
                                            }

                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                partNo: !value ? 'Part No is required' : '',
                                                partDesc: !selectedPart ? 'Part Description is required' : '',
                                                sku: !selectedPart ? 'SKU is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">Select Part No</option>
                                          {partNoOptions &&
                                            partNoOptions.map((option) => (
                                              <option key={option.value} value={option.value}>
                                                {option.value}
                                              </option>
                                            ))}
                                        </select>

                                        {childTableErrors[index]?.partNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].partNo}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.partNo}
                                          style={{ width: '130px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            console.log('Selected Part No:', value);

                                            const selectedPart = partNoOptionsNew.find((option) => String(option.value) === String(value));
                                            console.log('Selected Part Details:', selectedPart);

                                            if (selectedPart) {
                                              setChildTableData((prev) => {
                                                return prev.map((r) =>
                                                  r.id === row.id
                                                    ? {
                                                        ...r,
                                                        partNo: value,
                                                        partDesc: selectedPart.partDesc,
                                                        sku: selectedPart.sku
                                                      }
                                                    : r
                                                );
                                              });
                                              getAllChildGRnNo(selectedPart, value);
                                            }

                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                partNo: !value ? 'Part No is required' : '',
                                                partDesc: !selectedPart ? 'Part Description is required' : '',
                                                sku: !selectedPart ? 'SKU is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">Select Part No</option>
                                          {partNoOptionsNew &&
                                            partNoOptionsNew.map((option) => (
                                              <option key={option.value} value={option.value}>
                                                {option.value}
                                              </option>
                                            ))}
                                        </select>

                                        {childTableErrors[index]?.partNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].partNo}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.partDesc}
                                          disabled
                                          style={{ width: '200px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, partDesc: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                partDesc: !value ? 'Part Description is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.partDesc && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].partDesc}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.sku}
                                          disabled
                                          style={{ width: '100px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, sku: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], sku: !value ? 'SKU is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.sku && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].sku}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.grnNo}
                                          disabled
                                          style={{ width: '120px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, grnNo: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], grnNo: !value ? 'GRN No is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.grnNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].grnNo}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="date"
                                          value={row.grnDate}
                                          // style={{ width: '100px' }}
                                          disabled
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, grnDate: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], grnDate: !value ? 'GRN Date is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.grnDate ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.grnDate && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].grnDate}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.batchNo}
                                          disabled
                                          style={{ width: '100px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, batchNo: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], batchNo: !value ? 'Batch No is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.batchNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].batchNo}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="date"
                                          value={row.batchDate}
                                          // style={{ width: '100px' }}
                                          disabled
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) =>
                                              prev.map((r) => (r.id === row.id ? { ...r, batchDate: value } : r))
                                            );
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], batchDate: !value ? 'Batch Date is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.batchDate ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.batchDate && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].batchDate}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.lotNo}
                                          disabled
                                          style={{ width: '100px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, lotNo: value } : r)));
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], lotNo: !value ? 'Lot No is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.lotNo ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.lotNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].lotNo}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.toBin}
                                          style={{ width: '130px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            console.log('Selected ToBin No:', value);

                                            const selectedPart = partNoOptionsBin.find((option) => String(option.value) === String(value));
                                            console.log('Selected To Bin Details:', selectedPart);

                                            if (selectedPart) {
                                              setChildTableData((prev) => {
                                                return prev.map((r) =>
                                                  r.id === row.id
                                                    ? {
                                                        ...r,
                                                        toBin: value,
                                                        toBinClass: selectedPart.toBinClass,
                                                        toCellType: selectedPart.toCellType,
                                                        toBinType: selectedPart.toBinType
                                                      }
                                                    : r
                                                );
                                              });
                                              // getAllChildGRnNo(selectedPart, value);
                                            }

                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                toBin: !value ? 'To Bin is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.toBin ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">Select To Bin</option>
                                          {partNoOptionsBin &&
                                            partNoOptionsBin.map((option) => (
                                              <option key={option.value} value={option.value}>
                                                {option.value}
                                              </option>
                                            ))}
                                        </select>

                                        {childTableErrors[index]?.toBin && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].toBin}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.avlQty}
                                          disabled
                                          style={{ width: '100px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) =>
                                              prev.map((r) =>
                                                r.id === row.id ? { ...r, avlQty: value, remainingQty: value - r.toQty } : r
                                              )
                                            );
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], avlQty: !value ? 'avlQty is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.avlQty ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.avlQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].avlQty}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.toQty}
                                          onChange={(e) => handleToQtyChange(e, row, index)} // Use the refactored function
                                          className={childTableErrors[index]?.toQty ? 'error form-control' : 'form-control'}
                                          onKeyDown={(e) => handleKeyDown(e, row, childTableData)}
                                        />
                                        {childTableErrors[index]?.toQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].toQty}
                                          </div>
                                        )}
                                      </td>

                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.remainingQty}
                                          disabled
                                          style={{ width: '100px' }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setChildTableData((prev) =>
                                              prev.map((r) => (r.id === row.id ? { ...r, remainingQty: value } : r))
                                            );
                                            setChildTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                remainingQty: !value ? ' remaining qty is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={childTableErrors[index]?.remainingQty ? 'error form-control' : 'form-control'}
                                        />
                                        {childTableErrors[index]?.remainingQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].remainingQty}
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Dialog
                      open={modalOpen}
                      maxWidth={'md'}
                      fullWidth={true}
                      onClose={handleCloseModal}
                      PaperComponent={PaperComponent}
                      aria-labelledby="draggable-dialog-title"
                    >
                      <DialogTitle textAlign="center" style={{ cursor: 'move' }} id="draggable-dialog-title">
                        <h6>Grid Details</h6>
                      </DialogTitle>
                      <DialogContent className="pb-0">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr style={{ backgroundColor: '#673AB7' }}>
                                    <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                      <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                      S.No
                                    </th>
                                    <th className="px-2 py-2 text-white text-center">Bin</th>
                                    <th className="px-2 py-2 text-white text-center">Part No</th>
                                    <th className="px-2 py-2 text-white text-center">Part Description</th>
                                    <th className="px-2 py-2 text-white text-center">SKU</th>
                                    <th className="px-2 py-2 text-white text-center">GRN No</th>
                                    <th className="px-2 py-2 text-white text-center">GRN Date</th>
                                    <th className="px-2 py-2 text-white text-center">Batch No</th>
                                    <th className="px-2 py-2 text-white text-center">Batch Date</th>
                                    <th className="px-2 py-2 text-white text-center">Lot No</th>
                                    <th className="px-2 py-2 text-white text-center">From Qty</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {fillGridData?.map((row, index) => (
                                    <tr key={row.index}>
                                      <td className="border p-0 text-center">
                                        <Checkbox
                                          checked={selectedRows.includes(index)}
                                          onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setSelectedRows((prev) => (isChecked ? [...prev, index] : prev.filter((i) => i !== index)));
                                          }}
                                        />
                                      </td>
                                      <td className="text-center">
                                        <div className="pt-1">{index + 1}</div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>{row.bin || ''}</div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.partNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.partDesc || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>{row.sku || ''}</div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.grnNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.grnDate || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.batchNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.batchDate || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.lotNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.avlQty || ''}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions sx={{ p: '1.25rem' }} className="pt-0">
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button color="secondary" onClick={handleSaveSelectedRows} variant="contained">
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
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
export default LocationMovement;
