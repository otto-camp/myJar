import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ISEO } from './ISEO';

const ArticleSEO: React.FC<ISEO> = ({ title, description, type, url, image, typeTag, typeSection }) => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      {typeTag?.map((v, i) => (
        <meta property="article:tag" key={i} content={v} />
      ))}
      <meta property="article:section" content={typeSection} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:text:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
export default ArticleSEO;
