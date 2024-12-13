// src/store/cust/customerActions.js
import axios from 'axios';

export const fetchCustomers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
  try {
    const response = await axios.get('http://localhost:5000/customers');
    dispatch({ type: 'FETCH_CUSTOMERS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CUSTOMERS_FAILURE', payload: error.message });
  }
};
