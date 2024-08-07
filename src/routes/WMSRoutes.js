import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import RolesandResponsibilitySetup from 'views/pages/rolesandResponsibility/RolesandResponsibilitySetup';

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
const DepartmentMaster = Loadable(lazy(() => import('views/pages/basic-masters/DepartmentMaster')));
const DesignationMaster = Loadable(lazy(() => import('views/pages/basic-masters/DesignationMaster')));
const GroupMaster = Loadable(lazy(() => import('views/pages/basic-masters/GroupMaster')));
const UnitMaster = Loadable(lazy(() => import('views/pages/basic-masters/UnitMaster')));
const CurrencyMaster = Loadable(lazy(() => import('views/pages/basic-masters/CurrencyMaster')));
const RegionMaster = Loadable(lazy(() => import('views/pages/basic-masters/RegionMaster')));
const DocumentTypeMaster = Loadable(lazy(() => import('views/pages/basic-masters/DocumentTypeMaster')));
const DocumentTypeMappingMaster = Loadable(lazy(() => import('views/pages/basic-masters/DocumentTypeMappingMaster')));
const FinYearMaster = Loadable(lazy(() => import('views/pages/basic-masters/FinYearMaster')));
const Roles = Loadable(lazy(() => import('views/pages/rolesandResponsibility/Roles')));
const ScreenNames = Loadable(lazy(() => import('views/pages/rolesandResponsibility/ScreenNames')));
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
      path: '/rolesresponsibility/rolesandresponse',
      element: <RolesandResponsibilitySetup />
    },
    {
      path: '/rolesresponsibility/screennames',
      element: <ScreenNames />
    },
    {
      path: '/basicmasters/departmentmaster',
      element: <DepartmentMaster />
    },
    {
      path: '/basicmasters/designationmaster',
      element: <DesignationMaster />
    },
    {
      path: '/basicmasters/groupmaster',
      element: <GroupMaster />
    },
    {
      path: '/basicmasters/unitmaster',
      element: <UnitMaster />
    },
    {
      path: '/basicmasters/currencymaster',
      element: <CurrencyMaster />
    },
    {
      path: '/basicmasters/regionmaster',
      element: <RegionMaster />
    },
    {
      path: '/basicmasters/documenttype',
      element: <DocumentTypeMaster />
    },
    {
      path: '/basicmasters/documenttypemapping',
      element: <DocumentTypeMappingMaster />
    },
    {
      path: '/basicmasters/finyearmaster',
      element: <FinYearMaster />
    },
    {
      path: '/basicmasters/fullfeaturedcurdgrid',
      element: <FullFeaturedCrudGrid />
    }
  ]
};

export default WMSRoutes;
