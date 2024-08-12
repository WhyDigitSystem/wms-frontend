// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const inbound = {
  id: 'inbound',
  title: 'Inbound',
  type: 'group',
  children: [
    {
      id: 'inbound',
      title: 'Inbound',
      type: 'item',
      url: '/inbound/inboundmain',
      icon: icons.IconDashboard
    }
  ]
};

export default inbound;
