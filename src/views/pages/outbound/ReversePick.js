import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
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
import { getAllActiveGroups, getAllActiveUnits } from 'utils/CommonFunctions';
import ToastComponent, { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';

export const ReversePick = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [unitList, setUnitList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchCode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));

  const [formData, setFormData] = useState({
    docId: '',
    docDate: '',
    pickRequestId: '',
    dispatch: '',
    buyerOrderNo: '',
    buyerOrderRefNo: '',
    buyerOrderRefDate: null,
    shipmentMethod: '',
    refNo: '',
    noOfBoxes: '',
    dueDays: '',
    clientName: '',
    customerName: '',
    outTime: '',
    clientAddress: '',
    customerAddress: '',
    status: '',
    boAmentment: '',
    controlBranch: localStorage.getItem('branchCode'),
    active: true,
    charges: '',
    lineDiscount: '',
    roundOff: '',
    invDiscountAmount: '',
    watAmountWithoutForm: '',
    totalAmount: ''
  });

  const [value, setValue] = useState(0);
  const [itemTableData, setItemTableData] = useState([
    {
      id: 1,
      mrp: '',
      fDate: null,
      tDate: null
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      mrp: '',
      fDate: null,
      tDate: null
    };
    setItemTableData([...itemTableData, newRow]);
    setItemTableErrors([
      ...itemTableErrors,
      {
        mrp: '',
        fDate: null,
        tDate: null
      }
    ]);
  };

  const [itemTableErrors, setItemTableErrors] = useState([
    {
      mrp: '',
      fDate: null,
      tDate: null
    }
  ]);

  const theme = useTheme();
  const anchorRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({
    docDate: '',
    pickRequestId: '',
    dispatch: '',
    buyerOrderNo: '',
    buyerOrderRefNo: '',
    buyerOrderRefDate: '',
    shipmentMethod: '',
    refNo: '',
    noOfBoxes: '',
    dueDays: '',
    clientName: '',
    customerName: '',
    outTime: '',
    clientAddress: '',
    customerAddress: '',
    status: '',
    boAmentment: '',
    controlBranch: localStorage.getItem('branchCode'),
    active: true,
    charges: '',
    lineDiscount: '',
    roundOff: '',
    invDiscountAmount: '',
    watAmountWithoutForm: '',
    totalAmount: ''
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
    getAllUnits();
    getAllGroups();
    getAllItems();
  }, []);

  const getCurrentTime = () => {
    return dayjs().format('HH:mm:ss');
  };

  // Initialize the outTime field with the current time
  useEffect(() => {
    setFormData((prev) => ({ ...prev, outTime: getCurrentTime() }));
  }, []);

  const getAllUnits = async () => {
    try {
      const unitData = await getAllActiveUnits(orgId);
      setUnitList(unitData);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
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
  const getAllItems = async () => {
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
  const getAllItemById = async (row) => {
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
          // palletQty: '',
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
    const { name, value } = e.target;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const specialCharsRegex = /^[A-Za-z0-9@_\-*]*$/;

    let errorMessage = '';

    // Check if the value is a string before applying toUpperCase
    const processedValue = typeof value === 'string' ? value.toUpperCase() : value;

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      setFormData({ ...formData, [name]: processedValue });
      setFieldErrors({ ...fieldErrors, [name]: '' });
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

  const handleDeleteRow = (id) => {
    setItemTableData(itemTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === itemTableData[itemTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setFormData({
      docDate: '',
      pickRequestId: '',
      dispatch: '',
      buyerOrderNo: '',
      buyerOrderRefNo: '',
      buyerOrderRefDate: '',
      shipmentMethod: '',
      refNo: '',
      noOfBoxes: '',
      dueDays: '',
      clientName: '',
      customerName: '',
      outTime: '',
      clientAddress: '',
      customerAddress: '',
      status: '',
      boAmentment: '',
      controlBranch: localStorage.getItem('branchCode'),
      active: true,
      charges: '',
      lineDiscount: '',
      roundOff: '',
      invDiscountAmount: '',
      watAmountWithoutForm: '',
      totalAmount: ''
    });
    setItemTableData([
      {
        id: 1,
        mrp: '',
        fDate: '',
        tDate: ''
      }
    ]);
    setFieldErrors({
      docDate: '',
      pickRequestId: '',
      dispatch: '',
      buyerOrderNo: '',
      buyerOrderRefNo: '',
      buyerOrderRefDate: '',
      shipmentMethod: '',
      refNo: '',
      noOfBoxes: '',
      dueDays: '',
      clientName: '',
      customerName: '',
      outTime: '',
      clientAddress: '',
      customerAddress: '',
      status: '',
      boAmentment: '',
      controlBranch: localStorage.getItem('branchCode'),
      active: true,
      charges: '',
      lineDiscount: '',
      roundOff: '',
      invDiscountAmount: '',
      watAmountWithoutForm: '',
      totalAmount: ''
    });
    setItemTableErrors('');
    setEditId('');
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.partNo) {
      errors.partNo = 'Part No is required';
    }
    if (!formData.partDesc) {
      errors.partDesc = 'part Desc is required';
    }
    if (!formData.sku) {
      errors.sku = 'SKU is required';
    }
    if (!formData.status) {
      errors.status = 'Status is required';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const itemVo = itemTableData.map((row) => ({
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
        createdBy: loginUserName,
        breadth: 0,
        client: loginClient,
        customer: loginCustomer,
        height: 0,
        length: 0,
        palletQty: '',
        warehouse: loginWarehouse,
        weight: 0,
        branch: loginBranch,
        branchCode: loginBranchCode
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `warehousemastercontroller/createUpdateMaterial`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Item Updated Successfully' : 'Item created successfully');
          setIsLoading(false);
          getAllItems();
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Item creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Item creation failed');
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getAllItemById} />
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
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="DocDate"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="DocDate"
                  value={formData.DocDate}
                  onChange={handleInputChange}
                  error={!!fieldErrors.DocDate}
                  helperText={fieldErrors.DocDate}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Pick Reauest Id"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="pickRequestId"
                  value={formData.pickRequestId}
                  onChange={handleInputChange}
                  error={!!fieldErrors.pickRequestId}
                  helperText={fieldErrors.pickRequestId}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="DatePicker"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="datePicker"
                  value={formData.datePicker}
                  onChange={handleInputChange}
                  error={!!fieldErrors.datePicker}
                  helperText={fieldErrors.datePicker}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Dispatch"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="dispatch"
                  value={formData.dispatch}
                  onChange={handleInputChange}
                  error={!!fieldErrors.dispatch}
                  helperText={fieldErrors.dispatch}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Buyer Order No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="buyerOrderNo"
                  value={formData.buyerOrderNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.buyerOrderNo}
                  helperText={fieldErrors.buyerOrderNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Buyer Order Ref No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="buyerOrderRefNo"
                  value={formData.buyerOrderRefNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.buyerOrderRefNo}
                  helperText={fieldErrors.buyerOrderRefNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                {/* <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.purchaseUnit}>
                  <InputLabel id="purchaseUnit-label">Purchase Unit</InputLabel>
                  <Select
                    labelId="purchaseUnit-label"
                    id="purchaseUnit"
                    name="purchaseUnit"
                    label="Purchase Unit"
                    value={formData.purchaseUnit}
                    onChange={handleInputChange}
                  >
                    {unitList?.map((row) => (
                      <MenuItem key={row.id} value={row.unitName.toUpperCase()}>
                        {row.unitName.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.purchaseUnit && <FormHelperText error>{fieldErrors.purchaseUnit}</FormHelperText>}
                </FormControl> */}
                <TextField
                  label="Shipment Method"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="shipmentMethod"
                  value={formData.shipmentMethod}
                  onChange={handleInputChange}
                  error={!!fieldErrors.shipmentMethod}
                  helperText={fieldErrors.shipmentMethod}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Ref No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="refNo"
                  value={formData.refNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.refNo}
                  helperText={fieldErrors.refNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl fullWidth variant="filled" size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Buyer Order Ref Date"
                      value={formData.buyerOrderRefDate ? dayjs(formData.buyerOrderRefDate, 'DD-MM-YYYY') : null}
                      onChange={(date) => handleDateChange('buyerOrderRefDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.buyerOrderRefDate}
                      helperText={fieldErrors.buyerOrderRefDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="NoOfBoxes"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="noOfBoxes"
                  value={formData.noOfBoxes}
                  onChange={handleInputChange}
                  error={!!fieldErrors.noOfBoxes}
                  helperText={fieldErrors.noOfBoxes}
                />
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="Due Days"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="dueDays"
                  value={formData.dueDays}
                  onChange={handleInputChange}
                  error={!!fieldErrors.dueDays}
                  helperText={fieldErrors.dueDays}
                />
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label="Client Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.clientName}
                  helperText={fieldErrors.clientName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.customerName}
                  helperText={fieldErrors.customerName}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Out Time"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="outTime"
                  value={formData.outTime}
                  onChange={handleInputChange}
                  error={!!fieldErrors.outTime}
                  helperText={fieldErrors.outTime}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Client Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  error={!!fieldErrors.clientAddress}
                  helperText={fieldErrors.clientAddress}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Customer Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  error={!!fieldErrors.customerAddress}
                  helperText={fieldErrors.customerAddress}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.status}>
                  <InputLabel id="purchaseUnit-label">Status</InputLabel>
                  <Select
                    labelId="purchaseUnit-label"
                    id="purchaseUnit"
                    name="purchaseUnit"
                    label="Status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {unitList?.map((row) => (
                      <MenuItem key={row.id} value={row.unitName.toUpperCase()}>
                        {row.unitName.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.status && <FormHelperText error>{fieldErrors.status}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.status}>
                  <InputLabel id="purchaseUnit-label">BO Amendment</InputLabel>
                  <Select
                    labelId="purchaseUnit-label"
                    id="purchaseUnit"
                    name="purchaseUnit"
                    label="BO Amentment"
                    value={formData.boAmentment}
                    onChange={handleInputChange}
                  >
                    {unitList?.map((row) => (
                      <MenuItem key={row.id} value={row.unitName.toUpperCase()}>
                        {row.unitName.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.boAmentment && <FormHelperText error>{fieldErrors.boAmentment}</FormHelperText>}
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.active}
                      onChange={() => setFormData({ ...formData, active: !formData.active })}
                      color="primary"
                    />
                  }
                  label="Active"
                />
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
                </Tabs>
              </Box>
              {/* <Box className="mt-4"> */}
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
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
                                    Part Code
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Part Description
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Lot No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    SKU
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Location
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    To Location
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Order Qty
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Picked Qty Per Location
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Revised Qty Per Location
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Weight
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    PGroup
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Rate
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Tax
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Amount
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {itemTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    {/* Part Code */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        style={{ width: '100px' }}
                                        value={row.partCode}
                                        onChange={(e) => handleInputChange(e, index, 'partCode')}
                                        className={itemTableErrors[index]?.partCode ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.partCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].partCode}
                                        </div>
                                      )}
                                    </td>

                                    {/* Part Description */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.partDescription}
                                        onChange={(e) => handleInputChange(e, index, 'partDescription')}
                                        className={itemTableErrors[index]?.partDescription ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.partDescription && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].partDescription}
                                        </div>
                                      )}
                                    </td>

                                    {/* Batch No */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.batchNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'batchNo')}
                                        className={itemTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].batchNo}
                                        </div>
                                      )}
                                    </td>

                                    {/* Lot No */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.lotNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'lotNo')}
                                        className={itemTableErrors[index]?.lotNo ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.lotNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].lotNo}
                                        </div>
                                      )}
                                    </td>

                                    {/* SKU */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.sku}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'sku')}
                                        className={itemTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.sku && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].sku}
                                        </div>
                                      )}
                                    </td>

                                    {/* Location */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.location}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'location')}
                                        className={itemTableErrors[index]?.location ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.location && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].location}
                                        </div>
                                      )}
                                    </td>

                                    {/* To Location */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.toLocation}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'toLocation')}
                                        className={itemTableErrors[index]?.toLocation ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.toLocation && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].toLocation}
                                        </div>
                                      )}
                                    </td>

                                    {/* Order Qty */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.orderQty}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'orderQty')}
                                        className={itemTableErrors[index]?.orderQty ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.orderQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].orderQty}
                                        </div>
                                      )}
                                    </td>

                                    {/* Picked Qty Per Location */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.pickedQtyPerLocation}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'pickedQtyPerLocation')}
                                        className={itemTableErrors[index]?.pickedQtyPerLocation ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.pickedQtyPerLocation && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].pickedQtyPerLocation}
                                        </div>
                                      )}
                                    </td>

                                    {/* Revised Qty Per Location */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.revisedQtyPerLocation}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'revisedQtyPerLocation')}
                                        className={itemTableErrors[index]?.revisedQtyPerLocation ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.revisedQtyPerLocation && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].revisedQtyPerLocation}
                                        </div>
                                      )}
                                    </td>

                                    {/* Weight */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.weight}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'weight')}
                                        className={itemTableErrors[index]?.weight ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.weight && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].weight}
                                        </div>
                                      )}
                                    </td>

                                    {/* PGroup */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.pGroup}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'pGroup')}
                                        className={itemTableErrors[index]?.pGroup ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.pGroup && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].pGroup}
                                        </div>
                                      )}
                                    </td>

                                    {/* Exp Date */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.expDate}
                                        onChange={(e) => handleInputChange(e, index, 'expDate')}
                                        className={itemTableErrors[index]?.expDate ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.expDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].expDate}
                                        </div>
                                      )}
                                    </td>

                                    {/* Rate */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.rate}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'rate')}
                                        className={itemTableErrors[index]?.rate ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.rate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].rate}
                                        </div>
                                      )}
                                    </td>

                                    {/* Tax */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.tax}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'tax')}
                                        className={itemTableErrors[index]?.tax ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.tax && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].tax}
                                        </div>
                                      )}
                                    </td>

                                    {/* Amount */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.amount}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'amount')}
                                        className={itemTableErrors[index]?.amount ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.amount && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].amount}
                                        </div>
                                      )}
                                    </td>

                                    {/* Remarks */}
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.remarks}
                                        style={{ width: '100px' }}
                                        onChange={(e) => handleInputChange(e, index, 'remarks')}
                                        className={itemTableErrors[index]?.remarks ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.remarks && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].remarks}
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
                    <div className="row mt-2">
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Charges"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="fsn"
                            value={formData.charges}
                            onChange={handleInputChange}
                            error={!!fieldErrors.charges}
                            helperText={fieldErrors.charges}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Line Discount"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="lineDiscount"
                            value={formData.lineDiscount}
                            onChange={handleInputChange}
                            error={!!fieldErrors.lineDiscount}
                            helperText={fieldErrors.lineDiscount}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Round Off"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="roundOff"
                            value={formData.roundOff}
                            onChange={handleInputChange}
                            error={!!fieldErrors.roundOff}
                            helperText={fieldErrors.roundOff}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Inv. Discount Amount"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="invDiscountAmount"
                            value={formData.invDiscountAmount}
                            onChange={handleInputChange}
                            error={!!fieldErrors.invDiscountAmount}
                            helperText={fieldErrors.invDiscountAmount}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="WAT Amount Without Form"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="watAmountWithoutForm"
                            value={formData.watAmountWithoutForm}
                            onChange={handleInputChange}
                            error={!!fieldErrors.watAmountWithoutForm}
                            helperText={fieldErrors.watAmountWithoutForm}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Total Amount"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleInputChange}
                            error={!!fieldErrors.totalAmount}
                            helperText={fieldErrors.totalAmount}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Box>
            </div>
          </>
        )}
      </div>
      <ToastComponent />
    </>
  );
};

export default ReversePick;
