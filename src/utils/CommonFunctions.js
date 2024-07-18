import axios from 'axios';

export const getAllActiveCountries = async (orgId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commonmaster/country?orgid=${orgId}`);
    if (response.status === 200) {
      const countryData = response.data.paramObjectsMap.countryVO
        .filter((row) => row.active === 'Active')
        .map(({ id, countryName, countryCode }) => ({ id, countryName, countryCode }));

      return countryData;
    } else {
      console.error('API Error:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
