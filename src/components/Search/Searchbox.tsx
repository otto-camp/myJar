import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const Searchbox: React.FC = () => {
  return (
    <div className="form-container">
      <Form.Control type="search" placeholder="Search" aria-label="Search" />
      <Button variant="none" className="search-btn">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};

export default Searchbox;
