import React from 'react';
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
import { date } from 'yup';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ActionButton from 'utils/ActionButton';
import { showToast } from 'utils/toast-component';
import CommonListViewTable from '../basic-masters/CommonListViewTable';
import { log } from 'util';
const DeKitting = () => {
  const [formData, setFormData] = useState({
    docId: '',
    docDate: dayjs()
  });
  const [fieldError, setFieldError] = useState({
    docId: '',
    docDate: dayjs()
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const [dekittingParent, setDekittingParent] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      batchNo: '',
      lotNo: '',
      sku: '',
      Bin: '',
      grnNo: '',
      grnDate: null,
      expDate: null,
      qty: ''
    }
  ]);
  const [dekittingChild, setDekittingChild] = useState([
    {
      id: 1,
      partNo: '',
      partDesc: '',
      batchNo: '',
      lotNo: '',
      sku: '',
      Bin: '',
      grnNo: '',
      grnDate: null,
      expDate: null,
      qty: ''
    }
  ]);

  const handledekittingParentNewRow = () => {
    setDekittingParent([
      ...dekittingParent,
      {
        // id: Date.now(),
        id: dekittingParent.length + 1,
        partNo: '',
        partDesc: '',
        batchNo: '',
        lotNo: '',
        sku: '',
        Bin: '',
        grnNo: '',
        grnDate: null,
        expDate: null,
        qty: ''
      }
    ]);
  };
  const handledekittingChildNewRow = () => {
    setDekittingChild([
      ...dekittingChild,
      {
        // id: Date.now(),
        id: dekittingChild.length + 1,
        partNo: '',
        partDesc: '',
        batchNo: '',
        lotNo: '',
        sku: '',
        Bin: '',
        grnNo: '',
        grnDate: null,
        expDate: null,
        qty: ''
      }
    ]);
  };

  const handleClear = () => {
    setFormData({
      docId: '',
      docDate: dayjs()
    });
  };
  const handleClearhandledekittingParent = () => {
    setDekittingParent([]);
  };
  const handleClearhandledekittingChild = () => {
    setDekittingChild([]);
  };

  const handleView = () => {};

  // Table
  const handleDeleteRow = (id, table, setTable) => {
    setTable(table.filter((row) => row.id !== id));
  };

  const handleInputChange = () => {};

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = (row, index) => {
    console.log(dekittingParent);
    console.log(dekittingChild);
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
                <TextField
                  label="Doc ID"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="docId"
                  type="text"
                  value={formData.docId}
                  disabled
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
                  <Tab value={0} label="DekittingParent" />
                  <Tab value={1} label="DekittingChild" />
                </Tabs>
              </Box>
              <Box sx={{ padding: 2 }}>
                {value === 0 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handledekittingParentNewRow} />
                        <ActionButton title="Clear" icon={ClearIcon} onClick={handleClearhandledekittingParent} />
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
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    Lot No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    SKU
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Bin
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    GRN No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    GRN Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Qty
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {dekittingParent.map((row, index) => (
                                  <tr>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, dekittingParent, setDekittingParent)}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) => prev.map((r) => (r.id === row.id ? { ...r, partNo: value } : r)));
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.partDesc}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, partDesc: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) => prev.map((r) => (r.id === row.id ? { ...r, batchNo: value } : r)));
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) => prev.map((r) => (r.id === row.id ? { ...r, lotNo: value } : r)));
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.sku}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, sku: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.Bin}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, Bin: value.toUpperCase() } : r))
                                          );
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.grnNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, grnNo: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="date"
                                        value={row.grnDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, grnDate: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="date"
                                        value={row.expDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, expDate: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.qty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingParent((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, qty: value.toUpperCase() } : r))
                                          );
                                        }}
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
                {value === 1 && (
                  <>
                    <div className="row d-flex ml">
                      <div className="mb-1">
                        <ActionButton title="Add" icon={AddIcon} onClick={handledekittingChildNewRow} />
                        <ActionButton title="Clear" icon={ClearIcon} onClick={handleClearhandledekittingChild} />
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
                                    Batch No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    Lot No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Sku
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Bin
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '250px' }}>
                                    GRN No
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    GRN Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Exp Date
                                  </th>
                                  <th className="px-2 py-2 text-white text-center" style={{ width: '200px' }}>
                                    Qty
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {dekittingChild.map((row, index) => (
                                  <tr>
                                    <td className="border px-2 py-2 text-center">
                                      <ActionButton
                                        title="Delete"
                                        icon={DeleteIcon}
                                        onClick={() => handleDeleteRow(row.id, dekittingChild, setDekittingChild)}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <div className="pt-2">{index + 1}</div>
                                    </td>
                                    <td className="border px-2 py-2">
                                      <select
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) => prev.map((r) => (r.id === row.id ? { ...r, partNo: value } : r)));
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.partDesc}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, partDesc: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) => prev.map((r) => (r.id === row.id ? { ...r, batchNo: value } : r)));
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        style={{ width: '150px' }}
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) => prev.map((r) => (r.id === row.id ? { ...r, lotNo: value } : r)));
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.sku}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, sku: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <select
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.Bin}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, Bin: value.toUpperCase() } : r))
                                          );
                                        }}
                                      >
                                        <option value="">-- Select --</option>
                                        <option value="1">-- 1 --</option>
                                        <option value="2">-- 2 --</option>
                                        <option value="3">-- 3 --</option>
                                        <option value="4">-- 4 --</option>
                                      </select>
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.grnNo}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, grnNo: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="date"
                                        value={row.grnDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, grnDate: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        disabled
                                        style={{ width: '150px' }}
                                        type="date"
                                        value={row.expDate}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, expDate: value.toUpperCase() } : r))
                                          );
                                        }}
                                      />
                                    </td>

                                    <td className="border px-2 py-2">
                                      <input
                                        className={index?.bin ? 'error form-control' : 'form-control'}
                                        style={{ width: '150px' }}
                                        type="text"
                                        value={row.qty}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setDekittingChild((prev) =>
                                            prev.map((r) => (r.id === row.id ? { ...r, qty: value.toUpperCase() } : r))
                                          );
                                        }}
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

export default DeKitting;
