import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import * as api from '../service/api';
import Header from './Header';

class DatabaseResultPage extends React.Component {
  state = {
    result: null,
    database: '',
    query: '',
    error: ''
  };

  handleQueryChange = e => {
    this.setState({ query: e.target.value });
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    const req = {
      database: params.get('database'),
      query: params.get('query')
    }

    this.setState(req);

    this.query(req);
  }

  query = (req) => {
    api.post('database/execute', {
      body: {
        ...req
      }
    })
      .then(response => this.setState(response))
      .catch(console.error);
  }

  searchSubmit = e => {
    const { database, query } = this.state;
    e.preventDefault();
    this.props.history.push(`/dbquery?database=${encodeURIComponent(database)}&query=${encodeURIComponent(query)}`);
    this.query({
      database,
      query
    });
  };

  render() {
    const { database, query, result, sql, queries } = this.state;
    return (
      <div className="SearchResult">
        <Header />
        <div className="searchBoxContainer py-5">
          <form onSubmit={this.searchSubmit} className="container">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span><i className="fas fa-database mr-1" /> {database}</span>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={this.handleQueryChange}
                bsSize="lg"
                placeholder="Search..."
                value={query}
              />
              <InputGroupAddon addonType="append">
                <Button type="submit" color="primary">Query</Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
        <div className="container pt-4">
          {result ? (
            <div className="searchResults">
              <Card className="mb-3">
                <CardHeader>Results</CardHeader>
                <CardBody>
                  {result.success ? (
                    <Table>
                      {result.data.map(row => (
                        <tr>
                          {row.map(cell => <td>{cell}</td>)}
                        </tr>
                      ))}
                    </Table>
                  ) : (
                      <span>Error occured!</span>
                    )}
                </CardBody>
              </Card>
              <Card className="mb-3">
                <CardHeader>Parser output</CardHeader>
                <CardBody>
                  <h5>Syntax tree</h5>
                  <pre class="mb-3">
                    {JSON.stringify(queries, null, 4)}
                  </pre>
                  <hr />
                  <h5>SQL</h5>
                  <pre class="mb-3">
                    {sql}
                  </pre>
                </CardBody>
              </Card>
            </div>
          ) : ('')}
        </div>
      </div>
    );
  }
}

export default DatabaseResultPage;
