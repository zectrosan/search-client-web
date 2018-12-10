import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

export default class SearchPage extends React.Component {

  state = {
    searchTerm: ''
  }

  handleSearchTermChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  search = (e) => {
    e.preventDefault();
    this.props.history.push('/search?q='+this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchPage">
        <form onSubmit={this.search} className="container d-flex align-items-center fh">
          <InputGroup>
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
