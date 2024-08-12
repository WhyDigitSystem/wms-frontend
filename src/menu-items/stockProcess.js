// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const stockProcess = {
  id: 'stockProcess',
  title: 'Stock Process',
  type: 'group',
  children: [
    {
      id: 'stockProcess',
      title: 'Stock Process',
      type: 'item',
      url: '/stock-process/stockprocessmain',
      icon: icons.IconDashboard
    }
  ]
};

export default stockProcess;
