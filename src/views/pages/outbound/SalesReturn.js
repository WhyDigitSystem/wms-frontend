import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from 'utils/ActionButton';
import { getAllActiveCarrier, getAllActiveGroups, getAllActiveSupplier, getAllShipmentModes } from 'utils/CommonFunctions';
import ToastComponent, { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import GridOnIcon from '@mui/icons-material/GridOn';
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

export const SalesReturn = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [buyerOrderNoList, setBuyerOrderNoList] = useState([]);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [prNoList, setPrNoList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [modeOfShipmentList, setModeOfShipmentList] = useState([]);
  const [carrierList, setCarrierList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchcode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [loginFinYear, setLoginFinYear] = useState(2024);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs(),
    prNo: '',
    prDate: null,
    boNo: '',
    boDate: null,
    entryNo: '',
    entryDate: null,
    buyerName: '',
    buyerType: '',
    supplierShotName: '',
    supplier: '',
    modeOfShipment: '',
    carrier: '',
    driver: '',
    vehicleType: '',
    vehicleNo: '',
    contact: '',
    securityPerson: '',
    timeIn: '',
    timeOut: '',
    goodsDesc: ''
  });

  const [value, setValue] = useState(0);
  const [detailTableData, setDetailTableData] = useState([
    {
      lrNo: '',
      invNo: '',
      partNo: '',
      partDesc: '',
      unit: '',
      pickQty: '',
      returnQty: '',
      damageQty: '',
      batchNo: '',
      batchDate: null,
      expDate: null,
      noOfBin: '',
      binQty: '',
      weight: '',
      rate: '',
      amount: '',
      insAmt: '',
      remarks: ''
    }
  ]);

  const [detailTableErrors, setDetailTableErrors] = useState([
    {
      lrNo: '',
      invNo: '',
      partNo: '',
      partDesc: '',
      unit: '',
      pickQty: '',
      returnQty: '',
      damageQty: '',
      batchNo: '',
      batchDate: null,
      expDate: null,
      noOfBin: '',
      binQty: '',
      weight: '',
      rate: '',
      amount: '',
      insAmt: '',
      remarks: ''
    }
  ]);
  const [modalTableData, setModalTableData] = useState([
    {
      id: 1,
      fromBin: '',
      fromBinClass: '',
      fromBinType: '',
      fromCellType: '',
      partNo: '',
      rowPartNoList: [],
      partDesc: '',
      sku: '',
      grnNo: '',
      grnDate: '',
      batchNo: '',
      batchDate: '',
      expDate: '',
      toBin: '',
      toBinType: '',
      toBinClass: '',
      toCellType: '',
      fromQty: 5000,
      toQty: '',
      remainQty: '',
      fromCore: '',
      toCore: '',
      qcFlag: ''
    }
  ]);
  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: dayjs(),
    prNo: '',
    prDate: null,
    boNo: '',
    boDate: null,
    entryNo: '',
    entryDate: null,
    buyerName: '',
    buyerType: '',
    supplierShotName: '',
    supplier: '',
    modeOfShipment: '',
    carrier: '',
    driver: '',
    vehicleType: '',
    vehicleNo: '',
    contact: '',
    securityPerson: '',
    timeIn: '',
    timeOut: '',
    goodsDesc: ''
  });
  const listViewColumns = [
    { accessorKey: 'partno', header: 'Part No', size: 140 },
    { accessorKey: 'partDesc', header: 'Part Desc', size: 140 },
    { accessorKey: 'sku', header: 'SKU', size: 140 },
    { accessorKey: 'status', header: 'Status', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([
    {
      id: 1,
      partNo: 'partNo1',
      partDesc: 'partDesc1',
      sku: 'sku1',
      status: 'status1',
      active: 'Active'
    },
    {
      id: 2,
      partNo: 'partNo2',
      partDesc: 'partDesc2',
      sku: 'sku2',
      status: 'status2',
      active: 'Active'
    }
  ]);
  useEffect(() => {
    console.log('LISTVIEW FIELD CURRENT VALUE IS', listView);
    getAllSalesReturns();
    // getAllUnits();
    getPrNo();
    getAllSuppliers();
    getAllModesOfShipment();
    getAllGroups();
    getNewSalesReturnDocId();
  }, []);

  const getNewSalesReturnDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `salesReturn/getSalesReturnDocId?orgId=${orgId}&branchCode=${loginBranchCode}&client=${loginClient}&branch=${loginBranch}&finYear=${loginFinYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          docId: response.paramObjectsMap.SalesReturnDocId
        }));
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getFillGridDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `stockRestate/getFillGridDetailsForStockRestate?branchCode=${loginBranchCode}&client=${loginClient}&orgId=${orgId}&tranferFromFlag=${formData.transferFromFlag}&tranferToFlag=${formData.transferToFlag}&warehouse=CHENNAI WAREHOUSE`
      );
      console.log('THE VAS PICK GRID DETAILS IS:', response);
      if (response.status === true) {
        const gridDetails = response.paramObjectsMap.fillGridDetails;
        console.log('THE MODAL TABLE DATA FROM API ARE:', gridDetails);

        setModalTableData(
          gridDetails.map((row) => ({
            id: row.id,
            fromBin: row.fromBin,
            fromBinClass: row.fromBinClass,
            fromBinType: row.fromBinType,
            fromCellType: row.fromCellType,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            grnNo: row.grnNo,
            grnDate: row.grnDate,
            batchNo: row.batchNo,
            batchDate: row.batchDate,
            expDate: row.expDate,
            toBin: row.toBin,
            toBinType: row.ToBinType,
            toBinClass: row.ToBinClass,
            toCellType: row.ToCellType,
            fromQty: row.fromQty,
            toQty: row.toQty,
            fromCore: row.fromCore,
            toCore: row.ToCore,
            qcFlag: row.qcFlag
          }))
        );
        setDetailTableData([]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const getPrNo = async () => {
    try {
      const response = await apiCalls(
        'get',
        `pickrequest/getAllPickRequestByOrgId?branch=${loginBranch}&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}&warehouse=${loginWarehouse}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setPrNoList(response.paramObjectsMap.buyerOrderVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const getCurrentTime = () => {
    return dayjs().format('HH:mm:ss');
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, timeOut: getCurrentTime() }));
  }, []);
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
    if (isLastRowEmpty(detailTableData)) {
      displayRowError(detailTableData);
      return;
    }
    const newRow = {
      id: Date.now(),
      lrNo: '',
      invNo: '',
      partNo: '',
      partDesc: '',
      unit: '',
      pickQty: '',
      returnQty: '',
      damageQty: '',
      batchNo: '',
      batchDate: null,
      expDate: null,
      noOfBin: '',
      binQty: '',
      weight: '',
      rate: '',
      amount: '',
      insAmt: '',
      remarks: ''
    };
    setDetailTableData([...detailTableData, newRow]);
    setDetailTableErrors([
      ...detailTableErrors,
      {
        lrNo: '',
        invNo: '',
        partNo: '',
        partDesc: '',
        unit: '',
        pickQty: '',
        returnQty: '',
        damageQty: '',
        batchNo: '',
        batchDate: null,
        expDate: null,
        noOfBin: '',
        binQty: '',
        weight: '',
        rate: '',
        amount: '',
        insAmt: '',
        remarks: ''
      }
    ]);
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;
    if (table === detailTableData) {
      return (
        !lastRow.lrNo || !lastRow.invNo
        // !lastRow.partNo ||
        // !lastRow.invQty ||
        // !lastRow.batch_PalletNo ||
        // !lastRow.palletQty ||
        // !lastRow.noOfPallets
      );
    }
    return false;
  };

  const displayRowError = (table) => {
    if (table === detailTableData) {
      setDetailTableErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[table.length - 1] = {
          ...newErrors[table.length - 1],
          lrNo: !table[table.length - 1].lrNo ? 'Lr_Hawb_Hbl_No is required' : '',
          invNo: !table[table.length - 1].invNo ? 'Invoice No is required' : ''
          // partNo: !table[table.length - 1].partNo ? 'Part No is required' : '',
          // invQty: !table[table.length - 1].invQty ? 'InvQty is required' : '',
          // batch_PalletNo: !table[table.length - 1].batch_PalletNo ? 'Batch No is required' : '',
          // palletQty: !table[table.length - 1].palletQty ? 'Pallet Qty is required' : '',
          // noOfPallets: !table[table.length - 1].noOfPallets ? 'No of Pallets is required' : ''
        };
        return newErrors;
      });
    }
  };
  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  const getAllGroups = async () => {
    try {
      const groupData = await getAllActiveGroups(orgId);
      console.log('THE GROUP DATA IS:', groupData);

      setGroupList(groupData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };
  const getAllSalesReturns = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/material?cbranch=${loginBranchCode}&client=${loginClient}&orgid=${orgId}`
      );
      setListViewData(response.paramObjectsMap.materialVO);
      console.log('TEST LISTVIEW DATA', response);
    } catch (err) {
      console.log('error', err);
    }
  };
  const getSalesReturnById = async (row) => {
    console.log('THE SELECTED ITEM ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `warehousemastercontroller/material/${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularItem = response.paramObjectsMap.materialVO;
        // const selectedBranch = branchList.find((br) => br.branch === particularItem.branch);
        console.log('THE SELECTED ITEM IS:', particularItem);

        setFormData({
          itemType: particularItem.itemType,
          partNo: particularItem.partno,
          partDesc: particularItem.partDesc,
          custPartNo: particularItem.custPartno,
          groupName: particularItem.groupName,
          styleCode: particularItem.styleCode,
          baseSku: particularItem.baseSku,
          // addDesc: particularItem.addDesc, //no
          purchaseUnit: particularItem.purchaseUnit,
          storageUnit: particularItem.storageUnit,
          // fixedCapAcrossLocn: particularItem.fixedCapAcrossLocn, //no
          fsn: particularItem.fsn,
          saleUnit: particularItem.saleUnit,
          type: particularItem.type,
          // serialNoFlag: particularItem.serialNoFlag, //no
          sku: particularItem.sku,
          skuQty: particularItem.skuQty,
          ssku: particularItem.ssku,
          sskuQty: particularItem.sskuQty,
          // zoneType: particularItem.zoneType, //no
          weightSkuUom: particularItem.weightofSkuAndUom,
          hsnCode: particularItem.hsnCode,
          parentChildKey: particularItem.parentChildKey,
          controlBranch: particularItem.cbranch,
          criticalStockLevel: particularItem.criticalStockLevel,
          // criticalStock: particularItem.criticalStock, //no
          // bchk: particularItem.bchk, //no
          status: particularItem.status,
          barcode: particularItem.barcode,
          // itemVo: itemVo, //no
          // orgId: orgId,
          // createdby: loginUserName,
          // breadth: 0,
          // client: loginClient,
          // customer: loginCustomer,
          // height: 0,
          // length: 0,
          // binQty: '',
          // warehouse: loginWarehouse,
          // weight: 0,
          // branch: loginBranch,
          // branchCode: loginBranchCode,
          active: particularItem.active === 'Active' ? true : false
        });
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      // if (name === 'gatePassId') {
      //   const selectedId = gatePassIdList.find((id) => id.docId === value);
      //   const selectedGatePassId = selectedId.docId;
      //   if (selectedId) {
      //     setFormData((prevData) => ({
      //       ...prevData,
      //       gatePassId: selectedId.docId,
      //       entrySlNo: selectedId.entryNo,
      //       gatePassDate: dayjs(selectedId.docDate).format('YYYY-MM-DD'),
      //       supplierShortName: selectedId.supplierShortName,
      //       supplier: selectedId.supplier,
      //       modeOfShipment: selectedId.modeOfShipment.toUpperCase(),
      //       vehicleType: selectedId.vehicleType.toUpperCase(),
      //       contact: selectedId.contact,
      //       driverName: selectedId.driverName,
      //       securityName: selectedId.securityName,
      //       lrDate: dayjs(selectedId.lrDate).format('YYYY-MM-DD'),
      //       goodsDesc: selectedId.goodsDescription,
      //       vehicleNo: selectedId.vehicleNo,
      //       lotNo: selectedId.lotNo
      //     }));
      //     getAllCarriers(selectedId.modeOfShipment);
      //     setFormData((prevData) => ({
      //       ...prevData,
      //       carrier: selectedId.carrier.toUpperCase()
      //     }));
      //     getGatePassGridDetailsByGatePassId(selectedGatePassId);
      //   }
      // } else
      if (name === 'supplierShortName') {
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

  // const handleDateChange = (date, index) => {
  //   setItemTableData((prev) => prev.map((r, idx) => (idx === index ? { ...r, fDate: date } : r)));
  //   setItemTableErrors((prev) => {
  //     const newErrors = [...prev];
  //     newErrors[index] = {
  //       ...newErrors[index],
  //       fDate: !date ? 'Start Date is required' : ''
  //     };
  //     return newErrors;
  //   });
  // };

  const handleClear = () => {
    setFormData({
      docDate: dayjs(),
      prNo: '',
      prDate: null,
      boNo: '',
      boDate: null,
      entryNo: '',
      entryDate: null,
      buyerName: '',
      buyerType: '',
      supplierShotName: '',
      supplier: '',
      modeOfShipment: '',
      carrier: '',
      driver: '',
      vehicleType: '',
      vehicleNo: '',
      contact: '',
      securityPerson: '',
      timeIn: '',
      out: '',
      goodsDesc: ''
    });
    setDetailTableData([
      {
        lrNo: '',
        invNo: '',
        partNo: '',
        partDesc: '',
        unit: '',
        pickQty: '',
        returnQty: '',
        damageQty: '',
        batchNo: '',
        batchDate: null,
        expDate: null,
        noOfBin: '',
        binQty: '',
        weight: '',
        rate: '',
        amount: '',
        insAmt: '',
        remarks: ''
      }
    ]);
    setFieldErrors({
      docId: '',
      docDate: dayjs(),
      prNo: '',
      prDate: null,
      boNo: '',
      boDate: null,
      entryNo: '',
      entryDate: null,
      buyerName: '',
      buyerType: '',
      supplierShotName: '',
      supplier: '',
      modeOfShipment: '',
      carrier: '',
      driver: '',
      vehicleType: '',
      vehicleNo: '',
      contact: '',
      securityPerson: '',
      timeIn: '',
      out: '',
      goodsDesc: ''
    });
    getNewSalesReturnDocId();
    setDetailTableErrors('');
    setEditId('');
  };

  const handleSave = async () => {
    const errors = {};

    if (!formData.buyerOrderRefNo) {
      errors.buyerOrderRefNo = 'buyerOrderRefNo is required';
    }

    if (!formData.status) {
      errors.status = 'Status is required';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const salesReturnVo = detailTableData.map((row) => ({
        mrp: row.mrp,
        fromdate: dayjs(row.fDate).format('DD-MM-YYYY'),
        todate: dayjs(row.tDate).format('DD-MM-YYYY')
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        active: formData.active,
        itemType: formData.itemType,
        partno: formData.partNo,
        partDesc: formData.partDesc,
        custPartno: formData.custPartNo,
        groupName: formData.groupName,
        styleCode: formData.styleCode,
        baseSku: formData.baseSku,
        // addDesc: formData.addDesc, //no
        purchaseUnit: formData.purchaseUnit,
        storageUnit: formData.storageUnit,
        // fixedCapAcrossLocn: formData.fixedCapAcrossLocn, //no
        fsn: formData.fsn,
        saleUnit: formData.saleUnit,
        type: formData.type,
        // serialNoFlag: formData.serialNoFlag, //no
        sku: formData.sku,
        skuQty: formData.skuQty,
        ssku: formData.ssku,
        sskuQty: formData.sskuQty,
        // zoneType: formData.zoneType, //no
        weightofSkuAndUom: formData.weightSkuUom,
        hsnCode: formData.hsnCode,
        parentChildKey: formData.parentChildKey,
        cbranch: formData.controlBranch,
        criticalStockLevel: formData.criticalStockLevel,
        // criticalStock: formData.criticalStock, //no
        // bchk: formData.bchk, //no
        status: formData.status,
        barcode: formData.barcode,
        // itemVo: itemVo, //no
        orgId: orgId,
        // createdBy: loginUserName,
        breadth: 0
        // client: loginClient,
        // customer: loginCustomer,
        // height: 0,
        // length: 0,
        // binQty: '',
        // warehouse: loginWarehouse,
        // weight: 0,
        // branch: loginBranch,
        // branchCode: loginBranchCode
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `warehousemastercontroller/createUpdateMaterial`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Sales Return Updated Successfully' : 'Sales Return created successfully');
          setIsLoading(false);
          // getAllItems();
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Sales Return creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Sales Return creation failed');
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
      itemType: '',
      partNo: '',
      partDesc: '',
      custPartNo: '',
      groupName: '',
      styleCode: '',
      baseSku: '',
      addDesc: '',
      purchaseUnit: '',
      storageUnit: '',
      fixedCapAcrossLocn: '',
      fsn: '',
      saleUnit: '',
      type: '',
      serialNoFlag: '',
      sku: '',
      skuQty: '',
      ssku: '',
      sskuQty: '',
      zoneType: '',
      weightSkuUom: '',
      hsnCode: '',
      parentChildKey: '',
      controlBranch: '',
      criticalStockLevel: '',
      criticalStock: '',
      bchk: '',
      status: '',
      barcode: '',
      active: true
    });
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(modalTableData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmitSelectedRows = async () => {
    const selectedData = selectedRows.map((index) => modalTableData[index]);

    // Adding selected data to the existing table data
    setDetailTableData([...detailTableData, ...selectedData]);

    console.log('Data selected:', selectedData);

    setSelectedRows([]);
    setSelectAll(false);
    handleCloseModal();

    // try {
    //   await Promise.all(
    //     selectedData.map(async (data, idx) => {
    //       // Simulate the event object for handleToQtyChange
    //       const simulatedEvent = {
    //         target: {
    //           value: data.toQty // Assuming you have a toQty field in your data
    //         }
    //       };

    //       await getPartNo(data.fromBin, formData.transferFromFlag, data);
    //       await getGrnNo(data.partNo, data.fromBin);
    //       await getBatchNo(data.fromBin, data.partNo, data.grnNo);

    //       // Call handleToQtyChange with simulated event, row data, and index
    //       handleToQtyChange(simulatedEvent, data, detailTableData.length + idx);
    //     })
    //   );
    // } catch (error) {
    //   console.error('Error processing selected data:', error);
    // }
  };

  const handleFullGrid = () => {
    getFillGridDetails();
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };
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
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true}
              // toEdit={getSalesReturnById}
            />
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
                  disabled
                  name="docId"
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
              <div className="col-md-3 mb-3">
                <FormControl variant="outlined" size="small" fullWidth error={!!fieldErrors.prNo}>
                  <InputLabel id="prNo-label">PR No</InputLabel>
                  <Select labelId="prNo-label" id="prNo" name="prNo" label="PR No" value={formData.prNo} onChange={handleInputChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="PR1">PR1</MenuItem>
                    <MenuItem value="PR2">PR2</MenuItem>
                  </Select>
                  {fieldErrors.prNo && <FormHelperText error>{fieldErrors.prNo}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="PR Date"
                      value={formData.prDate ? dayjs(formData.prDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('prDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.prDate}
                      helperText={fieldErrors.prDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Bo No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="boNo"
                  value={formData.boNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.boNo}
                  helperText={fieldErrors.boNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="BO Date"
                      value={formData.boDate ? dayjs(formData.boDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('prDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.boDate}
                      helperText={fieldErrors.boDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Entry No"
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
                      label="Entry Date"
                      value={formData.entryDate ? dayjs(formData.entryDate, 'YYYY-MM-DD') : null}
                      onChange={(date) => handleDateChange('prDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.entryDate}
                      helperText={fieldErrors.entryDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="Buyer Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="buyerName"
                  value={formData.buyerName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.buyerName}
                  helperText={fieldErrors.buyerName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Buyer Type"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="buyerType"
                  value={formData.buyerType}
                  onChange={handleInputChange}
                  error={!!fieldErrors.buyerType}
                  helperText={fieldErrors.buyerType}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl variant="outlined" size="small" fullWidth error={!!fieldErrors.supplierShortName}>
                  <InputLabel id="supplierShortName-label">Supplier Short Name</InputLabel>
                  <Select
                    labelId="supplierShortName-label"
                    id="supplierShortName"
                    name="supplierShortName"
                    label="Supplier Short Name"
                    value={formData.supplierShortName}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {supplierList?.map((row) => (
                      <MenuItem key={row.id} value={row.supplierShortName.toUpperCase()}>
                        {row.supplierShortName.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.supplierShortName && <FormHelperText error>{fieldErrors.supplierShortName}</FormHelperText>}
                </FormControl>
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

            <div className="row ">
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value={0} label="Details" />
                  <Tab value={1} label="Summary" />
                  <Tab value={2} label="Other Info" />
                </Tabs>
              </Box>
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={getFillGridDetails} />
                        <ActionButton title="Clear" icon={ClearIcon} onClick={() => setDetailTableData([])} />
                      </div>
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
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    LR.No/HAWB NO/HBL No.
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Invoice No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Part No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    part Description
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    SKU
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Unit
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Pick Qty
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Return Qty
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Damage Qty
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Batch Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Pallet Qty
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    No Of Pallet
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Weight
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {detailTableData.length === 0 ? (
                                  <tr>
                                    <td colSpan="18" className="text-center py-2">
                                      No Data Found
                                    </td>
                                  </tr>
                                ) : (
                                  detailTableData.map((row, index) => (
                                    <tr key={row.id}>
                                      <td className="border px-2 py-2 text-center">
                                        <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                      </td>
                                      <td className="text-center">
                                        <div className="pt-2">{index + 1}</div>
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.lrNo}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, lrNo: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], lrNo: !value ? 'QR Code is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.lrNo ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.lrNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].lrNo}
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
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, invNo: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], invNo: !value ? 'Invoice No is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.invNo ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.invNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].invNo}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          value={row.partNo}
                                          style={{ width: '200px' }}
                                          className={detailTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '300px' }}
                                          type="text"
                                          value={row.partDesc}
                                          className={detailTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '200px' }}
                                          type="text"
                                          value={row.sku}
                                          className={detailTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.unit}
                                          className={detailTableErrors[index]?.unit ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.pickQty}
                                          className={detailTableErrors[index]?.pickQty ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.returnQty}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) =>
                                              prev.map((r) => (r.id === row.id ? { ...r, returnQty: value } : r))
                                            );
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], returnQty: !value ? 'QR Code is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.returnQty ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.returnQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].returnQty}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.damageQty}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) =>
                                              prev.map((r) => (r.id === row.id ? { ...r, damageQty: value } : r))
                                            );
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                damageQty: !value ? 'Damage Qty is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.damageQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].damageQty}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.batchNo}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, batchNo: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                batchNo: !value ? 'Batch No is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.batchNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].batchNo}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          type="date"
                                          value={row.batchDate}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) =>
                                              prev.map((r) => (r.id === row.id ? { ...r, batchDate: value } : r))
                                            );
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                batchDate: !value ? 'Invoice Date is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.batchDate ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.batchDate && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].batchDate}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          type="date"
                                          value={row.expDate}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, expDate: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                expDate: !value ? 'Invoice Date is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.expDate ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.expDate && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].expDate}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.binQty}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            const intPattern = /^\d*$/;

                                            if (intPattern.test(value) || value === '') {
                                              setDetailTableData((prev) => {
                                                const updatedData = prev.map((r) => {
                                                  return r.id === row.id
                                                    ? {
                                                        ...r,
                                                        binQty: value
                                                        // recQty: !value ? '' : r.recQty,
                                                      }
                                                    : r;
                                                });
                                                return updatedData;
                                              });

                                              // Clear the error if input is valid
                                              setDetailTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  binQty: ''
                                                };
                                                return newErrors;
                                              });
                                            } else {
                                              // Set error if input is invalid
                                              setDetailTableErrors((prev) => {
                                                const newErrors = [...prev];
                                                newErrors[index] = {
                                                  ...newErrors[index],
                                                  binQty: 'only numbers are allowed'
                                                };
                                                return newErrors;
                                              });
                                            }
                                          }}
                                          className={detailTableErrors[index]?.binQty ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.binQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].binQty}
                                          </div>
                                        )}
                                      </td>
                                      <td>
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.noOfBin}
                                          className={detailTableErrors[index]?.noOfBin ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.weight}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, weight: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = { ...newErrors[index], weight: !value ? 'QR Code is required' : '' };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.weight ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.weight && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].weight}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '300px' }}
                                          type="text"
                                          value={row.remarks}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, remarks: value } : r)));
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                remarks: !value ? 'Remarks is required' : ''
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                        />
                                        {detailTableErrors[index]?.remarks && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {detailTableErrors[index].remarks}
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
                  </>
                )}
                {value === 1 && (
                  <>
                    <div className="row mt-2">
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Total Return Qty"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="totalReturnQty"
                            value={formData.totalReturnQty}
                            onChange={handleInputChange}
                            error={!!fieldErrors.totalReturnQty}
                            helperText={fieldErrors.totalReturnQty}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {value === 2 && (
                  <>
                    <div className="row mt-2">
                      <div className="row">
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
                            label="Security Person"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="securityPerson"
                            value={formData.securityPerson}
                            onChange={handleInputChange}
                            error={!!fieldErrors.securityPerson}
                            helperText={fieldErrors.securityPerson}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Time In"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="timeIn"
                            value={formData.timeIn}
                            onChange={handleInputChange}
                            error={!!fieldErrors.timeIn}
                            helperText={fieldErrors.timeIn}
                            disabled
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Out Time"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="timeOut"
                            value={formData.timeOut}
                            onChange={handleInputChange}
                            error={!!fieldErrors.timeOut}
                            helperText={fieldErrors.timeOut}
                            disabled
                          />
                        </div>

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
                      </div>
                    </div>
                  </>
                )}
              </Box>
              <Dialog
                open={modalOpen}
                maxWidth={'lg'}
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
                        <table className="table table-bordered ">
                          <thead>
                            <tr style={{ backgroundColor: '#673AB7' }}>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '68px' }}>
                                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                S.No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                From Bin
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                From Bin Type
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Part No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Part Desc
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                SKU
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                GRN No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Batch No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                To Bin
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                To Bin Type
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                From QTY
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                To QTY
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {modalTableData.map((row, index) => (
                              <tr key={row.id}>
                                <td className="border p-0 text-center">
                                  <Checkbox
                                    checked={selectedRows.includes(index)}
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      setSelectedRows((prev) => (isChecked ? [...prev, index] : prev.filter((i) => i !== index)));
                                    }}
                                  />
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {index + 1}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.fromBin}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.fromBinType}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.partNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.partDesc}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.sku}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.grnNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.batchNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.toBin}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.toBinType}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.fromQty}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.toQty}
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
                  <Button color="secondary" onClick={handleSubmitSelectedRows} variant="contained">
                    Proceed
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        )}
      </div>
      <ToastComponent />
    </>
  );
};

export default SalesReturn;
