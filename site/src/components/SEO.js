import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-use-before-define
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`
  };

  return (
    <Helmet
      title={pathname === '/' ? null : seo.title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
    >
      <link rel="apple-touch-icon" href="/logo-apple-touch-icon.png" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      <meta property="og:type" content="website" />

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && <meta property="og:description" content={seo.description} />}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary" />

      {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && <meta name="twitter:description" content={seo.description} />}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`;

export default SEO;
