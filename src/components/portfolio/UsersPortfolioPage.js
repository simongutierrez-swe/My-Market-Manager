import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortfolioThunkCreator } from '../../store/reducers/portfolioReducer';
import TableHeader from '../Tables/Table-Header';
import TableBody from '../Tables/Table-Body';

class UsersPortfolioPage extends Component {
 
  componentDidMount() {
     this.props.getPortfolio(this.props.auth.uid);
  }

  findTotalValue() {
    let totalValue = 0;
    this.props.usersPortfolio.forEach(elem => totalValue += elem.currentValue);

    return totalValue;
  }
    
    render () {
        let totalValue;
        this.props.usersPortfolio.length ? totalValue = this.findTotalValue() : totalValue = 0;

      return (
        <div className="section">
          <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
              <h1 className='title'>My Portfolio (${Number.parseFloat(totalValue).toFixed(2)})</h1>
              <table className='transactions'>
                <tbody>
                  { 
                    this.props.usersPortfolio.length ?
                    <TableHeader headers={this.props.usersPortfolio[0]} /> : 
                    <tr>
                      <th>No Stock Owned Yet</th>
                      </tr>
                  }
                  {
                    this.props.usersPortfolio.length ?
                    <TableBody body={this.props.usersPortfolio} /> :
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
  }
  
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