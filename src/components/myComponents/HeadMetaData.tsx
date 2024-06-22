import React from "react";
import Head from "next/head";

const HeadMetaData: React.FC<{
  title?: string;
  metaDataDescription?: string;
  ogImageUrl?: string;
  pathname: string;
}> = ({ title, metaDataDescription, ogImageUrl, pathname }) => {
  const defaultTitle = "Connect Verse";

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ConnectVerse.com";

  const pageUrl = new URL(pathname, baseUrl).toString();

  return (
    <Head>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>

      <meta name="title" content={title + "|" + defaultTitle} />
      <meta name="description" content={metaDataDescription} />
      <meta name="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:title" content={title + "|" + defaultTitle} />
      <meta property="og:description" content={metaDataDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title + "|" + defaultTitle} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="twitter:description" content={metaDataDescription} />
    </Head>
  );
};

export default HeadMetaData;
