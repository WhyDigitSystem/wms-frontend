// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const outbound = {
  id: 'outbound',
  title: 'Outbound',
  type: 'group',
  children: [
    {
      id: 'outbound',
      title: 'Outbound',
      type: 'item',
      url: '/outbound/outboundmain',
      icon: icons.IconDashboard
    }
  ]
};

export default outbound;
