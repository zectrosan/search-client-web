import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import SearchResultPage from './components/SearchResultPage';
import LoginPage from './components/LoginPage';
import withAuthentication from './components/withAuthentication';
import DatabaseResultPage from './components/DatabaseResultPage';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={withAuthentication(SearchPage)} />
          <Route path="/dbquery" component={withAuthentication(DatabaseResultPage)} />
          <Route path="/search/:q" component={withAuthentication(SearchResultPage)} />
          <Route path="/login" component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
