import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
// import { FormHelperText, Tooltip, FormControlLabel, Checkbox, Dialog } from '@mui/material';
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
import { getAllActiveLocationTypes } from 'utils/CommonFunctions';
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

export const VasPick = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [loginUserId, setLoginUserId] = useState(localStorage.getItem('userId'));
  const [loginBranchCode, setLoginBranchCode] = useState(localStorage.getItem('branchCode'));
  const [loginBranch, setLoginBranch] = useState(localStorage.getItem('branch'));
  const [loginCustomer, setLoginCustomer] = useState(localStorage.getItem('customer'));
  const [loginClient, setLoginClient] = useState(localStorage.getItem('client'));
  const [loginWarehouse, setLoginWarehouse] = useState(localStorage.getItem('warehouse'));
  // const [loginFinYear, setLoginFinYear] = useState(localStorage.getItem('finYear'));
  const [loginFinYear, setLoginFinYear] = useState('2024');
  const [pickBinTypeList, setPickBinTypeList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs(),
    pickBinType: '',
    stockState: '',
    status: '',
    totalOrderQty: '',
    totalPickedQty: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: dayjs(),
    pickBinType: '',
    stockState: '',
    status: '',
    totalOrderQty: '',
    totalPickedQty: ''
  });
  const [vasPickGridTableData, setVasPickGridTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      sku: '',
      bin: '',
      batchNo: '',
      batchDate: null,
      grnNo: '',
      grnDate: null,
      avlQty: '',
      pickQty: '',
      remainingQty: ''
    }
  ]);
  const [vasPickGridTableErrors, setVasPickGridTableErrors] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      sku: '',
      bin: '',
      batchNo: '',
      batchDate: null,
      grnNo: '',
      grnDate: null,
      avlQty: '',
      pickQty: '',
      remainingQty: ''
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
    // getNewVasPickDocId();
    getAllPickBinType();
  }, []);

  const getNewVasPickDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `vascontroller/getVasPickDocId?branch=${loginBranch}&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}`
      );
      setFormData((prevData) => ({
        ...prevData,
        docId: response.paramObjectsMap.vasPickDocId
      }));
    } catch (error) {
      console.error('Error fetching gate passes:', error);
    }
  };
  // const getFillGridData = async () => {
  //   try {
  //     const response = await apiCalls(
  //       'get',
  //       `inward/getGatePassInNoForPedningGRN?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}`
  //     );
  //     setGatePassIdList(response.paramObjectsMap.gatePassInVO);
  //   } catch (error) {
  //     console.error('Error fetching gate passes:', error);
  //   }
  // };
  // const getAllBinLocationByWarehouse = async () => {
  //   try {
  //     const response = await apiCalls('get', `warehousemastercontroller/locationtype/warehouse?orgid=${orgId}&warehouse=${loginWarehouse}`);
  //     setBinTypeList(response.paramObjectsMap.Locationtype);
  //   } catch (error) {
  //     console.error('Error fetching gate passes:', error);
  //   }
  // };

  const getFillGridDetails = async (selectedGatePassId) => {
    try {
      const response = await apiCalls(
        'get',
        `inward/getGatePassInDetailsForPendingGRN?branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&gatePassDocId=${selectedGatePassId}&orgId=${orgId}`
      );
      console.log('THE GATE PASS IDS GRID DETAILS IS:', response);
      if (response.status === true) {
        const gridDetails = response.paramObjectsMap.gatePassInVO;
        console.log('THE PALLET DETAILS ARE:', gridDetails);

        setVasPickGridTableData(
          gridDetails.map((row) => ({
            // id: row.id,
            invDate: row.invoiceDate ? dayjs(row.invoiceDate).format('YYYY-MM-DD') : null,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const getAllPickBinType = async () => {
    try {
      const activeBinData = await getAllActiveLocationTypes(orgId);
      setPickBinTypeList(activeBinData);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  // const getAllVasPick = async () => {
  //   try {
  //     const response = await apiCalls(
  //       'get',
  //       `inward/getAllGrn?branch=CHENNAI&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}&warehouse=${loginWarehouse}`
  //     );
  //     setListViewData(response.paramObjectsMap.grnVO);
  //   } catch (error) {
  //     console.error('Error fetching GRN data:', error);
  //   }
  // };

  // const getVasPickById = async (row) => {
  //   console.log('THE SELECTED GRN ID IS:', row.original.id);
  //   setEditId(row.original.id);
  //   try {
  //     const response = await apiCalls('get', `inward/getGrnById?id=${row.original.id}`);
  //     console.log('API Response:', response);

  //     if (response.status === true) {
  //       setListView(false);
  //       const particularGrn = response.paramObjectsMap.Grn;
  //       setGatePassIdEdit(particularGrn.docId);

  //       setFormData({
  //         docId: particularGrn.docId,
  //         editDocDate: particularGrn.docdate,
  //         docDate: particularGrn.docdate,
  //         entrySlNo: particularGrn.entryNo,
  //         date: particularGrn.entryDate
  //       });
  //       getAllCarriers(particularGrn.modeOfShipment);
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         carrier: particularGrn.carrier.toUpperCase()
  //       }));
  //       setVasPickGridTableData(
  //         particularGrn.grnDetailsVO.map((row) => ({
  //           id: row.id,
  //           qrCode: row.qrCode,
  //           lr_Hawb_Hbl_No: row.lrNoHawbNo,
  //           invNo: row.invoiceNo,
  //           shipmentNo: row.shipmentNo
  //           // invDate: row.invoiceDate ? dayjs(row.invoiceDate).format('YYYY-MM-DD') : null,
  //         }))
  //       );
  //     } else {
  //       console.error('API Error:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;

    let errorMessage = '';

    switch (name) {
      case 'docCode':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
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
      //       gatePassDate: dayjs(selectedId.docDate).format('YYYY-MM-DD')
      //     }));
      //     getAllCarriers(selectedId.modeOfShipment);
      //   }
      // } else if (name === 'vas') {
      if (name === 'vas') {
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
      }

      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  // const handleDateChange = (field, date) => {
  //   const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null; // Updated format for consistency
  //   setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  // };

  const handleView = () => {
    setListView(!listView);
  };

  const handleClear = () => {
    setFormData({
      docId: '',
      docDate: dayjs(),
      pickBinType: '',
      stockState: '',
      status: '',
      totalOrderQty: '',
      totalPickedQty: ''
    });
    setFieldErrors({
      docId: '',
      docDate: '',
      pickBinType: '',
      stockState: '',
      status: '',
      totalOrderQty: '',
      totalPickedQty: ''
    });
    // getNewVasPickDocId();
    setEditId('');
    setVasPickGridTableData([
      {
        id: 1,
        partNo: '',
        partDesc: '',
        sku: '',
        bin: '',
        batchNo: '',
        batchDate: null,
        grnNo: '',
        grnDate: null,
        avlQty: '',
        pickQty: '',
        remainingQty: ''
      }
    ]);
    setVasPickGridTableErrors('');
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.grnDate) errors.grnDate = 'GRN Date is required';
    if (!formData.supplierShortName) errors.supplierShortName = 'Supplier Short Name is required';

    if (!formData.modeOfShipment) errors.modeOfShipment = 'Mode of Shipment is required';
    if (!formData.carrier) errors.carrier = 'Carrier is required';

    let vasPickGridTableDataValid = true;
    const newTableErrors = vasPickGridTableData.map((row) => {
      const rowErrors = {};
      if (!row.lr_Hawb_Hbl_No) {
        rowErrors.lr_Hawb_Hbl_No = 'Lr_Hawb_Hbl_No is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.invNo) {
        rowErrors.invNo = 'Invoice No is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.invQty) {
        rowErrors.invQty = 'Invoice QTY is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.grnQty) {
        rowErrors.grnQty = 'GRN QTY is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.palletQty) {
        rowErrors.palletQty = 'Pallet Qty is required';
        vasPickGridTableDataValid = false;
      }
      if (!row.noOfPallets) {
        rowErrors.noOfPallets = 'No of Pallets is required';
        vasPickGridTableDataValid = false;
      }
      return rowErrors;
    });
    setFieldErrors(errors);

    setVasPickGridTableErrors(newTableErrors);

    if (Object.keys(errors).length === 0 && vasPickGridTableDataValid) {
      setIsLoading(true);

      const gridVo = vasPickGridTableData.map((row) => ({
        invoiceDate: row.invDate ? dayjs(row.invDate).format('YYYY-MM-DD') : null,
        partNo: row.partNo,
        partDesc: row.partDesc,
        sku: row.sku
      }));
      const saveFormData = {
        ...(editId && { id: editId }),
        pickBinType: formData.pickBinType,
        stockState: formData.stockState,
        status: formData.status,
        orgId: orgId,
        createdBy: loginUserName,
        grnDetailsDTO: gridVo,
        branch: loginBranch,
        branchCode: loginBranchCode,
        client: loginClient,
        customer: loginCustomer,
        finYear: '2024',
        warehouse: loginWarehouse
      };
      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `inward/createUpdateGRN`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          showToast('success', editId ? 'VAS Pick Updated Successfully' : 'VAS Pick created successfully');
          // handleClear();
          // getAllGrns();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'VAS Pick creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'VAS Pick creation failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFullGrid = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
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
              //  toEdit={getGrnById}
            />
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
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.pickBinType}>
                  <InputLabel id="pickBinType-label">Pick Bin Type</InputLabel>
                  <Select
                    labelId="pickBinType-label"
                    label="Pick Bin Type"
                    value={formData.pickBinType}
                    onChange={handleInputChange}
                    name="pickBinType"
                  >
                    {pickBinTypeList?.map((row) => (
                      <MenuItem key={row.id} value={row.binType.toUpperCase()}>
                        {row.binType.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldErrors.pickBinType && <FormHelperText>{fieldErrors.pickBinType}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.stockState}>
                  <InputLabel id="stockState-label">
                    Stock State <span>&nbsp;*</span>
                  </InputLabel>
                  <Select
                    labelId="stockState-label"
                    label="Stock State"
                    value={formData.stockState}
                    onChange={handleInputChange}
                    name="stockState"
                    required
                  >
                    <MenuItem value="HOLD">HOLD</MenuItem>
                    <MenuItem value="HOLD">READY TO DISPATCH</MenuItem>
                  </Select>
                  {fieldErrors.stockState && <FormHelperText>{fieldErrors.stockState}</FormHelperText>}
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.status}>
                  <InputLabel id="status-label">
                    Status <span>&nbsp;*</span>
                  </InputLabel>
                  <Select labelId="status-label" label="Status" value={formData.status} onChange={handleInputChange} name="status" required>
                    <MenuItem value="EDIT">EDIT</MenuItem>
                    <MenuItem value="CONFIRM">CONFIRM</MenuItem>
                  </Select>
                  {fieldErrors.status && <FormHelperText>{fieldErrors.status}</FormHelperText>}
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
                  <Tab value={0} label="Details" />
                  <Tab value={1} label="Summary" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton
                          title="Add"
                          icon={AddIcon}
                          // onClick={handleAddRow}
                        />
                        <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={handleFullGrid} />
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
                                    Part No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Part Desc
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    SKU
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    Bin
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Batch Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    GRN No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    GRN Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Avl QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Pick QTY
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Remaining QTY
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {vasPickGridTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, vasPickGridTableData, setVasPickGridTableData)}
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
                                        className={vasPickGridTableErrors[index]?.qrCode ? 'error form-control' : 'form-control'}
                                      />
                                      {/* {vasPickGridTableErrors[index]?.qrCode && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {vasPickGridTableErrors[index].qrCode}
                                        </div>
                                      )} */}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.invDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setVasPickGridTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, invDate: value } : r))
                                          );
                                          setVasPickGridTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], invDate: !value ? 'Invoice Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={vasPickGridTableErrors[index]?.invDate ? 'error form-control' : 'form-control'}
                                      />
                                      {vasPickGridTableErrors[index]?.invDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {vasPickGridTableErrors[index].invDate}
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
                          label="Total Order QTY"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totalOrderQty"
                          value={formData.totalOrderQty}
                          onChange={handleInputChange}
                          error={!!fieldErrors.totalOrderQty}
                          helperText={fieldErrors.totalOrderQty}
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <TextField
                          label="Total Picked QTY"
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="totalPickedQty"
                          value={formData.totalPickedQty}
                          onChange={handleInputChange}
                          error={!!fieldErrors.totalPickedQty}
                          helperText={fieldErrors.totalPickedQty}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Box>
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
                              Action
                            </th>
                            <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                              S.No
                            </th>
                            <th className="px-2 py-2 text-white text-center">Part No *</th>
                            <th className="px-2 py-2 text-white text-center">Part Desc</th>
                            <th className="px-2 py-2 text-white text-center">Batch No</th>
                            <th className="px-2 py-2 text-white text-center">Batch Date</th>
                            <th className="px-2 py-2 text-white text-center">Pallet No</th>
                            <th className="px-2 py-2 text-white text-center">SQTY</th>
                            <th className="px-2 py-2 text-white text-center">Cell Type</th>
                            <th className="px-2 py-2 text-white text-center">Core</th>
                            <th className="px-2 py-2 text-white text-center">SKU</th>
                            <th className="px-2 py-2 text-white text-center">Exp Date</th>
                            <th className="px-2 py-2 text-white text-center">Pick QTY</th>
                            <th className="px-2 py-2 text-white text-center">Avl QTY</th>
                            <th className="px-2 py-2 text-white text-center">Run QTY</th>
                            <th className="px-2 py-2 text-white text-center">Qc Flag</th>
                            <th className="px-2 py-2 text-white text-center">Stock Date</th>
                            <th className="px-2 py-2 text-white text-center">GRN No</th>
                            <th className="px-2 py-2 text-white text-center">GRN Date</th>
                            <th className="px-2 py-2 text-white text-center">Lot No</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modalTableData.map((row, index) => (
                            <tr key={row.id}>
                              <td className="border p-0 text-center">
                                <Checkbox {...label} />
                              </td>
                              <td className="text-center">
                                <div className="pt-1">{index + 1}</div>
                              </td>
                              <td className="border p-0"> {row.partNo}</td>
                              <td className="border p-0"> {row.partDesc}</td>
                              <td className="border p-0"> {row.batchNo}</td>
                              <td className="border p-0"> {row.batchDate}</td>
                              <td className="border p-0"> {row.palletNo}</td>
                              <td className="border p-0"> {row.sQty}</td>
                              <td className="border p-0"> {row.cellType}</td>
                              <td className="border p-0"> {row.core}</td>
                              <td className="border p-0"> {row.sku}</td>
                              <td className="border p-0"> {row.expDate}</td>
                              <td className="border p-0"> {row.pickQty}</td>
                              <td className="border p-0"> {row.avlQty}</td>
                              <td className="border p-0"> {row.runQty}</td>
                              <td className="border p-0"> {row.qcFlag}</td>
                              <td className="border p-0"> {row.stockDate}</td>
                              <td className="border p-0"> {row.grnNo}</td>
                              <td className="border p-0"> {row.grnDate}</td>
                              <td className="border p-0"> {row.lotNo}</td>
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
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default VasPick;
