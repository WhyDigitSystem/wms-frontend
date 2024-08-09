// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const basicMasters = {
  id: 'company',
  title: 'Basic Masters',
  // caption: 'Company',
  type: 'group',
  children: [
    {
      id: 'basicMasters',
      title: 'Basic Masters',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'countryMaster',
          title: 'Country',
          type: 'item',
          url: '/basicmasters/countrymaster'
        },
        {
          id: 'stateMaster',
          title: 'State',
          type: 'item',
          url: '/basicmasters/statemaster'
        },
        {
          id: 'cityMaster',
          title: 'City',
          type: 'item',
          url: '/basicmasters/citymaster'
        },
        {
          id: 'customerMaster',
          title: 'Customer',
          type: 'item',
          url: '/basicmasters/customermaster'
        },
        {
          id: 'warehouseMaster',
          title: 'Warehouse',
          type: 'item',
          url: '/basicmasters/warehousemaster'
        },
        {
          id: 'locationTypeMaster',
          title: 'LocationType',
          type: 'item',
          url: '/basicmasters/locationtypemaster'
        },
        {
          id: 'warehouseLocationMaster',
          title: 'Warehouse Location',
          type: 'item',
          url: '/basicmasters/warehouselocationmaster'
        },
        {
          id: 'locationMappingMaster',
          title: 'Location Mapping',
          type: 'item',
          url: '/basicmasters/locationmappingmaster'
        },
        {
          id: 'cellTypeMaster',
          title: 'CellType',
          type: 'item',
          url: '/basicmasters/celltypemaster'
        },
        {
          id: 'employeeMaster',
          title: 'Employee',
          type: 'item',
          url: '/basicmasters/employeemaster'
        },
        {
          id: 'userCreationMaster',
          title: 'User Creation',
          type: 'item',
          url: '/basicmasters/usercreationmaster'
        },
        {
          id: 'itemMaster',
          title: 'Item',
          type: 'item',
          url: '/basicmasters/itemmaster'
        },
        {
          id: 'buyerMaster',
          title: 'Buyer',
          type: 'item',
          url: '/basicmasters/buyermaster'
        },
        {
          id: 'carrierMaster',
          title: 'Carrier',
          type: 'item',
          url: '/basicmasters/carriermaster'
        },
        {
          id: 'supplierMaster',
          title: 'Supplier',
          type: 'item',
          url: '/basicmasters/suppliermaster'
        },
        {
          id: 'externalDataMismatchMaster',
          title: 'External Data Mismatch',
          type: 'item',
          url: '/basicmasters/externaldatamismatchmaster'
        },
        {
          id: 'materialLabelMappingMaster',
          title: 'Material Label Mapping',
          type: 'item',
          url: '/basicmasters/materiallabelmappingmaster'
        },
        {
          id: 'departmentMaster',
          title: 'Department',
          type: 'item',
          url: '/basicmasters/departmentmaster'
        },
        {
          id: 'designationMaster',
          title: 'Designation',
          type: 'item',
          url: '/basicmasters/designationmaster'
        },
        // {
        //   id: 'groupMaster',
        //   title: 'Group',
        //   type: 'item',
        //   url: '/basicmasters/groupmaster'
        // },
        // {
        //   id: 'unitMaster',
        //   title: 'Unit',
        //   type: 'item',
        //   url: '/basicmasters/unitmaster'
        // },
        {
          id: 'currencyMaster',
          title: 'Currency',
          type: 'item',
          url: '/basicmasters/currencymaster'
        },
        {
          id: 'regionMaster',
          title: 'Region',
          type: 'item',
          url: '/basicmasters/regionmaster'
        },
        {
          id: 'documentTypeMaster',
          title: 'Document Type',
          type: 'item',
          url: '/basicmasters/documenttype'
        },
        {
          id: 'documentTypeMappingMaster',
          title: 'DocumentType Mapping',
          type: 'item',
          url: '/basicmasters/documenttypemapping'
        },
        {
          id: 'finYearMaster',
          title: 'Financial Year',
          type: 'item',
          url: '/basicmasters/finyearmaster'
        },
        {
          id: 'fullfeaturedcurdgrid',
          title: 'Grid table',
          type: 'item',
          url: '/basicmasters/fullfeaturedcurdgrid'
        }
      ]
    }
  ]
};

export default basicMasters;

// Assume screenVo is obtained from the API and contains the list of screens to display
// const screenVo = ['country', 'state', 'city', 'customer'];

// const screenMappings = {
//   country: {
//     id: 'countryMaster',
//     title: 'Country',
//     type: 'item',
//     url: '/basicmasters/countrymaster'
//   },
//   state: {
//     id: 'stateMaster',
//     title: 'State Master',
//     type: 'item',
//     url: '/basicmasters/statemaster'
//   },
//   city: {
//     id: 'cityMaster',
//     title: 'City Master',
//     type: 'item',
//     url: '/basicmasters/citymaster'
//   },
//   customer: {
//     id: 'customerMaster',
//     title: 'Customer Master',
//     type: 'item',
//     url: '/basicmasters/customermaster'
//   },
//   warehouse: {
//     id: 'warehouseMaster',
//     title: 'Warehouse Master',
//     type: 'item',
//     url: '/basicmasters/warehousemaster'
//   },
//   locationType: {
//     id: 'locationTypeMaster',
//     title: 'LocationType Master',
//     type: 'item',
//     url: '/basicmasters/locationtypemaster'
//   },
//   warehouseLocation: {
//     id: 'warehouseLocationMaster',
//     title: 'Warehouse Location Master',
//     type: 'item',
//     url: '/basicmasters/warehouselocationmaster'
//   },
//   locationMapping: {
//     id: 'locationMappingMaster',
//     title: 'LocationMapping Master',
//     type: 'item',
//     url: '/basicmasters/locationmappingmaster'
//   },
//   cellType: {
//     id: 'cellTypeMaster',
//     title: 'CellType Master',
//     type: 'item',
//     url: '/basicmasters/celltypemaster'
//   },
//   employee: {
//     id: 'employeeMaster',
//     title: 'Employee Master',
//     type: 'item',
//     url: '/basicmasters/employeemaster'
//   },
//   userCreation: {
//     id: 'userCreationMaster',
//     title: 'User Creation Master',
//     type: 'item',
//     url: '/basicmasters/usercreationmaster'
//   },
//   item: {
//     id: 'itemMaster',
//     title: 'Item Master',
//     type: 'item',
//     url: '/basicmasters/itemmaster'
//   },
//   buyer: {
//     id: 'buyerMaster',
//     title: 'Buyer Master',
//     type: 'item',
//     url: '/basicmasters/buyermaster'
//   },
//   carrier: {
//     id: 'carrierMaster',
//     title: 'Carrier Master',
//     type: 'item',
//     url: '/basicmasters/carriermaster'
//   },
//   supplier: {
//     id: 'supplierMaster',
//     title: 'Supplier Master',
//     type: 'item',
//     url: '/basicmasters/suppliermaster'
//   },
//   externalDataMismatch: {
//     id: 'externalDataMismatchMaster',
//     title: 'External Data Mismatch Master',
//     type: 'item',
//     url: '/basicmasters/externaldatamismatchmaster'
//   },
//   materialLabelMapping: {
//     id: 'materialLabelMappingMaster',
//     title: 'Material Label Mapping Master',
//     type: 'item',
//     url: '/basicmasters/materiallabelmappingmaster'
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
