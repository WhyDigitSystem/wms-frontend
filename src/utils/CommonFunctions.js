import { TroubleshootRounded } from '@mui/icons-material';
import apiCalls from 'apicall';
import axios from 'axios';

export const getAllActiveCountries = async (orgId) => {
  try {
    const response = await apiCalls('get', `commonmaster/country?orgid=${orgId}`);
    if (response.status === true) {
      const countryData = response.paramObjectsMap.countryVO
        .filter((row) => row.active === 'Active')
        .map(({ id, countryName, countryCode }) => ({ id, countryName, countryCode }));

      return countryData;
    } else {
      console.error('API Error:', response);
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveStatesByCountry = async (country, orgId) => {
  try {
    const response = await apiCalls('get', `commonmaster/state/country?country=${country}&orgid=${orgId}`);
    if (response.status === true) {
      const countryData = response.paramObjectsMap.stateVO
        .filter((row) => row.active === 'Active')
        .map(({ id, country, stateCode, stateName }) => ({ id, country, stateCode, stateName }));

      return countryData;
    } else {
      console.error('API Error:', response);
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveCitiesByState = async (state, orgId) => {
  try {
    const response = await apiCalls('get', `commonmaster/city/state?orgid=${orgId}&state=${state}`);
    if (response.status === true) {
      const cityData = response.paramObjectsMap.cityVO
        .filter((row) => row.active === 'Active')
        .map(({ id, cityName, cityCode }) => ({ id, cityName, cityCode }));

      return cityData;
    } else {
      console.error('API Error:', response);
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveBranches = async (orgId) => {
  try {
    const response = await apiCalls('get', `warehousemastercontroller/branch?orgid=${orgId}`);
    if (response.status === true) {
      const branchData = response.paramObjectsMap.branchVO
        .filter((row) => row.active === 'Active')
        .map(({ id, branch, branchCode }) => ({ id, branch, branchCode }));

      return branchData;
    } else {
      console.error('API Error:', response);
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveEmployees = async (orgId) => {
  try {
    const response = await apiCalls('get', `warehousemastercontroller/getAllEmployeeByOrgId?orgId=${orgId}`);
    if (response.status === true) {
      const empData = response.paramObjectsMap.employeeVO
        .filter((row) => row.active === 'Active')
        .map(({ id, employeeName, employeeCode }) => ({ id, employeeName, employeeCode }));
      return empData;
    } else {
      console.error('API Error:');
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveUnits = async (orgId) => {
  try {
    const response = await apiCalls('get', `warehousemastercontroller/getAllUnitByOrgId?orgid=${orgId}`);
    if (response.status === true) {
      const unitData = response.paramObjectsMap.unitVO
        .filter((row) => row.active === 'Active')
        .map(({ id, unitName, unitType }) => ({ id, unitName, unitType }));
      return unitData;
    } else {
      console.error('API Error:');
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveRegions = async (orgId) => {
  try {
    const response = await apiCalls('get', `commonmaster/getAllRegionsByOrgId?orgId=${orgId}`);
    if (response.status === true) {
      const empData = response.paramObjectsMap.regionVO
        .filter((row) => row.active === 'Active')
        .map(({ id, regionName, regionCode }) => ({ id, regionName, regionCode }));
      return empData;
    } else {
      console.error('API Error:');
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveGroups = async (orgId) => {
  try {
    const response = await apiCalls('get', `warehousemastercontroller/group?orgid=${orgId}`);
    if (response.status === true) {
      const groupData = response.paramObjectsMap.groupVO
        .filter((row) => row.active === 'Active')
        .map(({ id, groupName }) => ({ id, groupName }));
      return groupData;
    } else {
      console.error('API Error:');
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const getAllActiveLocationTypes = async (orgId) => {
  try {
    const response = await apiCalls('get', `warehousemastercontroller/locationType?orgid=${orgId}`);
    if (response.status === true) {
      const locationTypeData = response.paramObjectsMap.locationTypeVO
        .filter((row) => row.active === true)
        .map(({ id, binType }) => ({ id, binType }));
      return locationTypeData;
    } else {
      console.error('API Error:');
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
