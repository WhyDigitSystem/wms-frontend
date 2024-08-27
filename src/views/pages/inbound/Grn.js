import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
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
import dayjs, { Dayjs } from 'dayjs';
import { width } from '@mui/system';
import { getAllActiveCarrier, getAllActivePartDetails, getAllActiveSupplier, getAllShipmentModes } from 'utils/CommonFunctions';

export const Grn = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchcode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  // const [loginFinYear, setLoginFinYear] = useState(localStorage.getItem('finYear'));
  const [loginFinYear, setLoginFinYear] = useState('2024');
  const [supplierList, setSupplierList] = useState([]);
  const [modeOfShipmentList, setModeOfShipmentList] = useState([]);
  const [carrierList, setCarrierList] = useState([]);
  const [gatePassIdList, setGatePassIdList] = useState([]);
  const [binTypeList, setBinTypeList] = useState([]);
  const [partNoList, setPartNoList] = useState([]);
  const [gatePassIdEdit, setGatePassIdEdit] = useState('');
  const [editDocDate, setEditDocDate] = useState(dayjs());

  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs(),
    editDocDate: dayjs(),
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
  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: new Date(),
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
    { accessorKey: 'grndDate', header: 'GRN Date', size: 140 },
    { accessorKey: 'docId', header: 'GRN No', size: 140 },
    { accessorKey: 'gatePassId', header: 'Gate Pass Id', size: 140 },
    { accessorKey: 'supplier', header: 'Supplier', size: 140 },
    { accessorKey: 'totalGrnQty', header: 'GRN QTY', size: 140 }
  ];

  useEffect(() => {
    getNewGrnDocId();
    getAllGatePassId();
    getAllSuppliers();
    getAllModesOfShipment();
    getAllBinLocationByWarehouse();
    getAllPartNo();
    getAllGrns();
    // getAllCarriers();
    // getAllVehicleTypes();
    // getAllGrns();
  }, []);
  useEffect(() => {
    const totalQty = lrTableData.reduce((sum, row) => sum + (parseInt(row.grnQty, 10) || 0), 0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      totGrnQty: totalQty
    }));
  }, [lrTableData]);

  const getNewGrnDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `grn/getGRNDocid?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}`
      );
      setFormData((prevData) => ({
        ...prevData,
        docId: response.paramObjectsMap.grnDocid
      }));
    } catch (error) {
      console.error('Error fetching gate passes:', error);
    }
  };
  const getAllGatePassId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `grn/getGatePassInNoForPedningGRN?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}`
      );
      setGatePassIdList(response.paramObjectsMap.gatePassInVO);
    } catch (error) {
      console.error('Error fetching gate passes:', error);
    }
  };
  const getAllBinLocationByWarehouse = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/locationtype/warehouse?orgid=${orgId}&warehouse=${loginWarehouse}`);
      setBinTypeList(response.paramObjectsMap.Locationtype);
    } catch (error) {
      console.error('Error fetching gate passes:', error);
    }
  };
  const getGatePassGridDetailsByGatePassId = async (selectedGatePassId) => {
    try {
      const response = await apiCalls(
        'get',
        // `grn/getGatePassInDetailsForPendingGRN?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&gatePassDocId=${selectedGatePassId}&orgId=${orgId}`
        `grn/getGatePassInDetailsForPendingGRN?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&gatePassDocId=${formData.gatePassId}&orgId=${orgId}`
      );
      console.log('THE GATE PASS IDS GRID DETAILS IS:', response);
      if (response.status === true) {
        const gridDetails = response.paramObjectsMap.gatePassInVO;
        console.log('THE PALLET DETAILS ARE:', gridDetails);

        setLrTableData(
          gridDetails.map((row) => ({
            // id: row.id,
            lrNoHawbNo: row.lrNoHaw,
            invoiceNo: row.invoiceNo,
            invDate: row.invoiceDate ? dayjs(row.invoiceDate).format('YYYY-MM-DD') : null,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            invQty: row.invQty,
            recQty: row.recQty,
            shortQty: row.shortQty,
            damageQty: row.damageQty,
            grnQty: row.genQty,
            invoiceDate: row.invoiceDate,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            invQty: row.invQty,
            recQty: row.recQty,
            shortQty: row.shortQty,
            weight: row.weight,
            batchNo: row.batchNo
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const getAllSuppliers = async () => {
    try {
      const supplierData = await getAllActiveSupplier(loginBranchCode, loginClient, orgId);
      setSupplierList(supplierData);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const getAllModesOfShipment = async () => {
    try {
      const shipmentModeData = await getAllShipmentModes(orgId);
      setModeOfShipmentList(shipmentModeData);
    } catch (error) {
      console.error('Error fetching modes of shipment:', error);
    }
  };

  const getAllCarriers = async (selectedModeOfShipment) => {
    try {
      const carrierData = await getAllActiveCarrier(loginBranchCode, loginClient, orgId, selectedModeOfShipment);
      setCarrierList(carrierData);
    } catch (error) {
      console.error('Error fetching carriers:', error);
    }
  };

  const getAllPartNo = async () => {
    try {
      const partNoData = await getAllActivePartDetails(loginBranchCode, loginClient, orgId);
      console.log('THE ACTIVE PART DETAILS ARE:', partNoData);

      setPartNoList(partNoData);
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    }
  };

  const getAllGrns = async () => {
    try {
      const response = await apiCalls(
        'get',
        `grn/getAllGrn?branch=CHENNAI&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}&warehouse=${loginWarehouse}`
      );
      setListViewData(response.paramObjectsMap.grnVO);
    } catch (error) {
      console.error('Error fetching GRN data:', error);
    }
  };

  const getGrnById = async (row) => {
    console.log('THE SELECTED GRN ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `grn/getGrnById?id=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularGrn = response.paramObjectsMap.Grn;
        setGatePassIdEdit(particularGrn.docId);

        setFormData({
          docId: particularGrn.docId,
          editDocDate: particularGrn.docdate,
          docDate: particularGrn.docdate,
          entrySlNo: particularGrn.entryNo,
          date: particularGrn.entryDate,
          gatePassId: particularGrn.docId,
          gatePassDate: particularGrn.gatePassDate,
          grnDate: particularGrn.grndDate,
          customerPo: particularGrn.customerPo,
          vas: particularGrn.vas === true ? true : false,
          supplierShortName: particularGrn.supplierShortName,
          supplier: particularGrn.supplier,
          billOfEntry: particularGrn.billOfEnrtyNo,
          capacity: particularGrn.capacity,
          modeOfShipment: particularGrn.modeOfShipment,
          vesselNo: particularGrn.vesselNo,
          hsnNo: particularGrn.hsnNo,
          vehicleType: particularGrn.vehicleType,
          contact: particularGrn.contact,
          sealNo: particularGrn.sealNo,
          lrNo: particularGrn.lrNo,
          driverName: particularGrn.driverName,
          securityName: particularGrn.securityName,
          containerNo: particularGrn.containerNo,
          lrDate: particularGrn.lrDate,
          goodsDesc: particularGrn.goodsDescripition,
          vehicleNo: particularGrn.vehicleNo,
          vesselDetails: particularGrn.vesselDetails,
          lotNo: particularGrn.lotNo,
          destinationFrom: particularGrn.destinationFrom,
          destinationTo: particularGrn.destinationTo,
          noOfPallets: particularGrn.noOfBins,
          invoiceNo: particularGrn.invoiceNo,
          noOfPacks: particularGrn.noOfPacks,
          totAmt: particularGrn.totAmt,
          totGrnQty: particularGrn.totalGrnQty
        });
        getAllCarriers(particularGrn.modeOfShipment);
        setFormData((prevData) => ({
          ...prevData,
          carrier: particularGrn.carrier.toUpperCase()
        }));
        setLrTableData(
          particularGrn.grnDetailsVO.map((row) => ({
            id: row.id,
            qrCode: row.qrCode,
            lr_Hawb_Hbl_No: row.lrNoHawbNo,
            invNo: row.invoiceNo,
            shipmentNo: row.shipmentNo,
            // invDate: row.invoiceDate ? dayjs(row.invoiceDate).format('YYYY-MM-DD') : null,

            invDate: row.invoiceDate,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            invQty: row.invQty,
            recQty: row.recQty,
            damageQty: row.damageQty,
            grnQty: row.grnQty,
            subStockQty: row.subStockQty,
            batch_PalletNo: row.batchNo,
            batchDate: row.batchDt,
            expDate: row.expDate,
            shortQty: row.shortQty,
            damageQty: row.damageQty,
            palletQty: row.binQty,
            noOfPallets: row.noOfBins,
            pkgs: row.pkgs,
            weight: row.weight,
            mrp: row.mrp,
            amt: row.amt,
            // EXTRA FIELDS
            batchQty: 0,
            rate: 0,
            binType: 'abc'
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

    let errorMessage = '';

    switch (name) {
      case 'docCode':
      case 'capacity':
      case 'vesselNo':
      case 'hsnNo':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        }
        break;
      case 'noOfPallets':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      if (name === 'gatePassId') {
        const selectedId = gatePassIdList.find((id) => id.docId === value);
        const selectedGatePassId = selectedId.docId;
        if (selectedId) {
          setFormData((prevData) => ({
            ...prevData,
            gatePassId: selectedId.docId,
            entrySlNo: selectedId.entryNo,
            gatePassDate: dayjs(selectedId.docDate).format('YYYY-MM-DD'),
            supplierShortName: selectedId.supplier,
            supplier: selectedId.supplierShortName,
            modeOfShipment: selectedId.modeOfShipment.toUpperCase(),
            vehicleType: selectedId.vehicleType.toUpperCase(),
            contact: selectedId.contact,
            driverName: selectedId.driverName,
            securityName: selectedId.securityName,
            lrDate: dayjs(selectedId.lrDate).format('YYYY-MM-DD'),
            goodsDesc: selectedId.goodsDescription,
            vehicleNo: selectedId.vehicleNo,
            lotNo: selectedId.lotNo
          }));
          getAllCarriers(selectedId.modeOfShipment);
          setFormData((prevData) => ({
            ...prevData,
            carrier: selectedId.carrier.toUpperCase()
          }));
          console.log('THE SELECTED GATEPASS ID IS:', selectedGatePassId);

          getGatePassGridDetailsByGatePassId(selectedGatePassId);
        }
      } else if (name === 'supplierShortName') {
        const selectedName = supplierList.find((supplier) => supplier.supplierShortName === value);
        if (selectedName) {
          setFormData((prevData) => ({
            ...prevData,
            supplierShortName: selectedName.supplierShortName,
            supplier: selectedName.supplier
          }));
        }
      } else if (name === 'modeOfShipment') {
        setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
        getAllCarriers(value);
      } else if (name === 'vas') {
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
      return (
        !lastRow.lr_Hawb_Hbl_No ||
        !lastRow.invNo ||
        !lastRow.partNo ||
        !lastRow.invQty ||
        !lastRow.batch_PalletNo ||
        !lastRow.palletQty ||
        !lastRow.noOfPallets
      );
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
          partNo: !table[table.length - 1].partNo ? 'Part No is required' : '',
          invQty: !table[table.length - 1].invQty ? 'InvQty is required' : '',
          batch_PalletNo: !table[table.length - 1].batch_PalletNo ? 'Batch No is required' : '',
          palletQty: !table[table.length - 1].palletQty ? 'Pallet Qty is required' : '',
          noOfPallets: !table[table.length - 1].noOfPallets ? 'No of Pallets is required' : ''
        };
        return newErrors;
      });
    }
  };

  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  const handleDateChange = (field, date) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;

    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClear = () => {
    setFormData({
      // docId: '',
      docDate: dayjs(),
      grnType: '',
      entrySlNo: '',
      date: null,
      tax: '',
      vehicleDetails: '',
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
      // docId: '',
      docDate: '',
      grnType: '',
      entrySlNo: '',
      // date: new Date(),
      date: '',
      tax: '',
      gatePassId: '',
      gatePassDate: '',
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
    getNewGrnDocId();
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
      if (!row.invNo) {
        rowErrors.invNo = 'Invoice No is required';
        lrTableDataValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
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

    if (Object.keys(errors).length === 0 && lrTableDataValid) {
      setIsLoading(true);

      const lrVo = lrTableData.map((row) => ({
        // ...(editId && { id: row.id }),
        qrCode: row.qrCode,
        lrNoHawbNo: row.lr_Hawb_Hbl_No,
        invoiceNo: row.invNo,
        shipmentNo: row.shipmentNo,
        invoiceDate: row.invDate ? dayjs(row.invDate).format('YYYY-MM-DD') : null,
        partNo: row.partNo,
        partDesc: row.partDesc,
        sku: row.sku,
        invQty: parseInt(row.invQty),
        recQty: parseInt(row.recQty),
        damageQty: parseInt(row.damageQty),
        subStockQty: parseInt(row.subStockQty),
        batchNo: row.batch_PalletNo,
        batchDt: row.batchDate ? dayjs(row.batchDate).format('YYYY-MM-DD') : null,
        expdate: row.expDate ? dayjs(row.expDate).format('YYYY-MM-DD') : null,
        binQty: parseInt(row.palletQty),
        noOfBins: parseInt(row.noOfPallets),
        pkgs: parseInt(row.pkgs),
        weight: row.weight,
        mrp: parseInt(row.mrp),
        amount: parseInt(row.amt),
        // EXTRA FIELDS
        batchQty: 0,
        rate: 0,
        binType: ''
      }));
      const saveFormData = {
        ...(editId && { id: editId }),
        entryNo: formData.entrySlNo,
        entryDate: formData.date ? dayjs(formData.date).format('YYYY-MM-DD') : null,
        gatePassId: editId ? gatePassIdEdit : formData.gatePassId,
        gatePassDate: formData.gatePassDate ? dayjs(formData.gatePassDate).format('YYYY-MM-DD') : null,
        grndDate: formData.grnDate ? dayjs(formData.grnDate).format('YYYY-MM-DD') : null,
        customerPo: formData.customerPo,
        vas: formData.vas,
        supplierShortName: formData.supplierShortName,
        supplier: formData.supplier,
        billOfEnrtyNo: formData.billOfEntry,
        // capacity: formData.capacity,
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
        lrDate: formData.lrDate ? dayjs(formData.lrDate).format('YYYY-MM-DD') : null,
        goodsDescripition: formData.goodsDesc,
        vehicleNo: formData.vehicleNo,
        vesselDetails: formData.vesselDetails,
        lotNo: formData.lotNo,
        destinationFrom: formData.destinationFrom,
        destinationTo: formData.destinationTo,
        noOfBins: formData.noOfPallets,
        invoiceNo: formData.invoiceNo,
        // totGrnQty: formData.totGrnQty,
        orgId: orgId,
        createdBy: loginUserName,
        grnDetailsDTO: lrVo,
        branch: loginBranch,
        branchCode: loginBranchCode,
        client: loginClient,
        customer: loginCustomer,
        finYear: '2024',
        warehouse: loginWarehouse,
        // EXTRA FIELDS
        fifoFlag: 'abc',
        vehicleDetails: 'abc'
      };
      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `grn/createUpdateGRN`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          showToast('success', editId ? 'GRN Updated Successfully' : 'GRN created successfully');
          // handleClear();
          getAllGrns();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'GRN creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'GRN creation failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePartNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedPartNo = partNoList.find((p) => p.partno === value);
    setLrTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              partNo: value,
              partDesc: selectedPartNo ? selectedPartNo.partDesc : '',
              sku: selectedPartNo ? selectedPartNo.sku : ''
            }
          : r
      )
    );
    setLrTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        partNo: !value ? 'Part No is required' : ''
      };
      return newErrors;
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
            <ActionButton title="Save" icon={SaveIcon} isLoading={isLoading} onClick={handleSave} margin="0 10px 0 10px" />
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getGrnById} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField label="Doc ID" variant="outlined" size="small" fullWidth name="docId" value={formData.docId} disabled />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Doc Date"
                      value={formData.docDate ? dayjs(formData.docDate, 'YYYY-MM-DD') : null}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      disabled
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              {!editId && (
                <>
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
                </>
              )}
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
                      value={formData.date ? dayjs(formData.date, 'YYYY-MM-DD') : null}
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

              {/* WHEN EDIT MODE THAT FIELD DISPLAY*/}
              {editId ? (
                <>
                  <div className="col-md-3 mb-3">
                    <TextField
                      label="Gate Pass ID"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="gatePassIdEdit"
                      value={gatePassIdEdit}
                      disabled
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Gate Pass ID */}
                  <div className="col-md-3 mb-3">
                    <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.gatePassId}>
                      <InputLabel id="gatePassId-label">Gate Pass No</InputLabel>
                      <Select
                        labelId="gatePassId-label"
                        label="Gate Pass No"
                        value={formData.gatePassId}
                        onChange={handleInputChange}
                        name="gatePassId"
                      >
                        {gatePassIdList?.map((row) => (
                          <MenuItem key={row.id} value={row.docId.toUpperCase()}>
                            {row.docId.toUpperCase()}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldErrors.gatePassId && <FormHelperText>{fieldErrors.gatePassId}</FormHelperText>}
                    </FormControl>
                  </div>
                </>
              )}

              {/* Gate Pass Date */}
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Gate Pass Date"
                      value={formData.gatePassDate ? dayjs(formData.gatePassDate, 'YYYY-MM-DD') : null}
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
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={
                        <span>
                          GRN Date <span>&nbsp;*</span>
                        </span>
                      }
                      value={formData.grnDate ? dayjs(formData.grnDate, 'YYYY-MM-DD') : null}
                      onChange={(date) => handleDateChange('grnDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.grnDate}
                      helperText={fieldErrors.grnDate && 'Required'}
                    />
                  </LocalizationProvider>
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
                    {supplierList?.map((row) => (
                      <MenuItem key={row.id} value={row.supplierShortName.toUpperCase()}>
                        {row.supplierShortName.toUpperCase()}
                      </MenuItem>
                    ))}
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
                  label="E-Way Bill"
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
                    {modeOfShipmentList?.map((row, index) => (
                      <MenuItem key={index} value={row.shipmentMode.toUpperCase()}>
                        {row.shipmentMode.toUpperCase()}
                      </MenuItem>
                    ))}
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
                    {carrierList?.map((row) => (
                      <MenuItem key={row.id} value={row.carrier.toUpperCase()}>
                        {row.carrier.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.carrier && <FormHelperText>{fieldErrors.carrier}</FormHelperText>}
                </FormControl>
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
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={getGatePassGridDetailsByGatePassId} />
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
                                    Shipment No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    Invoice Date
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
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Batch Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Bin QTY<span>&nbsp;*</span>
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    No of Bins<span>&nbsp;*</span>
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
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '200px' }}
                                        onChange={(e) => handlePartNoChange(row, index, e)}
                                        className={lrTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {partNoList?.map((part) => (
                                          <option key={part.id} value={part.partno}>
                                            {part.partno}
                                          </option>
                                        ))}
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
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
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
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
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
                                        value={row.batch_PalletNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const alphaNumericPattern = /^[a-zA-Z0-9]*$/;

                                          if (alphaNumericPattern.test(value) || value === '') {
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
                                            setLrTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                batch_PalletNo: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
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
                                        onKeyDown={(e) => handleKeyDown(e, row, lrTableData)}
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
                          label="Total GRN QTY"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totGrnQty"
                          value={formData.totGrnQty}
                          disabled
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
                        <TextField
                          label="Vehicle Type"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleInputChange}
                          error={!!fieldErrors.vehicleType}
                          helperText={fieldErrors.vehicleType}
                        />
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
                              value={formData.lrDate ? dayjs(formData.lrDate, 'YYYY-MM-DD') : null}
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
