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
const WarehouseMaster = Loadable(lazy(() => import('views/pages/basic-masters/WarehouseMaster')));
const LocationTypeMaster = Loadable(lazy(() => import('views/pages/basic-masters/LocationTypeMaster')));
const WarehouseLocationMaster = Loadable(lazy(() => import('views/pages/basic-masters/WarehouseLocationMaster')));
const LocationMappingMaster = Loadable(lazy(() => import('views/pages/basic-masters/LocationMappingMaster')));
const CellTypeMaster = Loadable(lazy(() => import('views/pages/basic-masters/CellTypeMaster')));
const EmployeeMaster = Loadable(lazy(() => import('views/pages/basic-masters/EmployeeMaster')));
const UserCreationMaster = Loadable(lazy(() => import('views/pages/basic-masters/UserCreationMaster')));
const ItemMaster = Loadable(lazy(() => import('views/pages/basic-masters/ItemMaster')));
const BuyerMaster = Loadable(lazy(() => import('views/pages/basic-masters/BuyerMaster')));
const CarrierMaster = Loadable(lazy(() => import('views/pages/basic-masters/CarrierMaster')));
const SupplierMaster = Loadable(lazy(() => import('views/pages/basic-masters/SupplierMaster')));
const ExternalDataMismatch = Loadable(lazy(() => import('views/pages/basic-masters/ExternalDataMismatch')));
const MaterialLabelMappingMaster = Loadable(lazy(() => import('views/pages/basic-masters/MaterialLabelMappingMaster')));
const Roles = Loadable(lazy(() => import('views/pages/rolesandResponsibility/Roles')));
const ScreenNames = Loadable(lazy(() => import('views/pages/rolesandResponsibility/ScreenNames')));

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
      path: '/basicmasters/warehousemaster',
      element: <WarehouseMaster />
    },
    {
      path: '/basicmasters/locationtypemaster',
      element: <LocationTypeMaster />
    },
    {
      path: '/basicmasters/warehouselocationmaster',
      element: <WarehouseLocationMaster />
    },
    {
      path: '/basicmasters/locationmappingmaster',
      element: <LocationMappingMaster />
    },
    {
      path: '/basicmasters/celltypemaster',
      element: <CellTypeMaster />
    },
    {
      path: '/basicmasters/employeemaster',
      element: <EmployeeMaster />
    },
    {
      path: '/basicmasters/usercreationmaster',
      element: <UserCreationMaster />
    },
    {
      path: '/basicmasters/itemmaster',
      element: <ItemMaster />
    },
    {
      path: '/basicmasters/buyermaster',
      element: <BuyerMaster />
    },
    {
      path: '/basicmasters/carriermaster',
      element: <CarrierMaster />
    },
    {
      path: '/basicmasters/suppliermaster',
      element: <SupplierMaster />
    },
    {
      path: '/basicmasters/externaldatamismatchmaster',
      element: <ExternalDataMismatch />
    },
    {
      path: '/basicmasters/materiallabelmappingmaster',
      element: <MaterialLabelMappingMaster />
    },
    {
      path: '/rolesresponsibility/roles',
      element: <Roles />
    },
    {
      path: '/rolesresponsibility/screennames',
      element: <ScreenNames />
    }
  ]
};

export default WMSRoutes;
