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
          title: 'State Master',
          type: 'item',
          url: '/basicmasters/statemaster'
        },
        {
          id: 'cityMaster',
          title: 'City Master',
          type: 'item',
          url: '/basicmasters/citymaster'
        },
        {
          id: 'customerMaster',
          title: 'Customer Master',
          type: 'item',
          url: '/basicmasters/customermaster'
        },
        {
          id: 'warehouseMaster',
          title: 'Warehouse Master',
          type: 'item',
          url: '/basicmasters/warehousemaster'
        },
        {
          id: 'locationTypeMaster',
          title: 'LocationType Master',
          type: 'item',
          url: '/basicmasters/locationtypemaster'
        },
        {
          id: 'warehouseLocationMaster',
          title: 'Warehouse Location Master',
          type: 'item',
          url: '/basicmasters/warehouselocationmaster'
        },
        {
          id: 'locationMappingMaster',
          title: 'LocationMapping Master',
          type: 'item',
          url: '/basicmasters/locationmappingmaster'
        },
        {
          id: 'cellTypeMaster',
          title: 'CellType Master',
          type: 'item',
          url: '/basicmasters/celltypemaster'
        },
        {
          id: 'employeeMaster',
          title: 'Employee Master',
          type: 'item',
          url: '/basicmasters/employeemaster'
        },
        {
          id: 'userCreationMaster',
          title: 'User Creation Master',
          type: 'item',
          url: '/basicmasters/usercreationmaster'
        }
      ]
    }
  ]
};

export default basicMasters;
