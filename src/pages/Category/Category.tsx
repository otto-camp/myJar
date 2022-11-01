import React from 'react';
import { useParams } from 'react-router-dom';
import './category.css';
import categories from '../../assets/categories.json';
import Navi from '../../layouts/Navi';
import { Image } from 'react-bootstrap';
import invert from 'invert-color';

const Category: React.FC = () => {
  const { category } = useParams();

  const categoryIndex = categories.categories.findIndex((c) => c.name === category);
  const description = categories.categories[categoryIndex].description;
  const bgColor = categories.categories[categoryIndex].color;
  const textColor = invert(bgColor, { black: '#3a3a3a', white: '#fafafa' });

  return (
    <>
      <Navi />
      <div className="min-h">
        <div style={{ backgroundColor: bgColor }} className="w-75 mx-auto rounded-2">
          <h2 style={{ color: textColor }} className="text-capitalize text-center p-3 fs-1">
            {category}
          </h2>
        </div>
        <div className="w-75 mx-auto p-0 mt-3">
          <Image
            src={categories.categories[categoryIndex].image}
            className="category-image"
            width={1920}
            height={1080}
          />
        </div>
        <p className="w-75 mx-auto mt-4 fs-4">{description}</p>
      </div>
    </>
  );
};

export default Category;
