import React from 'react';
import { Nav, Row } from 'react-bootstrap';
import Searchbox from './Searchbox';
import categoriesData from '../../assets/categories.json';

const SearchContainer: React.FC = () => {
  const categoryArr: string[] = [];
  categoriesData.categories.forEach((i) => {
    categoryArr.push(i.name);
  });

  const getRandom = (arr: any, num: number) => {
    const rand = [...arr].sort(() => 0.5 - Math.random());
    return rand.slice(0, num);
  };

  return (
    <Row>
      <Searchbox />
      <Nav variant="pills" fill className="category-link-wrapper">
        {getRandom(categoryArr, 5).map((c) => (
          <Nav.Item key={c} className="rounded-1 fs-5 d-inline-block">
            <Nav.Link href={'/category/' + c} eventKey={c} className="category-link">
              {c}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Row>
  );
};

export default SearchContainer;
