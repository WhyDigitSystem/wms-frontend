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
import GridOnIcon from '@mui/icons-material/GridOn';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import apiCalls from 'apicall';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { getAllActiveCarrier, getAllActiveCpartNo } from 'utils/CommonFunctions';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export const CodeConversion = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [cPartNoList, setCPartNoList] = useState([]);
  const [cPalletList, setCPalletList] = useState([]);
  const [partNoList, setPartNoList] = useState([]);
  const [grnNoList, setGrnNoList] = useState([]);
  const [locationTypeList, setLocationTypeList] = useState([]);
  const [batchNoList, setBatchNoList] = useState([]);
  const [palletList, setPalletList] = useState([]);
  const [avgQty, setAvgQty] = useState([]);
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [cbranch, setCbranch] = useState(localStorage.getItem('branchCode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [branch, setBranch] = useState(localStorage.getItem('branch'));
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));
  const [warehouse, setWarehouse] = useState(localStorage.getItem('warehouse'));
  const [finYear, setFinYear] = useState('2024');
  const [codeConversionDocId, setCodeConversionDocId] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    docdate: dayjs()
  });
  const [value, setValue] = useState(0);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      partNo: '',
      partDescription: '',
      rowGrnNoList: [],
      grnNo: '',
      sku: '',
      rowBinTypeList: [],
      binType: '',
      batchNo: '',
      lotNo: '',
      bin: '',
      qty: '',
      actualQty: '',
      rate: '',
      convertQty: '',
      crate: '',
      cpartNo: '',
      cpartDesc: '',
      csku: '',
      cbatchNo: '',
      clotNo: '',
      cbin: '',
      remarks: ''
    };
    setCodeConversionDetailsTable([...codeConversionDetailsTable, newRow]);
    setCodeConversionDetailsError([
      ...codeConversionDetailsError,
      {
        partNo: '',
        partDescription: '',
        grnNo: '',
        sku: '',
        binType: '',
        batchNo: '',
        lotNo: '',
        bin: '',
        qty: '',
        actualQty: '',
        rate: '',
        convertQty: '',
        crate: '',
        cpartNo: '',
        cpartDesc: '',
        csku: '',
        cbatchNo: '',
        clotNo: '',
        cbin: '',
        remarks: ''
      }
    ]);
  };

  const [codeConversionDetailsError, setCodeConversionDetailsError] = useState([
    {
      partNo: '',
      partDescription: '',
      grnNo: '',
      sku: '',
      binType: '',
      batchNo: '',
      lotNo: '',
      bin: '',
      qty: '',
      actualQty: '',
      rate: '',
      convertQty: '',
      crate: '',
      cpartNo: '',
      cpartDesc: '',
      csku: '',
      cbatchNo: '',
      clotNo: '',
      cbin: '',
      remarks: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docdate: new Date()
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
  const [codeConversionDetailsTable, setCodeConversionDetailsTable] = useState([
    // {
    //   id: 1,
    //   partNo: '',
    //   partDescription: '',
    //   grnNo: '',
    //   sku: '',
    //   binType: '',
    //   batchNo: '',
    //   lotNo: '',
    //   bin: '',
    //   qty: '',
    //   actualQty: '',
    //   rate: '',
    //   convertQty: '',
    //   crate: '',
    //   cpartNo: '',
    //   cpartDesc: '',
    //   csku: '',
    //   cbatchNo: '',
    //   clotNo: '',
    //   cbin: '',
    //   remarks: ''
    // }
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getCodeConversionDocId();
    getAllPartNo();
    getAllCPartNo();
    getAllcPallet();
  }, []);

  const getCodeConversionDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getCodeConversionDocId?branch=${branch}&branchCode=${cbranch}&client=${client}&finYear=${finYear}&orgId=${orgId}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setCodeConversionDocId(response.paramObjectsMap.CodeConversionDocId);
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
        `codeconversion/getPartNoAndPartDescFromStockForCodeConversion?branchCode=${cbranch}&client=${client}&orgId=${orgId}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setPartNoList(response.paramObjectsMap.codeConversionVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllGrnNo = async (partNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getGrnNoAndGrnDateFromStockForCodeConversion?branchCode=${cbranch}&client=${client}&orgId=${orgId}&partNo=${partNo}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      // if (response.status === true) {
      //   setGrnNoList(response.paramObjectsMap.codeConversionVO);
      // } else {
      //   console.error('API Error:', response);
      // }
      if (response.status === true) {
        setCodeConversionDetailsTable((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowGrnNoList: response.paramObjectsMap.codeConversionVO
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGrnNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedGrnNo = row.rowGrnNoList.find((row) => row.grnNo === value);
    setCodeConversionDetailsTable((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              grnNo: selectedGrnNo.grnNo
              // grnDate: selectedGrnNo ? selectedGrnNo.grnDate : ''
            }
          : r
      )
    );
    setCodeConversionDetailsError((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getAllLocationType(value, row.partNo, row);
    // getBatchNo(row.partNo, value, row);
  };
  const handleBinTypeChange = (row, index, event) => {
    const value = event.target.value;
    const selectedBinType = row.rowBinTypeList.find((row) => row.binType === value);
    setCodeConversionDetailsTable((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              binType: selectedBinType.binType
              // grnDate: selectedGrnNo ? selectedGrnNo.grnDate : ''
            }
          : r
      )
    );
    setCodeConversionDetailsError((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getAllBatchNo(value, row.grnNo, row.partNo);
    // getAllLocationType(value, row.partNo, row);
    // getBatchNo(row.partNo, value, row);
  };

  const getAllLocationType = async (grnNo, partNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getBinTypeFromStockForCodeConversion?branchCode=${cbranch}&client=${client}&grnNo=${grnNo}&orgId=${orgId}&partNo=${partNo}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      // if (response.status === true) {
      //   setLocationTypeList(response.paramObjectsMap.codeConversionVO);
      // } else {
      //   console.error('API Error:', response);
      // }
      if (response.status === true) {
        setCodeConversionDetailsTable((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowBinTypeList: response.paramObjectsMap.codeConversionVO
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllBatchNo = async (binType, grnNo, partNo) => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getBatchNoFromStockForCodeConversion?binType=${binType}&branchCode=${cbranch}&client=${client}&grnNo=${grnNo}&orgId=${orgId}&partNo=${partNo}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setBatchNoList(response.paramObjectsMap.codeConversionVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllPallet = async (batchNo, binType, grnNo, partNo) => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getBinFromStockForCodeConversion?batchNo=${batchNo}&binType=${binType}&branchCode=${cbranch}&client=${client}&grnNo=${grnNo}&orgId=${orgId}&partNo=${partNo}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setPalletList(response.paramObjectsMap.codeConversionVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllCPartNo = async () => {
    try {
      const cPartData = await getAllActiveCpartNo(cbranch, client, orgId);
      console.log('Processed Data:', cPartData); // Log the processed data
      if (cPartData && cPartData.length > 0) {
        setCPartNoList(cPartData);
      } else {
        console.warn('No suppliers found');
      }
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const getAllcPallet = async () => {
    try {
      const response = await apiCalls(
        'get',
        `vasputaway/getToBinDetailsVasPutaway?branchCode=${cbranch}&client=${client}&orgId=${orgId}&warehouse=${warehouse}`
      );

      console.log('API Response:', response);

      if (response.status === true) {
        setCPalletList(response.paramObjectsMap.ToBin);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTableQty = async (batchNo, binType, grnNo, partNo, bin) => {
    try {
      const url = `codeconversion/getAvlQtyCodeConversion?batchNo=${batchNo}&bin=${bin}&binType=${binType}&branch=${branch}&branchCode=${cbranch}&client=${client}&grnNo=${grnNo}&orgId=${orgId}&partNo=${partNo}&warehouse=${warehouse}`;

      const response = await apiCalls('get', url);

      console.log('API Response:', response);

      if (response.status === true) {
        const avgQty = response.paramObjectsMap.AvgQty;
        setAvgQty(avgQty); // Set the avgQty state here
        return avgQty;
      } else {
        console.error('API Error:', response);
        setAvgQty(''); // Clear the avgQty state on error
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAvgQty(''); // Clear the avgQty state on exception
      return null;
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
        setCodeConversionDetailsTable(
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

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //     setFormData({
  //       ...formData,
  //       [name]: value
  //     });
  //   }
  // };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  const handleDeleteRow = (id) => {
    setCodeConversionDetailsTable(codeConversionDetailsTable.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === codeConversionDetailsTable[codeConversionDetailsTable.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleClear = () => {
    setCodeConversionDocId('');
    setFormData({
      docdate: dayjs()
    });
    setCodeConversionDetailsTable([
      {
        partNo: '',
        partDescription: '',
        grnNo: '',
        sku: '',
        binType: '',
        batchNo: '',
        lotNo: '',
        bin: '',
        qty: '',
        actualQty: '',
        rate: '',
        convertQty: '',
        crate: '',
        cpartNo: '',
        cpartDesc: '',
        csku: '',
        cbatchNo: '',
        clotNo: '',
        cbin: '',
        remarks: ''
      }
    ]);
    setCodeConversionDetailsError('');
    setFieldErrors({
      docdate: new Date()
    });
    getCodeConversionDocId();
  };

  const handleSave = async () => {
    const errors = {};

    let codeConversionDetailsTableValid = true;
    const newTableErrors = codeConversionDetailsTable.map((row) => {
      const rowErrors = {};
      if (!row.partNo) {
        rowErrors.partNo = 'Part No is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.partDescription) {
        rowErrors.partDescription = 'Part Description is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.grnNo) {
        rowErrors.grnNo = 'Grn No is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.sku) {
        rowErrors.sku = 'Sku is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.binType) {
        rowErrors.binType = 'Bin Type is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.batchNo) {
        rowErrors.batchNo = 'Batch No is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.actualQty) {
        rowErrors.actualQty = 'Actual Qty is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.rate) {
        rowErrors.rate = 'Rate is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.convertQty) {
        rowErrors.convertQty = 'Convert Qty is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.crate) {
        rowErrors.crate = 'CRate is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.cpartNo) {
        rowErrors.cpartNo = 'CPartNo is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.csku) {
        rowErrors.csku = 'CSku is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.cbatchNo) {
        rowErrors.cbatchNo = 'CBatchNo is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.clotNo) {
        rowErrors.clotNo = 'CLotNo is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.cbin) {
        rowErrors.cbin = 'CBin is required';
        codeConversionDetailsTableValid = false;
      }
      if (!row.remarks) {
        rowErrors.remarks = 'Remarks is required';
        codeConversionDetailsTableValid = false;
      }

      return rowErrors;
    });

    setCodeConversionDetailsError(newTableErrors);

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0 && codeConversionDetailsTableValid) {
      setIsLoading(true);
      const lrNoDetailsVO = codeConversionDetailsTable.map((row) => ({
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
          getCodeConversionDocId();
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
      docdate: null
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

  // const handleSubmitSelectedRows = async () => {
  //   try {
  //     const selectedData = selectedRows.map((index) => modalTableData[index]);

  //     // Adding selected data to the existing table data
  //     setCodeConversionDetailsTable([...codeConversionDetailsTable, ...selectedData]);

  //     console.log('Data selected:', selectedData);

  //     setSelectedRows([]);
  //     setSelectAll(false);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error('Error processing selected data:', error);
  //   }
  // };

  const handleSubmitSelectedRows = async () => {
    try {
      const selectedData = selectedRows.map((index) => {
        const selectedRow = modalTableData[index];
        const existingRow = codeConversionDetailsTable[index] || {}; // Existing row data if available

        return {
          id: selectedRow.id,
          partNo: selectedRow.partNo || existingRow.partNo,
          partDescription: selectedRow.partDesc || existingRow.partDescription,
          grnNo: selectedRow.grnNo || existingRow.grnNo, // Use the API value if it exists, else fallback to existing
          sku: selectedRow.sku || existingRow.sku,
          binType: selectedRow.binType || existingRow.binType, // Use the API value if it exists, else fallback to existing
          batchNo: selectedRow.batchNo || existingRow.batchNo, // Use the API value if it exists, else fallback to existing
          bin: selectedRow.bin || existingRow.bin // Use the API value if it exists, else fallback to existing
        };
      });

      // Add the updated data to the existing table
      setCodeConversionDetailsTable((prevTableData) => [...prevTableData, ...selectedData]);

      setSelectedRows([]);
      setSelectAll(false);
      handleCloseModal();
    } catch (error) {
      console.error('Error processing selected data:', error);
    }
  };

  const [modalTableData, setModalTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDescription: '',
      grnNo: '',
      sku: '',
      binType: '',
      batchNo: '',
      bin: ''
    }
  ]);

  const getFillGridDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `codeconversion/getAllFillGridFromStockForCodeConversion?branchCode=${cbranch}&client=${client}&orgId=${orgId}&warehouse=${warehouse}`
      );
      console.log('THE VAS PICK GRID DETAILS IS:', response);
      if (response.status === true) {
        const gridDetails = response.paramObjectsMap.codeConversionVO;
        console.log('THE MODAL TABLE DATA FROM API ARE:', gridDetails);

        setModalTableData(
          gridDetails.map((row) => ({
            id: row.id,
            partNo: row.partNo,
            partDesc: row.partDesc,
            grnNo: row.grnNo,
            sku: row.sku,
            binType: row.binType,
            batchNo: row.batchNo,
            bin: row.bin
          }))
        );
        setCodeConversionDetailsTable([]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleFullGrid = () => {
    getFillGridDetails();
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
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
                  name="codeConversionDocId"
                  value={codeConversionDocId}
                  // onChange={handleInputChange}
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
                        {/* <ActionButton title="Clear" icon={ClearIcon} onClick={() => setDetailTableData([])} /> */}
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
                                  <th className="px-2 py-2 text-white text-center">Part No</th>
                                  <th className="px-2 py-2 text-white text-center">Part Description</th>
                                  <th className="px-2 py-2 text-white text-center">GRN No</th>
                                  <th className="px-2 py-2 text-white text-center">SKU</th>
                                  <th className="px-2 py-2 text-white text-center">Location Type</th>
                                  <th className="px-2 py-2 text-white text-center">Batch No</th>
                                  <th className="px-2 py-2 text-white text-center">Lot No</th>
                                  <th className="px-2 py-2 text-white text-center">Pallet</th>
                                  <th className="px-2 py-2 text-white text-center">QTY</th>
                                  <th className="px-2 py-2 text-white text-center">Actual QTY</th>
                                  <th className="px-2 py-2 text-white text-center">Rate</th>
                                  <th className="px-2 py-2 text-white text-center">Convert QTY</th>
                                  <th className="px-2 py-2 text-white text-center">C Rate</th>
                                  <th className="px-2 py-2 text-white text-center">C Part No</th>
                                  <th className="px-2 py-2 text-white text-center">C Part Desc</th>
                                  <th className="px-2 py-2 text-white text-center">C SKU</th>
                                  <th className="px-2 py-2 text-white text-center">C Batchno</th>
                                  <th className="px-2 py-2 text-white text-center">C Lotno</th>
                                  <th className="px-2 py-2 text-white text-center">C Pallet</th>
                                  <th className="px-2 py-2 text-white text-center">Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {codeConversionDetailsTable.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '100px' }}
                                        onChange={async (e) => {
                                          const value = e.target.value;

                                          // Find the selected part's details
                                          const selectedPart = partNoList.find((part) => part.partNo === value);

                                          // Update the table row with selected part's details
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) =>
                                              r.id === row.id
                                                ? {
                                                    ...r,
                                                    partNo: value,
                                                    partDescription: selectedPart ? selectedPart.partDesc : '',
                                                    sku: selectedPart ? selectedPart.sku : ''
                                                  }
                                                : r
                                            )
                                          );

                                          // Update error state
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partNo: !value ? 'Part No is required' : ''
                                            };
                                            return newErrors;
                                          });

                                          // Call the getAllGrnNo API with the selected partNo
                                          if (value) {
                                            await getAllGrnNo(value, row);
                                          }
                                        }}
                                        className={codeConversionDetailsError[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {partNoList && partNoList.length > 0 ? (
                                          partNoList.map((part) => (
                                            <option key={part.id} value={part.partNo}>
                                              {part.partNo}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="">Loading...</option>
                                        )}
                                      </select>
                                      {codeConversionDetailsError[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].partNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.partDescription}
                                        disabled
                                        className="form-control"
                                        title={row.partDescription}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.grnNo}
                                        style={{ width: '100px' }}
                                        // onChange={async (e) => {
                                        //   const grnNo = e.target.value;
                                        //   const partNo = row.partNo; // Assuming partNo is already selected and available in the row
                                        //   const selectedGrnNo = row.rowGrnNoList.find((row) => row.grnNo === grnNo);

                                        //   // Update the table row with selected grnNo
                                        //   setCodeConversionDetailsTable((prev) =>
                                        //     prev.map((r) =>
                                        //       r.id === row.id
                                        //         ? {
                                        //             ...r,
                                        //             grnNo: selectedGrnNo.grnNo
                                        //           }
                                        //         : r
                                        //     )
                                        //   );

                                        //   // Call the getAllLocationType API with the selected grnNo and partNo
                                        //   if (grnNo && partNo) {
                                        //     await getAllLocationType(grnNo, partNo, row);
                                        //   }
                                        // }}
                                        onChange={(e) => handleGrnNoChange(row, index, e)}
                                        className={codeConversionDetailsError[index]?.grnNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select GRN No</option>
                                        {Array.isArray(row.rowGrnNoList) &&
                                          row.rowGrnNoList.map(
                                            (g, idx) =>
                                              g &&
                                              g.grnNo && (
                                                <option key={g.grnNo} value={g.grnNo}>
                                                  {g.grnNo}
                                                </option>
                                              )
                                          )}
                                      </select>
                                      {codeConversionDetailsError[index]?.grnNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].grnNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.sku}
                                        disabled
                                        className="form-control"
                                        title={row.sku}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.binType}
                                        style={{ width: '100px' }}
                                        // onChange={async (e) => {
                                        //   const value = e.target.value;

                                        //   // Update the table row with the selected binType
                                        //   setCodeConversionDetailsTable((prev) =>
                                        //     prev.map((r) =>
                                        //       r.id === row.id
                                        //         ? {
                                        //             ...r,
                                        //             binType: value
                                        //           }
                                        //         : r
                                        //     )
                                        //   );

                                        //   // Update error state for binType
                                        //   setCodeConversionDetailsError((prev) => {
                                        //     const newErrors = [...prev];
                                        //     newErrors[index] = {
                                        //       ...newErrors[index],
                                        //       binType: !value ? 'Bin Type is required' : ''
                                        //     };
                                        //     return newErrors;
                                        //   });

                                        //   // Call the getAllBatchNo API with the selected binType, grnNo, and partNo
                                        //   const partNo = row.partNo; // Assuming partNo is already selected and available in the row
                                        //   const grnNo = row.grnNo; // Assuming grnNo is already selected and available in the row

                                        //   if (value && grnNo && partNo) {
                                        //     await getAllBatchNo(value, grnNo, partNo);
                                        //   }
                                        // }}
                                        onChange={(e) => handleBinTypeChange(row, index, e)}
                                        className={codeConversionDetailsError[index]?.binType ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {/* {locationTypeList && locationTypeList.length > 0 ? (
                                          locationTypeList.map((location) => (
                                            <option key={location.id} value={location.binType}>
                                              {location.binType}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="">Loading...</option>
                                        )} */}
                                        {Array.isArray(row.rowBinTypeList) &&
                                          row.rowBinTypeList.map(
                                            (bin, idx) =>
                                              bin &&
                                              bin.binType && (
                                                <option key={bin.binType} value={bin.binType}>
                                                  {bin.binType}
                                                </option>
                                              )
                                          )}
                                      </select>
                                      {codeConversionDetailsError[index]?.binType && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].binType}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.batchNo}
                                        style={{ width: '100px' }}
                                        onChange={async (e) => {
                                          const value = e.target.value;

                                          // Find the selected batch details from batchNoList
                                          const selectedBatch = batchNoList.find((batch) => batch.batchNo === value);

                                          // Update the table row with the selected batchNo and corresponding lotNo
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) =>
                                              r.id === row.id
                                                ? {
                                                    ...r,
                                                    batchNo: value,
                                                    lotNo: selectedBatch ? selectedBatch.lotNo : ''
                                                  }
                                                : r
                                            )
                                          );

                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              batchNo: !value ? 'Batch No is required' : ''
                                            };
                                            return newErrors;
                                          });

                                          const binType = row.binType;
                                          const partNo = row.partNo;
                                          const grnNo = row.grnNo;

                                          if (value && binType && grnNo && partNo) {
                                            await getAllPallet(value, binType, grnNo, partNo);
                                          }
                                        }}
                                        className={codeConversionDetailsError[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {batchNoList && batchNoList.length > 0 ? (
                                          batchNoList.map((batch) => (
                                            <option key={batch.id} value={batch.batchNo}>
                                              {batch.batchNo}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="">Loading...</option>
                                        )}
                                      </select>
                                      {codeConversionDetailsError[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].batchNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.lotNo}
                                        disabled
                                        className="form-control"
                                        title={row.lotNo}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.bin}
                                        style={{ width: '100px' }}
                                        onChange={async (e) => {
                                          const value = e.target.value;

                                          // Update the table row with the selected bin
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) =>
                                              r.id === row.id
                                                ? {
                                                    ...r,
                                                    bin: value
                                                  }
                                                : r
                                            )
                                          );

                                          // Update error state for bin
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              bin: !value ? 'Bin is required' : ''
                                            };
                                            return newErrors;
                                          });

                                          const { batchNo, binType, grnNo, partNo } = row;

                                          // Call the getTableQty API with the selected bin, batchNo, binType, grnNo, and partNo
                                          if (value && batchNo && binType && grnNo && partNo) {
                                            await getTableQty(batchNo, binType, grnNo, partNo, value);
                                            // The avgQty state will be automatically updated by the getTableQty function
                                          }
                                        }}
                                        className={codeConversionDetailsError[index]?.bin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {palletList.map((pallet) => (
                                          <option key={pallet.id} value={pallet.bin}>
                                            {pallet.bin}
                                          </option>
                                        ))}
                                      </select>
                                      {codeConversionDetailsError[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].bin}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={avgQty || ''}
                                        disabled
                                        className="form-control"
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.actualQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, actualQty: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], actualQty: !value ? 'Actual Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.actualQty ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.actualQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].actualQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.rate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, rate: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], rate: !value ? 'Rate is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.rate ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.rate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].rate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.convertQty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, convertQty: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], convertQty: !value ? 'Convert Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.convertQty ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.convertQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].convertQty}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.crate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, crate: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], crate: !value ? 'C Rate is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.crate ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.crate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].crate}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.cpartNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          // Find the selected cPart in the list
                                          const selectedCPart = cPartNoList.find((cpart) => cpart.partno === value);

                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) =>
                                              r.id === row.id
                                                ? {
                                                    ...r,
                                                    cpartNo: value,
                                                    cpartDesc: selectedCPart ? selectedCPart.partDesc : '',
                                                    csku: selectedCPart ? selectedCPart.sku : ''
                                                  }
                                                : r
                                            )
                                          );

                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              cpartNo: !value ? 'C Part No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={codeConversionDetailsError[index]?.cpartNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {cPartNoList.map((cpart) => (
                                          <option key={cpart.id} value={cpart.partno}>
                                            {cpart.partno}
                                          </option>
                                        ))}
                                      </select>
                                      {codeConversionDetailsError[index]?.cpartNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].cpartNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.cpartDesc}
                                        disabled
                                        className="form-control"
                                        title={row.cpartDesc}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.csku}
                                        disabled
                                        className="form-control"
                                        title={row.csku}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.cbatchNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, cbatchNo: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], cbatchNo: !value ? 'C Batch No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.cbatchNo ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.cbatchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].cbatchNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        style={{ width: '100px' }}
                                        value={row.clotNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, clotNo: value.toUpperCase() } : r))
                                          );
                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], clotNo: !value ? 'C Lot No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, row)}
                                        className={codeConversionDetailsError[index]?.clotNo ? 'error form-control' : 'form-control'}
                                      />
                                      {codeConversionDetailsError[index]?.clotNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].clotNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.cbin}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, cbin: value } : r))
                                          );

                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              cbin: !value ? 'C Bin is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={codeConversionDetailsError[index]?.cbin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        {cPalletList.map((cPallet) => (
                                          <option key={cPallet.id} value={cPallet.bin}>
                                            {cPallet.bin}
                                          </option>
                                        ))}
                                      </select>
                                      {codeConversionDetailsError[index]?.cbin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].cbin}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.remarks}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          setCodeConversionDetailsTable((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, remarks: value } : r))
                                          );

                                          setCodeConversionDetailsError((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              remarks: !value ? 'Remarks is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={codeConversionDetailsError[index]?.remarks ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Option</option>
                                        <option value="Promotion">Promotion</option>
                                        <option value="Offer">Offer</option>
                                      </select>
                                      {codeConversionDetailsError[index]?.remarks && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {codeConversionDetailsError[index].remarks}
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
                                Part No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Part Description
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                GRN No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                SKU
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Bin Type
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Batch No
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Bin
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
                                  {row.partNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.partDesc}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.grnNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.sku}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.binType}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.batchNo}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.bin}
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
      <ToastContainer />
    </>
  );
};
export default CodeConversion;
