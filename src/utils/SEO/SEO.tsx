import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ISEO } from './ISEO';
import logo from '../../../public/logo.webp';

const SEO = ({ title, description, type, url, image }: ISEO) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image ?? logo} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:text:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:image" content={image ?? logo} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
export default SEO;
