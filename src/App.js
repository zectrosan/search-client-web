import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import SearchResultPage from './components/SearchResultPage';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={SearchPage} />
          <Route path="/search" component={SearchResultPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
