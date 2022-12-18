import React from 'react';
import './style.css';
import categories from '../../assets/categories.json';
import invert from 'invert-color';
import { Button } from '@mantine/core';

interface ICategoryButton {
  text: string | undefined;
}

const CategoryButton: React.FC<ICategoryButton> = ({ text }) => {
  const categoryIndex = categories.categories.findIndex((c) => c.name === text);
  const bgColor = categories.categories[categoryIndex].color;
  const textColor = invert(bgColor, { black: '#000', white: '#fff' });

  return (
    <Button
      style={{ backgroundColor: bgColor, color: textColor, fontSize: '1rem' }}
      component="a"
      href={'/category/' + text}
    >
      {text}
    </Button>
  );
};

export default CategoryButton;
