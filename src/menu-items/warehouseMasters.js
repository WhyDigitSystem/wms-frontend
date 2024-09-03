// assets

import { IconBuildingWarehouse } from '@tabler/icons-react';

// constant
const icons = {
  IconBuildingWarehouse
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const warehouseMasters = {
  id: 'warehouseMasters',
  title: 'warehouse Masters',
  // caption: 'Company',
  type: 'group',
  children: [
    {
      id: 'warehouseMasters',
      title: 'Warehouse Masters',
      type: 'collapse',
      icon: icons.IconBuildingWarehouse,

      children: [
        {
          id: 'customerMaster',
          title: 'Customer',
          type: 'item',
          url: '/warehousemasters/customermaster'
        },
        {
          id: 'warehouseMaster',
          title: 'Warehouse',
          type: 'item',
          url: '/warehousemasters/warehousemaster'
        },
        {
          id: 'locationTypeMaster',
          title: 'Bin Type',
          type: 'item',
          url: '/warehousemasters/locationtypemaster'
        },
        {
          id: 'warehouseLocationMaster',
          title: 'Warehouse Location',
          type: 'item',
          url: '/warehousemasters/warehouselocationmaster'
        },
        {
          id: 'locationMappingMaster',
          title: 'Bin Mapping',
          type: 'item',
          url: '/warehousemasters/locationmappingmaster'
        },
        {
          id: 'cellTypeMaster',
          title: 'Bin Category',
          type: 'item',
          url: '/warehousemasters/celltypemaster'
        },
        {
          id: 'employeeMaster',
          title: 'Employee',
          type: 'item',
          url: '/warehousemasters/employeemaster'
        },
        {
          id: 'userCreationMaster',
          title: 'User Creation',
          type: 'item',
          url: '/warehousemasters/usercreationmaster'
        },
        {
          id: 'itemMaster',
          title: 'Item',
          type: 'item',
          url: '/warehousemasters/itemmaster'
        },
        {
          id: 'buyerMaster',
          title: 'Buyer',
          type: 'item',
          url: '/warehousemasters/buyermaster'
        },
        {
          id: 'carrierMaster',
          title: 'Carrier',
          type: 'item',
          url: '/warehousemasters/carriermaster'
        },
        {
          id: 'supplierMaster',
          title: 'Supplier',
          type: 'item',
          url: '/warehousemasters/suppliermaster'
        },
        {
          id: 'externalDataMismatchMaster',
          title: 'External Data Mismatch',
          type: 'item',
          url: '/warehousemasters/externaldatamismatchmaster'
        },
        {
          id: 'materialLabelMappingMaster',
          title: 'Material Label Mapping',
          type: 'item',
          url: '/warehousemasters/materiallabelmappingmaster'
        },
        {
          id: 'departmentMaster',
          title: 'Department',
          type: 'item',
          url: '/warehousemasters/departmentmaster'
        },
        {
          id: 'designationMaster',
          title: 'Designation',
          type: 'item',
          url: '/warehousemasters/designationmaster'
        },
        {
          id: 'unitMaster',
          title: 'Unit',
          type: 'item',
          url: '/warehousemasters/unitmaster'
        },
        {
          id: 'groupMaster',
          title: 'Group',
          type: 'item',
          url: '/warehousemasters/groupmaster'
        },
        {
          id: 'documentTypeMaster',
          title: 'Document Type',
          type: 'item',
          url: '/warehousemasters/documenttype'
        },
        {
          id: 'documentTypeMappingMaster',
          title: 'DocumentType Mapping',
          type: 'item',
          url: '/warehousemasters/documenttypemapping'
        },
        {
          id: 'finYearMaster',
          title: 'Financial Year',
          type: 'item',
          url: '/warehousemasters/finyearmaster'
        }
      ]
    }
  ]
};

export default warehouseMasters;

// Assume screenVo is obtained from the API and contains the list of screens to display
// const screenVo = ['country', 'state', 'city', 'customer'];

// const screenMappings = {
//   country: {
//     id: 'countryMaster',
//     title: 'Country',
//     type: 'item',
//     url: '/warehousemasters/countrymaster'
//   },
//   state: {
//     id: 'stateMaster',
//     title: 'State Master',
//     type: 'item',
//     url: '/warehousemasters/statemaster'
//   },
//   city: {
//     id: 'cityMaster',
//     title: 'City Master',
//     type: 'item',
//     url: '/warehousemasters/citymaster'
//   },
//   customer: {
//     id: 'customerMaster',
//     title: 'Customer Master',
//     type: 'item',
//     url: '/warehousemasters/customermaster'
//   },
//   warehouse: {
//     id: 'warehouseMaster',
//     title: 'Warehouse Master',
//     type: 'item',
//     url: '/warehousemasters/warehousemaster'
//   },
//   locationType: {
//     id: 'locationTypeMaster',
//     title: 'LocationType Master',
//     type: 'item',
//     url: '/warehousemasters/locationtypemaster'
//   },
//   warehouseLocation: {
//     id: 'warehouseLocationMaster',
//     title: 'Warehouse Location Master',
//     type: 'item',
//     url: '/warehousemasters/warehouselocationmaster'
//   },
//   locationMapping: {
//     id: 'locationMappingMaster',
//     title: 'LocationMapping Master',
//     type: 'item',
//     url: '/warehousemasters/locationmappingmaster'
//   },
//   cellType: {
//     id: 'cellTypeMaster',
//     title: 'CellType Master',
//     type: 'item',
//     url: '/warehousemasters/celltypemaster'
//   },
//   employee: {
//     id: 'employeeMaster',
//     title: 'Employee Master',
//     type: 'item',
//     url: '/warehousemasters/employeemaster'
//   },
//   userCreation: {
//     id: 'userCreationMaster',
//     title: 'User Creation Master',
//     type: 'item',
//     url: '/warehousemasters/usercreationmaster'
//   },
//   item: {
//     id: 'itemMaster',
//     title: 'Item Master',
//     type: 'item',
//     url: '/warehousemasters/itemmaster'
//   },
//   buyer: {
//     id: 'buyerMaster',
//     title: 'Buyer Master',
//     type: 'item',
//     url: '/warehousemasters/buyermaster'
//   },
//   carrier: {
//     id: 'carrierMaster',
//     title: 'Carrier Master',
//     type: 'item',
//     url: '/warehousemasters/carriermaster'
//   },
//   supplier: {
//     id: 'supplierMaster',
//     title: 'Supplier Master',
//     type: 'item',
//     url: '/warehousemasters/suppliermaster'
//   },
//   externalDataMismatch: {
//     id: 'externalDataMismatchMaster',
//     title: 'External Data Mismatch Master',
//     type: 'item',
//     url: '/warehousemasters/externaldatamismatchmaster'
//   },
//   materialLabelMapping: {
//     id: 'materialLabelMappingMaster',
//     title: 'Material Label Mapping Master',
//     type: 'item',
//     url: '/warehousemasters/materiallabelmappingmaster'
//   }
// };

// // Filter the screen mappings based on the screenVo array
// const filteredChildren = screenVo.map((screen) => screenMappings[screen]);

// const basicMasters = {
//   id: 'company',
//   title: 'Basic Masters',
//   type: 'group',
//   children: [
//     {
//       id: 'basicMasters',
//       title: 'Basic Masters',
//       type: 'collapse',
//       icon: icons.IconKey,
//       children: filteredChildren
//     }
//   ]
// };

// export default basicMasters;
