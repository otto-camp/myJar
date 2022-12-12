import React from 'react';
import './style.css';
import invert from 'invert-color';
import categories from '../../assets/categories.json';

function CategoryContainer() {
  const invertColor = (bg: string) => {
    return invert(bg, { black: '#000', white: '#fff' });
  };

  return (
    <div className="category-container">
      {categories.categories.map((c) => (
        <div key={c.name} className="category-card">
          <div style={{ backgroundColor: c.color }}>
            <h4
              className="category-card-title"
              style={{
                color: invertColor(c.color)
              }}>
              {c.name}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryContainer;
