import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from './CommonListViewTable';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
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
import ToastComponent, { showToast } from 'utils/toast-component';
import GridOnIcon from '@mui/icons-material/GridOn';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import apiCalls from 'apicall';
import dayjs from 'dayjs';

export const ItemMaster = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));

  const [formData, setFormData] = useState({
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
    controlBranch: '',
    criticalStockLevel: '',
    criticalStock: '',
    bchk: '',
    status: 'R',
    parentChildKey: 'CHILD',
    barcode: '',
    active: true
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
    barcode: ''
  });
  const listViewColumns = [
    { accessorKey: 'partNo', header: 'Part No', size: 140 },
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
    // getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const result = await apiCalls('get', `getAllItemsByorgId?${orgId}`);
      setListViewData(result);
      console.log('TEST LISTVIEW DATA', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  const getAllItemById = async () => {
    try {
      const result = await apiCalls('get', `getAllItemsByorgId?${orgId}`);
      // setListViewData(result);
      setListView(false);
      setFormData({
        itemType: result.itemType,
        partNo: result.partNo,
        partDesc: result.partDesc,
        custPartNo: result.custPartNo,
        groupName: result.groupName,
        styleCode: result.styleCode,
        baseSku: result.baseSku,
        addDesc: result.addDesc,
        purchaseUnit: result.purchaseUnit,
        storageUnit: result.storageUnit,
        fixedCapAcrossLocn: result.fixedCapAcrossLocn,
        fsn: result.fsn,
        saleUnit: result.saleUnit,
        type: result.type,
        serialNoFlag: result.serialNoFlag,
        sku: result.sku,
        skuQty: result.skuQty,
        ssku: result.ssku,
        sskuQty: result.sskuQty,
        zoneType: result.zoneType,
        weightSkuUom: result.weightSkuUom,
        hsnCode: result.hsnCode,
        parentChildKey: result.parentChildKey,
        controlBranch: result.controlBranch,
        criticalStockLevel: result.criticalStockLevel,
        criticalStock: result.criticalStock,
        bchk: result.bchk,
        status: result.status,
        barcode: result.barcode,
        active: result.active === 'Active' ? true : false
      });
      console.log('TEST LISTVIEW DATA', result);
    } catch (err) {
      console.log('error', err);
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

    switch (name) {
      case 'baseSku':
      case 'ssku':
        if (!alphanumericRegex.test(value)) {
          errorMessage = 'Only Alphanumeric are allowed';
        }
        if (value.length > 12) {
          errorMessage = 'Length between 8 - 12 only';
        }
        break;
      case 'fsn':
      case 'hsnCode':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only Numbers are allowed';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleDateChange = (date, index) => {
    setItemTableData((prev) => prev.map((r, idx) => (idx === index ? { ...r, fDate: date } : r)));
    setItemTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        fDate: !date ? 'Start Date is required' : ''
      };
      return newErrors;
    });
  };

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
      controlBranch: '',
      criticalStockLevel: '',
      criticalStock: '',
      bchk: '',
      status: 'R',
      parentChildKey: 'CHILD',
      barcode: '',
      active: true
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
      barcode: ''
    });
    setItemTableErrors('');
  };

  const handleSave = () => {
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
        partNo: formData.partNo,
        partDesc: formData.partDesc,
        custPartNo: formData.custPartNo,
        groupName: formData.groupName,
        styleCode: formData.styleCode,
        baseSku: formData.baseSku,
        addDesc: formData.addDesc,
        purchaseUnit: formData.purchaseUnit,
        storageUnit: formData.storageUnit,
        fixedCapAcrossLocn: formData.fixedCapAcrossLocn,
        fsn: formData.fsn,
        saleUnit: formData.saleUnit,
        type: formData.type,
        serialNoFlag: formData.serialNoFlag,
        sku: formData.sku,
        skuQty: formData.skuQty,
        ssku: formData.ssku,
        sskuQty: formData.sskuQty,
        zoneType: formData.zoneType,
        weightSkuUom: formData.weightSkuUom,
        hsnCode: formData.hsnCode,
        parentChildKey: formData.parentChildKey,
        controlBranch: formData.controlBranch,
        criticalStockLevel: formData.criticalStockLevel,
        criticalStock: formData.criticalStock,
        bchk: formData.bchk,
        status: formData.status,
        barcode: formData.barcode,
        itemVo: itemVo,
        orgId: orgId,
        createdby: loginUserName
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      axios
        .put(`${process.env.REACT_APP_API_URL}/api/item`, saveFormData)
        .then((response) => {
          if (response.data.status === true) {
            console.log('Response:', response.data);
            handleClear();
            showToast('success', editId ? ' Item Updated Successfully' : 'Item created successfully');
            setIsLoading(false);
          } else {
            showToast('error', response.data.paramObjectsMap.errorMessage || 'Item creation failed');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showToast('error', 'Item creation failed');
          setIsLoading(false);
        });
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.itemType}>
                  <InputLabel id="itemType-label">Item Type</InputLabel>
                  <Select
                    labelId="itemType-label"
                    id="itemType"
                    name="itemType"
                    label="Item Type"
                    value={formData.itemType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="TYPE 1">TYPE 1</MenuItem>
                    <MenuItem value="TYPE 2">TYPE 2</MenuItem>
                  </Select>
                  {fieldErrors.itemType && <FormHelperText error>{fieldErrors.itemType}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Part No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="partNo"
                  value={formData.partNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.partNo}
                  helperText={fieldErrors.partNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Part Desc"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="partDesc"
                  value={formData.partDesc}
                  onChange={handleInputChange}
                  error={!!fieldErrors.partDesc}
                  helperText={fieldErrors.partDesc}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Cust Part No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="custPartNo"
                  value={formData.custPartNo}
                  onChange={handleInputChange}
                  error={!!fieldErrors.custPartNo}
                  helperText={fieldErrors.custPartNo}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.groupName}>
                  <InputLabel id="groupName-label">Group Name</InputLabel>
                  <Select
                    labelId="groupName-label"
                    id="groupName"
                    name="groupName"
                    label="Group Name"
                    value={formData.groupName}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="GROUP 1">GROUP 1</MenuItem>
                    <MenuItem value="GROUP 2">GROUP 2</MenuItem>
                  </Select>
                  {fieldErrors.groupName && <FormHelperText error>{fieldErrors.groupName}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Style Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="styleCode"
                  value={formData.styleCode}
                  onChange={handleInputChange}
                  error={!!fieldErrors.styleCode}
                  helperText={fieldErrors.styleCode}
                />
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="Base SKU"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="baseSku"
                  value={formData.baseSku}
                  onChange={handleInputChange}
                  error={!!fieldErrors.baseSku}
                  helperText={fieldErrors.baseSku}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.purchaseUnit}>
                  <InputLabel id="purchaseUnit-label">Purchase Unit</InputLabel>
                  <Select
                    labelId="purchaseUnit-label"
                    id="purchaseUnit"
                    name="purchaseUnit"
                    label="Purchase Unit"
                    value={formData.purchaseUnit}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="UNIT 1">UNIT 1</MenuItem>
                    <MenuItem value="UNIT 2">UNIT 2</MenuItem>
                  </Select>
                  {fieldErrors.purchaseUnit && <FormHelperText error>{fieldErrors.purchaseUnit}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.storageUnit}>
                  <InputLabel id="storageUnit-label">Storage Unit</InputLabel>
                  <Select
                    labelId="storageUnit-label"
                    id="storageUnit"
                    name="storageUnit"
                    label="Storage Unit"
                    value={formData.storageUnit}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="UNIT 1">UNIT 1</MenuItem>
                    <MenuItem value="UNIT 2">UNIT 2</MenuItem>
                  </Select>
                  {fieldErrors.storageUnit && <FormHelperText error>{fieldErrors.storageUnit}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.sku}>
                  <InputLabel id="sku-label">SKU</InputLabel>
                  <Select labelId="sku-label" id="sku" name="sku" label="SKU" value={formData.sku} onChange={handleInputChange}>
                    <MenuItem value="SKU 1">SKU 1</MenuItem>
                    <MenuItem value="SKU 2">SKU 2</MenuItem>
                  </Select>
                  {fieldErrors.sku && <FormHelperText error>{fieldErrors.sku}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="SSKU"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="ssku"
                  value={formData.ssku}
                  onChange={handleInputChange}
                  error={!!fieldErrors.ssku}
                  helperText={fieldErrors.ssku}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.controlBranch}>
                  <InputLabel id="controlBranch-label">Control Branch</InputLabel>
                  <Select
                    labelId="controlBranch-label"
                    id="controlBranch"
                    name="controlBranch"
                    label="Control Branch"
                    value={formData.controlBranch}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="BRANCH 1">BRANCH 1</MenuItem>
                    <MenuItem value="BRANCH 2">BRANCH 2</MenuItem>
                  </Select>
                  {fieldErrors.controlBranch && <FormHelperText error>{fieldErrors.controlBranch}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.criticalStock}>
                  <InputLabel id="criticalStock-label">Critical Stock</InputLabel>
                  <Select
                    labelId="criticalStock-label"
                    id="criticalStock"
                    name="criticalStock"
                    label="Critical Stock"
                    value={formData.criticalStock}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                  </Select>
                  {fieldErrors.criticalStock && <FormHelperText error>{fieldErrors.criticalStock}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <TextField
                  label="BCHK"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="bchk"
                  value={formData.bchk}
                  onChange={handleInputChange}
                  error={!!fieldErrors.bchk}
                  helperText={fieldErrors.bchk}
                />
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="R">R</MenuItem>
                    <MenuItem value="H">H</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                  </Select>
                  {fieldErrors.status && <FormHelperText error>{fieldErrors.status}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.parentChildKey}>
                  <InputLabel id="parentChildKey-label">Parent Child Key </InputLabel>
                  <Select
                    labelId="parentChildKey-label"
                    id="parentChildKey"
                    name="parentChildKey"
                    label="Parent Child Key"
                    value={formData.parentChildKey}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="PARENT">PARENT</MenuItem>
                    <MenuItem value="CHILD">CHILD</MenuItem>
                  </Select>
                  {fieldErrors.parentChildKey && <FormHelperText error>{fieldErrors.parentChildKey}</FormHelperText>}
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
                  <Tab value={0} label="Item Details" />
                  <Tab value={1} label="Other Details" />
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
                        <div className="col-lg-8">
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
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 100 }}>
                                    MRP
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 150 }}>
                                    From Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: 150 }}>
                                    To Date
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

                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.mrp}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setItemTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, mrp: value } : r)));
                                          setItemTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], mrp: !value ? 'MRP is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={itemTableErrors[index]?.mrp ? 'error form-control' : 'form-control'}
                                      />
                                      {itemTableErrors[index]?.mrp && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].mrp}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <div className="w-100">
                                        <DatePicker
                                          selected={row.fDate}
                                          className={itemTableErrors[index]?.fDate ? 'error form-control' : 'form-control'}
                                          onChange={(date) => {
                                            setItemTableData((prev) =>
                                              prev.map((r) =>
                                                r.id === row.id ? { ...r, fDate: date, tDate: date > r.tDate ? null : r.tDate } : r
                                              )
                                            );
                                            setItemTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                fDate: !date ? 'Start Date is required' : '',
                                                tDate: date && row.tDate && date > row.tDate ? '' : newErrors[index]?.tDate
                                              };
                                              return newErrors;
                                            });
                                          }}
                                          dateFormat="dd/MM/yyyy"
                                          minDate={new Date()}
                                        />
                                        {itemTableErrors[index]?.fDate && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {itemTableErrors[index].fDate}
                                          </div>
                                        )}
                                      </div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <DatePicker
                                        selected={row.tDate}
                                        className={itemTableErrors[index]?.tDate ? 'error form-control' : 'form-control'}
                                        onChange={(date) => {
                                          setItemTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, tDate: date } : r)));
                                          setItemTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              tDate: !date ? 'End Date is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={row.fDate || new Date()} // Set minDate for tDate to be fDate or today's date
                                        disabled={!row.fDate} // Disable tDate picker if fDate is not selected
                                      />
                                      {itemTableErrors[index]?.tDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {itemTableErrors[index].tDate}
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
                            label="Add Desc"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="addDesc"
                            value={formData.addDesc}
                            onChange={handleInputChange}
                            error={!!fieldErrors.addDesc}
                            helperText={fieldErrors.addDesc}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Fixed Cap Across Locn"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="fixedCapAcrossLocn"
                            value={formData.fixedCapAcrossLocn}
                            onChange={handleInputChange}
                            error={!!fieldErrors.fixedCapAcrossLocn}
                            helperText={fieldErrors.fixedCapAcrossLocn}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="FSN"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="fsn"
                            value={formData.fsn}
                            onChange={handleInputChange}
                            error={!!fieldErrors.fsn}
                            helperText={fieldErrors.fsn}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.saleUnit}>
                            <InputLabel id="saleUnit-label">Sale Unit</InputLabel>
                            <Select
                              labelId="saleUnit-label"
                              id="saleUnit"
                              name="saleUnit"
                              label="Sale Unit"
                              value={formData.saleUnit}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="UNIT 1">UNIT 1</MenuItem>
                              <MenuItem value="UNIT 2">UNIT 2</MenuItem>
                            </Select>
                            {fieldErrors.saleUnit && <FormHelperText error>{fieldErrors.saleUnit}</FormHelperText>}
                          </FormControl>
                        </div>
                        <div className="col-md-3 mb-3">
                          <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.type}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                              labelId="type-label"
                              id="type"
                              name="type"
                              label="Type"
                              value={formData.type}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="TYPE 1">TYPE 1</MenuItem>
                              <MenuItem value="TYPE 2">TYPE 2</MenuItem>
                            </Select>
                            {fieldErrors.type && <FormHelperText error>{fieldErrors.type}</FormHelperText>}
                          </FormControl>
                        </div>
                        <div className="col-md-3 mb-3">
                          <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.serialNoFlag}>
                            <InputLabel id="serialNoFlag-label">Serial No Flag</InputLabel>
                            <Select
                              labelId="serialNoFlag-label"
                              id="serialNoFlag"
                              name="serialNoFlag"
                              label="Serial No Flag"
                              value={formData.serialNoFlag}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="FLAG 1">FLAG 1</MenuItem>
                              <MenuItem value="FLAG 2">FLAG 2</MenuItem>
                            </Select>
                            {fieldErrors.serialNoFlag && <FormHelperText error>{fieldErrors.serialNoFlag}</FormHelperText>}
                          </FormControl>
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            type="number"
                            label="SKU Qty"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="skuQty"
                            value={formData.skuQty}
                            onChange={handleInputChange}
                            error={!!fieldErrors.skuQty}
                            helperText={fieldErrors.skuQty}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            type="number"
                            label="SSKU Qty"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="sskuQty"
                            value={formData.sskuQty}
                            onChange={handleInputChange}
                            error={!!fieldErrors.sskuQty}
                            helperText={fieldErrors.sskuQty}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Zone Type"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="zoneType"
                            value={formData.zoneType}
                            onChange={handleInputChange}
                            error={!!fieldErrors.zoneType}
                            helperText={fieldErrors.zoneType}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            type="number"
                            label="Weight SKU UOM"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="weightSkuUom"
                            value={formData.weightSkuUom}
                            onChange={handleInputChange}
                            error={!!fieldErrors.weightSkuUom}
                            helperText={fieldErrors.weightSkuUom}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <TextField
                            label="HSN Code"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="hsnCode"
                            value={formData.hsnCode}
                            onChange={handleInputChange}
                            error={!!fieldErrors.hsnCode}
                            helperText={fieldErrors.hsnCode}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            type="number"
                            label="Critical Stock Level"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="criticalStockLevel"
                            value={formData.criticalStockLevel}
                            onChange={handleInputChange}
                            error={!!fieldErrors.criticalStockLevel}
                            helperText={fieldErrors.criticalStockLevel}
                          />
                        </div>

                        <div className="col-md-3 mb-3">
                          <TextField
                            label="Barcode"
                            variant="outlined"
                            size="small"
                            fullWidth
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleInputChange}
                            error={!!fieldErrors.barcode}
                            helperText={fieldErrors.barcode}
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

export default ItemMaster;
