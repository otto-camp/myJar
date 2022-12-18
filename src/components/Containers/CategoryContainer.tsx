import React from 'react';
import './style.css';
import invert from 'invert-color';
import categories from '../../assets/categories.json';

function CategoryContainer() {
  const invertColor = (bg: string) => {
    return invert(bg, { black: '#000', white: '#fff' });
  };
  //TODO:FIX HORIZONTAL SCROLL BAR.
  return (
    <div className="category-container">
      {categories.categories.map((c) => (
        <div
          key={c.name}
          style={{ backgroundColor: invertColor(c.color), color: c.color }}
          className="category-card-title"
        >
          {c.name}
        </div>
      ))}
    </div>
  );
}

export default CategoryContainer;
