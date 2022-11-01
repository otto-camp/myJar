import React from 'react';
<<<<<<< HEAD
import { Nav, Row } from 'react-bootstrap';
=======
import { Nav, Row, Button } from 'react-bootstrap';
>>>>>>> fae0ef1ccfee9a1dea83072e7c0622b02efb3ec5
import Searchbox from './Searchbox';
import categoriesData from '../../assets/categories.json';

const SearchContainer: React.FC = () => {
<<<<<<< HEAD
  const categoryArr: string[] = [];
  categoriesData.categories.forEach((i) => {
    categoryArr.push(i.name);
  });
=======
  const categoryArr = categoriesData.categories;
>>>>>>> fae0ef1ccfee9a1dea83072e7c0622b02efb3ec5

  const getRandom = (arr: any, num: number) => {
    const rand = [...arr].sort(() => 0.5 - Math.random());
    return rand.slice(0, num);
  };

  return (
    <Row>
      <Searchbox />
<<<<<<< HEAD
      <Nav variant="pills" fill className="category-link-wrapper">
        {getRandom(categoryArr, 5).map((c) => (
          <Nav.Item key={c} className="rounded-1 fs-5 d-inline-block">
            <Nav.Link href={'/category/' + c} eventKey={c} className="category-link">
=======
      <Nav variant="pills" fill className="px-3 mb-5 mt-3">
        {getRandom(Object.keys(categoryArr), 5).map((c) => (
          <Nav.Item key={c} className="rounded-1">
            <Nav.Link href={'/category/' + c} eventKey={c}>
>>>>>>> fae0ef1ccfee9a1dea83072e7c0622b02efb3ec5
              {c}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Row>
  );
};

export default SearchContainer;
