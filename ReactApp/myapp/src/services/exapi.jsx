// src/services/api.js
import axios from 'axios';
import { apiBaseUrl } from './baseUrl';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
