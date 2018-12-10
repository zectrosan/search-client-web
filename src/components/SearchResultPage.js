import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import queryString from 'query-string';

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
    const qs = queryString.parse(this.props.location.search);

    this.setState({
      searchTerm: qs.q
    });

    fetch('/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: qs.q
      })
    })
      .then(r => r.json())
      .then(response =>
        this.setState({
          total: response.total,
          results: response.hits
        })
      )
      .catch(console.error);
  }

  searchSubmit = e => {
    e.preventDefault();
    this.props.history.push('/search?q=' + this.state.searchTerm);
  };

  render() {
    console.log(this.state.results);
    return (
      <div className="SearchResult">
        <div className="searchBoxContainer py-5">
        <form
          onSubmit={this.searchSubmit}
          className="container"
        >
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
                <h5>{result._source.title || result._source.document.file.substring(result._source.document.file.lastIndexOf('/') + 1) }</h5>
                <p className="text-muted">
                  <small>{result._source.document.file}</small>
                </p>
                {result.highlight['document.text'] && result.highlight['document.text'].length ?
                <p
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
