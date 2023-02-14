import Head from "next/head";
import React from "react";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
    title: 'rankMyOutfit',
    keywords: 'web developement, programming',
    description: 'We keep track of every nook and cranny of WebDev',
}

export default Meta;
