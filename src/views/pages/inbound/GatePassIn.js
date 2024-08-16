import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { getAllActiveCarrier, getAllActiveSupplier } from 'utils/CommonFunctions';

export const GatePassIn = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [supplierList, setSupplierList] = useState([]);
  const [carrierList, setCarrierList] = useState([]);
  const [partNoList, setPartNoList] = useState([]);
  const [modeOfShipmentList, setModeOfShipmentList] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [cbranch, setCbranch] = useState(localStorage.getItem('branchCode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [branch, setBranch] = useState(localStorage.getItem('branch'));
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));
  const [finYear, setFinYear] = useState('2024');
  const [gatePassDocId, setGatePassDocId] = useState('');

  const [formData, setFormData] = useState({
    docdate: dayjs(),
    entryNo: '',
    entryDate: null,
    supplier: '',
    supplierShortName: '',
    modeOfShipment: '',
    carrier: '',
    vehicleType: '',
    vehicleNo: '',
    driverName: '',
    contact: '',
    goodsDescription: '',
    securityName: ''
  });
  const [value, setValue] = useState(0);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      client: '',
      clientCode: '',
      clientType: '',
      fifoFife: ''
    };
    setLrNoDetailsTable([...lrNoDetailsTable, newRow]);
    setLrNoDetailsError([
      ...lrNoDetailsError,
      {
        irNoHaw: '',
        invoiceNo: '',
        partNo: '',
        partDesc: '',
        batchNo: '',
        sku: '',
        invQty: '',
        recQty: '',
        shortQty: '',
        damageQty: '',
        grnQty: '',
        subUnit: '',
        subStockShortQty: '',
        grnPiecesQty: '',
        weight: '',
        rate: '',
        amount: '',
        remarks: ''
      }
    ]);
  };

  const [lrNoDetailsError, setLrNoDetailsError] = useState([
    {
      irNoHaw: '',
      invoiceNo: '',
      partNo: '',
      partDesc: '',
      batchNo: '',
      sku: '',
      invQty: '',
      recQty: '',
      shortQty: '',
      damageQty: '',
      grnQty: '',
      subUnit: '',
      subStockShortQty: '',
      grnPiecesQty: '',
      weight: '',
      rate: '',
      amount: '',
      remarks: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docdate: new Date(),
    entryNo: '',
    entryDate: null,
    supplier: '',
    supplierShortName: '',
    modeOfShipment: '',
    carrier: '',
    vehicleType: '',
    vehicleNo: '',
    driverName: '',
    contact: '',
    goodsDescription: '',
    securityName: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'docId', header: 'Doc ID', size: 140 },
    { accessorKey: 'docdate', header: 'Doc Date', size: 140 },
    { accessorKey: 'supplier', header: 'Supplier', size: 140 },
    { accessorKey: 'modeOfShipment', header: 'Mode of Shipment', size: 140 },
    { accessorKey: 'vehicleType', header: 'Vehicle Type', size: 140 },
    { accessorKey: 'driverName', header: 'Driver Name', size: 140 },
    { accessorKey: 'securityName', header: 'Security Person', size: 140 }
    // { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);
  const [lrNoDetailsTable, setLrNoDetailsTable] = useState([
    {
      id: 1,
      irNoHaw: '',
      invoiceNo: '',
      partNo: '',
      partDesc: '',
      batchNo: '',
      sku: '',
      invQty: '',
      recQty: '',
      shortQty: '',
      damageQty: '',
      grnQty: '',
      subUnit: '',
      subStockShortQty: '',
      grnPiecesQty: '',
      weight: '',
      rate: '',
      amount: '',
      remarks: ''
    }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllSupplier();
    getAllModeOfShipment();
    getAllPartNo();
    getGatePassDocId();
    getAllGatePass();
    getAllCarrier();
  }, []);

  const getAllSupplier = async () => {
    try {
      const supplierData = await getAllActiveSupplier(cbranch, client, orgId);
      console.log('Processed Data:', supplierData); // Log the processed data
      if (supplierData && supplierData.length > 0) {
        setSupplierList(supplierData);
      } else {
        console.warn('No suppliers found');
      }
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const getAllCarrier = async (modeOfShipment) => {
    try {
      const carrierData = await getAllActiveCarrier(cbranch, client, orgId, modeOfShipment);
      console.log('Processed Data:', carrierData); // Log the processed data
      if (carrierData && carrierData.length > 0) {
        setCarrierList(carrierData);
      } else {
        console.warn('No suppliers found');
      }
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const getAllModeOfShipment = async () => {
    try {
      const response = await apiCalls('get', `inward/getAllModeOfShipment?orgId=${orgId}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setModeOfShipmentList(response.paramObjectsMap.modOfShipments);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllPartNo = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/getPartNo?branch=${branch}&branchCode=${cbranch}&client=${client}&customer=${customer}&orgId=${orgId}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setPartNoList(response.paramObjectsMap.PartNo);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getGatePassDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `inward/getGatePassInDocId?branch=${branch}&branchCode=${cbranch}&client=${client}&finYear=${finYear}&orgId=${orgId}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setGatePassDocId(response.paramObjectsMap.GatePassInDocId);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllGatePass = async () => {
    try {
      const response = await apiCalls('get', `inward/gatePassIn?branchCode=${cbranch}&client=${client}&finYear=${finYear}&orgId=${orgId}`);

      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.gatePassInVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getGatePassById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `inward/gatePassIn/${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        // getAllModeOfShipment();
        const particularGatePassIn = response.paramObjectsMap.GatePassIn;
        console.log('THE PARTICULAR CUSTOMER IS:', particularGatePassIn);
        setGatePassDocId(particularGatePassIn.docId);
        getAllCarrier(particularGatePassIn.modeOfShipment);
        setFormData({
          docdate: particularGatePassIn.docdate,
          entryNo: particularGatePassIn.entryNo,
          entryDate: particularGatePassIn.entryDate,
          supplier: particularGatePassIn.supplier,
          supplierShortName: particularGatePassIn.supplierShortName,
          modeOfShipment: particularGatePassIn.modeOfShipment,
          carrier: particularGatePassIn.carrier,
          vehicleType: particularGatePassIn.vehicleType,
          vehicleNo: particularGatePassIn.vehicleNo,
          driverName: particularGatePassIn.driverName,
          contact: particularGatePassIn.contact,
          goodsDescription: particularGatePassIn.goodsDescription,
          securityName: particularGatePassIn.securityName
          // active: particularGatePassIn.active === 'Active' ? true : false
        });
        setLrNoDetailsTable(
          particularGatePassIn.gatePassDetailsVO.map((detail) => ({
            id: detail.id,
            irNoHaw: detail.irNoHaw,
            invoiceNo: detail.invoiceNo,
            // invoiceDate: detail.invoiceDate,
            partNo: detail.partNo,
            partDesc: detail.partDescription,
            batchNo: detail.batchNo,
            sku: detail.sku,
            invQty: detail.invQty,
            recQty: detail.recQty,
            shortQty: detail.shortQty,
            damageQty: detail.damageQty,
            grnQty: detail.grnQty,
            subUnit: detail.subUnit,
            subStockShortQty: detail.subStockShortQty,
            grnPiecesQty: detail.grnPiecesQty,
            weight: detail.weight,
            rate: detail.rate,
            amount: detail.amount,
            remarks: detail.remarks
          }))
        );
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'supplier') {
      const selectedSupplier = supplierList.find((supplier) => supplier.supplierShortName === value);
      setFormData({
        ...formData,
        supplier: value,
        supplierShortName: selectedSupplier ? selectedSupplier.supplier : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    if (name === 'modeOfShipment') {
      getAllCarrier(value); // Pass the selected modeOfShipment value to the function
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value, checked } = e.target;
  //   const nameRegex = /^[A-Za-z ]*$/;
  //   const alphaNumericRegex = /^[A-Za-z0-9]*$/;
  //   const numericRegex = /^[0-9]*$/;
  //   const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
  //   const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

  //   let errorMessage = '';

  //   switch (name) {
  //     case 'customer':
  //     case 'shortName':
  //       if (!nameRegex.test(value)) {
  //         errorMessage = 'Only alphabetic characters are allowed';
  //       }
  //       break;
  //     case 'pan':
  //       if (!alphaNumericRegex.test(value)) {
  //         errorMessage = 'Only alphanumeric characters are allowed';
  //       } else if (value.length > 10) {
  //         errorMessage = 'Invalid Format';
  //       }
  //       break;
  //     case 'branchName':
  //       if (!branchNameRegex.test(value)) {
  //         errorMessage = 'Only alphanumeric characters and @, _, -, * are allowed';
  //       }
  //       break;
  //     case 'mobile':
  //       if (!numericRegex.test(value)) {
  //         errorMessage = 'Only numeric characters are allowed';
  //       } else if (value.length > 10) {
  //         errorMessage = 'Invalid Format';
  //       }
  //       break;
  //     case 'gst':
  //       if (!alphaNumericRegex.test(value)) {
  //         errorMessage = 'Only alphanumeric characters are allowed';
  //       } else if (value.length > 15) {
  //         errorMessage = 'Invalid Format';
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   if (errorMessage) {
  //     setFieldErrors({ ...fieldErrors, [name]: errorMessage });
  //   } else {
  //     if (name === 'active') {
  //       setFormData({ ...formData, [name]: checked });
  //     } else if (name === 'email') {
  //       setFormData({ ...formData, [name]: value });
  //     } else {
  //       setFormData({ ...formData, [name]: value.toUpperCase() });
  //     }

  //     setFieldErrors({ ...fieldErrors, [name]: '' });
  //   }
  // };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleDeleteRow = (id) => {
    setLrNoDetailsTable(lrNoDetailsTable.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === lrNoDetailsTable[lrNoDetailsTable.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setGatePassDocId('');
    setFormData({
      // gatePassDocId: '',
      docdate: dayjs(),
      entryNo: '',
      entryDate: null,
      supplier: '',
      supplierShortName: '',
      modeOfShipment: '',
      carrier: '',
      vehicleType: '',
      vehicleNo: '',
      driverName: '',
      contact: '',
      goodsDescription: '',
      securityName: ''
    });
    setLrNoDetailsTable([
      {
        irNoHaw: '',
        invoiceNo: '',
        partNo: '',
        partDesc: '',
        batchNo: '',
        sku: '',
        invQty: '',
        recQty: '',
        shortQty: '',
        damageQty: '',
        grnQty: '',
        subUnit: '',
        subStockShortQty: '',
        grnPiecesQty: '',
        weight: '',
        rate: '',
        amount: '',
        remarks: ''
      }
    ]);
    setLrNoDetailsError('');
    setFieldErrors({
      docdate: new Date(),
      entryNo: '',
      entryDate: null,
      supplier: '',
      supplierShortName: '',
      modeOfShipment: '',
      carrier: '',
      vehicleType: '',
      vehicleNo: '',
      driverName: '',
      contact: '',
      goodsDescription: '',
      securityName: ''
    });
    getGatePassDocId();
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.entryNo) {
      errors.entryNo = 'Entry No is required';
    }
    if (!formData.entryDate) {
      errors.entryDate = 'Date is required';
    }
    if (!formData.supplier) {
      errors.supplier = 'Supplier is required';
    }
    if (!formData.modeOfShipment) {
      errors.modeOfShipment = 'Mode of Shipment is required';
    }
    if (!formData.carrier) {
      errors.carrier = 'Carrier Transport is required';
    }
    if (!formData.vehicleType) {
      errors.vehicleType = 'Vehicle Type is required';
    }
    if (!formData.vehicleNo) {
      errors.vehicleNo = 'Vehicle No is required';
    }
    if (!formData.driverName) {
      errors.driverName = 'Driver Name is required';
    }
    if (!formData.contact) {
      errors.contact = 'Contact is required';
    }
    if (!formData.goodsDescription) {
      errors.goodsDescription = 'Goods Description is required';
    }
    if (!formData.securityName) {
      errors.securityName = 'Security Name is required';
    }

    let lrNoDetailsTableValid = true;
    const newTableErrors = lrNoDetailsTable.map((row) => {
      const rowErrors = {};
      if (!row.irNoHaw) {
        rowErrors.irNoHaw = 'Lr No is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.invoiceNo) {
        rowErrors.invoiceNo = 'Invoice No is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.batchNo) {
        rowErrors.batchNo = 'Batch No is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.invQty) {
        rowErrors.invQty = 'Inv Qty is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.recQty) {
        rowErrors.recQty = 'Rec Qty is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.damageQty) {
        rowErrors.damageQty = 'Damage Qty is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.subStockShortQty) {
        rowErrors.subStockShortQty = 'Sub Stock Short Qty is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.grnPiecesQty) {
        rowErrors.grnPiecesQty = 'Grn Pieces Qty is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.weight) {
        rowErrors.weight = 'Weight is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.rate) {
        rowErrors.rate = 'Rate is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.amount) {
        rowErrors.amount = 'Amount is required';
        lrNoDetailsTableValid = false;
      }
      if (!row.remarks) {
        rowErrors.remarks = 'Remarks is required';
        lrNoDetailsTableValid = false;
      }

      return rowErrors;
    });

    setLrNoDetailsError(newTableErrors);

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const lrNoDetailsVO = lrNoDetailsTable.map((row) => ({
        amount: row.amount,
        batchNo: row.batchNo,
        damageQty: row.damageQty,
        grnPiecesQty: row.grnPiecesQty,
        invQty: row.invQty,
        invoiceDate: dayjs().format('YYYY-MM-DD'),
        invoiceNo: row.invoiceNo,
        irNoHaw: row.irNoHaw,
        partCode: '',
        partDescription: row.partDesc,
        partNo: row.partNo,
        rate: row.rate,
        recQty: row.recQty,
        remarks: row.remarks,
        rowNo: '',
        sku: row.sku,
        sno: '',
        subStockShortQty: row.subStockShortQty,
        subUnit: row.subUnit,
        unit: '',
        // shortQty: row.shortQty,
        // grnQty: row.grnQty,
        weight: row.weight
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        branch: branch,
        branchCode: cbranch,
        carrier: formData.carrier,
        client: client,
        contact: formData.contact,
        createdBy: loginUserName,
        customer: customer,
        entryDate: dayjs(formData.entryDate).format('YYYY-MM-DD'),
        docdate: dayjs(formData.docdate).format('YYYY-MM-DD'),
        driverName: formData.driverName,
        entryNo: formData.entryNo,
        finYear: finYear,
        goodsDescription: formData.goodsDescription,
        lotNo: '',
        modeOfShipment: formData.modeOfShipment,
        orgId: orgId,
        securityName: formData.securityName,
        supplier: formData.supplier,
        supplierShortName: formData.supplierShortName,
        vehicleNo: formData.vehicleNo,
        vehicleType: formData.vehicleType,
        gatePassInDetailsDTO: lrNoDetailsVO
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `inward/createUpdateGatePassIn`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          getAllGatePass();
          getGatePassDocId();
          showToast('success', editId ? ' Gate Pass In Updated Successfully' : 'Gate Pass In created successfully');
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Gate Pass In creation failed');
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
    setFormData({
      docdate: null,
      entryNo: '',
      entryDate: null,
      supplier: '',
      supplierShortName: '',
      modeOfShipment: '',
      carrier: '',
      vehicleType: '',
      vehicleNo: '',
      driverName: '',
      contact: '',
      goodsDescription: '',
      securityName: ''
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getGatePassById} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Doc ID"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="gatePassDocId"
                  value={gatePassDocId}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Doc Date"
                      value={formData.docdate ? dayjs(formData.docdate, 'YYYY-MM-DD') : null}
                      onChange={(date) => handleDateChange('docdate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="YYYY/MM/DD"
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="Entry/SI No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="entryNo"
                  value={formData.entryNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.entryNo}
                  helperText={fieldErrors.entryNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={formData.entryDate ? dayjs(formData.entryDate, 'YYYY-MM-DD') : null}
                      onChange={(date) => handleDateChange('entryDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="YYYY/MM/DD"
                      error={fieldErrors.entryDate}
                      helperText={fieldErrors.entryDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.supplier}>
                  <InputLabel id="supplier">Supplier</InputLabel>
                  <Select labelId="supplier" label="Supplier" value={formData.supplier} onChange={handleInputChange} name="supplier">
                    {supplierList.map((supplier) => (
                      <MenuItem key={supplier.id} value={supplier.supplierShortName}>
                        {supplier.supplierShortName}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.supplier && <FormHelperText>{fieldErrors.supplier}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="supplierShortName"
                  value={formData.supplierShortName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.supplierShortName}
                  helperText={fieldErrors.supplierShortName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.modeOfShipment}>
                  <InputLabel id="modeOfShipment">Mode Of Shipment</InputLabel>
                  <Select
                    labelId="modeOfShipment"
                    label="Mode Of Shipment"
                    value={formData.modeOfShipment}
                    onChange={handleInputChange}
                    name="modeOfShipment"
                  >
                    {modeOfShipmentList?.map((mode) => (
                      <MenuItem key={mode.id} value={mode.shipmentMode}>
                        {mode.shipmentMode}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.modeOfShipment && <FormHelperText>{fieldErrors.modeOfShipment}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.carrier}>
                  <InputLabel id="carrier">Carrier/Transport</InputLabel>
                  <Select labelId="carrier" label="Carrier/Transport" value={formData.carrier} onChange={handleInputChange} name="carrier">
                    {carrierList?.map((carrier) => (
                      <MenuItem key={carrier.id} value={carrier.carrier}>
                        {carrier.carrier}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.carrier && <FormHelperText>{fieldErrors.carrier}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.vehicleType}>
                  <InputLabel id="vehicleType">Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicleType"
                    label="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    name="vehicleType"
                  >
                    {/* {countryList?.map((row) => (
                      <MenuItem key={row.id} value={row.countryName}>
                        {row.countryName}
                      </MenuItem>
                    ))} */}
                    <MenuItem value="45 Feet">45 Feet</MenuItem>
                    <MenuItem value="Canter">Canter</MenuItem>
                    <MenuItem value="CONTAINER">CONTAINER</MenuItem>
                    <MenuItem value="TEMPO">TEMPO</MenuItem>
                  </Select>
                  {fieldErrors.vehicleType && <FormHelperText>{fieldErrors.vehicleType}</FormHelperText>}
                </FormControl>
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
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Contact"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  error={!!fieldErrors.contact}
                  helperText={fieldErrors.contact}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Brief desc of the Goods"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="goodsDescription"
                  value={formData.goodsDescription}
                  onChange={handleInputChange}
                  error={!!fieldErrors.goodsDescription}
                  helperText={fieldErrors.goodsDescription}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Security Person Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="securityName"
                  value={formData.securityName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.securityName}
                  helperText={fieldErrors.securityName}
                />
              </div>
              {/* <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleInputChange} name="active" color="primary" />}
                  label="Active"
                />
              </div> */}
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
                  <Tab value={0} label="LR No Details" />
                  <Tab value={1} label="Other Info" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
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
                                  <th className="px-2 py-2 text-white text-center">LR No./HAWB No./HBL No.</th>
                                  <th className="px-2 py-2 text-white text-center">InvoiceNo</th>
                                  <th className="px-2 py-2 text-white text-center">Part No</th>
                                  <th className="px-2 py-2 text-white text-center">Part Description</th>
                                  <th className="px-2 py-2 text-white text-center">Batch No</th>
                                  <th className="px-2 py-2 text-white text-center">SKU</th>
                                  <th className="px-2 py-2 text-white text-center">Inv Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Rec Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Short Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Damage Qty</th>
                                  <th className="px-2 py-2 text-white text-center">GRN Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Sub SKU</th>
                                  <th className="px-2 py-2 text-white text-center">Sub Stock Short QTY</th>
                                  <th className="px-2 py-2 text-white text-center">GRN Pieces QTY</th>
                                  <th className="px-2 py-2 text-white text-center">Weight</th>
                                  <th className="px-2 py-2 text-white text-center">Rate</th>
                                  <th className="px-2 py-2 text-white text-center">Amount</th>
                                  <th className="px-2 py-2 text-white text-center">Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lrNoDetailsTable.map((row, index) => (
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
                                        style={{ width: '100px' }}
                                        value={row.irNoHaw}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, irNoHaw: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], irNoHaw: !value ? 'LR No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.irNoHaw ? 'error form-control' : 'form-control'}
                                        // //style={{ marginBottom: '10px' }}
                                      />
                                      {lrNoDetailsError[index]?.irNoHaw && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].irNoHaw}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.invoiceNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, invoiceNo: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], invoiceNo: !value ? 'Invoice No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.invoiceNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.invoiceNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].invoiceNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          const selectedPart = partNoList.find((part) => part.partNo === value);

                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) =>
                                              r.id === row.id
                                                ? {
                                                    ...r,
                                                    partNo: value,
                                                    partDesc: selectedPart ? selectedPart.partDesc : '',
                                                    sku: selectedPart ? selectedPart.sku : '',
                                                    subUnit: selectedPart ? selectedPart.sku : ''
                                                  }
                                                : r
                                            )
                                          );

                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partNo: !value ? 'Part No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {partNoList.map((part) => (
                                          <option key={part.id} value={part.partNo}>
                                            {part.partNo}
                                          </option>
                                        ))}
                                      </select>
                                      {lrNoDetailsError[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].partNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.partDesc}
                                        disabled
                                        className="form-control"
                                        title={row.partDesc}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.batchNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, batchNo: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], batchNo: !value ? 'Batch No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].batchNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input type="text" style={{ width: '100px' }} value={row.sku} disabled className="form-control" />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.invQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, invQty: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], invQty: !value ? 'Invoice Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.invQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.invQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].invQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.recQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const newValue = parseInt(value, 10);

                                          if (newValue > parseInt(row.invQty, 10)) {
                                            setLrNoDetailsError((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], recQty: 'Rec Qty cannot exceed Invoice Qty' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrNoDetailsTable((prev) =>
                                              prev.map((r) =>
                                                r.id === row.id ? { ...r, recQty: value.toUpperCase(), shortQty: row.invQty - value } : r
                                              )
                                            );
                                            setLrNoDetailsError((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                recQty: !value ? 'Rec Qty is required' : '',
                                                shortQty: ''
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrNoDetailsError[index]?.recQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.recQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].recQty}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.shortQty}
                                        disabled
                                        className={lrNoDetailsError[index]?.shortQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.shortQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].shortQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.damageQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const newValue = parseInt(value, 10);

                                          if (newValue > parseInt(row.recQty, 10)) {
                                            setLrNoDetailsError((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], damageQty: 'Damage Qty cannot exceed Rec Qty' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrNoDetailsTable((prev) =>
                                              prev.map((r) =>
                                                r.id === row.id ? { ...r, damageQty: value.toUpperCase(), grnQty: row.recQty - value } : r
                                              )
                                            );
                                            setLrNoDetailsError((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                damageQty: !value ? 'Damage Qty is required' : '',
                                                grnQty: ''
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrNoDetailsError[index]?.damageQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.damageQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].damageQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.grnQty}
                                        disabled
                                        className={lrNoDetailsError[index]?.grnQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.grnQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].grnQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input type="text" style={{ width: '100px' }} value={row.subUnit} disabled className="form-control" />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.subStockShortQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, subStockShortQty: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              subStockShortQty: !value ? 'Sub Stock Short Qty is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.subStockShortQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.subStockShortQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].subStockShortQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.grnPiecesQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, grnPiecesQty: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              grnPiecesQty: !value ? 'Grn Pieces Qty is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.grnPiecesQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.grnPiecesQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].grnPiecesQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.weight}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, weight: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], weight: !value ? 'Weight is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.weight ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.weight && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].weight}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.rate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, rate: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], rate: !value ? 'Rate is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.rate ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.rate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].rate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.amount}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, amount: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], amount: !value ? 'Amount is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrNoDetailsError[index]?.amount ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.amount && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].amount}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.remarks}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrNoDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, remarks: value.toUpperCase() } : r))
                                          );
                                          setLrNoDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], remarks: !value ? 'Remarks is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={lrNoDetailsError[index]?.remarks ? 'error form-control' : 'form-control'}
                                      />
                                      {lrNoDetailsError[index]?.remarks && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrNoDetailsError[index].remarks}
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
                    <div>other Info</div>
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
export default GatePassIn;
