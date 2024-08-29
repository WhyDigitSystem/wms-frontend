import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import apiCalls from 'apicall';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const LocationMovement = () => {
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
  const [selectedBin, setSelectedBin] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fromBinList, setFromBinList] = useState([]);

  const [formData, setFormData] = useState({
    docId: docId,
    docDate: dayjs(),
    movedQty: ''
  });
  const [value, setValue] = useState(0);
  const [toBinList, setToBinList] = useState([]);
  const [partNoOptionsNew, setPartNoOptionsNew] = useState([]);
  const [partNoOptionsBin, setPartNoOptionsBin] = useState([]);
  const [fillGridData, setFillGridData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [childTableData, setChildTableData] = useState([
    // {
    //   batchDate: '',
    //   batchNo: '',
    //   bin: '',
    //   binClass: '',
    //   binType: '',
    //   cellType: '',
    //   clientCode: '',
    //   core: '',
    //   expDate: '',
    //   fromQty: '',
    //   grnDate: '',
    //   grnNo: '',
    //   lotNo: '',
    //   partDesc: '',
    //   rowPartNoList: [],
    //   partNo: '',
    //   pcKey: '',
    //   qcFlag: '',
    //   remainingQty: '',
    //   sku: '',
    //   ssku: '',
    //   status: '',
    //   stockDate: '',
    //   toBin: '',
    //   toQty: '',
    //   toBinClass: '',
    //   toCellType: '',
    //   toBinType: ''
    // }
  ]);

  const [modalTableData, setModalTableData] = useState([
    {
      id: 1,
      fromBin: '',
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
      fromBin: '',
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

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      batchDate: '',
      rowBatchNoList: [],
      batchNo: '',
      fromBin: '',
      binClass: '',
      binType: '',
      cellType: '',
      clientCode: '',
      core: '',
      expDate: '',
      avlQty: '',
      grnDate: '',
      rowGrnNoList: [],
      grnNo: '',
      lotNo: '',
      partDesc: '',
      rowPartNoList: [],
      partNo: '',
      pcKey: '',
      qcFlag: '',
      remainQty: '',
      sku: '',
      ssku: '',
      status: '',
      stockDate: '',
      toBin: '',
      toQty: ''
    };
    setChildTableData([...childTableData, newRow]);
    setChildTableErrors([
      ...childTableErrors,
      {
        batchDate: '',
        batchNo: '',
        fromBin: '',
        fromQty: '',
        grnDate: '',
        grnNo: '',
        lotNo: '',
        partDesc: '',
        partNo: '',
        remainQty: '',
        sku: '',
        toBin: '',
        toQty: ''
      }
    ]);
  };

  const [childTableErrors, setChildTableErrors] = useState([
    {
      batchDate: '',
      batchNo: '',
      bin: '',
      avlQty: '',
      grnDate: '',
      grnNo: '',
      lotNo: '',
      partDesc: '',
      partNo: '',
      remainQty: '',
      sku: '',
      toBin: '',
      toQty: ''
    }
  ]);

  const [fieldErrors, setFieldErrors] = useState({
    docId: '',
    docDate: ''
  });
  const [listView, setListView] = useState(false);
  const listViewColumns = [
    { accessorKey: 'docId', header: 'DocId', size: 140 },
    { accessorKey: 'docDate', header: 'docDate', size: 140 }
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
    getAllLocationMovement();
    getDocId();
    getAllFromBin();
    getToBinDetails();
  }, []);

  const getDocId = async () => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getLocationMovementDocId?orgId=${orgId}&branchCode=${branchCode}&client=${client}&branch=${branch}&finYear=${finYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setDocId(response.paramObjectsMap.locationMovementDocId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          docId: response.paramObjectsMap.locationMovementDocId
        }));
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllLocationMovement = async () => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getAllLocationMovementByOrgId?orgId=${orgId}&branchCode=${branchCode}&branch=${branch}&client=${client}&customer=${customer}&warehouse=${warehouse}&finYear=${finYear}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        setListViewData(response.paramObjectsMap.locationMovementVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllFillGrid = async () => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getAllForLocationMovementDetailsFillGrid?orgId=${orgId}&branchCode=${branchCode}&branch=${branch}&client=${client}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        // setFillGridData(response.paramObjectsMap.locationMovementDetailsVO);
        const gridDetails = response.paramObjectsMap.locationMovementDetailsVO;
        console.log('THE MODAL TABLE DATA FROM API ARE:', gridDetails);
        setModalTableData(
          gridDetails.map((row) => ({
            id: row.id,
            fromBin: row.bin,
            fromBinClass: row.binClass,
            fromBinType: row.fromBinType,
            fromCellType: row.cellType,
            partNo: row.partNo,
            partDesc: row.partDesc,
            sku: row.sku,
            grnNo: row.grnNo,
            grnDate: row.grnDate,
            batchNo: row.batchNo,
            batchDate: row.batchDate,
            expDate: row.expDate,
            // toBin: row.toBin,
            // toBinType: row.ToBinType,
            // toBinClass: row.ToBinClass,
            // toCellType: row.ToCellType,
            avlQty: row.avlQty,
            toQty: row.toQty,
            // fromCore: row.fromCore,
            // toCore: row.ToCore,
            qcFlag: row.qcFlag
          }))
        );
        setChildTableData([]);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllFromBin = async () => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getBinFromStockForLocationMovement?&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}`
      );
      console.log('API Response:', response);

      if (response.status === true) {
        console.log('CHILD BIN LIST ARE:', response.paramObjectsMap.locationMovementDetailsVO);
        setFromBinList(response.paramObjectsMap.locationMovementDetailsVO);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFromBinChange = (row, index, event) => {
    const value = event.target.value;
    const selectedFromBin = fromBinList.find((b) => b.fromBin === value);
    console.log('THE SELECTED ROW IS:', row);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              fromBin: selectedFromBin.fromBin,
              fromBinType: selectedFromBin ? selectedFromBin.fromBinType : '',
              fromBinClass: selectedFromBin ? selectedFromBin.fromBinClass : '',
              fromCellType: selectedFromBin ? selectedFromBin.fromCellType : '',
              fromCore: selectedFromBin ? selectedFromBin.fromCore : '',
              fromBin: selectedFromBin.fromBin,
              rowPartNoList: [],
              partNo: '',
              partDesc: '',
              sku: '',
              grnNo: '',
              rowGrnNoList: [],
              batchNo: '',
              rowBatchNoList: [],
              avlQty: '',
              remainQty: '',
              toBin: '',
              toBinType: ''
            }
          : r
      )
    );
    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        fromBin: !value ? 'From Bin is required' : ''
      };
      return newErrors;
    });
    getPartNo(value, row);
  };
  const getPartNo = async (selectedFromBin, row) => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getPartNoAndPartDescFromStockForLocationMovement?&orgId=${orgId}&branch=${branch}&branchCode=${branchCode}&client=${client}&bin=${selectedFromBin}`
      );
      console.log('THE FROM BIN LIST IS:', response);
      console.log('THE ROW IS:', row);

      if (response.status === true) {
        setChildTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowPartNoList: response.paramObjectsMap.locationMovementDetailsVO
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const handlePartNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedFromPartNo = row.rowPartNoList.find((b) => b.partNo === value);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              partNo: selectedFromPartNo ? selectedFromPartNo.partNo : '',
              partDesc: selectedFromPartNo ? selectedFromPartNo.partDesc : '',
              sku: selectedFromPartNo ? selectedFromPartNo.sku : '',
              grnNo: '',
              rowGrnNoList: [],
              batchNo: '',
              rowBatchNoList: [],
              avlQty: '',
              remainQty: '',
              toBin: '',
              toBinType: ''
            }
          : r
      )
    );
    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        partNo: !value ? 'Part number is required' : ''
      };
      return newErrors;
    });

    if (value) {
      getGrnNo(row.fromBin, value, row);
    }
  };
  const getGrnNo = async (selectedFromBin, selectedPartNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getGrnNoDetailsForLocationMovement?bin=${selectedFromBin}&branch=${branch}&branchCode=${branchCode}&client=${client}&orgId=${orgId}&partNo=${selectedPartNo}`
      );
      console.log('THE FROM BIN LIST IS:', response);

      if (response.status === true) {
        setChildTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowGrnNoList: response.paramObjectsMap.grnDetails
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleGrnNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedGrnNo = row.rowGrnNoList.find((row) => row.grnNo === value);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              grnNo: selectedGrnNo.grnNo,
              grnDate: selectedGrnNo ? selectedGrnNo.grnDate : '',
              batchNo: '',
              rowBatchNoList: [],
              toBin: '',
              toBinType: '',
              avlQty: '',
              remainQty: ''
            }
          : r
      )
    );
    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getBatchNo(row.fromBin, row.partNo, value, row);
  };
  const getBatchNo = async (selectedFromBin, selectedPartNo, selectedGrnNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getBatchNoDetailsForLocationMovement?bin=${selectedFromBin}&branch=${branch}&branchCode=${branchCode}&client=${client}&grnNo=${selectedGrnNo}&orgId=${orgId}&partNo=${selectedPartNo}`
      );
      console.log('THE FROM BIN LIST IS:', response);
      if (response.status === true) {
        setChildTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  rowBatchNoList: response.paramObjectsMap.batchDetails
                }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const handleBatchNoChange = (row, index, event) => {
    const value = event.target.value;
    const selectedBatchNo = row.rowBatchNoList.find((row) => row.batchNo === value);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              batchNo: selectedBatchNo.batchNo,
              batchDate: selectedBatchNo ? selectedBatchNo.batchDate : '',
              expDate: selectedBatchNo ? selectedBatchNo.expDate : '',
              toBin: '',
              toBinType: '',
              avlQty: '',
              remainQty: ''
            }
          : r
      )
    );

    setChildTableErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        grnNo: !value ? 'GRN No is required' : ''
      };
      return newErrors;
    });
    getAvlQty(value, row.fromBin, row.grnNo, row.partNo, row);
  };

  const getAvlQty = async (selectedBatchNo, selectedFromBin, selectedGrnNo, selectedPartNo, row) => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getFromQtyForLocationMovement?batchNo=${selectedBatchNo}&bin=${selectedFromBin}&branch=${branch}&branchCode=${branchCode}&client=${client}&grnNo=${selectedGrnNo}&orgId=${orgId}&partNo=${selectedPartNo}`
      );
      console.log('THE ROW. TO BIN IS IS:', selectedPartNo);

      setChildTableData((prevData) =>
        prevData.map((r) =>
          r.id === row.id
            ? {
                ...r,
                avlQty: response.paramObjectsMap?.fromQty || r.avlQty
              }
            : r
        )
      );
    } catch (error) {
      console.error('Error fetching locationType data:', error);
    }
  };
  const getToBinDetails = async () => {
    try {
      const response = await apiCalls(
        'get',
        `locationMovement/getToBinFromLocationStatusForLocationMovement?branch=${branch}&branchCode=${branchCode}&client=${client}&orgId=${orgId}&warehouse=${warehouse}`
      );
      console.log('THE TO BIN LIST ARE:', response);
      if (response.status === true) {
        setToBinList(response.paramObjectsMap.locationMovementDetailsVO);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const handleToBinChange = (row, index, event) => {
    const value = event.target.value;
    const selectedToBin = toBinList.find((row) => row.toBin === value);
    setChildTableData((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              toBin: selectedToBin.toBin,
              toBinType: selectedToBin ? selectedToBin.toBinType : '',
              toBinClass: selectedToBin ? selectedToBin.toBinClass : '',
              toCellType: selectedToBin ? selectedToBin.toCellType : ''
              // toCore: selectedToBin ? selectedToBin.toCore : ''
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
  };
  //OLD WORKING TOQTYCHANGE FUNCTION
  // const handleToQtyChange = (e, row, index) => {
  //   const value = e.target.value;
  //   const numericValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
  //   const numericAvlQty = isNaN(parseInt(row.avlQty, 10)) ? 0 : parseInt(row.avlQty, 10);
  //   const intPattern = /^\d*$/;

  //   if (value === '') {
  //     setChildTableData((prev) => {
  //       return prev.map((r) => {
  //         if (r.id === row.id) {
  //           return {
  //             ...r,
  //             toQty: '',
  //             remainQty: ''
  //           };
  //         }
  //         return r;
  //       });
  //     });

  //     // Clear the error if input is cleared
  //     // setChildTableErrors((prev) => {
  //     //   const newErrors = [...prev];
  //     //   newErrors[index] = {
  //     //     ...newErrors[index],
  //     //     toQty: ''
  //     //   };
  //     //   return newErrors;
  //     // });
  //   } else if (intPattern.test(value) && numericValue <= numericAvlQty) {
  //     setChildTableData((prev) => {
  //       return prev.map((r) => {
  //         if (r.id === row.id) {
  //           const cumulativeToQty = prev.reduce((total, item) => {
  //             if (
  //               item.fromBin === r.fromBin &&
  //               item.partNo === r.partNo &&
  //               item.grnNo === r.grnNo &&
  //               item.batchNo === r.batchNo &&
  //               item.id !== r.id
  //             ) {
  //               return total + (isNaN(parseInt(item.toQty, 10)) ? 0 : parseInt(item.toQty, 10));
  //             }
  //             return total;
  //           }, numericValue);

  //           const newRemainQty = Math.max(numericAvlQty - cumulativeToQty, 0);

  //           console.log(`Updated remainQty for row ${r.id}: ${newRemainQty}`);

  //           return {
  //             ...r,
  //             toQty: value,
  //             remainQty: newRemainQty
  //           };
  //         }
  //         return r;
  //       });
  //     });

  //     setChildTableErrors((prev) => {
  //       const newErrors = [...prev];
  //       newErrors[index] = {
  //         ...newErrors[index],
  //         toQty: ''
  //       };
  //       return newErrors;
  //     });
  //   } else {
  //     // Handle invalid input
  //     setChildTableErrors((prev) => {
  //       const newErrors = [...prev];
  //       newErrors[index] = {
  //         ...newErrors[index],
  //         toQty: numericValue > numericAvlQty ? 'Not greater than AvlQty' : 'Only numbers are allowed'
  //       };
  //       return newErrors;
  //     });

  //     // Optionally, clear the invalid input value if it's greater than avlQty
  //     if (numericValue > numericAvlQty) {
  //       e.target.value = '';
  //     }
  //   }
  // };

  //CURRENT WORKING TOQTYCHANGE FUNCTION
  const handleToQtyChange = (e, row, index) => {
    const value = e.target.value;
    const numericValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
    const numericAvlQty = isNaN(parseInt(row.avlQty, 10)) ? 0 : parseInt(row.avlQty, 10);
    const intPattern = /^\d*$/;

    if (value === '') {
      setChildTableData((prev) => {
        return prev.map((r) => {
          if (r.id === row.id) {
            return {
              ...r,
              toQty: '',
              remainQty: ''
            };
          }
          return r;
        });
      });
    } else if (intPattern.test(value)) {
      setChildTableData((prev) => {
        let cumulativeToQty = numericValue;
        let isValid = true;

        prev.forEach((item, i) => {
          if (item.bin === row.bin && item.partNo === row.partNo && item.batchNo === row.batchNo && item.grnNo === row.grnNo && i < index) {
            const previousRemainQty = isNaN(parseInt(item.remainQty, 10)) ? 0 : parseInt(item.remainQty, 10);

            if (numericValue > previousRemainQty) {
              isValid = false;
              setChildTableErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index] = {
                  ...newErrors[index],
                  toQty: `Cannot be greater than previous row's remainQty (${previousRemainQty})`
                };
                return newErrors;
              });
            }

            cumulativeToQty += isNaN(parseInt(item.toQty, 10)) ? 0 : parseInt(item.toQty, 10);
          }
        });

        if (isValid && numericValue <= numericAvlQty) {
          return prev.map((r) => {
            if (r.id === row.id) {
              const newRemainQty = Math.max(numericAvlQty - cumulativeToQty, 0);

              return {
                ...r,
                toQty: value,
                remainQty: newRemainQty
              };
            }
            return r;
          });
        } else {
          return prev;
        }
      });

      if (numericValue <= numericAvlQty) {
        setChildTableErrors((prev) => {
          const newErrors = [...prev];
          newErrors[index] = {
            ...newErrors[index],
            toQty: ''
          };
          return newErrors;
        });
      }
    } else {
      // Handle invalid input
      setChildTableErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = {
          ...newErrors[index],
          toQty: 'Only numbers are allowed'
        };
        return newErrors;
      });

      e.target.value = '';
    }
  };

  // const handleToQtyChange = (e, row, index) => {
  //   const value = e.target.value;
  //   const numericValue = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
  //   const numericAvlQty = isNaN(parseInt(row.avlQty, 10)) ? 0 : parseInt(row.avlQty, 10);
  //   const intPattern = /^\d*$/;

  //   setChildTableData((prev) => {
  //     let cumulativeToQty = 0;

  //     return prev.map((r, i) => {
  //       // Check if rows match by `bin`, `partNo`, `batchNo`, and `grnNo`
  //       const isSameRowData = r.bin === row.bin && r.partNo === row.partNo && r.batchNo === row.batchNo && r.grnNo === row.grnNo;

  //       if (isSameRowData) {
  //         if (i === index) {
  //           if (value === '') {
  //             // Case 1: Clear only the current row if `toQty` is cleared
  //             return {
  //               ...r,
  //               toQty: '',
  //               remainQty: ''
  //             };
  //           } else if (intPattern.test(value)) {
  //             cumulativeToQty += numericValue;
  //             const newRemainQty = Math.max(numericAvlQty - cumulativeToQty, 0);

  //             return {
  //               ...r,
  //               toQty: value,
  //               remainQty: newRemainQty
  //             };
  //           }
  //         } else if (i > index && value === '') {
  //           // Case 2: If a previous row's `toQty` is cleared, clear all subsequent matching rows
  //           return {
  //             ...r,
  //             toQty: '',
  //             remainQty: ''
  //           };
  //         } else if (i > index && intPattern.test(value)) {
  //           cumulativeToQty += isNaN(parseInt(r.toQty, 10)) ? 0 : parseInt(r.toQty, 10);
  //           const newRemainQty = Math.max(numericAvlQty - cumulativeToQty, 0);

  //           return {
  //             ...r,
  //             toQty: '',
  //             remainQty: newRemainQty
  //           };
  //         }
  //       }
  //       return r;
  //     });
  //   });

  //   // Error handling: Clear any existing errors if input is valid
  //   if (intPattern.test(value)) {
  //     setChildTableErrors((prev) => {
  //       const newErrors = [...prev];
  //       newErrors[index] = {
  //         ...newErrors[index],
  //         toQty: ''
  //       };
  //       return newErrors;
  //     });
  //   } else {
  //     // Handle invalid input
  //     setChildTableErrors((prev) => {
  //       const newErrors = [...prev];
  //       newErrors[index] = {
  //         ...newErrors[index],
  //         toQty: 'Only numbers are allowed'
  //       };
  //       return newErrors;
  //     });

  //     e.target.value = '';
  //   }
  // };

  const getLocationMovementById = async (row) => {
    console.log('THE SELECTED EMPLOYEE ID IS:', row.original.id);
    setEditId(row.original.id);
    try {
      const response = await apiCalls('get', `locationMovement/getLocationMovementById?id=${row.original.id}`);
      console.log('API Response:', response);

      if (response.status === true) {
        setListView(false);
        const locationMovement = response.paramObjectsMap.locationMovementVO;
        console.log('THE PARTICULAR LOCATION MOVEMENT IS:', locationMovement);

        // Update form data
        setFormData({
          docId: locationMovement.docId,
          docDate: locationMovement.docDate ? dayjs(locationMovement.docDate) : dayjs(),
          refNo: locationMovement.refNo || '',
          refDate: locationMovement.refDate ? dayjs(locationMovement.refDate) : '',
          active: locationMovement.active === true,
          customer: locationMovement.customer,
          branch: locationMovement.branch,
          warehouse: locationMovement.warehouse
        });

        // Update childTableData with locationMovementDetailsVO data
        setChildTableData(
          locationMovement.locationMovementDetailsVO.map((detail) => ({
            id: detail.id,
            bin: detail.bin || '',
            partNo: detail.partNo || '',
            partDesc: detail.partDesc || '',
            batchNo: detail.batchNo || '',
            batchDate: detail.batchDate || '',
            lotNo: detail.lotNo || '', // Corrected from lotNo to lotNo
            grnNo: detail.grnNo || '',
            grnDate: detail.grnDate || '',
            sku: detail.sku || '',
            avlQty: detail.fromQty || '', // Assuming fromQty is the available quantity
            toQty: detail.toQty || '',
            remainingQty: detail.remainingQty || '',
            toBin: detail.toBin
          }))
        );

        // Update parentTableData with any other necessary data, similar to above if needed
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
      setFieldErrors({ ...fieldErrors, [name]: errorMessage });
    } else {
      if (name === 'active') {
        setFormData({ ...formData, [name]: checked });
      } else if (name === 'email') {
        setFormData({ ...formData, [name]: value });
      } else {
        setFormData({ ...formData, [name]: value.toUpperCase() });
      }

      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
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

  const handleClear = () => {
    setFormData({
      docDate: dayjs(),
      refNo: '',
      refDate: '',
      active: true
    });
    setChildTableData([
      {
        id: 1,
        batchDate: '',
        batchNo: '',
        bin: '',
        fromQty: '',
        grnDate: '',
        grnNo: '',
        lotNo: '',
        partDesc: '',
        partNo: '',
        remainingQty: '',
        sku: '',
        toBin: '',
        toQty: ''
      }
    ]);

    setFieldErrors({
      docId: '',
      docDate: ''
    });
    getDocId();
  };

  const handleSave = async () => {
    const errors = {};
    if (!formData.docId) {
      errors.docId = 'Doc Id is required';
    }
    // if (!formData.docDate) {
    //   errors.docDate = ' DocDate is required';
    // }

    let childTableDataValid = true;
    const newTableErrors = childTableData.map((row) => {
      const rowErrors = {};
      if (!row.bin) {
        rowErrors.bin = 'Bin is required';
        childTableDataValid = false;
      }
      if (!row.partNo) {
        rowErrors.partNo = 'PartNo is required';
        childTableDataValid = false;
      }
      // if (!row.qty) {
      //   rowErrors.qty = 'qty Type is required';
      //   childTableDataValid = false;
      // }
      return rowErrors;
    });
    // setFieldErrors(errors);

    setChildTableErrors(newTableErrors);

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0 && childTableDataValid) {
      setIsLoading(true);
      const childVO = childTableData.map((row) => ({
        bin: row.bin,
        partNo: row.partNo,
        partDesc: row.partDesc,
        batchNo: row.batchNo,
        batchDate: row.batchDate,
        lotNo: row.lotNo,
        grnNo: row.grnNo,
        grnDate: row.grnDate,
        sku: row.sku,
        ssku: row.sku,
        fromQty: parseInt(row.avlQty),
        // qty: parseInt(row.qty),
        toBin: row.toBin,
        binClass: row.binClass,
        binType: row.binType,
        remainingQty: row.remainingQty,
        toQty: parseInt(row.toQty),
        toBinClass: row.toBinClass,
        toCellType: row.toCellType,
        toBinType: row.toBinType,
        qcFlag: 'T'
      }));

      const saveFormData = {
        ...(editId && { id: editId }),
        // docId: formData.docId,
        docDate: formData.docDate,
        movedQty: formData.movedQty,
        locationMovementDetailsDTO: childVO,
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
        const response = await apiCalls('put', `locationMovement/createUpdateLocationMovement`, saveFormData);
        if (response.status === true) {
          console.log('Response:', response);
          handleClear();
          showToast('success', editId ? ' Location Movement Updated Successfully' : 'Location Movement created successfully');
          getAllLocationMovement();
          setIsLoading(false);
        } else {
          showToast('error', response.paramObjectsMap.errorMessage || 'Location Movement failed');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Location Movement failed');
        setIsLoading(false);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  const handleView = () => {
    setListView(!listView);
  };

  const handleFullGrid = () => {
    setModalOpen(true);
    getAllFillGrid();
  };
  const handleCloseModal = () => {
    setModalOpen(false);
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
  //   const selectedData = selectedRows.map((index) => modalTableData[index]);

  //   setChildTableData([...childTableData, ...selectedData]);

  //   console.log('Data selected:', selectedData);

  //   setSelectedRows([]);
  //   setSelectAll(false);
  //   handleCloseModal();

  //   try {
  //     await Promise.all(
  //       selectedData.map(async (data, idx) => {
  //         // Simulate the event object for handleToQtyChange
  //         const simulatedEvent = {
  //           target: {
  //             value: data.partNo // Assuming you have a toQty field in your data
  //           }
  //         };

  //         await getPartNo(data.fromBin, data);
  //         await getGrnNo(data.fromBin, data.partNo, data);
  //         await getBatchNo(data.fromBin, data.partNo, data.grnNo, data);
  //         await getAvlQty(data.batchNo, data.fromBin, data.grnNo, data.partNo, data);

  //         handlePartNoChange(data, childTableData.length + idx, simulatedEvent);
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error processing selected data:', error);
  //   }
  // };

  const handleSubmitSelectedRows = async () => {
    const selectedData = selectedRows.map((index) => modalTableData[index]);

    setChildTableData((prev) => [...prev, ...selectedData]);

    console.log('Data selected:', selectedData);

    setSelectedRows([]);
    setSelectAll(false);
    handleCloseModal();

    try {
      await Promise.all(
        selectedData.map(async (data, idx) => {
          const simulatedEvent = {
            target: {
              value: data.partNo
            }
          };

          await getPartNo(data.fromBin, data);
          await getGrnNo(data.fromBin, data.partNo, data);
          await getBatchNo(data.fromBin, data.partNo, data.grnNo, data);
          await getAvlQty(data.batchNo, data.fromBin, data.grnNo, data.partNo, data);

          // handlePartNoChange(data, childTableData.length + idx, simulatedEvent);
        })
      );
    } catch (error) {
      console.error('Error processing selected data:', error);
    }
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
            <CommonListViewTable data={listViewData} columns={listViewColumns} blockEdit={true} toEdit={getLocationMovementById} />
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
                      label="Doc Date"
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
                  label="Moved Qty"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                  name="movedQty"
                  value={formData.movedQty}
                  onChange={handleInputChange}
                  error={!!fieldErrors.movedQty}
                  helperText={fieldErrors.movedQty}
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
                                  <th className="px-2 py-2 text-white text-center">From Bin</th>
                                  <th className="px-2 py-2 text-white text-center">Part No</th>
                                  <th className="px-2 py-2 text-white text-center">Part Desc</th>
                                  <th className="px-2 py-2 text-white text-center">SKU</th>
                                  <th className="px-2 py-2 text-white text-center">GRN No</th>
                                  <th className="px-2 py-2 text-white text-center">Batch No</th>
                                  <th className="px-2 py-2 text-white text-center">Avl Qty</th>
                                  <th className="px-2 py-2 text-white text-center">To Bin</th>
                                  <th className="px-2 py-2 text-white text-center">To Bin Type</th>
                                  <th className="px-2 py-2 text-white text-center">To Qty</th>
                                  <th className="px-2 py-2 text-white text-center">Remaining Qty</th>
                                </tr>
                              </thead>
                              <tbody>
                                {childTableData.length === 0 ? (
                                  <tr>
                                    <td colSpan="18" className="text-center py-2">
                                      No Data Found
                                    </td>
                                  </tr>
                                ) : (
                                  childTableData.map((row, index) => (
                                    <tr key={row.id}>
                                      <td className="border px-2 py-2 text-center">
                                        <ActionButton title="Delete" icon={DeleteIcon} onClick={() => handleDeleteRow(row.id)} />
                                      </td>
                                      <td className="text-center">
                                        <div className="pt-2">{index + 1}</div>
                                      </td>
                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.fromBin}
                                          style={{ width: '130px' }}
                                          onChange={(e) => handleFromBinChange(row, index, e)}
                                          className={childTableErrors[index]?.fromBin ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">--Select--</option>
                                          {fromBinList &&
                                            fromBinList.map((option) => (
                                              <option key={option.fromBin} value={option.fromBin}>
                                                {option.fromBin}
                                              </option>
                                            ))}
                                        </select>

                                        {childTableErrors[index]?.fromBin && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].fromBin}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.partNo}
                                          style={{ width: '130px' }}
                                          onChange={(e) => handlePartNoChange(row, index, e)}
                                          className={childTableErrors[index]?.partNo ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">-- Select --</option>
                                          {Array.isArray(row.rowPartNoList) &&
                                            row.rowPartNoList.map(
                                              (part, idx) =>
                                                part &&
                                                part.partNo && (
                                                  <option key={part.partNo} value={part.partNo}>
                                                    {part.partNo}
                                                  </option>
                                                )
                                            )}
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
                                          value={row.partDesc}
                                          disabled
                                          style={{ width: '200px' }}
                                          className={childTableErrors[index]?.partDesc ? 'error form-control' : 'form-control'}
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          type="text"
                                          value={row.sku}
                                          disabled
                                          style={{ width: '100px' }}
                                          className={childTableErrors[index]?.sku ? 'error form-control' : 'form-control'}
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.grnNo}
                                          style={{ width: '225px' }}
                                          onChange={(e) => handleGrnNoChange(row, index, e)}
                                          className={childTableErrors[index]?.grnNo ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">-- Select --</option>
                                          {Array.isArray(row.rowGrnNoList) &&
                                            row.rowGrnNoList.map(
                                              (grn, idx) =>
                                                grn &&
                                                grn.grnNo && (
                                                  <option key={grn.grnNo} value={grn.grnNo}>
                                                    {grn.grnNo}
                                                  </option>
                                                )
                                            )}
                                        </select>
                                        {childTableErrors[index]?.grnNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].grnNo}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.batchNo}
                                          style={{ width: '200px' }}
                                          onChange={(e) => handleBatchNoChange(row, index, e)}
                                          className={childTableErrors[index]?.batchNo ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">-- Select --</option>
                                          {Array.isArray(row.rowBatchNoList) &&
                                            row.rowBatchNoList.map(
                                              (batch, idx) =>
                                                batch &&
                                                batch.batchNo && (
                                                  <option key={batch.batchNo} value={batch.batchNo}>
                                                    {batch.batchNo}
                                                  </option>
                                                )
                                            )}
                                        </select>
                                        {childTableErrors[index]?.batchNo && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].batchNo}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.avlQty}
                                          className={childTableErrors[index]?.avlQty ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <select
                                          value={row.toBin}
                                          style={{ width: '200px' }}
                                          onChange={(e) => handleToBinChange(row, index, e)}
                                          className={childTableErrors[index]?.toBin ? 'error form-control' : 'form-control'}
                                        >
                                          <option value="">--Select--</option>
                                          {toBinList &&
                                            toBinList.map((option) => (
                                              <option key={option.toBin} value={option.toBin}>
                                                {option.toBin}
                                              </option>
                                            ))}
                                        </select>
                                        {childTableErrors[index]?.toBin && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].toBin}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '200px' }}
                                          type="text"
                                          value={row.toBinType}
                                          className={childTableErrors[index]?.toBinType ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.toQty}
                                          onChange={(e) => handleToQtyChange(e, row, index)} // Use the refactored function
                                          className={childTableErrors[index]?.toQty ? 'error form-control' : 'form-control'}
                                          onKeyDown={(e) => handleKeyDown(e, row, childTableData)}
                                        />
                                        {childTableErrors[index]?.toQty && (
                                          <div className="mt-2" style={{ color: 'red', fontSize: '12px' }}>
                                            {childTableErrors[index].toQty}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border px-2 py-2">
                                        <input
                                          style={{ width: '150px' }}
                                          type="text"
                                          value={row.remainQty}
                                          className={childTableErrors[index]?.remainQty ? 'error form-control' : 'form-control'}
                                          disabled
                                        />
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
                                      <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th className="px-2 py-2 text-white text-center" style={{ width: '50px' }}>
                                      S.No
                                    </th>
                                    <th className="px-2 py-2 text-white text-center">Bin</th>
                                    <th className="px-2 py-2 text-white text-center">Part No</th>
                                    <th className="px-2 py-2 text-white text-center">Part Description</th>
                                    <th className="px-2 py-2 text-white text-center">SKU</th>
                                    <th className="px-2 py-2 text-white text-center">GRN No</th>
                                    <th className="px-2 py-2 text-white text-center">GRN Date</th>
                                    <th className="px-2 py-2 text-white text-center">Batch No</th>
                                    <th className="px-2 py-2 text-white text-center">Lot No</th>
                                    <th className="px-2 py-2 text-white text-center">From Qty</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {modalTableData?.map((row, index) => (
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
                                      <td className="text-center">
                                        <div className="pt-1">{index + 1}</div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.fromBin || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.partNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.partDesc || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>{row.sku || ''}</div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.grnNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.grnDate || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.batchNo || ''}
                                        </div>
                                      </td>
                                      <td className="border p-0">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto', padding: '5px' }}>
                                          {row.avlQty || ''}
                                        </div>
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
export default LocationMovement;
