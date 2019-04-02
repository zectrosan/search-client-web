import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { logOut } from '../service/auth';
import { withRouter } from 'react-router-dom';

import logo from '../logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
      logOut()
        .then(() => this.props.history.push('/login'))
        .catch(console.error);
  }

  render() {  
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">
            <img alt="azeotrope" src={logo} height="28" className="mr-1" /> Azeotrope
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hi User!
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.logout}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);