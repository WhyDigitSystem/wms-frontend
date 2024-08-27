import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import company from './company';
import basicMasters from './basicMasters';
import warehouseMasters from './warehouseMasters';
import RolesAndResponsibilities from './RolesAndResponsibilities';
import inbound from './inbound';
import outbound from './outbound';
import vas from './vas';
import stockProcess from './stockProcess';
import UiChangeSamples from './UiChangeSamples';

const loginUserRole = localStorage.getItem('ROLE');

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  // items: [dashboard, pages, utilities, other, company, basicMasters]
  // items: [dashboard, ...(loginUserRole === 'PRODUCT_ADMIN' ? [company] : [basicMasters])]
  items: [
    dashboard,
    company,
    basicMasters,
    warehouseMasters,
    RolesAndResponsibilities,
    inbound,
    outbound,
    vas,
    stockProcess,
    UiChangeSamples
  ]
};

export default menuItems;
