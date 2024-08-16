import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GridOnIcon from '@mui/icons-material/GridOn';
import ActionButton from 'utils/ActionButton';
import Checkbox from '@mui/material/Checkbox';
import { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';
import { getAllActiveBranches } from 'utils/CommonFunctions';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const Putaway = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [locationTypeList, setLocationTypeList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [listView, setListView] = useState(false);
  const [listViewData, setListViewData] = useState([]);
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchCode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));

  const [formData, setFormData] = useState({
    binClass: '',
    binPick: '',
    binType: '',
    branch: loginBranch,
    branchCode: loginBranchCode,
    carrier: '',
    client: loginClient,
    core: 'MULTI',
    createdBy: loginUserName,
    customer: loginCustomer,
    docDate: dayjs(),
    enteredPerson: '',
    entryNo: '',
    entryDate: null,
    finYear: '',
    grnDate: null,
    grnNo: '',
    lotNo: '',
    modeOfShipment: '',
    orgId: orgId,
    status: '',
    supplier: '',
    supplierShortName: '',
    vehicleType: '',
    vehicleNo: '',
    warehouse: loginWarehouse
  });

  const [putAwayDetailsTableData, setPutAwayDetailsTableData] = useState([
    {
      batch: '',
      bin: '',
      binType: '',
      cellType: '',
      grnQty: 0,
      invNo: '',
      invQty: 0,
      partDesc: '',
      partNo: '',
      putAwayQty: 0,
      recQty: 0,
      remarks: '',
      sku: '',
      ssku: ''
    }
  ]);
  const [putAwayTableErrors, setPutAwayTableErrors] = useState([
    {
      batch: '',
      bin: '',
      binType: '',
      cellType: '',
      grnQty: 0,
      invNo: '',
      invQty: 0,
      partDesc: '',
      partNo: '',
      putAwayQty: 0,
      recQty: 0,
      remarks: '',
      sku: '',
      ssku: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    binClass: '',
    binPick: '',
    binType: '',
    branch: loginBranch,
    branchCode: loginBranchCode,
    carrier: '',
    client: loginClient,
    core: '',
    createdBy: loginUserName,
    customer: loginCustomer,
    enteredPerson: '',
    entryNo: '',
    entryDate: null,
    finYear: '',
    grnDate: null,
    grnNo: '',
    lotNo: '',
    modeOfShipment: '',
    orgId: orgId,
    status: '',
    supplier: '',
    supplierShortName: '',
    warehouse: loginWarehouse
  });
  const listViewColumns = [
    { accessorKey: 'id', header: 'Doc Id', size: 140 },
    { accessorKey: 'docDate', header: 'Doc Date', size: 140 },
    { accessorKey: 'orderNo', header: 'Order No', size: 140 },
    { accessorKey: 'orderDate', header: 'Order Date', size: 140 },
    { accessorKey: 'invoiceNo', header: 'Invoice No', size: 140 },
    { accessorKey: 'invoiceDate', header: 'Invoice Date', size: 140 },
    { accessorKey: 'buyerShortName', header: 'Buyer Short Name', size: 140 },
    { accessorKey: 'currency', header: 'Currency', size: 140 },
    { accessorKey: 'exRate', header: 'Ex Rate', size: 140 },
    { accessorKey: 'billto', header: 'Bill To', size: 140 },
    { accessorKey: 'refNo', header: 'Ref No', size: 140 },
    { accessorKey: 'refDate', header: 'Ref Date', size: 140 },
    { accessorKey: 'refDate', header: 'Ship To', size: 140 },
    { accessorKey: 'reMarks', header: 'Remarks', size: 140 }
  ];

  useEffect(() => {
    getAllPutAway();
    getAllLocationTypes();
  }, []);

  const handleAddRow = () => {
    if (isLastRowEmpty(putAwayDetailsTableData)) {
      displayRowError(putAwayDetailsTableData);
      return;
    }
    const newRow = {
      id: Date.now(),
      batch: '',
      bin: '',
      binType: '',
      cellType: '',
      grnQty: 0,
      invNo: '',
      invQty: 0,
      partDesc: '',
      partNo: '',
      putAwayQty: 0,
      recQty: 0,
      remarks: '',
      sku: '',
      ssku: ''
    };
    setPutAwayDetailsTableData([...putAwayDetailsTableData, newRow]);
    setPutAwayTableErrors([
      ...putAwayTableErrors,
      {
        batch: '',
        bin: '',
        binType: '',
        cellType: '',
        grnQty: 0,
        invNo: '',
        invQty: 0,
        partDesc: '',
        partNo: '',
        putAwayQty: 0,
        recQty: 0,
        remarks: '',
        sku: '',
        ssku: ''
      }
    ]);
  };

  const handleFullGrid = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getAllLocationTypes = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/locationtype/warehouse?orgid=${orgId}&warehouse=${loginWarehouse}`);
      if (response.status === true) {
        setLocationTypeList(response.paramObjectsMap.Locationtype);
        console.log('THE LOCATIONTYPE IS:', response.paramObjectsMap.Locationtype);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching locationType data:', error);
    }
  };

  // const handleFullGridFunction = async () => {
  //   try {
  //     const response = await apiCalls(
  //       'get',
  //       `warehousemastercontroller/bins/levelno/rowno/locationtype/warehouse?level=${formData.levelNo}&locationtype=${formData.locationType}&orgid=${orgId}&rowno=${formData.rowNo}&warehouse=${loginWarehouse}`
  //     );
  //     console.log('THE WAREHOUSE IS:', response);
  //     if (response.status === true) {
  //       const bins = response.paramObjectsMap.Bins;
  //       console.log('THE BIN DETAILS ARE:', bins);

  //       setLocationMappingTableData(
  //         bins.map((bin) => ({
  //           id: bin.id,
  //           rowNo: bin.rowno,
  //           levelNo: bin.level,
  //           palletNo: bin.bin,
  //           multiCore: bin.core,
  //           LocationStatus: bin.status === 'True' ? 'True' : 'False',
  //           vasBinSeq: ''
  //         }))
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error fetching employee data:', error);
  //   }
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getAllBranches = async () => {
    try {
      const branchData = await getAllActiveBranches(orgId);
      setBranchList(branchData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };
  const getAllPutAway = async () => {
    try {
      const response = await apiCalls(
        'get',
        `inward/getAllPutAway?branch=${loginBranch}&branchCode=${loginBranchCode}&client=${loginClient}&finYear=2024&orgId=${orgId}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.PutAwayVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllBuyerOrderById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `outward/getAllBuyerOrderById?id=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularBuyerOrder = response.paramObjectsMap.buyerOrderVO;
        console.log('THE PARTICULAR BUYER ORDER IS:', particularBuyerOrder);

        setFormData({
          docId: particularBuyerOrder.id,
          docDate: particularBuyerOrder.docDate,
          orderNo: particularBuyerOrder.orderNo,
          orderDate: particularBuyerOrder.orderDate,
          invoiceNo: particularBuyerOrder.invoiceNo,
          invoiceDate: particularBuyerOrder.invoiceDate,
          buyerShortName: particularBuyerOrder.buyerShortName,
          currency: particularBuyerOrder.currency,
          exRate: particularBuyerOrder.exRate,
          billto: particularBuyerOrder.billto,
          refNo: particularBuyerOrder.refNo,
          refDate: particularBuyerOrder.refDate,
          refDate: particularBuyerOrder.refDate,
          reMarks: particularBuyerOrder.reMarks
        });
        setPutAwayDetailsTableData(
          particularBuyerOrder.buyerOrderDetailsDTO.map((bo) => ({
            id: bo.id,
            partNo: bo.partNo,
            partDesc: bo.partDesc,
            batchNo: bo.batchNo,
            qty: bo.qty
          }))
        );
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
      case 'id':
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
    setPutAwayDetailsTableData(putAwayDetailsTableData.filter((row) => row.id !== id));
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;

    if (table === putAwayDetailsTableData) {
      return !lastRow.partNo || !lastRow.partDesc || !lastRow.batchNo || !lastRow.qty;
    }
    return false;
  };

  const displayRowError = (table) => {
    if (table === putAwayDetailsTableData) {
      setPutAwayTableErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[table.length - 1] = {
          ...newErrors[table.length - 1],
          partNo: !table[table.length - 1].partNo ? 'Part No is required' : '',
          partDesc: !table[table.length - 1].partDesc ? 'Part Desc is required' : '',
          // batchNo: !table[table.length - 1].batchNo ? 'Batch No is required' : '',
          qty: !table[table.length - 1].qty ? 'Qty is required' : ''
        };
        return newErrors;
      });
    }
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === putAwayDetailsTableData[putAwayDetailsTableData.length - 1].id) {
      handleAddRow();
    }
  };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleClear = () => {
    setFormData({
      binClass: '',
      binPick: '',
      binType: '',
      branch: loginBranch,
      branchCode: loginBranchCode,
      carrier: '',
      client: loginClient,
      core: '',
      createdBy: loginUserName,
      customer: loginCustomer,
      enteredPerson: '',
      entryNo: '',
      entryDate: null,
      finYear: '',
      grnDate: null,
      grnNo: '',
      lotNo: '',
      modeOfShipment: '',
      orgId: orgId,
      status: '',
      supplier: '',
      supplierShortName: '',
      warehouse: loginWarehouse
    });
    setPutAwayDetailsTableData([
      {
        id: 1,
        batch: '',
        bin: '',
        binType: '',
        cellType: '',
        grnQty: 0,
        invNo: '',
        invQty: 0,
        partDesc: '',
        partNo: '',
        putAwayQty: 0,
        recQty: 0,
        remarks: '',
        sku: '',
        ssku: ''
      }
    ]);
    setFieldErrors({
      binClass: '',
      binPick: '',
      binType: '',
      branch: loginBranch,
      branchCode: loginBranchCode,
      carrier: '',
      client: loginClient,
      core: '',
      createdBy: loginUserName,
      customer: loginCustomer,
      enteredPerson: '',
      entryNo: '',
      entryDate: null,
      finYear: '',
      grnDate: null,
      grnNo: '',
      lotNo: '',
      modeOfShipment: '',
      orgId: orgId,
      status: '',
      supplier: '',
      supplierShortName: '',
      warehouse: loginWarehouse
    });
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.orderNo) {
      errors.orderNo = 'Order No is required';
    }
    if (!formData.orderDate) {
      errors.orderDate = 'Order Date is required';
    }
    if (!formData.invoiceNo) {
      errors.invoiceNo = 'Invoice No is required';
    }
    if (!formData.invoiceDate) {
      errors.invoiceDate = 'Invoice Date is required';
    }
    if (!formData.currency) {
      errors.currency = 'Currency is required';
    }
    if (!formData.exRate) {
      errors.exRate = 'Ex Rate is required';
    }

    let putAwayDetailsTableDataValid = true;
    const newTableErrors = putAwayDetailsTableData.map((row) => {
      const rowErrors = {};
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
        putAwayDetailsTableDataValid = false;
      }
      if (!row.partDesc) {
        rowErrors.partDesc = 'Part Desc is required';
        putAwayDetailsTableDataValid = false;
      }
      // if (!row.batchNo) {
      //   rowErrors.batchNo = 'Batch No is required';
      //   putAwayDetailsTableDataValid = false;
      // }
      if (!row.qty) {
        rowErrors.qty = 'Qty is required';
        putAwayDetailsTableDataValid = false;
      }

      return rowErrors;
    });
    // setFieldErrors(errors);

    setPutAwayTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const putAwayDetailsDTO = putAwayDetailsTableData.map((row) => ({
        batch: row.batch,
        // bin: row.bin,
        binType: row.binType,
        cellType: row.cellType,
        grnQty: row.grnQty,
        invNo: row.invNo,
        invQty: row.invQty,
        partDesc: row.partDesc,
        partNo: row.partNo,
        putAwayQty: row.putAwayQty,
        recQty: row.recQty,
        remarks: row.remarks,
        sku: row.sku,
        ssku: row.ssku
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        binClass: formData.binClass,
        binPick: formData.binPick,
        binType: formData.binType,
        branch: loginBranch,
        branchCode: loginBranchCode,
        carrier: formData.carrier,
        client: loginClient,
        core: 'MULTI',
        createdBy: loginUserName,
        customer: loginCustomer,
        docDate: dayjs(),
        enteredPerson: formData.enteredPerson,
        entryNo: formData.entryNo,
        entryDate: formData.entryDate,
        finYear: formData.finYear,
        grnDate: formData.grnDate,
        grnNo: formData.binClass,
        lotNo: formData.lotNo,
        modeOfShipment: formData.modeOfShipment,
        orgId: orgId,
        putAwayDetailsDTO,
        status: formData.status,
        supplier: formData.supplier,
        supplierShortName: formData.supplierShortName,
        vehicleType: formData.vehicleType,
        vehicleNo: formData.vehicleNo,
        warehouse: loginWarehouse
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `inward/createUpdatePutAway`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Put Away Updated Successfully' : 'Put Away created successfully');
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Put Away creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Put Away creation failed');
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
      binClass: '',
      binPick: '',
      binType: '',
      branch: loginBranch,
      branchCode: loginBranchCode,
      carrier: '',
      client: loginClient,
      core: '',
      createdBy: loginUserName,
      customer: loginCustomer,
      enteredPerson: '',
      entryNo: '',
      entryDate: null,
      finYear: '',
      grnDate: null,
      grnNo: '',
      lotNo: '',
      modeOfShipment: '',
      orgId: orgId,
      status: '',
      supplier: '',
      supplierShortName: '',
      warehouse: loginWarehouse
    });
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getAllBuyerOrderById} />
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
                  value={formData.docId}
                  onChange={handleInputChange}
                  error={!!fieldErrors.docId}
                  helperText={fieldErrors.docId}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Doc Date"
                      value={formData.docDate ? dayjs(formData.docDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('docDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.docDate}
                      helperText={fieldErrors.docDate && 'Required'}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.grnNo}>
                  <InputLabel id="grnNo">Grn No</InputLabel>
                  <Select labelId="grnNo" id="grnNo" name="grnNo" label="Grn No" value={formData.grnNo} onChange={handleInputChange}>
                    <MenuItem value="GRN1213">GRN1213</MenuItem>
                    <MenuItem value="GRN5469">GRN5469</MenuItem>
                  </Select>
                  {fieldErrors.grnNo && <FormHelperText error>{fieldErrors.grnNo}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Grn Date"
                      value={formData.grnDate ? dayjs(formData.grnDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('grnDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.grnDate}
                      helperText={fieldErrors.grnDate && 'Required'}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="Entry/SI No."
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="entryNo"
                  value={formData.entryNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.entryNo}
                  helperText={fieldErrors.entryNo}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={formData.entryDate ? dayjs(formData.entryDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('entryDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.entryDate}
                      helperText={fieldErrors.entryDate && 'Required'}
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.core}>
                  <InputLabel id="core">Core</InputLabel>
                  <Select labelId="core" id="core" name="core" label="Core" value={formData.core} onChange={handleInputChange} disabled>
                    <MenuItem value="">Select Option</MenuItem>
                    <MenuItem value="MULTI">MULTI</MenuItem>
                    <MenuItem value="SINGLE">SINGLE</MenuItem>
                  </Select>
                  {fieldErrors.core && <FormHelperText error>{fieldErrors.core}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Supplier Short Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="supplierShortName"
                  value={formData.supplierShortName}
                  error={!!fieldErrors.supplierShortName}
                  helperText={fieldErrors.supplierShortName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Supplier"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  error={!!fieldErrors.supplier}
                  helperText={fieldErrors.supplier}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Mode Of Shipment"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="modeOfShipment"
                  value={formData.modeOfShipment}
                  error={!!fieldErrors.modeOfShipment}
                  helperText={fieldErrors.modeOfShipment}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Carrier"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleInputChange}
                  error={!!fieldErrors.carrier}
                  helperText={fieldErrors.carrier}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Vehicle Type"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="vehicleType"
                  value={formData.vehicleType}
                  error={!!fieldErrors.vehicleType}
                  helperText={fieldErrors.vehicleType}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Vehicle No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.vehicleNo}
                  helperText={fieldErrors.vehicleNo}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Security Person Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="SecurityPersonName"
                  value={formData.SecurityPersonName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.SecurityPersonName}
                  helperText={fieldErrors.SecurityPersonName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Driver Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.driverName}
                  helperText={fieldErrors.driverName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Brief Desc. of the Goods"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="briefDesc"
                  value={formData.briefDesc}
                  onChange={handleInputChange}
                  error={!!fieldErrors.briefDesc}
                  helperText={fieldErrors.briefDesc}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Entered By"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="enteredBy"
                  value={formData.enteredBy}
                  onChange={handleInputChange}
                  error={!!fieldErrors.enteredBy}
                  helperText={fieldErrors.enteredBy}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Lot No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="lotNo"
                  value={formData.lotNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.lotNo}
                  helperText={fieldErrors.lotNo}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth size="small" error={!!fieldErrors.binType}>
                  <InputLabel id="binType-label">Bin Type</InputLabel>
                  <Select
                    labelId="binType-label"
                    id="binType"
                    name="binType"
                    label="Bin Type"
                    value={formData.binType}
                    onChange={handleInputChange}
                  >
                    {locationTypeList?.map((row) => (
                      <MenuItem key={row.id} value={row.ltype.toUpperCase()}>
                        {row.ltype.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.binType && <FormHelperText error>{fieldErrors.binType}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.status}>
                  <InputLabel id="status">Status</InputLabel>
                  <Select labelId="status" id="status" name="status" label="Status" value={formData.status} onChange={handleInputChange}>
                    <MenuItem value="EDIT">Edit</MenuItem>
                    <MenuItem value="CONFIRM">Confirm</MenuItem>
                  </Select>
                  {fieldErrors.status && <FormHelperText error>{fieldErrors.status}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl className="ps-2">
                  <FormLabel id="demo-radio-buttons-group-label">Location Class</FormLabel>
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="fixed" name="radio-buttons-group">
                    <FormControlLabel value="fixed" control={<Radio size="small" />} label="Fixed" />
                    <FormControlLabel value="open" control={<Radio size="small" />} label="Open" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl className="ps-2">
                  <FormLabel id="demo-radio-buttons-group-label">Pallet Pick</FormLabel>
                  <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="empty" name="radio-buttons-group">
                    <FormControlLabel value="empty" control={<Radio size="small" />} label="Empty" />
                    <FormControlLabel value="occupied" control={<Radio size="small" />} label="Occupied" />
                    <FormControlLabel value="both" control={<Radio size="small" />} label="Both" />
                  </RadioGroup>
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
                  <Tab value={0} label="LR NO. Details" />
                  <Tab value={1} label="Summary" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        {/* <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={handleFullGrid} /> */}
                        <ActionButton title="Fill Grid" icon={GridOnIcon} />
                      </div>
                      {/* Table */}
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center">INVOICE No *</th>
                                  <th className="px-2 py-2 text-white text-center">Part No</th>
                                  <th className="px-2 py-2 text-white text-center">Batch</th>
                                  <th className="px-2 py-2 text-white text-center">Part Description</th>
                                  <th className="px-2 py-2 text-white text-center">SKU *</th>
                                  <th className="px-2 py-2 text-white text-center">Inv Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Rec Qty</th>
                                  <th className="px-2 py-2 text-white text-center">GRN Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Putaway Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Location *</th>
                                  <th className="px-2 py-2 text-white text-center">Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {putAwayDetailsTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.qty}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, qty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], qty: !value ? 'Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.qty ? 'error form-control' : 'form-control'}
                                      />
                                      {putAwayTableErrors[index]?.qty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].qty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>

                                    {/* <td className="border px-2 py-2">
                                      <select
                                        value={row.batchNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, batchNo: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              batchNo: !value ? 'Batch No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="ONE">ONE</option>
                                        <option value="TWO">TWO</option>
                                      </select>
                                      {putAwayTableErrors[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].batchNo}
                                        </div>
                                      )}
                                    </td> */}

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, partNo: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partNo: !value ? 'Part No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="KM18">KM18</option>
                                        <option value="KM19">KM19</option>
                                      </select>
                                      {putAwayTableErrors[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].partNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.availQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, availQty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], availQty: !value ? 'Avail Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.availQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                      {putAwayTableErrors[index]?.availQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].availQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.qty}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, qty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], qty: !value ? 'Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.qty ? 'error form-control' : 'form-control'}
                                      />
                                      {putAwayTableErrors[index]?.qty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].qty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.batchNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, batchNo: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              batchNo: !value ? 'Batch No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="ONE">ONE</option>
                                        <option value="TWO">TWO</option>
                                      </select>
                                      {putAwayTableErrors[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].batchNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.qty}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setPutAwayDetailsTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, qty: value.toUpperCase() } : r))
                                          );
                                          setPutAwayTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], qty: !value ? 'Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={putAwayTableErrors[index]?.qty ? 'error form-control' : 'form-control'}
                                      />
                                      {putAwayTableErrors[index]?.qty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {putAwayTableErrors[index].qty}
                                        </div>
                                      )}
                                    </td>
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
                {value === 1 && (
                  <>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Total GRN Qty."
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totalGrnQty"
                          // value={formData.orderQty}
                          // onChange={handleInputChange}
                          // error={!!fieldErrors.orderQty}
                          // helperText={fieldErrors.orderQty}
                          disabled
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Total Putaway Qty."
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totalPutawayQty"
                          // value={formData.avlQty}
                          // onChange={handleInputChange}
                          // error={!!fieldErrors.avlQty}
                          // helperText={fieldErrors.avlQty}
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}
              </Box>
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
                                Action
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                S.No
                              </th>
                              <th className="px-2 py-2 text-white text-center">Part No *</th>
                              <th className="px-2 py-2 text-white text-center">Part Desc</th>
                              <th className="px-2 py-2 text-white text-center">Batch No</th>
                              <th className="px-2 py-2 text-white text-center">Qty *</th>
                              <th className="px-2 py-2 text-white text-center">Avl. Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {putAwayDetailsTableData.map((row, index) => (
                              <tr key={row.id}>
                                <td className="border p-0 text-center">
                                  <Checkbox {...label} />
                                </td>
                                <td className="text-center">
                                  <div className="pt-1">{index + 1}</div>
                                </td>
                                <td className="border p-0">{row.partNo}</td>
                                <td className="border p-0">{row.partDesc}</td>
                                <td className="border p-0">{row.batchNo}</td>
                                <td className="border p-0">{row.qty}</td>
                                <td className="border p-0">{row.availQty}</td>
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
                  <Button color="secondary" onClick={handleCloseModal} variant="contained">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};
export default Putaway;
