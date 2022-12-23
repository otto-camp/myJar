import React from 'react';

const EmptyCategoryDialog = ({ category }: { category: string | undefined }) => {
  return <div>There is nothing to see. You can start posting stories about {category}.</div>;
};

export default EmptyCategoryDialog;
