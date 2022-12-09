import React, { useRef } from 'react';
import './search.css';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Searchbox: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchRef.current?.value == null) {
      navigate('/search/');
      console.log(1);
    } else {
      setSearchParams({ q: searchRef.current.value });
      navigate('/search/?q=' + searchRef.current.value);
    }
  };

  return (
    <div className="form-container">
      <Form.Control type="search" placeholder="Search" aria-label="Search" ref={searchRef} />
      <Button variant="none" className="search-btn" onClick={handleSearch} aria-label="search">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};

export default Searchbox;
