import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPortfolioThunkCreator } from '../../store/reducers/portfolioReducer';

import TableHeader from '../Tables/Table-Header';
import TableBody from '../Tables/Table-Body';

  function UsersPortfolioPage ({ auth, usersPortfolio, getPortfolio }) {
 
    useEffect(() => getPortfolio(auth.uid), [auth.uid, getPortfolio]);
  
    const findTotalValue = () => {
      let totalValue = 0;
      usersPortfolio.forEach(elem => totalValue += elem.currentValue);
  
      return totalValue;
    }
      
     
        let totalValue;
        usersPortfolio.length ? totalValue = findTotalValue() : totalValue = 0;
  
        return (
          <div className="section">
            <div className="card z-depth-0">
              <div className="card-content grey-text text-darken-3">
                <h1 className='title'>My Portfolio (${Number.parseFloat(totalValue).toFixed(2)})</h1>
                <table className='transactions'>
                  <tbody>
                    { 
                      usersPortfolio.length ?
                      <TableHeader headers={usersPortfolio[0]} /> : 
                      <tr>
                        <th>No Stock Owned Yet</th>
                        </tr>
                    }
                    {
                      usersPortfolio.length ?
                      <TableBody body={usersPortfolio} /> :
                      <tr>
                        <td>Buy some Stock!</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      };
  
const mapStateToProps = state => ({
    auth: state.firebase.auth,
    usersPortfolio: state.portfolio,
  });
  
const mapDispatchToProps = dispatch => ({
    getPortfolio(userId) {
        dispatch(getPortfolioThunkCreator(userId));
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersPortfolioPage);