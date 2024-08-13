import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
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
import apiCalls from 'apicall';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
// import 'react-datepicker/dist/react-datepicker.css';
// import { DatePicker } from 'react-datepicker';
import dayjs from 'dayjs';
import { width } from '@mui/system';

export const Grn = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs(),
    grnType: '',
    entrySlNo: '',
    date: dayjs(),
    tax: '',
    gatePassId: '',
    gatePassDate: null,
    grnDate: null,
    customerPo: '',
    vas: false,
    supplierShortName: '',
    supplier: '',
    billOfEntry: '',
    capacity: '',
    modeOfShipment: '',
    carrier: '',
    vesselNo: '',
    hsnNo: '',
    vehicleType: '',
    contact: '',
    sealNo: '',
    lrNo: '',
    driverName: '',
    securityName: '',
    containerNo: '',
    lrDate: null,
    goodsDesc: '',
    vehicleNo: '',
    vesselDetails: '',
    lotNo: '',
    destinationFrom: '',
    destinationTo: '',
    noOfPallets: '',
    invoiceNo: '',
    noOfPacks: '',
    totAmt: '',
    totGrnQty: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: new Date(),
    grnType: '',
    entrySlNo: '',
    date: new Date(),
    tax: '',
    gatePassId: '',
    gatePassDate: null,
    grnDate: null,
    customerPo: '',
    vas: false,
    supplierShortName: '',
    supplier: '',
    billOfEntry: '',
    capacity: '',
    modeOfShipment: '',
    carrier: '',
    vesselNo: '',
    hsnNo: '',
    vehicleType: '',
    contact: '',
    sealNo: '',
    lrNo: '',
    driverName: '',
    securityName: '',
    containerNo: '',
    lrDate: null,
    goodsDesc: '',
    vehicleNo: '',
    vesselDetails: '',
    lotNo: '',
    destinationFrom: '',
    destinationTo: '',
    noOfPallets: '',
    invoiceNo: '',
    noOfPacks: '',
    totAmt: '',
    totGrnQty: ''
  });
  const [lrTableData, setLrTableData] = useState([
    {
      id: 1,
      qrCode: '',
      lr_Hawb_Hbl_No: '',
      invNo: '',
      dnNo: '',
      shipmentNo: '',
      invDate: null,
      glDate: null,
      locationType: '',
      partNo: '',
      partDesc: '',
      sku: '',
      invQty: '',
      recQty: '',
      shortQty: '',
      damageQty: '',
      grnQty: '',
      subStockQty: '',
      batch_PalletNo: '',
      batchDate: null,
      expDate: null,
      palletQty: '',
      noOfPallets: '',
      pkgs: '',
      weight: '',
      mrp: '',
      amt: '',
      insAmt: '',
      remarks: ''
    }
  ]);
  const [lrTableErrors, setLrTableErrors] = useState([
    {
      qrCode: '',
      lr_Hawb_Hbl_No: '',
      invNo: '',
      dnNo: '',
      shipmentNo: '',
      invDate: '',
      glDate: '',
      locationType: '',
      partNo: '',
      partDesc: '',
      sku: '',
      invQty: '',
      recQty: '',
      shortQty: '',
      damageQty: '',
      grnQty: '',
      subStockQty: '',
      batch_PalletNo: '',
      batchDate: null,
      expDate: null,
      palletQty: '',
      noOfPallets: '',
      pkgs: '',
      weight: '',
      mrp: '',
      amt: '',
      insAmt: '',
      remarks: ''
    }
  ]);
  const [value, setValue] = useState(0);
  const [listView, setListView] = useState(false);
  const [listViewData, setListViewData] = useState([]);
  const listViewColumns = [
    { accessorKey: 'grnNo', header: 'GRN No', size: 140 },
    { accessorKey: 'grnDate', header: 'GRN Date', size: 140 }
  ];

  useEffect(() => {
    // getAllGatePassId();
    // getAllSuppliers();
    // getAllModesOfShipment();
    // getAllCarriers();
    // getAllVehicleTypes();
    // getAllGrns();
  }, []);

  // const getAllGatePassId = async () => {
  //   try {
  //     const response = await apiCalls('get', '/api/gate-passes');
  //     setDropdownLists((prev) => ({ ...prev, gatePasses: response.data }));
  //   } catch (error) {
  //     console.error('Error fetching gate passes:', error);
  //   }
  // };

  // const getAllSuppliers = async () => {
  //   try {
  //     const response = await apiCalls('get', '/api/suppliers');
  //     setDropdownLists((prev) => ({ ...prev, suppliers: response.data }));
  //   } catch (error) {
  //     console.error('Error fetching suppliers:', error);
  //   }
  // };

  // const getAllModesOfShipment = async () => {
  //   try {
  //     const response = await apiCalls('get', '/api/modes-of-shipment');
  //     setDropdownLists((prev) => ({ ...prev, modesOfShipment: response.data }));
  //   } catch (error) {
  //     console.error('Error fetching modes of shipment:', error);
  //   }
  // };

  // const getAllCarriers = async () => {
  //   try {
  //     const response = await apiCalls('get', '/api/carriers');
  //     setDropdownLists((prev) => ({ ...prev, carriers: response.data }));
  //   } catch (error) {
  //     console.error('Error fetching carriers:', error);
  //   }
  // };

  // const getAllVehicleTypes = async () => {
  //   try {
  //     const response = await apiCalls('get', '/api/vehicle-types');
  //     setDropdownLists((prev) => ({ ...prev, vehicleTypes: response.data }));
  //   } catch (error) {
  //     console.error('Error fetching vehicle types:', error);
  //   }
  // };

  const getAllGrns = async () => {
    try {
      const response = await apiCalls('get', '/api/grn-data');
      setListViewData(response.data);
    } catch (error) {
      console.error('Error fetching GRN data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;

    let errorMessage = '';

    switch (name) {
      case 'docCode':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;
    }

    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      // if (name === 'screenCode') {
      //   const selectedScreen = screenList.find((scr) => scr.screenCode === value);
      //   if (selectedScreen) {
      //     setFormData((prevData) => ({
      //       ...prevData,
      //       screenName: selectedScreen.screenName,
      //       screenCode: selectedScreen.screenCode
      //     }));
      //   }
      // }
      if (name === 'vas') {
        // setFormData({ ...formData, [name]: checked });
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
      }

      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleKeyDown = (e, row, table) => {
    if (e.key === 'Tab' && row.id === table[table.length - 1].id) {
      e.preventDefault();
      if (isLastRowEmpty(table)) {
        displayRowError(table);
      } else {
        // if (table === roleTableData) handleAddRow();
        // else if (table === branchTableData) handleAddRow1();
        handleAddRow();
      }
    }
  };

  const handleAddRow = () => {
    if (isLastRowEmpty(lrTableData)) {
      displayRowError(lrTableData);
      return;
    }
    const newRow = {
      id: Date.now(),
      qrCode: '',
      lr_Hawb_Hbl_No: '',
      invNo: '',
      dnNo: '',
      shipmentNo: '',
      invDate: null,
      glDate: null,
      locationType: '',
      partNo: '',
      partDesc: '',
      sku: '',
      invQty: '',
      recQty: '',
      shortQty: '',
      damageQty: '',
      grnQty: '',
      subStockQty: '',
      batch_PalletNo: '',
      batchDate: null,
      expDate: null,
      palletQty: '',
      noOfPallets: '',
      pkgs: '',
      weight: '',
      mrp: '',
      amt: '',
      insAmt: '',
      remarks: ''
    };
    setLrTableData([...lrTableData, newRow]);
    setLrTableErrors([
      ...lrTableErrors,
      {
        qrCode: '',
        lr_Hawb_Hbl_No: '',
        invNo: '',
        dnNo: '',
        shipmentNo: '',
        glDate: '',
        locationType: '',
        partNo: '',
        partDesc: '',
        sku: '',
        invQty: '',
        recQty: '',
        shortQty: '',
        damageQty: '',
        grnQty: '',
        subStockQty: '',
        batch_PalletNo: '',
        batchDate: '',
        expDate: '',
        palletQty: '',
        noOfPallets: '',
        pkgs: '',
        weight: '',
        mrp: '',
        amt: '',
        insAmt: '',
        remarks: ''
      }
    ]);
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;
    if (table === lrTableData) {
      return !lastRow.lr_Hawb_Hbl_No || !lastRow.invNo || !lastRow.shipmentNo;
    }
    return false;
  };

  const displayRowError = (table) => {
    if (table === lrTableData) {
      setLrTableErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[table.length - 1] = {
          ...newErrors[table.length - 1],
          lr_Hawb_Hbl_No: !table[table.length - 1].lr_Hawb_Hbl_No ? 'Lr_Hawb_Hbl_No is required' : '',
          invNo: !table[table.length - 1].invNo ? 'Invoice No is required' : '',
          dnNo: !table[table.length - 1].dnNo ? 'DN No is required' : '',
          shipmentNo: !table[table.length - 1].shipmentNo ? 'Shipment No is required' : ''
        };
        return newErrors;
      });
    }
  };

  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClear = () => {
    setFormData({
      docId: '',
      docDate: null,
      grnType: '',
      entrySlNo: '',
      date: null,
      tax: '',
      gatePassId: '',
      gatePassDate: null,
      grnDate: null,
      customerPo: '',
      vas: false,
      supplierShortName: '',
      supplier: '',
      billOfEntry: '',
      capacity: '',
      modeOfShipment: '',
      carrier: '',
      vesselNo: '',
      hsnNo: '',
      vehicleType: '',
      contact: '',
      sealNo: '',
      lrNo: '',
      driverName: '',
      securityName: '',
      containerNo: '',
      lrDate: null,
      goodsDesc: '',
      vehicleNo: '',
      vesselDetails: '',
      lotNo: '',
      destinationFrom: '',
      destinationTo: '',
      noOfPallets: '',
      invoiceNo: '',
      noOfPacks: '',
      totAmt: '',
      totGrnQty: ''
    });
    setFieldErrors({
      docId: '',
      docDate: '',
      grnType: '',
      entrySlNo: '',
      // date: new Date(),
      date: '',
      tax: '',
      gatePassId: '',
      gatePassDate: null,
      grnDate: null,
      customerPo: '',
      vas: false,
      supplierShortName: '',
      supplier: '',
      billOfEntry: '',
      capacity: '',
      modeOfShipment: '',
      carrier: '',
      vesselNo: '',
      hsnNo: '',
      vehicleType: '',
      contact: '',
      sealNo: '',
      lrNo: '',
      driverName: '',
      securityName: '',
      containerNo: '',
      lrDate: null,
      goodsDesc: '',
      vehicleNo: '',
      vesselDetails: '',
      lotNo: '',
      destinationFrom: '',
      destinationTo: '',
      noOfPallets: '',
      invoiceNo: '',
      noOfPacks: '',
      totAmt: '',
      totGrnQty: ''
    });
    setEditId('');
    setLrTableData([
      {
        id: 1,
        qrCode: '',
        lr_Hawb_Hbl_No: '',
        invNo: '',
        dnNo: '',
        shipmentNo: '',
        invDate: null,
        glDate: null,
        locationType: '',
        partNo: '',
        partDesc: '',
        sku: '',
        invQty: '',
        recQty: '',
        shortQty: '',
        damageQty: '',
        grnQty: '',
        subStockQty: '',
        batch_PalletNo: '',
        batchDate: null,
        expDate: null,
        palletQty: '',
        noOfPallets: '',
        pkgs: '',
        weight: '',
        mrp: '',
        amt: '',
        insAmt: '',
        remarks: ''
      }
    ]);
    setLrTableErrors('');
  };

  const handleSave = async () => {
    const lrVo = lrTableData.map((row) => ({
      qrCode: row.qrCode,
      lr_Hawb_Hbl_No: row.lr_Hawb_Hbl_No,
      invNo: row.invNo,
      dnNo: row.dnNo,
      shipmentNo: row.shipmentNo,
      invDate: dayjs(row.invDate).format('DD-MM-YYYY'),
      glDate: dayjs(row.glDate).format('DD-MM-YYYY'),
      locationType: row.locationType,
      partNo: row.partNo,
      partDesc: row.partDesc,
      sku: row.sku,
      invQty: row.invQty,
      recQty: row.recQty,
      shortQty: row.shortQty,
      damageQty: row.damageQty,
      grnQty: row.grnQty,
      subStockQty: row.subStockQty,
      batch_PalletNo: row.batch_PalletNo,
      batchDate: dayjs(row.batchDate).format('DD-MM-YYYY'),
      expDate: dayjs(row.expDate).format('DD-MM-YYYY'),
      palletQty: row.palletQty,
      noOfPallets: row.noOfPallets,
      pkgs: row.pkgs,
      weight: row.weight,
      mrp: row.mrp,
      amt: row.amt,
      insAmt: row.insAmt,
      remarks: row.remarks
    }));

    const saveFormData = {
      ...(editId && { id: editId }),
      docId: formData.docId,
      docDate: dayjs(formData.docDate).format('DD-MM-YYYY'),
      grnType: formData.grnType,
      entrySlNo: formData.entrySlNo,
      date: dayjs(formData.date).format('DD-MM-YYYY'),
      tax: formData.tax,
      gatePassId: formData.gatePassId,
      gatePassDate: formData.gatePassDate,
      grnDate: formData.grnDate,
      customerPo: formData.customerPo,
      vas: formData.vas,
      supplierShortName: formData.supplierShortName,
      supplier: formData.supplier,
      billOfEntry: formData.billOfEntry,
      capacity: formData.capacity,
      modeOfShipment: formData.modeOfShipment,
      carrier: formData.carrier,
      vesselNo: formData.vesselNo,
      hsnNo: formData.hsnNo,
      vehicleType: formData.vehicleType,
      contact: formData.contact,
      sealNo: formData.sealNo,
      lrNo: formData.lrNo,
      driverName: formData.driverName,
      securityName: formData.securityName,
      containerNo: formData.containerNo,
      lrDate: formData.lrDate,
      goodsDesc: formData.goodsDesc,
      vehicleNo: formData.vehicleNo,
      vesselDetails: formData.vesselDetails,
      lotNo: formData.lotNo,
      destinationFrom: formData.destinationFrom,
      destinationTo: formData.destinationTo,
      noOfPallets: formData.noOfPallets,
      invoiceNo: formData.invoiceNo,
      noOfPacks: formData.noOfPacks,
      totAmt: formData.totAmt,
      totGrnQty: formData.totGrnQty,
      orgId: orgId,
      createdBy: loginUserName
    };

    console.log('DATA TO SAVE IS:', saveFormData);

    const errors = {};
    if (!formData.grnDate) errors.grnDate = 'GRN Date is required';
    if (!formData.supplierShortName) errors.supplierShortName = 'Supplier Short Name is required';

    if (!formData.modeOfShipment) errors.modeOfShipment = 'Mode of Shipment is required';
    if (!formData.carrier) errors.carrier = 'Carrier is required';

    let lrTableDataValid = true;
    const newTableErrors = lrTableData.map((row) => {
      const rowErrors = {};
      if (!row.lr_Hawb_Hbl_No) {
        rowErrors.lr_Hawb_Hbl_No = 'Lr_Hawb_Hbl_No is required';
        lrTableDataValid = false;
      }
      if (!row.invoiceNo) {
        rowErrors.invoiceNo = 'Invoice No is required';
        lrTableDataValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
        lrTableDataValid = false;
      }
      if (!row.partDesc) {
        rowErrors.partDesc = 'Part Desc is required';
        lrTableDataValid = false;
      }
      if (!row.sku) {
        rowErrors.sku = 'SKU is required';
        lrTableDataValid = false;
      }
      if (!row.invQty) {
        rowErrors.invQty = 'Invoice QTY is required';
        lrTableDataValid = false;
      }
      if (!row.grnQty) {
        rowErrors.grnQty = 'GRN QTY is required';
        lrTableDataValid = false;
      }
      if (!row.palletQty) {
        rowErrors.palletQty = 'Pallet Qty is required';
        lrTableDataValid = false;
      }
      if (!row.noOfPallets) {
        rowErrors.noOfPallets = 'No of Pallets is required';
        lrTableDataValid = false;
      }
      return rowErrors;
    });
    setFieldErrors(errors);

    setLrTableErrors(newTableErrors);

    // if (Object.keys(errors).length === 0) {
    //   setIsLoading(true);
    //   const saveFormData = {
    //     ...(editId && { id: editId }),
    //     docId: formData.docId,
    //     docDate: dayjs(formData.docDate).format('DD-MM-YYYY'),
    //     grnType: formData.grnType,
    //     entrySlNo: formData.entrySlNo,
    //     date: dayjs(formData.date).format('DD-MM-YYYY'),
    //     tax: formData.tax,
    //     gatePassId: formData.gatePassId,
    //     gatePassDate: formData.gatePassDate,
    //     grnDate: formData.grnDate,
    //     customerPo: formData.customerPo,
    //     vas: formData.vas,
    //     supplierShortName: formData.supplierShortName,
    //     supplier: formData.supplier,
    //     billOfEntry: formData.billOfEntry,
    //     capacity: formData.capacity,
    //     modeOfShipment: formData.modeOfShipment,
    //     carrier: formData.carrier,
    //     vesselNo: formData.vesselNo,
    //     hsnNo: formData.hsnNo,
    //     vehicleType: formData.vehicleType,
    //     contact: formData.contact,
    //     sealNo: formData.sealNo,
    //     lrNo: formData.lrNo,
    //     driverName: formData.driverName,
    //     securityName: formData.securityName,
    //     containerNo: formData.containerNo,
    //     lrDate: formData.lrDate,
    //     goodsDesc: formData.goodsDesc,
    //     vehicleNo: formData.vehicleNo,
    //     vesselDetails: formData.vesselDetails,
    //     lotNo: formData.lotNo,
    //     destinationFrom: formData.destinationFrom,
    //     destinationTo: formData.destinationTo,
    //     noOfPallets: formData.noOfPallets,
    //     invoiceNo: formData.invoiceNo,
    //     noOfPacks: formData.noOfPacks,
    //     totAmt: formData.totAmt,
    //     totGrnQty: formData.totGrnQty,
    //     orgId: orgId,
    //     createdBy: loginUserName
    //   };

    //   console.log('DATA TO SAVE IS:', saveFormData);
    //   try {
    //     const response = await apiCalls('put', `inboundcontroller/createUpdategrn`, saveFormData);
    //     if (response.status === true) {
    //       console.log('Response:', response);
    //       showToast('success', editId ? 'GRN Updated Successfully' : 'GRN created successfully');
    //       handleClear();
    //       getAllGrns();
    //       setIsLoading(false);
    //     } else {
    //       showToast('error', response.paramObjectsMap.errorMessage || 'GRN creation failed');
    //       setIsLoading(false);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     showToast('error', 'GRN creation failed');
    //     setIsLoading(false);
    //   }
    // } else {
    //   setFieldErrors(errors);
    // }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" />
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true}
              // toEdit={getEmployeeById}
            />
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
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.grnType}>
                  <InputLabel id="grnType-label">GRN Type</InputLabel>
                  <Select labelId="grnType-label" label="GRN Type" value={formData.grnType} onChange={handleInputChange} name="grnType">
                    <MenuItem value="GET PASS">Gate Pass</MenuItem>
                    <MenuItem value="GRN">GRN</MenuItem>
                  </Select>
                  {fieldErrors.grnType && <FormHelperText>{fieldErrors.grnType}</FormHelperText>}
                </FormControl>
              </div>
              {/* Entry SL No */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Entry SL No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="entrySlNo"
                  value={formData.entrySlNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.entrySlNo}
                  helperText={fieldErrors.entrySlNo}
                />
              </div>

              {/* Date */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={formData.date ? dayjs(formData.date, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('date', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.date}
                      helperText={fieldErrors.date && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              {/* Tax */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Tax"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="tax"
                  value={formData.tax}
                  onChange={handleInputChange}
                  error={!!fieldErrors.tax}
                  helperText={fieldErrors.tax}
                />
              </div>

              {/* Gate Pass ID */}
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.gatePassId}>
                  <InputLabel id="gatePassId-label">Gate Pass ID</InputLabel>
                  <Select
                    labelId="gatePassId-label"
                    label="Gate Pass ID"
                    value={formData.gatePassId}
                    onChange={handleInputChange}
                    name="gatePassId"
                  >
                    <MenuItem value="GET PASS 1">Gate Pass 1</MenuItem>
                    <MenuItem value="GET PASS 2">Gate Pass 2</MenuItem>
                  </Select>
                  {fieldErrors.gatePassId && <FormHelperText>{fieldErrors.gatePassId}</FormHelperText>}
                </FormControl>
              </div>

              {/* Gate Pass Date */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Gate Pass Date"
                      value={formData.gatePassDate ? dayjs(formData.gatePassDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('gatePassDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.gatePassDate}
                      helperText={fieldErrors.gatePassDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              {/* GRN Date */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small" error={Boolean(fieldErrors.grnDate)}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={
                        <span>
                          GRN Date <span>&nbsp;*</span>
                        </span>
                      }
                      value={formData.grnDate ? dayjs(formData.grnDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('grnDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={Boolean(fieldErrors.grnDate)}
                    />
                  </LocalizationProvider>
                  {fieldErrors.grnDate && <FormHelperText>{'Required'}</FormHelperText>}
                </FormControl>
              </div>

              {/* Customer PO */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Customer PO"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="customerPo"
                  value={formData.customerPo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.customerPo}
                  helperText={fieldErrors.customerPo}
                />
              </div>

              {/* Supplier Short Name */}
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.supplierShortName}>
                  <InputLabel id="supplierShortName-label">Supplier Short Name *</InputLabel>
                  <Select
                    labelId="supplierShortName-label"
                    label="Supplier Short Name *"
                    value={formData.supplierShortName}
                    onChange={handleInputChange}
                    name="supplierShortName"
                  >
                    <MenuItem value="SUPPLIER1">SUPPLIER 1</MenuItem>
                    <MenuItem value="SUPPLIER2">SUPPLIER 2</MenuItem>
                  </Select>
                  {fieldErrors.supplierShortName && <FormHelperText>{fieldErrors.supplierShortName}</FormHelperText>}
                </FormControl>
              </div>

              {/* Supplier */}
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
                />
              </div>

              {/* Bill of Entry */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Bill of Entry"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="billOfEntry"
                  value={formData.billOfEntry}
                  onChange={handleInputChange}
                  error={!!fieldErrors.billOfEntry}
                  helperText={fieldErrors.billOfEntry}
                />
              </div>

              {/* Capacity */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Capacity"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  error={!!fieldErrors.capacity}
                  helperText={fieldErrors.capacity}
                />
              </div>

              {/* Mode of Shipment */}
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.modeOfShipment}>
                  <InputLabel id="modeOfShipment-label">
                    Mode of Shipment <span>&nbsp;*</span>
                  </InputLabel>
                  <Select
                    labelId="modeOfShipment-label"
                    label="Mode of Shipment"
                    value={formData.modeOfShipment}
                    onChange={handleInputChange}
                    name="modeOfShipment"
                    required
                  >
                    <MenuItem value="AIR">AIR</MenuItem>
                    <MenuItem value="SEA">SEA</MenuItem>
                    <MenuItem value="LAND">LAND</MenuItem>
                  </Select>
                  {fieldErrors.modeOfShipment && <FormHelperText>{fieldErrors.modeOfShipment}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.carrier}>
                  <InputLabel id="carrier-label">
                    Carrier <span>&nbsp;*</span>
                  </InputLabel>
                  <Select
                    labelId="carrier-label"
                    label="Carrier"
                    value={formData.carrier}
                    onChange={handleInputChange}
                    name="carrier"
                    required
                  >
                    <MenuItem value="CARRIER 1">CARRIER 1</MenuItem>
                    <MenuItem value="CARRIER 2">CARRIER 2</MenuItem>
                  </Select>
                  {fieldErrors.carrier && <FormHelperText>{fieldErrors.carrier}</FormHelperText>}
                </FormControl>
              </div>

              {/* Vessel No */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Vessel No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="vesselNo"
                  value={formData.vesselNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.vesselNo}
                  helperText={fieldErrors.vesselNo}
                />
              </div>

              {/* HSN No */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="HSN No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="hsnNo"
                  value={formData.hsnNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.hsnNo}
                  helperText={fieldErrors.hsnNo}
                />
              </div>

              {/* No of Pallets */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="No of Pallets"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="noOfPallets"
                  value={formData.noOfPallets}
                  onChange={handleInputChange}
                  error={!!fieldErrors.noOfPallets}
                  helperText={fieldErrors.noOfPallets}
                />
              </div>

              {/* Invoice No */}
              <div className="col-md-3 mb-3">
                <TextField
                  label="Invoice No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.invoiceNo}
                  helperText={fieldErrors.invoiceNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleInputChange} name="vas" color="primary" />}
                  label="VAS"
                />
              </div>
            </div>

            <div className="row mt-2">
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value={0} label="LR Details" />
                  <Tab value={1} label="Summary" />
                  <Tab value={2} label="Other Info" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered ">
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                    Action
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                    S.No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    QR Code
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    LR No./ HAWB No./HBL No <span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Invoice No <span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    DN No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Shipment No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    Invoice Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    GL Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Bin Type
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Part No <span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Part Desc <span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    SKU <span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Inv QTY<span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Rec QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Short QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Damage QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    GRN QTY<span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Sub Stock QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Batch / Pallet No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Batch Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Pallet QTY<span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    No of Pallets<span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Pkgs
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Weight
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    MRP
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Amount
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Ins Amount
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {lrTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, lrTableData, setLrTableData)}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.qrCode}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, qrCode: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], qrCode: !value ? 'QR Code is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.qrCode ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.qrCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].qrCode}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.lr_Hawb_Hbl_No}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, lr_Hawb_Hbl_No: value } : r))
                                          );
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              lr_Hawb_Hbl_No: !value ? 'Lr_Hawb_Hbl_No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.lr_Hawb_Hbl_No && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].lr_Hawb_Hbl_No}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.invNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, invNo: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], invNo: !value ? 'Invoice No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.invNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.invNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].invNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.dnNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, dnNo: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], dnNo: !value ? 'DN No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.dnNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.dnNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].dnNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.shipmentNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, shipmentNo: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], shipmentNo: !value ? 'Shipment No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row, lrTableData)}
                                        className={lrTableErrors[index]?.shipmentNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.shipmentNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].shipmentNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.invDate}
                                        // style={{ width: '150px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, invDate: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], invDate: !value ? 'Invoice Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.invDate ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.invDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].invDate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2" style={{ width: '150px' }}>
                                      <input
                                        style={{ width: '150px' }}
                                        type="date"
                                        value={row.glDate}
                                        // style={{ width: '150px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, glDate: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], glDate: !value ? 'GRN Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.glDate ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.glDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].glDate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.binType}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handleBinTypeChange(row, index, e)}
                                        className={lrTableErrors[index]?.binType ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {getAvailableBinTypes(row.id).map((binType) => (
                                          <option key={role.id} value={role.bin}>
                                            {role.bin}
                                          </option>
                                        ))} */}
                                      </select>
                                      {lrTableErrors[index]?.binType && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].binType}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handlePartNoChange(row, index, e)}
                                        className={lrTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {getAvailablePartNo(row.id).map((partNo) => (
                                          <option key={role.id} value={role.bin}>
                                            {role.bin}
                                          </option>
                                        ))} */}
                                      </select>
                                      {lrTableErrors[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].partNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.partDesc}
                                        className={lrTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '200px' }}
                                        type="text"
                                        value={row.sku}
                                        className={lrTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.invQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      invQty: value,
                                                      recQty: !value ? '' : r.recQty,
                                                      shortQty: !value ? '' : r.shortQty
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            // Clear the error if input is valid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                invQty: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                invQty: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.invQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.invQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].invQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.recQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/; // Pattern to match only whole numbers

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            const numericValue = parseInt(value, 10);
                                            const numericInvQty = parseInt(row.invQty, 10) || 0;

                                            if (value === '' || numericValue <= numericInvQty) {
                                              setLrTableData((prev) => {
                                                const updatedData = prev.map((r) => {
                                                  const updatedRecQty = numericValue || 0;
                                                  return r.id === row.id
                                                    ? {
                                                        ...r,
                                                        recQty: value,
                                                        shortQty: !value ? '' : numericInvQty - updatedRecQty
                                                      }
                                                    : r;
                                                });
                                                return updatedData;
                                              });
                                              setLrTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  recQty: !value ? 'Rec QTY is required' : ''
                                                };
                                                return newErrors;
                                              });
                                            } else {
                                              setLrTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  recQty: 'Rec QTY cannot be greater than Inv QTY'
                                                };
                                                return newErrors;
                                              });
                                            }
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], recQty: 'Invalid value' };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.recQty ? 'error form-control' : 'form-control'}
                                        disabled={!row.invQty}
                                      />
                                      {row.invQty && lrTableErrors[index]?.recQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].recQty}
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.shortQty}
                                        className={lrTableErrors[index]?.shortQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.damageQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/; // Pattern to match only whole numbers

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            const numericValue = parseInt(value, 10);
                                            const numericRecQty = parseInt(row.recQty, 10) || 0;

                                            if (value === '' || numericValue <= numericRecQty) {
                                              setLrTableData((prev) => {
                                                const updatedData = prev.map((r) => {
                                                  const updatedDamageQty = numericValue || 0;
                                                  return r.id === row.id
                                                    ? {
                                                        ...r,
                                                        damageQty: value,
                                                        grnQty: !value ? '' : numericRecQty - updatedDamageQty
                                                      }
                                                    : r;
                                                });
                                                return updatedData;
                                              });
                                              setLrTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  damageQty: !value ? '' : ''
                                                };
                                                return newErrors;
                                              });
                                            } else {
                                              setLrTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  damageQty: 'Damage QTY cannot be greater than Rec QTY'
                                                };
                                                return newErrors;
                                              });
                                            }
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], recQty: 'Invalid value' };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.recQty ? 'error form-control' : 'form-control'}
                                        disabled={!row.recQty}
                                      />
                                      {row.recQty && lrTableErrors[index]?.damageQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].damageQty}
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.grnQty}
                                        className={lrTableErrors[index]?.grnQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.subStockQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      subStockQty: value
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                subStockQty: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                subStockQty: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.subStockQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.subStockQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].subStockQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.batch_PalletNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const alphaNumericPattern = /^[a-zA-Z0-9]*$/; // Regex pattern to match only alphanumeric characters

                                          if (alphaNumericPattern.test(value) || value === '') {
                                            // Input is valid or empty, update the state
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      batch_PalletNo: value.toUpperCase()
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            // Clear the error if input is valid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                batch_PalletNo: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                batch_PalletNo: 'only alphanumeric characters are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.batch_PalletNo ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.batch_PalletNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].batch_PalletNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.batchDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, batchDate: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], batchDate: !value ? 'Invoice Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.batchDate ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.batchDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].batchDate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.expDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, expDate: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], expDate: !value ? 'Invoice Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.expDate ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.expDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].expDate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.palletQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      palletQty: value
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                palletQty: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                palletQty: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.palletQty ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.palletQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].palletQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.noOfPallets}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      noOfPallets: value
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                noOfPallets: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                noOfPallets: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.noOfPallets ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.noOfPallets && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].noOfPallets}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.pkgs}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            // Allow empty values for clearing
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      pkgs: value
                                                    }
                                                  : r;
                                              });
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                pkgs: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                pkgs: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.pkgs ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.pkgs && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].pkgs}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.weight}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const floatPattern = /^[0-9]*\.?[0-9]*$/;

                                          if (floatPattern.test(value) || value === '') {
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => (r.id === row.id ? { ...r, weight: value } : r));
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], weight: '' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                weight: 'Only valid floating-point numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.weight ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.weight && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].weight}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.mrp}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const floatPattern = /^[0-9]*\.?[0-9]*$/;

                                          if (floatPattern.test(value) || value === '') {
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => (r.id === row.id ? { ...r, mrp: value } : r));
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], mrp: '' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                mrp: 'Only valid floating-point numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.mrp ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.mrp && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].mrp}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.amt}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const floatPattern = /^[0-9]*\.?[0-9]*$/;

                                          if (floatPattern.test(value) || value === '') {
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => (r.id === row.id ? { ...r, amt: value } : r));
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], amt: '' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                amt: 'Only valid floating-point numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.amt ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.amt && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].amt}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.insAmt}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const floatPattern = /^[0-9]*\.?[0-9]*$/;

                                          if (floatPattern.test(value) || value === '') {
                                            setLrTableData((prev) => {
                                              const updatedData = prev.map((r) => (r.id === row.id ? { ...r, insAmt: value } : r));
                                              return updatedData;
                                            });

                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], insAmt: '' };
                                              return newErrors;
                                            });
                                          } else {
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                insAmt: 'Only valid floating-point numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={lrTableErrors[index]?.insAmt ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.insAmt && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].insAmt}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '400px' }}
                                        type="text"
                                        value={row.remarks}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setLrTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, remarks: value } : r)));
                                          setLrTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], remarks: !value ? 'QR Code is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={lrTableErrors[index]?.remarks ? 'error form-control' : 'form-control'}
                                      />
                                      {lrTableErrors[index]?.remarks && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {lrTableErrors[index].remarks}
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
                    <div className="row mt-3">
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="No of Packs"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="noOfPacks"
                          value={formData.noOfPacks}
                          onChange={handleInputChange}
                          error={!!fieldErrors.noOfPacks}
                          helperText={fieldErrors.noOfPacks}
                        />
                      </div>

                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Total Amount"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totAmt"
                          value={formData.totAmt}
                          onChange={handleInputChange}
                          error={!!fieldErrors.totAmt}
                          helperText={fieldErrors.totAmt}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Total GRN QTY"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totGrnQty"
                          value={formData.totGrnQty}
                          onChange={handleInputChange}
                          error={!!fieldErrors.totGrnQty}
                          helperText={fieldErrors.totGrnQty}
                        />
                      </div>
                    </div>
                  </>
                )}
                {value === 2 && (
                  <>
                    <div className="row mt-3">
                      {/* Vehicle Type */}
                      <div className="col-md-3 mb-3">
                        <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.vehicleType}>
                          <InputLabel id="vehicleType-label">Vehicle Type</InputLabel>
                          <Select
                            labelId="vehicleType-label"
                            label="Vehicle Type"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            name="vehicleType"
                          >
                            <MenuItem value="TRUCK">TRUCK</MenuItem>
                            <MenuItem value="VAN">VAN</MenuItem>
                            <MenuItem value="OTHER">OTHER</MenuItem>
                          </Select>
                          {fieldErrors.vehicleType && <FormHelperText>{fieldErrors.vehicleType}</FormHelperText>}
                        </FormControl>
                      </div>

                      {/* Contact */}
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

                      {/* Seal No */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Seal No"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="sealNo"
                          value={formData.sealNo}
                          onChange={handleInputChange}
                          error={!!fieldErrors.sealNo}
                          helperText={fieldErrors.sealNo}
                        />
                      </div>

                      {/* LR No */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="LR No"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="lrNo"
                          value={formData.lrNo}
                          onChange={handleInputChange}
                          error={!!fieldErrors.lrNo}
                          helperText={fieldErrors.lrNo}
                        />
                      </div>

                      {/* Driver Name */}
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

                      {/* Security Name */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Security Name"
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

                      {/* Container No */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Container No"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="containerNo"
                          value={formData.containerNo}
                          onChange={handleInputChange}
                          error={!!fieldErrors.containerNo}
                          helperText={fieldErrors.containerNo}
                        />
                      </div>

                      {/* LR Date */}
                      <div className="col-md-3 mb-3">
                        <FormControl fullWidth variant="filled" size="small">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="LR Date"
                              value={formData.lrDate ? dayjs(formData.lrDate, 'DD-MM-YYYY') : null}
                              onChange={(date) => handleDateChange('lrDate', date)}
                              slotProps={{
                                textField: { size: 'small', clearable: true }
                              }}
                              format="DD/MM/YYYY"
                              error={fieldErrors.lrDate}
                              helperText={fieldErrors.lrDate && 'Required'}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </div>

                      {/* Goods Desc */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Goods Desc"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="goodsDesc"
                          value={formData.goodsDesc}
                          onChange={handleInputChange}
                          error={!!fieldErrors.goodsDesc}
                          helperText={fieldErrors.goodsDesc}
                        />
                      </div>

                      {/* Vehicle No */}
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

                      {/* Vessel Details */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Vessel Details"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="vesselDetails"
                          value={formData.vesselDetails}
                          onChange={handleInputChange}
                          error={!!fieldErrors.vesselDetails}
                          helperText={fieldErrors.vesselDetails}
                        />
                      </div>

                      {/* Lot No */}
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
                        />
                      </div>

                      {/* Destination From */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Destination From"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="destinationFrom"
                          value={formData.destinationFrom}
                          onChange={handleInputChange}
                          error={!!fieldErrors.destinationFrom}
                          helperText={fieldErrors.destinationFrom}
                        />
                      </div>

                      {/* Destination To */}
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Destination To"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="destinationTo"
                          value={formData.destinationTo}
                          onChange={handleInputChange}
                          error={!!fieldErrors.destinationTo}
                          helperText={fieldErrors.destinationTo}
                        />
                      </div>
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

export default Grn;
