// assets

import { IconCopyright } from '@tabler/icons-react';

import { IconSettingsPlus, IconSquareRoundedPlus } from '@tabler/icons-react';
// constant
const icons = {
  IconCopyright
};

const icons1 = {
  IconSquareRoundedPlus
};
const icons2 = {
  IconSettingsPlus
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
      icon: icons.IconCopyright,

      children: [
        {
          id: 'company',
          title: 'Create Company',
          type: 'item',
          url: '/companysetup/createcompany',
          // target: true
          icon: icons1.IconSquareRoundedPlus
        },
        {
          id: 'companySetup',
          title: 'Company Setup',
          type: 'item',
          url: '/companysetup/companysetup',
          icon: icons2.IconSettingsPlus
        }
      ]
    }
  ]
};

export default pages;
