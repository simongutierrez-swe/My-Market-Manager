import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransactionsThunkCreator } from '../../store/reducers/transactionsReducer';

import TableHeader from '../Tables/Table-Header';
import TableBody from '../Tables/Table-Body';

function TransactionsPage ({auth, transactions, getTransactions}) {

  useEffect(() => getTransactions(auth.uid), [auth.uid, getTransactions]);
    
      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>Transactions</h1>
              <table className='transactions'>
                <tbody>
                  { 
                    transactions.length ?
                    <TableHeader headers={transactions[0]} /> : 
                    <tr>
                      <th>No Transactions yet</th>
                    </tr>
                  }
                  {
                    transactions.length ?
                    <TableBody body={transactions} /> :
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
  }

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  transactions: state.transactions,
});
  
const mapDispatchToProps = dispatch => ({
    getTransactions(userId) { 
      dispatch(getTransactionsThunkCreator(userId))
    },
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TransactionsPage);
  