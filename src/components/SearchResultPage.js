import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import * as api from '../service/api';
import Header from './Header';
class SearchResultPage extends React.Component {
  state = {
    total: 0,
    results: [],
    searchTerm: ''
  };

  handleSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  componentDidMount() {
    const q = this.props.match.params.q;

    this.setState({
      searchTerm: q
    });

    this.search(q);
  }

  search = (q) => {
    api.post('search', {
      body: {
        q
      }
    })
      .then(response => {
        document.title = 'Search results for ' + q + '- XtendSearch';
        this.setState({
          total: response.total,
          results: response.hits
        })
      }
      )
      .catch(console.error);
  }

  searchSubmit = e => {
    e.preventDefault();
    this.props.history.push('/search/' + encodeURIComponent(this.state.searchTerm));
    this.search(this.state.searchTerm);
  };

  render() {
    return (
      <div className="SearchResult">
        <Header />
        <div className="searchBoxContainer py-5">
          <form onSubmit={this.searchSubmit} className="container">
            <InputGroup>
              <Input
                onChange={this.handleSearchTermChange}
                bsSize="lg"
                placeholder="Search..."
                value={this.state.searchTerm}
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" color="primary">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
        <div className="searchResults container pt-4">
          <div>
            <p>{this.state.total} search results</p>
          </div>
          {this.state.results.map(result => (
            <Card key={result._id} className="mb-3">
              <CardBody>
                <div className="search-result-title">
                  <a href="#">
                    {result._source.title || result._source.document.file.substring(result._source.document.file.lastIndexOf('/') + 1)}
                  </a>
                </div>
                <p className="search-result-src text-success">
                  <small>{result._source.document.file}</small>
                </p>
                {result.highlight['document.text'] && result.highlight['document.text'].length ?
                  <div
                    className="search-snippet"
                    dangerouslySetInnerHTML={{
                      __html: result.highlight['document.text'].join(' ')
                    }}
                  /> :
                  <p
                    className="search-snippet"
                    dangerouslySetInnerHTML={{
                      __html: result._source.document.text.join(' ').substr(0, 160) + '...'
                    }}
                  />}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResultPage;
