// src/store/cust/customerReducer.js
const initialState = {
    customers: [],
    loading: false,
    error: null,
  };
  
  export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CUSTOMERS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_CUSTOMERS_SUCCESS':
        return { ...state, loading: false, customers: action.payload };
      case 'FETCH_CUSTOMERS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  