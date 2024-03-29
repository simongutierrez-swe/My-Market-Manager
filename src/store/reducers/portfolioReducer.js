import { getFirestore } from 'redux-firestore';
import axios from 'axios';

import { alphaApiToken } from '../../secrets';

// Initial State
const initialState = [];
  
  // Action
  const GET_PORTFOLIO_SUCCESS = 'GET_PORTFOLIO_SUCCESS';
  const GET_PORTFOLIO_ERROR = 'GET_PORTFOLIO_ERROR';
  
  // Action Creators
  const getPortfolioSuccessActionCreator = portfolio => ({
    type: GET_PORTFOLIO_SUCCESS,
    portfolio,
  });
  
  const getPortfolioErrorActionCreator = error => ({
    type: GET_PORTFOLIO_ERROR,
    error,
  });
  
  // Thunk Creators
  export const getPortfolioThunkCreator = (userId) => {
    return async (dispatch) => {
      try {
        let usersPortfolio = [];
        // first make an instance of our database (fireStore)
        const fireStore = getFirestore();
        // using that instance make a call to update/get the database with the desired data
        const portfolioRef = await fireStore
                                        .collection('users')
                                        .doc(userId)
                                        .collection('portfolio')
                                        .get();
        
        for (let i = 0; i < portfolioRef.docs.length; i++) {
            const doc = portfolioRef.docs[i];
            const docData = doc.data();

            // BUG: you can only make a call to the API every 12 secs, FIX: store time on local storage, if time on localstorage - Date.now() is greater than 12000 you can make the API call then save that data to our firestore as 'latestData' and save the time on local storage as Date.now(), otherwise retrieve the latest data from our fireStore and render that instead. Or Find Better API.

            // Make a call to stock API to get the stocks opening price 
            const openingStockData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${doc.id}&outputsize=full&apikey=${alphaApiToken}`);

            // Make a call to stock API to get the stocks current price
            const currentStockData = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${doc.id}&interval=5min&apikey=${alphaApiToken}`);

            // Parse retieved data from API call to get the stocks date
            let stockDate = currentStockData.data["Meta Data"]["3. Last Refreshed"];
            // calc current stock val by multiplying totalshares and current stocks price.
            let currentValue = docData.totalShares * currentStockData.data["Time Series (5min)"][stockDate]["1. open"];

            // Update the usersportfolio with the new data
            usersPortfolio.push({
                symbol: doc.id,
                shares: docData.totalShares,
                currentPrice: currentStockData.data["Time Series (5min)"][stockDate]["1. open"],
                openingPrice: openingStockData.data["Time Series (Daily)"][stockDate.split(' ')[0]]["1. open"],
                currentValue,
            })
        }

        dispatch(getPortfolioSuccessActionCreator(usersPortfolio));
      } catch (error) {
        console.error(error);
        dispatch(getPortfolioErrorActionCreator(error));
      }
    };
  };
 
  // Reducer
  const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PORTFOLIO_SUCCESS:
        return  action.portfolio;
      case GET_PORTFOLIO_ERROR:
        return { ...state, portfolio: action.error.message };   
      default:
        return state;
    }
  };
  
  export default portfolioReducer;