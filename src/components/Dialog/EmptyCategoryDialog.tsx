import React from 'react';

interface IEmptyCategory {
  category: string | undefined;
}

const EmptyCategoryDialog: React.FC<IEmptyCategory> = ({ category }) => {
  return <div>There is nothing to see. You can start posting stories about {category}.</div>;
};

export default EmptyCategoryDialog;
