import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const CreateCompany = Loadable(lazy(() => import('views/pages/companySetup/CreateCompany')));
const CompanySetup = Loadable(lazy(() => import('views/pages/companySetup/CompanySetup')));
const CountryMaster = Loadable(lazy(() => import('views/pages/basic-masters/CountryMaster')));
const StateMaster = Loadable(lazy(() => import('views/pages/basic-masters/StateMaster')));
const CityMaster = Loadable(lazy(() => import('views/pages/basic-masters/CityMaster')));
const CustomerMaster = Loadable(lazy(() => import('views/pages/basic-masters/CustomerMaster')));
const FullFeaturedCrudGrid = Loadable(lazy(() => import('views/pages/basic-masters/FullFeaturedCrudGrid')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const WMSRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/companysetup/createcompany',
      element: <CreateCompany />
    },
    {
      path: '/companysetup/companysetup',
      element: <CompanySetup />
    },
    {
      path: '/basicmasters/countrymaster',
      element: <CountryMaster />
    },
    {
      path: '/basicmasters/statemaster',
      element: <StateMaster />
    },
    {
      path: '/basicmasters/citymaster',
      element: <CityMaster />
    },
    {
      path: '/basicmasters/customermaster',
      element: <CustomerMaster />
    },
    {
      path: '/basicmasters/editabletable',
      element: <FullFeaturedCrudGrid />
    }
  ]
};

export default WMSRoutes;
