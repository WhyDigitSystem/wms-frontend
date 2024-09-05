import ClearIcon from '@mui/icons-material/Clear';
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
import { getAllActiveLocationTypes, getAllActivePartDetails } from 'utils/CommonFunctions';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
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

export const CycleCount = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [viewId, setViewId] = useState('');
  const [fromBinList, setFromBinList] = useState([]);
  const [partNoList, setPartNoList] = useState([]);
  const [grnNoList, setGrnNoList] = useState([]);
  const [batchNoList, setBatchNoList] = useState([]);
  const [binList, setBinList] = useState([]);
  const [fromQtyList, setFromQtyList] = useState([]);
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
    docDate: dayjs()
  });
  const [value, setValue] = useState(0);
  const [detailTableData, setDetailTableData] = useState([]);

  const [detailTableErrors, setDetailTableErrors] = useState([]);
  const [modalTableData, setModalTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      sku: '',
      grnNo: '',
      grnDate: '',
      batchNo: '',
      batchDate: '',
      expDate: '',
      bin: '',
      binType: '',
      binClass: '',
      cellType: '',
      core: '',
      // lotNo: '',
      qcFlag: '',
      status: '',
      avlQty: '',
      actualQty: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: null
  });
  const listViewColumns = [
    { accessorKey: 'docId', header: 'Cycle Count ID', size: 140 },
    { accessorKey: 'docDate', header: 'Cycle Count Date', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getNewCycleCountDocId();
    getFromBin();
    getAllCycleCount();
    getPartNo();
  }, []);

  const getNewCycleCountDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getCycleCountInDocId?branch=${loginBranch}&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}`
      );
      console.log('THE NEW DOCID IS:', response);
      if (response.status === true) {
        setFormData((prevData) => ({
          ...prevData,
          docId: response.paramObjectsMap.CycleCountInDocId
        }));
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getFillGridDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getCycleCountGridDetails?branchCode=${loginBranchCode}&client=${loginClient}&orgId=${orgId}&warehouse=${loginWarehouse}`
      );
      console.log('THE VAS PICK GRID DETAILS IS:', response);
      if (response.status === true) {
        const gridDetails = response.paramObjectsMap.cycleCountGrid;
        console.log('THE MODAL TABLE DATA FROM API ARE:', gridDetails);

        setModalTableData(
          gridDetails.map((row) => ({
            id: row.id,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            grnNo: row.grnNo,
            grnDate: row.grnDate,
            batchNo: row.batch,
            batchDate: row.batchDate,
            expDate: row.expdate,
            bin: row.bin,
            binType: row.bintype,
            binClass: row.binclass,
            cellType: row.cellType,
            core: row.core,
            // lotNo: row.lotNo,
            qcFlag: row.qcflag,
            status: row.status,
            avlQty: row.avlQty
          }))
        );
        setDetailTableData([]);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getAllCycleCount = async () => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getAllCycleCount?branch=${loginBranch}&branchCode=${loginBranchCode}&client=${loginClient}&finYear=${loginFinYear}&orgId=${orgId}&warehouse=${loginWarehouse}`
      );
      console.log('THE WAREHOUSES IS:', response);
      if (response.status === true) {
        setListViewData(response.paramObjectsMap.cycleCountVO);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getFromBin = async (selectedTransferFromFlag) => {
    try {
      const response = await apiCalls(
        'get',
        `stockRestate/getFromBinDetailsForStockRestate?branchCode=${loginBranchCode}&client=${loginClient}&orgId=${orgId}&tranferFromFlag=${selectedTransferFromFlag}&warehouse=CHENNAI%20WAREHOUSE`
      );
      console.log('THE FROM BIN LIST IS:', response);
      if (response.status === true) {
        setFromBinList(response.paramObjectsMap.fromBinDetails);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getPartNo = async () => {
    try {
      const partData = await getAllActivePartDetails(loginBranchCode, loginClient, orgId);
      console.log('THE PART NO LIST IS:', partData);
      setPartNoList(partData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getGrnNo = async (selectedRowPartNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getGrnNoByCycleCount?branchCode=${loginBranchCode}&client=${loginClient}&orgId=${orgId}&partNo=${selectedRowPartNo}&warehouse=${loginWarehouse}`
      );
      console.log('THE FROM GRN NO LIST IS:', response);
      if (response.status === true) {
        setDetailTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowGrnNoList: response.paramObjectsMap.cycleCountGrnNo
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getBatchNo = async (selectedPartNo, selectedGrnNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getBatchByCycleCount?branchCode=${loginBranchCode}&client=${loginClient}&grnNO=${selectedGrnNo}&orgId=${orgId}&partNo=${selectedPartNo}&warehouse=${loginWarehouse}`
      );
      console.log('THE FROM BIN LIST IS:', response);
      if (response.status === true) {
        setDetailTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowBatchNoList: response.paramObjectsMap.cycleCountBatch
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getBinDetails = async (selectedBatchNo, selectedGrnNo, selectedPartNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getBinDetailsByCycleCount?batch=${selectedBatchNo}&branchCode=${loginBranchCode}&client=${loginClient}&grnNO=${selectedGrnNo}&orgId=${orgId}&partNo=${selectedPartNo}&warehouse=${loginWarehouse}`
      );
      console.log('THE TO BIN LIST ARE:', response);
      if (response.status === true) {
        setDetailTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowBinList: response.paramObjectsMap.cycleBinDetails
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const getAvlQty = async (selectedBatchNo, selectedBin, selectedGrnNo, selectedPartNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `cycleCount/getAvlQtyByCycleCount?batch=${selectedBatchNo}&bin=${selectedBin}&branchCode=${loginBranchCode}&client=${loginClient}&grnNO=${selectedGrnNo}&orgId=${orgId}&partNo=${selectedPartNo}&warehouse=${loginWarehouse}`
      );
      console.log('THE ROW. TO BIN IS IS:', selectedPartNo);

      setDetailTableData((prevData) =>
        prevData.map((r) =>
          r.id === row.id
            ? {
                ...r,
                avlQty: response.paramObjectsMap.avlQty[0]?.avlQty || r.avlQty,
                status: response.paramObjectsMap.avlQty[0]?.status || r.status
              }
            : r
        )
      );
    } catch (error) {
      console.error('Error fetching locationType data:', error);
    }
  };

  const getCycleCountById = async (row) => {
    console.log('THE SELECTED STOCK RESTATE  ID IS:', row.original.id);

    try {
      const response = await apiCalls('get', `cycleCount/getCycleCountById?id=${row.original.id}`);
      console.log('THE STOCK RESTATE DATA IS:', response);

      if (response.status === true) {
        setViewId(row.original.id);
        const particularCycleCount = response.paramObjectsMap.cycleCountVO;
        setFormData({
          docId: particularCycleCount.docId,
          docDate: particularCycleCount.docDate
        });

        setDetailTableData(
          particularCycleCount.cycleCountDetailsVO.map((row) => ({
            id: row.id,
            partNo: row.partNo,
            partDesc: row.partDescription,
            sku: row.sku,
            grnNo: row.grnNo,
            grnDate: row.grnDate,
            batchNo: row.batchNo,
            batchDate: row.batchDate,
            expDate: row.expDate,
            bin: row.bin,
            binType: row.binType,
            binClass: row.binClass,
            cellType: row.cellType,
            core: row.core,
            // lotNo: row.lotNo,
            qcFlag: row.qcFlag,
            status: row.status,
            avlQty: row.avlQty,
            actualQty: row.actualQty
          }))
        );
        setListView(false);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      let updatedData = { ...formData, [name]: value.toUpperCase() };

      if (name === 'transferFrom') {
        updatedData.transferFromFlag = value === 'DEFECTIVE' ? 'D' : value === 'HOLD' ? 'H' : value === 'RELEASE' ? 'R' : '';
        setFromBinList([]);
        getFromBin(updatedData.transferFromFlag);
        // getToBinDetails(updatedData.transferFromFlag);
      } else if (name === 'transferTo') {
        updatedData.transferToFlag = value === 'DEFECTIVE' ? 'D' : value === 'HOLD' ? 'H' : value === 'RELEASE' ? 'R' : '';
      }

      setFormData(updatedData);
      setFieldErrors({ ...fieldErrors, [name]: '' });

      // Log the updated flag for debugging
      if (name === 'transferFrom') {
        console.log('THE TRANSFER FROM FLAG IS:', updatedData.transferFromFlag);
      } else if (name === 'transferTo') {
        console.log('THE TRANSFER TO FLAG IS:', updatedData.transferToFlag);
      }
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
      partNo: '',
      partDesc: '',
      sku: '',
      rowGrnNoList: [],
      rowBatchNoList: [],
      rowBinList: [],
      grnNo: '',
      grnDate: '',
      batchNo: '',
      batchDate: '',
      expDate: '',
      bin: '',
      binType: '',
      binClass: '',
      cellType: '',
      core: '',
      // lotNo: '',
      qcFlag: '',
      status: '',
      avlQty: '',
      actualQty: ''
    };
    setDetailTableData([...detailTableData, newRow]);
    setDetailTableErrors([
      ...detailTableErrors,
      {
        partNo: '',
        partDesc: '',
        sku: '',
        rowGrnNoList: '',
        rowBatchNoList: '',
        rowBinList: '',
        grnNo: '',
        grnDate: '',
        batchNo: '',
        batchDate: '',
        expDate: '',
        bin: '',
        binType: '',
        binClass: '',
        cellType: '',
        core: '',
        // lotNo: '',
        qcFlag: '',
        status: '',
        avlQty: '',
        actualQty: ''
      }
    ]);
  };

  const isLastRowEmpty = (table) => {
    const lastRow = table[table.length - 1];
    if (!lastRow) return false;

    if (table === detailTableData) {
      return (
        !lastRow.partNo ||
        // !lastRow.actualQty ||
        !lastRow.grnNo ||
        !lastRow.batchNo ||
        !lastRow.bin
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
          partNo: !table[table.length - 1].partNo ? 'Part No is required' : '',
          grnNo: !table[table.length - 1].grnNo ? 'GRN No is required' : '',
          batchNo: !table[table.length - 1].batchNo ? 'Batch No is required' : '',
          bin: !table[table.length - 1].bin ? 'Bin is required' : ''
          // actualQty: !table[table.length - 1].actualQty ? 'Actual QTY is required' : ''
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
      docDate: dayjs(),
      transferFrom: '',
      transferto: '',
      entryNo: ''
    });
    setFieldErrors({
      docId: '',
      docDate: null,
      transferFrom: '',
      transferto: '',
      entryNo: ''
    });
    setDetailTableData([]);
    setDetailTableErrors([]);
    setViewId('');
    getNewCycleCountDocId();
  };
  const handleTableClear = (table) => {
    if (table === 'detailTableData') {
      setDetailTableData([]);
      setDetailTableErrors([]);
    }
  };

  const handleSave = async () => {
    console.log('first');

    const errors = {};
    console.log('detailTableData is:', detailTableData);

    let detailTableDataValid = true;
    if (!detailTableData || !Array.isArray(detailTableData) || detailTableData.length === 0) {
      detailTableDataValid = false;
      setDetailTableErrors([{ general: 'Detail Table Data is required' }]); // Assuming you want to handle general errors too
    } else {
      const newTableErrors = detailTableData.map((row, index) => {
        const rowErrors = {};

        if (!row.partNo) rowErrors.partNo = 'Part No is required';
        if (!row.grnNo) rowErrors.grnNo = 'Grn No is required';
        if (!row.batchNo) rowErrors.batchNo = 'Batch No is required';
        if (!row.bin) rowErrors.bin = 'To Bin is required';
        if (!row.avlQty) rowErrors.avlQty = 'To QTY is required';
        if (!row.actualQty) rowErrors.actualQty = 'Actual QTY is required';

        if (Object.keys(rowErrors).length > 0) detailTableDataValid = false;

        return rowErrors;
      });

      setDetailTableErrors(newTableErrors);
    }

    if (detailTableDataValid) {
      setIsLoading(true);

      const cycleCountVo = detailTableData.map((row) => ({
        ...(viewId && { id: row.id }),
        partNo: row.partNo,
        partDescription: row.partDesc,
        sku: row.sku,
        grnNo: row.grnNo,
        grnDate: row.grnDate,
        batchNo: row.batchNo,
        batchDate: row.batchDate,
        expDate: row.expDate,
        bin: row.bin,
        binType: row.binType,
        binClass: row.binClass,
        cellType: row.cellType,
        core: row.core,
        // lotNo: row.lotNo,
        qcFlag: row.qcFlag,
        status: row.status,
        avlQty: parseInt(row.avlQty, 10),
        actualQty: parseInt(row.actualQty, 10)
      }));

      const saveFormData = {
        ...(viewId && { id: viewId }),
        branch: loginBranch,
        branchCode: loginBranchCode,
        client: loginClient,
        customer: loginCustomer,
        warehouse: loginWarehouse,
        finYear: loginFinYear,
        orgId: parseInt(orgId, 10),
        createdBy: loginUserName,
        cycleCountDetailsDTO: cycleCountVo
      };

      console.log('DATA TO SAVE IS:', saveFormData);

      try {
        const response = await apiCalls('put', `cycleCount/createUpdateCycleCount`, saveFormData);

        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', viewId ? 'Cycle Count Updated Successfully' : 'Cycle Count created successfully');
          getAllCycleCount();
        } else {
          showToast('error', response.paramObjectsMap?.errorMessage || 'Cycle Count creation failed');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Cycle Count creation failed');
      } finally {
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
  const handleFromBinChange = (row, index, event) => {
    const value = event.target.value;
    const selectedFromBin = fromBinList.find((b) => b.fromBin === value);
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              fromBin: selectedFromBin.fromBin,
              fromBinType: selectedFromBin ? selectedFromBin.fromBinType : '',
              fromBinClass: selectedFromBin ? selectedFromBin.fromBinClass : '',
              fromCellType: selectedFromBin ? selectedFromBin.fromCellType : '',
              fromCore: selectedFromBin ? selectedFromBin.fromCore : ''
            }
          : r
      )
    );
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        partNo: !value ? 'Part number is required' : ''
      };
      return newErrors;
    });
    getPartNo(value, formData.transferFromFlag, row);
  };

  const handlePartNoChange = (row, index, event) => {
    const value = event.target.value;

    // Find the selected part number from the row's partNoList
    const selectedFromPartNo = partNoList.find((b) => b.partno === value);

    // Update the detail table data
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              partNo: selectedFromPartNo ? selectedFromPartNo.partno : '', // Safeguard for undefined
              partDesc: selectedFromPartNo ? selectedFromPartNo.partDesc : '', // Safeguard for undefined
              sku: selectedFromPartNo ? selectedFromPartNo.sku : '' // Safeguard for undefined
            }
          : r
      )
    );

    // Update validation errors
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        partNo: !value ? 'Part number is required' : '' // Set error if partNo is empty
      };
      return newErrors;
    });

    // Call getGrnNo only if value is not empty
    if (value) {
      getGrnNo(value, row);
    }
  };

  const handleGrnNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedGrnNo = row.rowGrnNoList.find((row) => row.grnNo === value);
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              grnNo: selectedGrnNo.grnNo,
              grnDate: selectedGrnNo ? selectedGrnNo.grnDate : ''
            }
          : r
      )
    );
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getBatchNo(row.partNo, value, row);
  };
  const handleBatchNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedBatchNo = row.rowBatchNoList.find((row) => row.batch === value);
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              batchNo: selectedBatchNo.batch,
              batchDate: selectedBatchNo ? selectedBatchNo.batchDate : '',
              expDate: selectedBatchNo ? selectedBatchNo.expDate : ''
            }
          : r
      )
    );
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getBinDetails(value, row.grnNo, row.partNo, row);
  };
  const handleBinChange = (row, index, event) => {
    const value = event.target.value;
    console.log('THE ROW.PARTNO IS:', row);

    const selectedBin = row.rowBinList.find((row) => row.bin === value);
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              bin: selectedBin.bin,
              binType: selectedBin ? selectedBin.binType : '',
              binClass: selectedBin ? selectedBin.binClass : '',
              cellType: selectedBin ? selectedBin.cellType : '',
              core: selectedBin ? selectedBin.core : '',
              // lotNo: selectedBin ? selectedBin.lotNo : '',
              qcFlag: selectedBin ? selectedBin.qcFlag : ''
            }
          : r
      )
    );
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getAvlQty(row.batchNo, value, row.grnNo, row.partNo, row);
    // const getAvlQty = async (selectedBatchNo, selectedBin, selectedGrnNo, selectedPartNo, row) => {
  };

  const getAvailableBins = (currentRowId, row) => {
    // Get the partNo and grnNo of the current row
    const currentRow = detailTableData.find((row) => row.id === currentRowId);
    if (!currentRow) {
      return row.rowBinList; // If currentRowId is not found, return all bins
    }

    const { partNo, grnNo, batchNo } = currentRow;

    // Filter out bins that are already selected in other rows with the same partNo and grnNo
    const selectedBins = detailTableData
      .filter((row) => row.id !== currentRowId && row.partNo === partNo && row.grnNo === grnNo && row.batchNo === batchNo)
      .map((row) => row.bin);

    return binList.filter((bin) => !selectedBins.includes(bin.bin));
  };

  const handleFromQtyChange = (row, index, event) => {
    const value = event.target.value;
    // const selectedToBin = toBinList.find((row) => row.toBin === value);
    setDetailTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              fromQty: value
              // toBinType: selectedToBin ? selectedToBin.tobinType : '',
              // toBinClass: selectedToBin ? selectedToBin.toBinClass : '',
              // toCellType: selectedToBin ? selectedToBin.toCellType : '',
              // toCore: selectedToBin ? selectedToBin.toCore : ''
            }
          : r
      )
    );
    setDetailTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        fromQty: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    // getBatchNo(row.fromBin, row.partNo, value);
  };
  const handleToQtyChange = (e, row, index) => {
    const value = e.target.value;
    const numericValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10); // Ensure value is a number
    const numericFromQty = isNaN(parseInt(row.fromQty, 10)) ? 0 : parseInt(row.fromQty, 10); // Ensure fromQty is a number
    const intPattern = /^\d*$/;

    if (intPattern.test(value) || value === '') {
      setDetailTableData((prev) => {
        const updatedData = prev.map((r) => {
          if (r.id === row.id) {
            let newRemainQty = numericFromQty - numericValue; // Initial remainQty calculation

            // Calculate the cumulative toQty for all rows with the same partNo
            const cumulativeToQty = prev.reduce((total, item) => {
              if (
                item.fromBin === r.fromBin &&
                item.partNo === r.partNo &&
                item.grnNo === r.grnNo &&
                item.batchNo === r.batchNo &&
                item.id !== r.id
              ) {
                return total + (isNaN(parseInt(item.toQty, 10)) ? 0 : parseInt(item.toQty, 10));
              }
              return total;
            }, numericValue); // Include the current row's toQty in the cumulative total

            // Subtract cumulativeToQty from fromQty to get new remainQty
            newRemainQty = numericFromQty - cumulativeToQty;

            // Ensure remainQty is non-negative
            newRemainQty = Math.max(newRemainQty, 0);

            console.log(`Updated remainQty for row ${r.id}: ${newRemainQty}`); // Debugging line

            return {
              ...r,
              toQty: value,
              remainQty: newRemainQty
            };
          }
          return r;
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
          toQty: 'Only numbers are allowed'
        };
        return newErrors;
      });
    }
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

    try {
      await Promise.all(
        selectedData.map(async (data, idx) => {
          // Simulate the event object for handleToQtyChange
          const simulatedEvent = {
            target: {
              value: data.toQty // Assuming you have a toQty field in your data
            }
          };

          // await getPartNo(data.fromBin, formData.transferFromFlag, data);
          await getGrnNo(data.partNo, data);
          await getBatchNo(data.partNo, data.grnNo, data);
          await getBinDetails(data.batchNo, data.grnNo, data.partNo, data);

          // Call handleToQtyChange with simulated event, row data, and index
          // handleToQtyChange(simulatedEvent, data, detailTableData.length + idx);
        })
      );
    } catch (error) {
      console.error('Error processing selected data:', error);
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
      <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
        <div className="row d-flex ml">
          <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
            <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
            <ActionButton title="Clear" icon={ClearIcon} onClick={handleClear} />
            <ActionButton title="List View" icon={FormatListBulletedTwoToneIcon} onClick={handleView} />
            <ActionButton
              title="Save"
              icon={SaveIcon}
              isLoading={isLoading}
              onClick={!viewId ? handleSave : undefined}
              // onClick={handleSave}
              margin="0 10px 0 10px"
            />
          </div>
        </div>
        {listView ? (
          <div className="mt-4">
            <CommonListViewTable
              data={listViewData}
              columns={listViewColumns}
              blockEdit={true}
              // disableEditIcon={true}
              // viewIcon={true}
              toEdit={getCycleCountById}
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
              {/* <div className="col-md-3 mb-3">
                <FormControl size="small" variant="outlined" fullWidth error={!!fieldErrors.transferFrom}>
                  <InputLabel id="transferFrom-label">Transfer From</InputLabel>
                  <Select
                    labelId="transferFrom-label"
                    id="transferFrom"
                    name="transferFrom"
                    label="Transfer From"
                    value={formData.transferFrom}
                    onChange={handleInputChange}
                    disabled={viewId ? true : false}
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
                    disabled={viewId ? true : false}
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
              </div> */}
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
                        {!viewId && (
                          <>
                            <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow} />
                            <ActionButton title="Fill Grid" icon={GridOnIcon} onClick={handleFullGrid} />
                            <ActionButton title="Clear" icon={ClearIcon} onClick={() => handleTableClear('detailTableData')} />
                          </>
                        )}
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table table-bordered" style={{ width: '100%' }}>
                              <thead>
                                <tr style={{ backgroundColor: '#673AB7' }}>
                                  {!viewId && <th className="table-header">Action</th>}
                                  <th className="table-header">S.No</th>
                                  <th className="table-header">Part No *</th>
                                  <th className="table-header">Part Desc</th>
                                  <th className="table-header">SKU</th>
                                  <th className="table-header">GRN No *</th>
                                  <th className="table-header">Batch No *</th>
                                  <th className="table-header">Bin *</th>
                                  <th className="table-header">Bin Type</th>
                                  <th className="table-header">Core</th>
                                  <th className="table-header">Avl QTY</th>
                                  <th className="table-header">Actual QTY *</th>
                                </tr>
                              </thead>
                              {!viewId ? (
                                <>
                                  <tbody>
                                    {detailTableData.length === 0 ? (
                                      <tr>
                                        <td colSpan="18" className="text-center py-2">
                                          No Data Found
                                        </td>
                                      </tr>
                                    ) : (
                                      <>
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
                                                value={row.partNo}
                                                style={{ width: '200px' }}
                                                onChange={(e) => handlePartNoChange(row, index, e)}
                                                className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                              >
                                                <option value="">-- Select --</option>
                                                {partNoList?.map((row, index) => (
                                                  <option key={index} value={row.partno}>
                                                    {row.partno}
                                                  </option>
                                                ))}
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
                                                className={detailTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                                disabled
                                              />
                                            </td>
                                            <td className="border px-2 py-2">
                                              <select
                                                value={row.grnNo}
                                                style={{ width: '200px' }}
                                                onChange={(e) => handleGrnNoChange(row, index, e)}
                                                className={detailTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                              >
                                                <option value="">-- Select --</option>

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
                                                onChange={(e) => handleBatchNoChange(row, index, e)}
                                                className={detailTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                              >
                                                <option value="">-- Select --</option>
                                                {Array.isArray(row.rowBatchNoList) &&
                                                  row.rowBatchNoList.map(
                                                    (g, idx) =>
                                                      g &&
                                                      g.batch && (
                                                        <option key={g.batch} value={g.batch}>
                                                          {g.batch}
                                                        </option>
                                                      )
                                                  )}
                                                {batchNoList?.map((batch, index) => (
                                                  <option key={index} value={batch.batch}>
                                                    {batch.batch}
                                                  </option>
                                                ))}
                                              </select>
                                              {detailTableErrors[index]?.batchNo && (
                                                <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                                  {detailTableErrors[index].batchNo}
                                                </div>
                                              )}
                                            </td>
                                            <td className="border px-2 py-2">
                                              <select
                                                value={row.bin}
                                                style={{ width: '200px' }}
                                                onChange={(e) => handleBinChange(row, index, e)}
                                                className={detailTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                              >
                                                <option value="">--Select--</option>
                                                {Array.isArray(row.rowBinList) && row.rowBinList.length > 0 ? (
                                                  row.rowBinList.map((g) =>
                                                    g && g.bin ? (
                                                      <option key={g.bin} value={g.bin}>
                                                        {g.bin}
                                                      </option>
                                                    ) : null
                                                  )
                                                ) : (
                                                  <option value="" disabled>
                                                    No bins available
                                                  </option>
                                                )}
                                              </select>
                                              {detailTableErrors[index]?.bin && (
                                                <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                                  {detailTableErrors[index].bin}
                                                </div>
                                              )}
                                            </td>

                                            <td className="border px-2 py-2">
                                              <input
                                                style={{ width: '300px' }}
                                                type="text"
                                                value={row.binType}
                                                className={detailTableErrors[index]?.binType ? 'error form-control' : 'form-control'}
                                                disabled
                                              />
                                            </td>
                                            <td className="border px-2 py-2">
                                              <input
                                                style={{ width: '150px' }}
                                                type="text"
                                                value={row.core}
                                                className={detailTableErrors[index]?.core ? 'error form-control' : 'form-control'}
                                                disabled
                                              />
                                            </td>
                                            <td className="border px-2 py-2">
                                              <input
                                                style={{ width: '150px' }}
                                                type="text"
                                                value={row.avlQty}
                                                className={detailTableErrors[index]?.avlQty ? 'error form-control' : 'form-control'}
                                                disabled
                                              />
                                            </td>
                                            <td className="border px-2 py-2">
                                              <input
                                                style={{ width: '150px' }}
                                                type="text"
                                                value={row.actualQty}
                                                onChange={(e) => {
                                                  const value = e.target.value;
                                                  const intPattern = /^\d*$/; // Pattern to match only whole numbers

                                                  if (intPattern.test(value) || value === '') {
                                                    // Allow empty values for clearing
                                                    const numericValue = parseInt(value, 10);
                                                    const numericAvlQty = parseInt(row.avlQty, 10) || 0;

                                                    // if (value === '' || numericValue <= numericAvlQty) {
                                                    // if (value === '') {
                                                    setDetailTableData((prev) => {
                                                      const updatedData = prev.map((r) => {
                                                        const updatedActualQty = numericValue || 0;
                                                        return r.id === row.id
                                                          ? {
                                                              ...r,
                                                              actualQty: value
                                                            }
                                                          : r;
                                                      });
                                                      return updatedData;
                                                    });
                                                    setDetailTableErrors((prev) => {
                                                      const newErrors = [...prev];
                                                      newErrors[index] = {
                                                        ...newErrors[index],
                                                        actualQty: !value ? 'Actual QTY is required' : ''
                                                      };
                                                      return newErrors;
                                                    });
                                                    // } else {
                                                    //   setDetailTableErrors((prev) => {
                                                    //     const newErrors = [...prev];
                                                    //     newErrors[index] = {
                                                    //       ...newErrors[index],
                                                    //       actualQty: 'Rec QTY cannot be greater than Inv QTY'
                                                    //     };
                                                    //     return newErrors;
                                                    //   });
                                                    // }
                                                  } else {
                                                    setDetailTableErrors((prev) => {
                                                      const newErrors = [...prev];
                                                      newErrors[index] = { ...newErrors[index], actualQty: 'Invalid value' };
                                                      return newErrors;
                                                    });
                                                  }
                                                }}
                                                className={detailTableErrors[index]?.actualQty ? 'error form-control' : 'form-control'}
                                                disabled={!row.avlQty}
                                              />
                                              {row.avlQty && detailTableErrors[index]?.actualQty && (
                                                <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                                  {detailTableErrors[index].actualQty}
                                                </div>
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </>
                                    )}
                                  </tbody>
                                  {detailTableErrors.some((error) => error.general) && (
                                    <tfoot>
                                      <tr>
                                        <td colSpan={12} className="error-message">
                                          <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
                                            {detailTableErrors.find((error) => error.general)?.general}
                                          </div>
                                        </td>
                                      </tr>
                                    </tfoot>
                                  )}
                                </>
                              ) : (
                                <>
                                  <tbody>
                                    {detailTableData.map((row, index) => (
                                      <tr key={row.id}>
                                        <td className="text-center">
                                          <div className="pt-2">{index + 1}</div>
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.partNo}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.partDesc}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.sku}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.grnNo}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.batchNo}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.bin}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.binType}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.core}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.avlQty}
                                        </td>
                                        <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
                                          {row.actualQty}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </>
                              )}
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
                                Bin
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Bin Type
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Core
                              </th>
                              <th className="px-2 py-2 text-white text-center" style={{ width: '150px' }}>
                                Avl QTY
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
                                <td className="border p-2 text-center mt-2" style={{ width: '68px' }}>
                                  {index + 1}
                                </td>
                                <td className="border px-2 py-2 text-center" style={{ whiteSpace: 'nowrap' }}>
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
                                  {row.bin}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.binType}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.core}
                                </td>
                                <td className="border p-2 text-center mt-2" style={{ width: '200px' }}>
                                  {row.avlQty}
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
    </>
  );
};

export default CycleCount;
