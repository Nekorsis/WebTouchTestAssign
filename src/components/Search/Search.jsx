import React from 'react';
import {
  Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchComponent = (props) => {
  const initSearch = () => {
    const { searchRepo, redirect, inputValue } = props;
    if (inputValue.length <= 0) { return; }
    searchRepo({ name: inputValue });
    redirect && redirect(inputValue);
  };

  const { inputHandler, inputValue } = props;
  return (
    <Form inline>
      <FormGroup>
        <FormControl
          className="search-form-input"
          type="text"
          placeholder="Type repository name here..."
          onChange={inputHandler}
          value={inputValue}
        />
      </FormGroup>
      <Button onClick={initSearch}>Search</Button>
    </Form>
  );
};

SearchComponent.propTypes = {
  searchRepo: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
export default SearchComponent;
