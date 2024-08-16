import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonBase, FormHelperText, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
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
import GridOnIcon from '@mui/icons-material/GridOn';
import { getAllActiveLocationTypes } from 'utils/CommonFunctions';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

export const StockRestate = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [viewId, setViewId] = useState('');
  const [warehouseList, setWarehouseList] = useState([]);
  const [locationTypeList, setLocationTypeList] = useState([]);
  const [binCategoryList, setBinCategoryList] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchCode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs(),
    transferFrom: '',
    transferTo: '',
    transferFromFlag: '',
    transferToFlag: '',
    entryNo: ''
  });
  const [value, setValue] = useState(0);
  const [detailTableData, setDetailTableData] = useState([
    {
      id: 1,
      fromBin: '',
      fromBinClass: '',
      fromBinType: '',
      fromBCellType: '',
      partNo: '',
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
      fromQty: '',
      toQty: '',
      remainQty: ''
    }
  ]);

  const [detailTableErrors, setDetailTableErrors] = useState([
    {
      fromBin: '',
      fromBinClass: '',
      fromBinType: '',
      fromBCellType: '',
      partNo: '',
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
      fromQty: '',
      toQty: '',
      remainQty: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: null,
    transferFrom: '',
    transferTo: '',
    entryNo: ''
  });
  const listViewColumns = [
    { accessorKey: 'branch', header: 'Branch', size: 140 },
    { accessorKey: 'warehouse', header: 'Warehouse', size: 140 },
    { accessorKey: 'binType', header: 'Bin Type', size: 140 },
    { accessorKey: 'rowNo', header: 'Row', size: 140 },
    { accessorKey: 'level', header: 'Identity Level', size: 140 },
    { accessorKey: 'cellFrom', header: 'Start', size: 140 },
    { accessorKey: 'cellTo', header: 'End', size: 140 },
    { accessorKey: 'active', header: 'Active', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllWarehousesByLoginBranch();
    getAllLocationTypes();
    // getAllCellCategories();
    // getAllWarehousesLocations();
  }, []);

  const getAllStockRestate = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/warehouselocation?branch=${loginBranch}&orgid=${orgId}&warehouse=${loginWarehouse}`
      );
      console.log('THE WAREHOUSES IS:', response);
      if (response.status === true) {
        setListViewData(response.paramObjectsMap.warehouseLocationVO);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getAllWarehousesByLoginBranch = async () => {
    try {
      const response = await apiCalls('get', `warehousemastercontroller/warehouse/branch?branchcode=${loginBranchCode}&orgid=${orgId}`);
      console.log('THE WAREHOUSEES IS:', response);
      if (response.status === true) {
        setWarehouseList(response.paramObjectsMap.Warehouse);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getStockRestateById = async (row) => {
    console.log('THE SELECTED WAREHOUSE ID IS:', row.original.id);

    try {
      const response = await apiCalls('get', `warehousemastercontroller/getWarehouselocationById?id=${row.original.id}`);
      console.log('THE WAREHOUSEES IS:', response);

      if (response.status === true) {
        setViewId(row.original.id);
        const particularWarehouseLocation = response.paramObjectsMap.warehouseLocationVO;
        setFormData({
          warehouse: particularWarehouseLocation.warehouse,
          locationType: particularWarehouseLocation.binType,
          rowNo: particularWarehouseLocation.rowNo,
          levelIdentity: particularWarehouseLocation.level,
          cellFrom: particularWarehouseLocation.cellFrom,
          cellTo: particularWarehouseLocation.cellTo,
          active: particularWarehouseLocation.active === 'Active' ? true : false
        });
        setDetailTableData(
          particularWarehouseLocation.warehouseLocationDetailsVO.map((loc) => ({
            id: loc.id,
            bin: loc.bin,
            binCategory: loc.binCategory,
            status: loc.status,
            core: loc.core
          }))
        );
        setListView(false);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  // const getAllCellCategories = async () => {
  //   try {
  //     const response = await apiCalls('get', `warehousemastercontroller/getAllCellTypeByOrgId?orgId=${orgId}`);
  //     console.log('THE CELL CATEGORIES IS:', response);
  //     if (response.status === true) {
  //       setBinCategoryList(response.paramObjectsMap.cellTypeVO);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching employee data:', error);
  //   }
  // };

  const getAllLocationTypes = async () => {
    try {
      const locationTypeData = await getAllActiveLocationTypes(orgId);
      console.log('THE LOCATIONTYPE IS:', locationTypeData);

      setLocationTypeList(locationTypeData);
    } catch (error) {
      console.error('Error fetching locationType data:', error);
    }
  };

  const getAllBinDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/getPalletno?endno=${formData.cellTo}&level=${formData.levelIdentity}&rowno=${formData.rowNo}&startno=${formData.cellFrom}`
      );
      console.log('THE WAREHOUSE IS:', response);
      if (response.status === true) {
        const palletDetails = response.paramObjectsMap.pallet;
        console.log('THE PALLET DETAILS ARE:', palletDetails);

        setDetailTableData(
          palletDetails.map((plt) => ({
            id: plt.id,
            bin: plt.bin,
            binCategory: plt.bincategory,
            status: plt.status === 'T' ? 'True' : 'False',
            core: plt.core
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[A-Za-z0-9 ]*$/;
    const specialCharsRegex = /^[A-Za-z0-9#_\-/\\]*$/;

    let errorMessage = '';

    switch (name) {
      case 'entryNo':
        if (!specialCharsRegex.test(value)) {
          errorMessage = 'Only alphaNumeric, #_-/ are allowed';
        }
        break;

      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      if (name === 'transferFrom') {
        setFormData((prevData) => ({
          ...prevData,
          transferFrom: value,
          transferFromFlag: (value === 'DEFECTIVE' && 'D') || (value === 'HOLD' && 'H') || (value === 'RELEASE' && 'R') || ''
        }));
      } else if (name === 'transferTo') {
        setFormData((prevData) => ({
          ...prevData,
          transferTo: value,
          transferToFlag: (value === 'DEFECTIVE' && 'D') || (value === 'HOLD' && 'H') || (value === 'RELEASE' && 'R') || ''
        }));
      }
      setFormData({ ...formData, [name]: value.toUpperCase() });
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleKeyDown = (e, row, table) => {
    if (e.key === 'Tab' && row.id === table[table.length - 1].id) {
      e.preventDefault();
      if (isLastRowEmpty(table)) {
        displayRowError(table);
      } else {
        // if (table === roleTableData) handleAddRow();
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
      fromBin: '',
      fromBinClass: '',
      fromBinType: '',
      fromBCellType: '',
      partNo: '',
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
      fromQty: '',
      toQty: '',
      remainQty: ''
    };
    setDetailTableData([...detailTableData, newRow]);
    setDetailTableErrors([
      ...detailTableErrors,
      {
        fromBin: '',
        fromBinClass: '',
        fromBinType: '',
        fromBCellType: '',
        partNo: '',
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
        fromQty: '',
        toQty: '',
        remainQty: ''
      }
    ]);
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;

    if (table === detailTableData) {
      return !lastRow.bin || !lastRow.binCategory || !lastRow.status || !lastRow.core;
    }
    return false;
  };

  const displayRowError = (table) => {
    if (table === detailTableData) {
      setDetailTableErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[table.length - 1] = {
          ...newErrors[table.length - 1],
          bin: !table[table.length - 1].bin ? 'Bin is required' : '',
          binCategory: !table[table.length - 1].binCategory ? 'Bin Category is required' : '',
          status: !table[table.length - 1].status ? 'Status is required' : '',
          core: !table[table.length - 1].core ? 'Core is required' : ''
        };
        return newErrors;
      });
    }
  };

  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  const handleClear = () => {
    setFormData({
      docId: '',
      docDate: dayjs(),
      transferFrom: '',
      transferto: '',
      entryNo: ''
    });
    setDetailTableData([
      {
        id: 1,
        fromBin: '',
        fromBinClass: '',
        fromBinType: '',
        fromBCellType: '',
        partNo: '',
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
        fromQty: '',
        toQty: '',
        remainQty: ''
      }
    ]);
    setFieldErrors({
      docId: '',
      docDate: null,
      transferFrom: '',
      transferto: '',
      entryNo: ''
    });
    setDetailTableErrors('');
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.branch) {
      errors.branch = 'Branch is required';
    }
    if (!formData.warehouse) {
      errors.warehouse = 'Warehouse is required';
    }
    if (!formData.locationType) {
      errors.locationType = 'Location Type is required';
    }
    if (!formData.rowNo) {
      errors.rowNo = 'Row Number is required';
    }
    if (!formData.levelIdentity) {
      errors.levelIdentity = 'Level Identity is required';
    }
    if (!formData.cellFrom) {
      errors.cellFrom = 'Cell From is required';
    }
    if (!formData.cellTo) {
      errors.cellTo = 'Cell To is required';
    }

    let detailTableDataValid = true;
    const newTableErrors = detailTableData.map((row) => {
      const rowErrors = {};
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        detailTableDataValid = false;
      }
      if (!row.binCategory) {
        rowErrors.binCategory = 'Bin Category is required';
        detailTableDataValid = false;
      }
      if (!row.status) {
        rowErrors.status = 'Status is required';
        detailTableDataValid = false;
      }
      if (!row.core) {
        rowErrors.core = 'Core is required';
        detailTableDataValid = false;
      }

      return rowErrors;
    });
    setFieldErrors(errors);
    setDetailTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && detailTableDataValid) {
      setIsLoading(true);
      const binVo = detailTableData.map((row) => ({
        // id: row.id,
        ...(viewId && { id: row.id }),
        bin: row.bin,
        binCategory: row.binCategory,
        status: row.status,
        core: row.core
      }));

      const saveFormData = {
        ...(viewId && { id: viewId }),
        active: formData.active,
        branch: loginBranch,
        branchCode: loginBranchCode,
        warehouse: formData.warehouse,
        binType: formData.locationType,
        rowNo: formData.rowNo,
        level: formData.levelIdentity,
        cellFrom: formData.cellFrom,
        cellTo: formData.cellTo,
        warehouseLocationDetailsDTO: binVo,
        orgId: orgId,
        createdBy: loginUserName
        // userid: loginUserId,
        // warehouse: loginWarehouse
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `warehousemastercontroller/warehouselocation`, saveFormData);

        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', viewId ? ' Warehouse Location Updated Successfully' : 'Warehouse Location created successfully');
          // getAllStockRestate();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Warehouse Location creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Warehouse Location creation failed');
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
      branch: '',
      warehouse: '',
      locationType: '',
      rowNo: '',
      levelIdentity: '',
      cellFrom: '',
      cellTo: '',
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
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true}
              disableEditIcon={true}
              viewIcon={true}
              // toEdit={getStockRestateById}
            />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField label="DocId" variant="outlined" size="small" fullWidth name="Doc ID" value={formData.docId} disabled />
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
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.transferFrom}>
                  <InputLabel id="transferFrom-label">Transfer From</InputLabel>
                  <Select
                    labelId="transferFrom-label"
                    id="transferFrom"
                    name="transferFrom"
                    label="Transfer From"
                    value={formData.transferFrom}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="DEFECTIVE">DEFECTIVE</MenuItem>
                    <MenuItem value="HOLD">HOLD</MenuItem>
                    <MenuItem value="RELEASE">RELEASE</MenuItem>
                  </Select>
                  {fieldErrors.transferFrom && <FormHelperText error>{fieldErrors.transferFrom}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.transferTo}>
                  <InputLabel id="transferTo-label">Transfer To</InputLabel>
                  <Select
                    labelId="transferTo-label"
                    id="transferTo"
                    name="transferTo"
                    label="Transfer To"
                    value={formData.transferTo}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="DEFECTIVE">DEFECTIVE</MenuItem>
                    <MenuItem value="HOLD">HOLD</MenuItem>
                    <MenuItem value="RELEASE">RELEASE</MenuItem>
                  </Select>
                  {fieldErrors.transferTo && <FormHelperText error>{fieldErrors.transferTo}</FormHelperText>}
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
                  disabled={viewId && true}
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
                  <Tab value={0} label="Bin Details" />
                </Tabs>
              </Box>
              <Box className="mt-2" sx={{ padding: 1 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={getAllBinDetails} />
                        <ActionButton title="Clear" icon={ClearIcon} />
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
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                    Remain QTY
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {detailTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, detailTableData, setDetailTableData)}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.fromBin}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handleFromBinChange(row, index, e)}
                                        className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {binList?.map((part) => (
                                          <option key={part.id} value={part.bin}>
                                            {part.bin}
                                          </option>
                                        ))} */}
                                      </select>
                                      {detailTableErrors[index]?.fromBin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].fromBin}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.fromBinType}
                                        className={detailTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handlePartNoChange(row, index, e)}
                                        className={detailTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {partNoList?.map((part) => (
                                          <option key={part.id} value={part.partno}>
                                            {part.partno}
                                          </option>
                                        ))} */}
                                      </select>
                                      {detailTableErrors[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].partNo}
                                        </div>
                                      )}
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
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.sku}
                                        className={detailTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.grnNo}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handleGrnNoChange(row, index, e)}
                                        className={detailTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {grnNoList?.map((part) => (
                                          <option key={part.id} value={part.grnNo}>
                                            {part.grnNo}
                                          </option>
                                        ))} */}
                                      </select>
                                      {detailTableErrors[index]?.grnNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].grnNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.batchNo}
                                        style={{ width: '200px' }}
                                        // onChange={(e) => handleBatchNoChange(row, index, e)}
                                        className={detailTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">-- Select --</option>
                                        {/* {batchNoList?.map((batch) => (
                                          <option key={batch.id} value={batch.batchNo}>
                                            {batch.batchNo}
                                          </option>
                                        ))} */}
                                      </select>
                                      {detailTableErrors[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].batchNo}
                                        </div>
                                      )}
                                    </td>

                                    {/* <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.bin}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDetailTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, bin: value } : r)));
                                          setDetailTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], bin: !value ? 'Gst In is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      />
                                      {detailTableErrors[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].bin}
                                        </div>
                                      )}
                                    </td> */}

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.toBin}
                                        // onChange={(e) => handleToBinChange(row, index, e)}
                                        className={detailTableErrors[index]?.toBin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">--Select--</option>
                                        {/* {toBinList?.map((row) => (
                                          <option key={row.id} value={row.toBin}>
                                            {row.toBin}
                                          </option>
                                        ))} */}
                                      </select>
                                      {detailTableErrors[index]?.toBin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].toBin}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.toBinType}
                                        className={detailTableErrors[index]?.toBinType ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.fromQty}
                                        className={detailTableErrors[index]?.fromQty ? 'error form-control' : 'form-control'}
                                        disabled
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.toQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const intPattern = /^\d*$/;

                                          if (intPattern.test(value) || value === '') {
                                            setDetailTableData((prev) => {
                                              const updatedData = prev.map((r) => {
                                                return r.id === row.id
                                                  ? {
                                                      ...r,
                                                      toQty: value,
                                                      remainQty: row.fromQty - value
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
                                                toQty: ''
                                              };
                                              return newErrors;
                                            });
                                          } else {
                                            // Set error if input is invalid
                                            setDetailTableErrors((prev) => {
                                              const newErrors = [...prev];
                                              newErrors[index] = {
                                                ...newErrors[index],
                                                toQty: 'only numbers are allowed'
                                              };
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        className={detailTableErrors[index]?.invQty ? 'error form-control' : 'form-control'}
                                      />
                                      {detailTableErrors[index]?.toQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {detailTableErrors[index].toQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '300px' }}
                                        type="text"
                                        value={row.remainQty}
                                        className={detailTableErrors[index]?.remainQty ? 'error form-control' : 'form-control'}
                                        disabled
                                        onKeyDown={(e) => handleKeyDown(e, row, detailTableData)}
                                      />
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
              </Box>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StockRestate;
