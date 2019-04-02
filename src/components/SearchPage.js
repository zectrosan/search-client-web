import React from "react";
import {
  Button, DropdownItem, DropdownMenu,
  DropdownToggle, Input, InputGroup, InputGroupAddon, UncontrolledButtonDropdown
} from "reactstrap";
import Header from './Header';

import logo from '../logo.svg';

export default class SearchPage extends React.Component {

  state = {
    searchTerm: '',
    databases: [],
    context: {
      type: 'documents'
    }
  }

  componentDidMount() {
    fetch('/api/database/databases')
      .then(res => res.json())
      .then(databases => this.setState({ databases }));
  }

  handleSearchTermChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  search = (e) => {
    e.preventDefault();
    if(this.state.context.type === 'documents') {
      this.props.history.push('/search/' + encodeURIComponent(this.state.searchTerm));
    } else {
      this.props.history.push(`/dbquery?database=${encodeURIComponent(this.state.context.name)}&query=${encodeURIComponent(this.state.searchTerm)}`);
    }
  }

  selectDocumentContext = () => {
    this.setState({
      context: {
        type: 'documents'
      }
    })
  }

  selectDbContextHandler = db => {
    return () =>
      this.setState({
        context: {
          type: 'database',
          name: db
        }
      })
  }

  render() {
    const { context, databases } = this.state;

    return (
      <div className="SearchPage d-flex flex-column">
        <Header />
        <form onSubmit={this.search} className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          <div className="logoContainer d-flex mb-5">
            <img height="128" src={logo} alt="Azeotrope" className="mr-3" />
            <div className="d-flex flex-column justify-content-center">
              <h1 className="display-1">Azeotrope</h1>
            </div>
          </div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <UncontrolledButtonDropdown>
                <DropdownToggle caret>
                  {context.type === 'documents' ? (
                    <span><i className="far fa-file-alt mr-1" /> Documents</span>
                  ) : (
                      <span><i className="fas fa-database mr-1" /> {context.name}</span>
                    )}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectDocumentContext}>
                    <span><i className="far fa-file-alt mr-1" /> Documents</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  {databases.map(db => (
                    <DropdownItem onClick={this.selectDbContextHandler(db)}>
                      <span><i className="fas fa-database mr-1" /> {db}</span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </InputGroupAddon>
            <Input onChange={this.handleSearchTermChange} size="lg" placeholder="Search..." />
            <InputGroupAddon addonType="append">
              <Button type="submit" color="primary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    );
  }
}
