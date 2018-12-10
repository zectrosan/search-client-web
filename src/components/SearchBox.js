import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

const SearchBox = ({ term }) => (
  <InputGroup>
    <Input placeholder="Search..." value={term} />
    <InputGroupAddon addonType="append">
      <Button color="primary">Search</Button>
    </InputGroupAddon>
  </InputGroup>
);

export default SearchBox;
