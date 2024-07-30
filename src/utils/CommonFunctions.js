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
