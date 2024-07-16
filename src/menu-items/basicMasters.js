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
          url: '/basicmasters/countrymaster',
          // target: true
          breadcrumbs: true
        },
        {
          id: 'stateMaster',
          title: 'StateMaster',
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
          id: 'editableTable',
          title: 'Full Featured Crud Grid',
          type: 'item',
          url: '/basicmasters/editabletable'
        }
      ]
    }
  ]
};

export default basicMasters;
