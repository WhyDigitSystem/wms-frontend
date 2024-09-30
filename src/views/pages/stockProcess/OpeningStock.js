import React from 'react';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CommonBulkUpload from 'utils/CommonBulkUpload';
import sampleFile from '../../../assets/sample-files/Sample_Opening_Stock_Upload.xlsx';
import ClearIcon from '@mui/icons-material/Clear';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import ActionButton from 'utils/ActionButton';
import ToastComponent from 'utils/toast-component';

const OpeningStock = () => {
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [editId, setEditId] = useState('');
  const [loginUserName, setLoginUserName] = useState(localStorage.getItem('userName'));
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));
  const [warehouse, setWarehouse] = useState(localStorage.getItem('warehouse'));
  const [branch, setBranch] = useState(localStorage.getItem('branch'));
  const [branchCode, setBranchCode] = useState(localStorage.getItem('branchcode'));
  const [client, setClient] = useState(localStorage.getItem('client'));
  const [finYear, setFinYear] = useState(localStorage.getItem('finYear'));
  const [uploadOpen, setUploadOpen] = useState(true);

  useEffect(() => {}, []);

  const handleBulkUploadOpen = () => {
    setUploadOpen(true); // Open dialog
  };

  const handleBulkUploadClose = () => {
    setUploadOpen(false); // Close dialog
  };

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
    handleBulkUploadClose();
  };

  return (
    <>
      <div className="card w-full p-6 bg-base-100 shadow-xl" style={{ padding: '20px', borderRadius: '10px' }}>
        <div className="row d-flex ml">
          <div className="d-flex flex-wrap justify-content-start mb-4" style={{ marginBottom: '20px' }}>
            <ActionButton title="Search" icon={SearchIcon} onClick={() => console.log('Search Clicked')} />
            <ActionButton
              title="Clear"
              icon={ClearIcon}
              // onClick={handleClear}
            />
            <ActionButton
              title="List View"
              icon={FormatListBulletedTwoToneIcon}
              // onClick={handleView}
            />
            <ActionButton
              title="Save"
              icon={SaveIcon}
              isLoading={isLoading}
              // onClick={() => handleSave()}
            />
            <ActionButton title="Upload" icon={CloudUploadIcon} onClick={handleBulkUploadOpen} />
          </div>
        </div>
        {uploadOpen && (
          <CommonBulkUpload
            open={uploadOpen}
            handleClose={handleBulkUploadClose}
            title="Upload Files"
            uploadText="Upload file"
            downloadText="Sample File"
            onSubmit={handleSubmit}
            sampleFileDownload={sampleFile}
            handleFileUpload={handleFileUpload}
            apiUrl={`Reports/OpeningStockUpload?branch=${branch}&branchCode=${branchCode}&client=${client}&createdBy=${loginUserName}&customer=${customer}&finYear=${finYear}&orgId=${orgId}&warehouse=${warehouse}`}
            screen="Opening Stock"
          ></CommonBulkUpload>
        )}
      </div>
      <ToastComponent />{' '}
    </>
  );
};

export default OpeningStock;
