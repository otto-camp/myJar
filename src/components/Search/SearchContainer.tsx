import React from 'react';
import { Nav, Row, Button } from 'react-bootstrap';
import Searchbox from './Searchbox';
import categoriesData from '../../assets/categories.json';

const SearchContainer: React.FC = () => {
  const categoryArr = categoriesData.categories;

  const getRandom = (arr: any, num: number) => {
    const rand = [...arr].sort(() => 0.5 - Math.random());
    return rand.slice(0, num);
  };

  return (
    <Row>
      <Searchbox />
      <Nav variant="pills" fill className="px-3 mb-5 mt-3">
        {getRandom(Object.keys(categoryArr), 5).map((c) => (
          <Nav.Item key={c} className="rounded-1">
            <Nav.Link href={'/category/' + c} eventKey={c}>
              {c}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Row>
  );
};

export default SearchContainer;
