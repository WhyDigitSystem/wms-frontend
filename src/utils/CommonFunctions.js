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
