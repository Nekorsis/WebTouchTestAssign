import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './containers/SearchPage/SearchPage';
import SearchResultPage from './containers/SearchResultPage/SearchResultPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/result" component={SearchResultPage} />
        </Switch>
      </Router>
    );
  }
}
