import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ISEO {
  title: string | undefined;
  description: string | undefined;
  type: string;
  url: string;
  image?: string;
  preloadImage?: 'string';
}

const SEO: React.FC<ISEO> = ({ title, description, type, url, image, preloadImage }) => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:text:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:image" content={image} />
      {/* <link rel="preload" href={preloadImage} as="image" /> */}
    </Helmet>
  );
};
export default SEO;
