import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';
import categories from '../../assets/categories.json';
import { Link } from 'react-router-dom';
import invert from 'invert-color';

interface ICategoryButton {
  text: string | undefined;
}

const CategoryButton: React.FC<ICategoryButton> = ({ text }) => {
  const categoryIndex = categories.categories.findIndex((c) => c.name === text);
  const bgColor = categories.categories[categoryIndex].color;
  const textColor = invert(bgColor);

  return (
    <Button className="category-button" variant="none" style={{ backgroundColor: bgColor }}>
      <Link to={'/category/' + text} style={{ color: textColor }}>
        {text}
      </Link>
    </Button>
  );
};

export default CategoryButton;
