// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'organization',
  title: 'Organization',
  // caption: 'Company',
  type: 'group',
  children: [
    {
      id: 'companySetup',
      title: 'Company Setup',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'company',
          title: 'Create Company',
          type: 'item',
          url: '/companysetup/createcompany'
          // target: true
        },
        {
          id: 'companySetup',
          title: 'Company Setup',
          type: 'item',
          url: '/companysetup/companysetup'
        }
      ]
    }
  ]
};

export default pages;
