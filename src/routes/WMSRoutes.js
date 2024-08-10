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
const CountryMaster = Loadable(lazy(() => import('views/pages/warehouse-masters/CountryMaster')));
const StateMaster = Loadable(lazy(() => import('views/pages/warehouse-masters/StateMaster')));
const CityMaster = Loadable(lazy(() => import('views/pages/warehouse-masters/CityMaster')));
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
const UnitMaster = Loadable(lazy(() => import('views/pages/warehouse-masters/UnitMaster')));
const CurrencyMaster = Loadable(lazy(() => import('views/pages/warehouse-masters/CurrencyMaster')));
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
      path: '/warehousemasters/customermaster',
      element: <CustomerMaster />
    },
    {
      path: '/warehousemasters/warehousemaster',
      element: <WarehouseMaster />
    },
    {
      path: '/warehousemasters/locationtypemaster',
      element: <LocationTypeMaster />
    },
    {
      path: '/warehousemasters/warehouselocationmaster',
      element: <WarehouseLocationMaster />
    },
    {
      path: '/warehousemasters/locationmappingmaster',
      element: <LocationMappingMaster />
    },
    {
      path: '/warehousemasters/celltypemaster',
      element: <CellTypeMaster />
    },
    {
      path: '/warehousemasters/employeemaster',
      element: <EmployeeMaster />
    },
    {
      path: '/warehousemasters/usercreationmaster',
      element: <UserCreationMaster />
    },
    {
      path: '/warehousemasters/itemmaster',
      element: <ItemMaster />
    },
    {
      path: '/warehousemasters/buyermaster',
      element: <BuyerMaster />
    },
    {
      path: '/warehousemasters/carriermaster',
      element: <CarrierMaster />
    },
    {
      path: '/warehousemasters/suppliermaster',
      element: <SupplierMaster />
    },
    {
      path: '/warehousemasters/externaldatamismatchmaster',
      element: <ExternalDataMismatch />
    },
    {
      path: '/warehousemasters/materiallabelmappingmaster',
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
      path: '/warehousemasters/departmentmaster',
      element: <DepartmentMaster />
    },
    {
      path: '/warehousemasters/designationmaster',
      element: <DesignationMaster />
    },
    {
      path: '/warehousemasters/groupmaster',
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
      path: '/warehousemasters/documenttype',
      element: <DocumentTypeMaster />
    },
    {
      path: '/warehousemasters/documenttypemapping',
      element: <DocumentTypeMappingMaster />
    },
    {
      path: '/warehousemasters/finyearmaster',
      element: <FinYearMaster />
    },
    {
      path: '/basicmasters/fullfeaturedcurdgrid',
      element: <FullFeaturedCrudGrid />
    }
  ]
};

export default WMSRoutes;
