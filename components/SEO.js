import React, { useContext } from 'react';
import Head from 'next/head';

import { DEFAULT_SEO_IMAGE, DEFAULT_TITLE, DEFAULT_DESCRIPTION, BASE_URL, THEME_COLOR } from '../constants';
import Favicons from './Favicons';

export default function SEO({
  lang = 'en',
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_SEO_IMAGE,
  url = `${BASE_URL}/donate`,
}) {
  const meta = [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: image,
    },
    {
      name: 'theme-color',
      content: THEME_COLOR,
    },
  ];
  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <Favicons />
      <link rel="manifest" href="/static/manifest/manifest.json" />
      {meta.map((item, i) => (
        <meta key={`meta-${i}`} {...item} />
      ))}
    </Head>
  );
}
