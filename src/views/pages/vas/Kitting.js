import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import React, { useRef } from 'react';

export const Kitting = () => {
  const [orgId, setOrgId] = useState(parseInt(localStorage.getItem('orgId')));
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [branchList, setBranchList] = useState([]);
  const [docId, setDocId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [branch, setBranch] = useState(localStorage.getItem('branch'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));
  // const [finYear, setFinYear] = useState(localStorage.getItem('finYear') ? localStorage.getItem('finYear') : '2024');
  const [finYear, setFinYear] = useState('2024');
  const [warehouse, setWarehouse] = useState(localStorage.getItem('warehouse'));

  const [formData, setFormData] = useState({
    docId: docId,
    docDate: dayjs(),
    refNo: '',
    refDate: '',
    active: true
  });
  const [value, setValue] = useState(0);
  const [partNoOptions, setPartNoOptions] = useState([]);
  const [partNoOptions1, setPartNoOptions1] = useState([]);
  const [grnOptions, setGrnOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [binOptions, setBinOptions] = useState([]);
  const [rowBatchNo, setRowBatchNo] = useState([]);

  const [childTableData, setChildTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDescription: '',
      rowBatchNo: [],
      batchNo: '',
      batchDate: null,
      expDate: null,
      lotNo: '',
      grnNo: '',
      grnDate: '',
      sku: '',
      rowBatchNo: [],
      bin: '',
      avlQty: '',
      qty: '',
      unitRate: '',
      amount: ''
    }
  ]);

  const lrNoDetailsRefs = useRef([]);

  useEffect(() => {
    lrNoDetailsRefs.current = childTableData.map((_, index) => ({
      partNo: lrNoDetailsRefs.current[index]?.partNo || React.createRef(),
      grnNo: lrNoDetailsRefs.current[index]?.grnNo || React.createRef(),
      batchNo: lrNoDetailsRefs.current[index]?.batchNo || React.createRef(),
      bin: lrNoDetailsRefs.current[index]?.bin || React.createRef(),
      qty: lrNoDetailsRefs.current[index]?.qty || React.createRef()
    }));
  }, [childTableData]);

  const [parentTableData, setParentTableData] = useState([
    {
      id: 1,
      partNo: '',
      partDescription: '',
      batchNo: '',
      batchDate: null,
      expDate: null,
      lotNo: '',
      sku: '',
      qty: '',
      unitRate: '',
      amount: '',
      grnNo: '',
      grnDate: '',
      expDate: ''
    }
  ]);

  // const lrNoParentDetailsRefs = useRef(
  //   parentTableData.map(() => ({
  //     pbin: React.createRef()
  //   }))
  // );

  // useEffect(() => {
  //   // If the length of the table changes, update the refs
  //   if (lrNoParentDetailsRefs.current.length !== parentTableData.length) {
  //     lrNoParentDetailsRefs.current = parentTableData.map(
  //       (_, index) =>
  //         lrNoParentDetailsRefs.current[index] || {
  //           pbin: React.createRef()
  //         }
  //     );
  //   }
  // }, [parentTableData.length]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      partNo: '',
      partDescription: '',
      rowBatchNo: [],
      batchNo: '',
      batchDate: null,
      expDate: null,
      lotNo: '',
      grnNo: '',
      grnDate: '',
      sku: '',
      rowBatchNo: [],
      bin: '',
      avlQty: '',
      qty: '',
      unitRate: '',
      amount: ''
    };
    setChildTableData([...childTableData, newRow]);
    setChildTableErrors([
      ...childTableErrors,
      {
        bin: '',
        partNo: '',
        partDescription: '',
        batchNo: '',
        lotNo: '',
        grnNo: '',
        grnDate: '',
        sku: '',
        avlQty: '',
        qty: '',
        unitRate: '',
        amount: ''
      }
    ]);
  };
  const handleAddRow1 = () => {
    const newRow = {
      id: Date.now(),
      partNo: '',
      partDescription: '',
      batchNo: '',
      lotNo: '',
      sku: '',
      qty: '',
      unitRate: '',
      amount: '',
      grnNo: '',
      grnDate: '',
      expDate: ''
    };
    setParentTableData([...parentTableData, newRow]);
    setParentTableErrors([
      ...parentTableErrors,
      {
        partNo: '',
        partDescription: '',
        batchNo: '',
        lotNo: '',
        sku: '',
        qty: '',
        unitRate: '',
        amount: '',
        grnNo: '',
        grnDate: '',
        expDate: ''
      }
    ]);
  };

  const [childTableErrors, setChildTableErrors] = useState([
    {
      bin: '',
      partNo: '',
      partDescription: '',
      batchNo: '',
      lotNo: '',
      grnNo: '',
      grnDate: '',
      sku: '',
      avlQty: '',
      qty: '',
      unitRate: '',
      amount: ''
    }
  ]);
  const [parentTableErrors, setParentTableErrors] = useState([
    {
      partNo: '',
      partDescription: '',
      batchNo: '',
      lotNo: '',
      sku: '',
      qty: '',
      unitRate: '',
      amount: '',
      grnNo: '',
      grnDate: '',
      expDate: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: '',
    refNo: '',
    refDate: ''
  });
  const [listView, setListView] = useState(false);
  const [toBinList, setToBinList] = useState([]);
  const listViewColumns = [
    { accessorKey: 'docId', header: 'Document No', size: 140 },
    { accessorKey: 'docDate', header: 'Document Date', size: 140 },
    { accessorKey: 'refNo', header: 'Ref Id', size: 140 },
    { accessorKey: 'refDate', header: 'Ref Date', size: 140 }
  ];

  const [listViewData, setListViewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (field, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setFormData((prevData) => ({ ...prevData, [field]: formattedDate }));
  };

  useEffect(() => {
    getAllKitting();
    getDocId();
    getAllBinDetails();
    getAllChildPart();
    getAllParentPart();
  }, []);

  // Example usage:

  const getAllKitting = async () => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getAllKitting?orgId=${orgId}&branchCode=${branchCode}&client=${client}&customer=${customer}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.kittingVOs);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllChildPart = async () => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getPartNOByChild?orgId=${orgId}&branchCode=${branchCode}&client=${client}&warehouse=${warehouse}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        const options = response.paramObjectsMap.kittingVO.map((item) => ({
          value: item.partNo,
          partDescription: item.partDesc, // Ensure these fields exist in the response
          sku: item.Sku // Ensure these fields exist in the response
        }));
        setPartNoOptions(options);
        console.log('Mapped Part No Options:', options);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllParentPart = async () => {
    try {
      console.log('Current docId:', docId); // Log the current docId to verify its value

      const response = await apiCalls('get', `kitting/getPartNOByParent?orgId=${orgId}&branchCode=${branchCode}&client=${client}`);
      console.log('API Response:', response);

      if (response.status === true) {
        const options1 = response.paramObjectsMap.kittingVO.map((item) => ({
          value: item.partNo,
          partDescription: item.partDesc, // Ensure these fields exist in the response
          sku: item.Sku // Ensure these fields exist in the response
        }));
        setPartNoOptions1(options1);

        // Modify the document ID and set it in the parent table data

        console.log('Updated parentTableData:', parentTableData); // Log the updated parentTableData after state update
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to append "GN" to the document ID
  const appendGNToDocumentId = (docId) => {
    // Insert "GN" right after "KT" if "KT" is present
    const index = docId.indexOf('KT');
    if (index !== -1) {
      return `${docId.slice(0, index + 2)}GN${docId.slice(index + 2)}`;
    }
    return docId; // Return the original document ID if "KT" is not found
  };

  // Ensure the state updates correctly
  useEffect(() => {
    console.log('parentTableData has been updated:', parentTableData);
  }, [parentTableData]);

  const getAllChildGRnNo = async (selectedPart, partNo) => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getGrnNOByChild?orgId=${orgId}&branchCode=${branchCode}&client=${client}&partNo=${partNo}&warehouse=${warehouse}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        // Extract data from response

        const grnData = response.paramObjectsMap.kittingVO.map((item) => ({
          grnNo: item.grnNo,
          grnDate: item.grnDate
        }));
        setGrnOptions(grnData);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getBatchByChild = async (row, selectedGrnNo) => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getBatchByChild?orgId=${orgId}&branchCode=${branchCode}&client=${client}&partNo=${row.partNo}&warehouse=${warehouse}&grnNo=${selectedGrnNo}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        const batchData = [
          {
            batchNo: response.paramObjectsMap.kittingVO[0].batchNo,
            batchDate: response.paramObjectsMap.kittingVO[0].batchDate,
            expDate: response.paramObjectsMap.kittingVO[0].expDate
          }
        ];
        setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, rowBatchNo: batchData } : r)));
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getBinByChild = async (row, selectedBatchNo) => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getBinByChild?orgId=${orgId}&branchCode=${branchCode}&client=${client}&partNo=${row.partNo}&warehouse=${warehouse}&grnNo=${row.grnNo}&batch=${selectedBatchNo}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setChildTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowBinList: response.paramObjectsMap.kittingVO
                }
              : r
          )
        );
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBinChange = (row, index, event) => {
    const value = event.target.value;
    const selectedToBin = row.rowBinList.find((row) => row.bin === value);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              bin: selectedToBin.bin,
              binClass: selectedToBin ? selectedToBin.binClass : '',
              binType: selectedToBin ? selectedToBin.binType : '',
              cellType: selectedToBin ? selectedToBin.cellType : '',
              core: selectedToBin ? selectedToBin.core : ''
            }
          : r
      )
    );
    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        toBin: !value ? 'To Bin is required' : ''
      };
      return newErrors;
    });
    // getFromQty(row.batchNo, row.fromBin, row.grnNo, row.partNo, row);
    getAllAvlQty(row, value);
  };
  const getAllAvlQty = async (row, selectedBin) => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getSqtyByKitting?orgId=${orgId}&batch=${row.batchNo}&branchCode=${branchCode}&client=${client}&partNo=${row.partNo}&warehouse=${warehouse}&grnNo=${row.grnNo}&bin=${selectedBin}`
      );

      if (response.status === true) {
        const avlQty = response.paramObjectsMap.avlQty; // Update to match the response format
        setChildTableData((prevData) =>
          prevData.map((r) =>
            r.partNo === row.partNo && r.grnNo === row.grnNo
              ? {
                  ...r,
                  avlQty: avlQty // Update the avlQty for the corresponding row
                }
              : r
          )
        );
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllBinDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `warehousemastercontroller/getAllBinDetails?warehouse=${warehouse}&branchCode=${branchCode}&client=${client}&orgId=${orgId}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        console.log('response.paramObjectsMap.Bins:', response.paramObjectsMap.Bins);
        const optionsBin = response.paramObjectsMap.Bins.map((item) => ({
          binClass: item.binClass,
          binType: item.binType, // Ensure these fields exist in the response
          cellType: item.cellType, // Ensure these fields exist in the response
          core: item.core,
          bin: item.bin
        }));
        setBinOptions(optionsBin);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllParentGRnNo = async (selectedPart, partNo) => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getGrnNOByParent?bin=${selectedPart.bin}&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}&partDesc=${selectedPart.partDescription}&partNo=${partNo}&sku=${selectedPart.sku}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        const options = response.paramObjectsMap.kittingVO.map((item) => ({
          value: item.partNo,
          partDescription: item.partDesc, // Ensure these fields exist in the response
          sku: item.Sku // Ensure these fields exist in the response
        }));
        setPartNoOptions(options);
        console.log('Mapped Part No Options:', options);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `kitting/getKittingInDocId?orgId=${orgId}&branchCode=${branchCode}&client=${client}&branch=${branch}&finYear=${finYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setDocId(response.paramObjectsMap.KittingDocId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          docId: response.paramObjectsMap.KittingDocId
        }));
        const modifiedDocId = appendGNToDocumentId(response.paramObjectsMap.KittingDocId);
        console.log('Modified docId:', modifiedDocId); // Log the modified docId to verify it

        setParentTableData((prevParentTableData) =>
          prevParentTableData.map((row) => ({
            ...row,
            grnNo: modifiedDocId // Ensure this line correctly sets grnNo
          }))
        );
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getKittingById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `kitting/getKittingById?id=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const particularCustomer = response.paramObjectsMap.kittingVO;
        console.log('THE PARTICULAR CUSTOMER IS:', particularCustomer);

        // Update form data
        setFormData({
          docId: particularCustomer.docId,
          docDate: particularCustomer.docDate ? dayjs(particularCustomer.docDate) : dayjs(),
          refNo: particularCustomer.refNo || '',
          refDate: particularCustomer.refDate ? dayjs(particularCustomer.refDate) : '',
          active: particularCustomer.active === true,
          customer: particularCustomer.customer,
          branch: particularCustomer.branch,
          warehouse: particularCustomer.warehouse
        });

        // Update childTableData with kittingDetails1VO data
        setChildTableData(
          particularCustomer.kittingDetails1VO.map((detail) => ({
            id: detail.id,
            bin: detail.bin || '',
            partNo: detail.partNo || '',
            partDescription: detail.partDescription || '',
            batchNo: detail.batchNo || '',
            lotNo: detail.lotNo || '',
            grnNo: detail.grnNo || '',
            grnDate: detail.grnDate || '',
            sku: detail.sku || '',
            avlQty: detail.avlQty || '',
            qty: detail.qty || '',
            unitRate: detail.unitRate || '',
            amount: detail.amount || ''
          }))
        );

        // Update parentTableData with kittingDetails2VO data
        setParentTableData(
          particularCustomer.kittingDetails2VO.map((detail) => ({
            id: detail.id,
            partNo: detail.ppartNo || '',
            partDescription: detail.ppartDescription || '',
            batchNo: detail.pbatchNo || '',
            batchDate: detail.pbatchDate || '',
            lotNo: detail.plotNo || '',
            sku: detail.psku || '',
            qty: detail.pqty || '',
            unitRate: detail.punitRate || '',
            amount: detail.pamount || '',
            grnNo: detail.pgrnNo || '',
            grnDate: detail.pgrnDate || '',
            expDate: detail.pexpDate || ''
          }))
        );

        // Handle selected branch data
        const alreadySelectedBranch = particularCustomer.clientBranchVO.map((br) => {
          const foundBranch = branchList.find((branch) => branch.branchCode === br.branchCode);
          console.log(`Searching for branch with code ${br.branchCode}:`, foundBranch);
          return {
            id: br.id,
            branchCode: foundBranch ? foundBranch.branchCode : 'Not Found',
            branch: foundBranch ? foundBranch.branch : 'Not Found'
          };
        });
        setParentTableData(alreadySelectedBranch);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleInputChange = (e) => {
    const { name, value, checked, selectionStart, selectionEnd } = e.target;

    // Capture the cursor position before the update
    const cursorPosition = { start: selectionStart, end: selectionEnd };

    const nameRegex = /^[A-Za-z ]*$/;
    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const numericRegex = /^[0-9]*$/;
    const branchNameRegex = /^[A-Za-z0-9@_\-*]*$/;
    const branchCodeRegex = /^[a-zA-Z0-9#_\-\/\\]*$/;

    let errorMessage = '';

    switch (name) {
      case 'customer':
      case 'shortName':
        if (!nameRegex.test(value)) {
          errorMessage = 'Only alphabetic characters are allowed';
        }
        break;
      case 'pan':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;
      case 'branchName':
        if (!branchNameRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters and @, _, -, * are allowed';
        }
        break;
      case 'mobile':
        if (!numericRegex.test(value)) {
          errorMessage = 'Only numeric characters are allowed';
        } else if (value.length > 10) {
          errorMessage = 'Invalid Format';
        }
        break;
      case 'gst':
        if (!alphaNumericRegex.test(value)) {
          errorMessage = 'Only alphanumeric characters are allowed';
        } else if (value.length > 15) {
          errorMessage = 'Invalid Format';
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    } else {
      if (name === 'active') {
        setFormData((prevData) => ({ ...prevData, [name]: checked }));
      } else if (name === 'email') {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value.toUpperCase() }));
      }

      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }

    // Restore cursor position after state update
    setTimeout(() => {
      const inputElement = document.querySelector(`[name=${name}]`);
      if (inputElement) {
        inputElement.setSelectionRange(cursorPosition.start, cursorPosition.end);
      }
    }, 0);
  };

  const handleDeleteRow = (id) => {
    setChildTableData(childTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown = (e, row) => {
    if (e.key === 'Tab' && row.id === childTableData[childTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow();
    }
  };
  const handleDeleteRow1 = (id) => {
    setParentTableData(parentTableData.filter((row) => row.id !== id));
  };
  const handleKeyDown1 = (e, row) => {
    if (e.key === 'Tab' && row.id === parentTableData[parentTableData.length - 1].id) {
      e.preventDefault();
      handleAddRow1();
    }
  };

  const handleClear = () => {
    setFormData({
      docDate: null,
      refNo: '',
      refDate: '',
      active: true
    });
    setChildTableData([
      {
        id: 1,
        bin: '',
        partNo: '',
        partDescription: '',
        batchNo: '',
        lotNo: '',
        grnNo: '',
        grnDate: '',
        sku: '',
        avlQty: '',
        qty: '',
        unitRate: '',
        amount: ''
      }
    ]);
    setParentTableData([
      {
        id: 1,
        partNo: '',
        partDescription: '',
        batchNo: '',
        lotNo: '',
        sku: '',
        qty: '',
        unitRate: '',
        amount: '',
        grnNo: '',
        grnDate: '',
        expDate: ''
      }
    ]);
    setFieldErrors({
      docId: '',
      docDate: '',
      refNo: '',
      refDate: ''
    });
    getDocId();
  };

  const handleSave = async () => {
    const errors = {};
    let firstInvalidFieldRef = null;

    if (!formData.docId) {
      errors.docId = 'Doc Id is required';
    }
    // if (!formData.docDate) {
    //   errors.docDate = ' DocDate is required';
    // }
    if (!formData.refNo) {
      errors.refNo = 'Ref Id is required';
    }
    if (!formData.refDate) {
      errors.refDate = 'Ref Date is required';
    }

    let childTableDataValid = true;
    const newTableErrors = childTableData.map((row, index) => {
      const rowErrors = {};
      if (!row.partNo) {
        rowErrors.partNo = 'PartNo is required';
        if (!firstInvalidFieldRef) firstInvalidFieldRef = lrNoDetailsRefs.current[index].partNo;
        childTableDataValid = false;
      }
      if (!row.grnNo) {
        rowErrors.grnNo = 'Grn No is required';
        if (!firstInvalidFieldRef) firstInvalidFieldRef = lrNoDetailsRefs.current[index].grnNo;
        childTableDataValid = false;
      }
      if (!row.batchNo) {
        rowErrors.batchNo = 'Batch No is required';
        if (!firstInvalidFieldRef) firstInvalidFieldRef = lrNoDetailsRefs.current[index].batchNo;
        childTableDataValid = false;
      }
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        if (!firstInvalidFieldRef) firstInvalidFieldRef = lrNoDetailsRefs.current[index].bin;
        childTableDataValid = false;
      }
      if (!row.qty) {
        rowErrors.qty = 'qty Type is required';
        if (!firstInvalidFieldRef) firstInvalidFieldRef = lrNoDetailsRefs.current[index].qty;
        childTableDataValid = false;
      }
      return rowErrors;
    });
    // setFieldErrors(errors);

    setChildTableErrors(newTableErrors);

    if (!childTableDataValid || Object.keys(errors).length > 0) {
      // Focus on the first invalid field
      if (firstInvalidFieldRef && firstInvalidFieldRef.current) {
        firstInvalidFieldRef.current.focus();
      }
    } else {
      // Proceed with form submission
    }

    let parentTableDataValid = true;
    const newTableErrors1 = parentTableData.map((row) => {
      const rowErrors = {};
      if (!row.partNo) {
        rowErrors.partNo = 'PartNo is required';
        parentTableDataValid = false;
      }
      return rowErrors;
    });
    setFieldErrors(errors);

    setParentTableErrors(newTableErrors1);

    if (Object.keys(errors).length === 0 && childTableDataValid && parentTableDataValid) {
      setIsLoading(true);
      const childVO = childTableData.map((row) => ({
        bin: row.bin,
        partNo: row.partNo,
        partDescription: row.partDescription,
        batchNo: row.batchNo,
        expDate: row.expDate,
        batchDate: row.batchDate,
        lotNo: row.lotNo,
        grnNo: row.grnNo,
        binType: row.binType,
        binClass: row.binClass,
        cellType: row.cellType,
        core: row.core,
        grnDate: row.grnDate,
        sku: row.sku,
        avlQty: parseInt(row.avlQty),
        qty: parseInt(row.qty),
        unitRate: parseInt(row.unitRate),
        amount: parseInt(row.amount),
        qQcflag: true
      }));
      const ParentVO = parentTableData.map((row) => ({
        ppartNo: row.partNo,
        ppartDescription: row.partDescription,
        pbatchNo: row.batchNo,
        pbatchDate: row.batchDate,
        plotNo: row.lotNo,

        psku: row.sku,
        pqty: parseInt(row.qty),
        pbin: row.bin,
        pgrnNo: row.grnNo,
        pgrnDate: row.grnDate,
        pexpDate: row.expDate,
        pqcflag: true,
        pbinType: row.binType,
        pbinClass: row.binClass,
        pcellType: row.cellType,
        pcore: row.core
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        // docId: formData.docId,
        docDate: formData.docDate,
        refNo: formData.refNo,
        refDate: formData.refDate,
        kittingDetails1DTO: childVO,
        kittingDetails2DTO: ParentVO,
        orgId: orgId,
        createdBy: loginUserName,
        branch: branch,
        branchCode: branchCode,
        client: client,
        customer: customer,
        finYear: finYear,
        warehouse: warehouse
      };

      console.log('DATA TO SAVE IS:', saveFormData);
      try {
        const response = await apiCalls('put', `kitting/createUpdateKitting`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Kitting Updated Successfully' : 'Kitting created successfully');
          getAllKitting();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Kitting creation failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Kitting creation failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleParentTableChange = (index, field, value) => {
    const updatedData = [...parentTableData];
    updatedData[index] = { ...updatedData[index], [field]: value };

    // Additional logic if necessary (e.g., dependent field updates)
    if (field === 'qty' || field === 'unitRate') {
      updatedData[index].amount = updatedData[index].qty * updatedData[index].unitRate;
    }

    setParentTableData(updatedData);

    // Handle validation errors if needed
    const updatedErrors = [...parentTableErrors];
    if (value === '') {
      updatedErrors[index] = { ...updatedErrors[index], [field]: 'This field is required' };
    } else {
      if (updatedErrors[index]) {
        delete updatedErrors[index][field];
      }
    }
    setParentTableErrors(updatedErrors);
  };

  const handleBatchNoChange = (row, index, e) => {
    const value = e.target.value;
    console.log('Selected Batch No:', value);

    const selectedBatchNo = row.rowBatchNo.find((option) => option.batchNo === value);
    console.log('Selected Batch Details:', selectedBatchNo);

    setChildTableData((prev) => {
      return prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              batchNo: selectedBatchNo ? selectedBatchNo.batchNo : '',
              batchDate: selectedBatchNo ? selectedBatchNo.batchDate : '',
              expDate: selectedBatchNo ? selectedBatchNo.expDate : ''
            }
          : r
      );
    });

    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        batchNo: ''
      };
      return newErrors;
    });

    getBinByChild(row, value);
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getKittingById} />
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3 mb-3">
                <TextField
                  label="Document No"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="docId"
                  disabled
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
                      label="Document Date"
                      value={formData.docDate}
                      disabled
                      onChange={(date) => handleDateChange('docDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.docDate}
                      helperText={fieldErrors.docDate && 'Required'}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="col-md-3 mb-3">
                <TextField
                  label={
                    <span>
                      Ref Id <span className="asterisk">*</span>
                    </span>
                  }
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
                      label="Ref Date"
                      value={formData.refDate ? dayjs(formData.refDate, 'YYYY-MM-DD') : null}
                      onChange={(date) => handleDateChange('refDate', date)}
                      slotProps={{
                        textField: { size: 'small', clearable: true }
                      }}
                      format="DD/MM/YYYY"
                      error={fieldErrors.refDate}
                      helperText={fieldErrors.refDate}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>
              <div className="col-md-3 mb-3">
                <FormControlLabel
                  control={<Checkbox checked={formData.active} onChange={handleInputChange} name="active" color="primary" />}
                  label="Active"
                />
              </div>
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
                  <Tab value={0} label="Kitting Child" />
                  <Tab value={1} label="Kitting Parent" />
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
                            <table className="table table-bordered" style={{ width: '100%' }}>
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
                                  <th className="px-2 py-2 text-white text-center">SKU</th>
                                  <th className="px-2 py-2 text-white text-center">GRN No</th>
                                  <th className="px-2 py-2 text-white text-center">GRN Date</th>
                                  <th className="px-2 py-2 text-white text-center">Batch No</th>
                                  {/* <th className="px-2 py-2 text-white text-center">Lot No</th> */}
                                  <th className="px-2 py-2 text-white text-center">Bin</th>

                                  <th className="px-2 py-2 text-white text-center">Avl Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Qty</th>
                                  {/* <th className="px-2 py-2 text-white text-center">Unit Rate</th>
                                  <th className="px-2 py-2 text-white text-center">Amount</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {childTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        ref={lrNoDetailsRefs.current[index]?.partNo}
                                        value={row.partNo}
                                        style={{ width: '130px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          console.log('Selected Part No:', value);

                                          const selectedPart = partNoOptions.find((option) => String(option.value) === String(value));
                                          console.log('Selected Part Details:', selectedPart);

                                          if (selectedPart) {
                                            setChildTableData((prev) => {
                                              return prev.map((r) =>
                                                r.id === row.id
                                                  ? {
                                                      ...r,
                                                      partNo: value,
                                                      partDescription: selectedPart.partDescription,
                                                      sku: selectedPart.sku
                                                    }
                                                  : r
                                              );
                                            });
                                            getAllChildGRnNo(selectedPart, value);
                                          }

                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partNo: !value ? 'Part No is required' : '',
                                              partDescription: !selectedPart ? 'Part Description is required' : '',
                                              sku: !selectedPart ? 'SKU is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Part No</option>
                                        {partNoOptions &&
                                          partNoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                              {option.value}
                                            </option>
                                          ))}
                                      </select>

                                      {childTableErrors[index]?.partNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].partNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.partDescription}
                                        disabled
                                        style={{ width: '200px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, partDescription: value } : r))
                                          );
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partDescription: !value ? 'Part Description is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.partDescription ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.partDescription && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].partDescription}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.sku}
                                        disabled
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, sku: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], sku: !value ? 'SKU is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.sku && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].sku}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        ref={lrNoDetailsRefs.current[index]?.grnNo}
                                        value={row.grnNo}
                                        style={{ width: '130px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          console.log('Selected Grn No:', value);

                                          const selectedGrnNo = grnOptions.find((option) => String(option.grnNo) === String(value));
                                          console.log('Selected Grn Details:', selectedGrnNo);

                                          if (selectedGrnNo) {
                                            setChildTableData((prev) => {
                                              return prev.map((r) =>
                                                r.id === row.id
                                                  ? {
                                                      ...r,
                                                      grnNo: value,
                                                      grnDate: selectedGrnNo.grnDate
                                                    }
                                                  : r
                                              );
                                            });
                                            getBatchByChild(row, value);
                                          }

                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              grnNo: !value ? 'Grn No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Grn No</option>
                                        {grnOptions &&
                                          grnOptions.map((option) => (
                                            <option key={option.grnNo} value={option.grnNo}>
                                              {option.grnNo}
                                            </option>
                                          ))}
                                      </select>
                                      {childTableErrors[index]?.grnNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].grnNo}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.grnDate}
                                        // style={{ width: '100px' }}
                                        disabled
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, grnDate: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], grnDate: !value ? 'GRN Date is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.grnDate ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.grnDate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].grnDate}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        ref={lrNoDetailsRefs.current[index]?.batchNo}
                                        value={row.batchNo}
                                        style={{ width: '130px' }}
                                        onChange={(e) => handleBatchNoChange(row, index, e)}
                                        className={childTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select batch No</option>
                                        {Array.isArray(row.rowBatchNo) &&
                                          row.rowBatchNo.map((batch) => (
                                            <option key={batch.id} value={batch.batchNo}>
                                              {batch.batchNo}
                                            </option>
                                          ))}
                                      </select>
                                      {childTableErrors[index]?.batchNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].batchNo}
                                        </div>
                                      )}
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        ref={lrNoDetailsRefs.current[index]?.bin}
                                        value={row.bin}
                                        style={{ width: '130px' }}
                                        onChange={(e) => handleBinChange(row, index, e)}
                                        className={childTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">--Select--</option>
                                        {Array.isArray(row.rowBinList) &&
                                          row.rowBinList.map((bin, idx) => (
                                            <option key={bin.bin} value={bin.bin}>
                                              {bin.bin}
                                            </option>
                                          ))}
                                      </select>
                                      {childTableErrors[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].bin}
                                        </div>
                                      )}
                                    </td>

                                    {/* <td className="border px-2 py-2">
                                      <select
                                        value={row.bin}
                                        style={{ width: '130px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          console.log('Selected Bin No:', value);

                                          const selectedBin = binOptions.find((option) => String(option.bin) === String(value));
                                          console.log('Selected Bin Details:', selectedBin);

                                          if (selectedBin) {
                                            setChildTableData((prev) => {
                                              return prev.map((r) =>
                                                r.id === row.id
                                                  ? {
                                                      ...r,
                                                      bin: selectedBin.bin,
                                                      core: selectedBin.core,
                                                      cellType: selectedBin.cellType,
                                                      binType: selectedBin.binType,
                                                      binClass: selectedBin.binClass
                                                    }
                                                  : r
                                              );
                                            });
                                            getAllAvlQty(row, value);
                                          }

                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              bin: !value ? 'Bin is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select bin</option>
                                        {binOptions &&
                                          binOptions.map((option) => (
                                            <option key={option.bin} value={option.bin}>
                                              {option.bin}
                                            </option>
                                          ))}
                                      </select>
                                      {childTableErrors[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].bin}
                                        </div>
                                      )}
                                    </td> */}

                                    {/* <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.lotNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, lotNo: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], lotNo: !value ? 'Lot No is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.lotNo ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.lotNo && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].lotNo}
                                        </div>
                                      )}
                                    </td> */}

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.avlQty} // The value comes from the updated childTableData state
                                        disabled
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, avlQty: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], avlQty: !value ? 'Avl Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.avlQty ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.avlQty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].avlQty}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        ref={lrNoDetailsRefs.current[index]?.qty}
                                        type="text"
                                        value={row.qty}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, qty: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], qty: !value ? 'Qty is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.qty ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.qty && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].qty}
                                        </div>
                                      )}
                                    </td>

                                    {/* <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.unitRate}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, unitRate: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], unitRate: !value ? 'Unit Rate is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.unitRate ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.unitRate && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].unitRate}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.amount}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setChildTableData((prev) => prev.map((r) => (r.id === row.id ? { ...r, amount: value } : r)));
                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = { ...newErrors[index], amount: !value ? 'Amount is required' : '' };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.amount ? 'error form-control' : 'form-control'}
                                      />
                                      {childTableErrors[index]?.amount && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].amount}
                                        </div>
                                      )}
                                    </td> */}
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
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        {parentTableData.length > 0 ? '' : <ActionButton title="Add" icon={AddIcon} onClick={handleAddRow1} />}
                      </div>
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
                                  <th className="px-2 py-2 text-white text-center">P Part No</th>
                                  <th className="px-2 py-2 text-white text-center">P Part Description</th>
                                  <th className="px-2 py-2 text-white text-center">P SKU</th>
                                  <th className="px-2 py-2 text-white text-center">P GRN No</th>
                                  <th className="px-2 py-2 text-white text-center">P GRN Date</th>
                                  <th className="px-2 py-2 text-white text-center">P Batch No</th>
                                  <th className="px-2 py-2 text-white text-center">P Batch Date</th>
                                  <th className="px-2 py-2 text-white text-center">P Lot No</th>
                                  <th className="px-2 py-2 text-white text-center">P Bin</th>
                                  <th className="px-2 py-2 text-white text-center">P Qty</th>
                                  {/* <th className="px-2 py-2 text-white text-center">P Unit Rate</th>
                                  <th className="px-2 py-2 text-white text-center">P Amount</th> */}

                                  <th className="px-2 py-2 text-white text-center">P Exp Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {parentTableData.map((row, index) => (
                                  <tr key={row.id}>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow1(row.id)} />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.partNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          console.log('Selected Part No:', value);

                                          const selectedPart = partNoOptions1.find((option) => String(option.value) === String(value));
                                          console.log('Selected Part Details:', selectedPart);

                                          if (selectedPart) {
                                            setParentTableData((prev) => {
                                              return prev.map((r) =>
                                                r.id === row.id
                                                  ? {
                                                      ...r,
                                                      partNo: value,
                                                      partDescription: selectedPart.partDescription,
                                                      sku: selectedPart.sku
                                                    }
                                                  : r
                                              );
                                            });
                                            getAllParentGRnNo(selectedPart, value);
                                          }

                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partNo: !value ? 'Part No is required' : '',
                                              partDescription: !selectedPart ? 'Part Description is required' : '',
                                              sku: !selectedPart ? 'SKU is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select Part No</option>
                                        {partNoOptions1 &&
                                          partNoOptions1.map((option) => (
                                            <option key={option.value} value={option.value}>
                                              {option.value}
                                            </option>
                                          ))}
                                      </select>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.partDescription}
                                        disabled
                                        style={{ width: '200px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) =>
                                            prev.map((r, i) => (i === index ? { ...r, partDescription: value } : r))
                                          );
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              partDescription: !value ? 'Part Description is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.partDescription ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.sku}
                                        disabled
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, sku: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              sku: !value ? 'SKU is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.grnNo}
                                        disabled
                                        style={{ width: '220px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, grnNo: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              grnNo: !value ? 'GRN No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.grnDate}
                                        // disabled
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, grnDate: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              grnDate: !value ? 'GRN Date is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.grnDate ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.batchNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, batchNo: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              batchNo: !value ? 'Batch No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.batchDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, batchDate: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              batchDate: !value ? 'Batch Date is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.batchDate ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <input
                                        type="text"
                                        value={row.lotNo}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, lotNo: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              lotNo: !value ? 'Lot No is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.lotNo ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        value={row.bin}
                                        style={{ width: '130px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          console.log('Selected Bin No:', value);

                                          const selectedBin = binOptions.find((option) => option.bin === value);
                                          console.log('Selected Bin Details:', selectedBin);

                                          if (selectedBin) {
                                            setParentTableData((prev) => {
                                              return prev.map((r) =>
                                                r.id === row.id
                                                  ? {
                                                      ...r,
                                                      bin: selectedBin.bin,
                                                      core: selectedBin.core,
                                                      cellType: selectedBin.cellType,
                                                      binType: selectedBin.binType,
                                                      binClass: selectedBin.binClass
                                                    }
                                                  : r
                                              );
                                            });
                                          }

                                          setChildTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              bin: !value ? 'Bin is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={childTableErrors[index]?.bin ? 'error form-control' : 'form-control'}
                                      >
                                        <option value="">Select bin</option>
                                        {binOptions &&
                                          binOptions.map((option) => (
                                            <option key={option.bin} value={option.bin}>
                                              {option.bin}
                                            </option>
                                          ))}
                                      </select>
                                      {childTableErrors[index]?.bin && (
                                        <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                          {childTableErrors[index].bin}
                                        </div>
                                      )}
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.qty}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, qty: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              qty: !value ? 'Quantity is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.qty ? 'error form-control' : 'form-control'}
                                      />
                                    </td>
                                    {/* <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.unitRate}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, unitRate: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              unitRate: !value ? 'Unit Rate is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.unitRate ? 'error form-control' : 'form-control'}
                                      />
                                    </td> */}
                                    {/* <td className="border px-2 py-2">
                                      <input
                                        type="number"
                                        value={row.amount}
                                        style={{ width: '100px' }}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, amount: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              amount: !value ? 'Amount is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.amount ? 'error form-control' : 'form-control'}
                                      />
                                    </td> */}

                                    <td className="border px-2 py-2">
                                      <input
                                        type="date"
                                        value={row.expDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setParentTableData((prev) => prev.map((r, i) => (i === index ? { ...r, expDate: value } : r)));
                                          setParentTableErrors((prev) => {
                                            const newErrors = [...prev];
                                            newErrors[index] = {
                                              ...newErrors[index],
                                              expDate: !value ? 'Exp Date is required' : ''
                                            };
                                            return newErrors;
                                          });
                                        }}
                                        className={parentTableErrors[index]?.expDate ? 'error form-control' : 'form-control'}
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
      <ToastContainer />
    </>
  );
};
export default Kitting;
