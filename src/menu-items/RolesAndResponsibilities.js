// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const RolesAndResponsibilities = {
  id: 'rolesAndResponsibilities',
  title: 'Roles Management',
  // caption: 'Company',
  type: 'group',
  children: [
    {
      id: 'rolesAndResponsibilities',
      title: 'Roles And Responsibilities',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'rolesAndResponsibilities',
          title: 'Roles And Responsibilities',
          type: 'item',
          url: '/rolesresponsibility/roles'
          // target: true
        },
        {
          id: 'screenNames',
          title: 'Screen Names',
          type: 'item',
          url: '/rolesresponsibility/screennames'
        }
      ]
    }
  ]
};

export default RolesAndResponsibilities;
