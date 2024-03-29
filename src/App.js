import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SearchPage from './components/search/SearchPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import UsersPortfolioPage from './components/portfolio/UsersPortfolioPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>My Market Manager</Navbar>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/search" component={SearchPage} />
            <Route path="/transactions" component={TransactionsPage} />
            <Route path="/portfolio" component={UsersPortfolioPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
