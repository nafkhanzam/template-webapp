import {NextSeoProps} from "next-seo";
import {assets, metas} from "./constants";

export const seoProps: NextSeoProps = {
  titleTemplate: metas.title,
  title: metas.title,
  defaultTitle: metas.title,
  // @ts-expect-error disable index
  dangerouslySetAllPagesToNoIndex: metas.isNonProduction,
  dangerouslySetAllPagesToNoFollow: metas.isNonProduction,
  noindex: metas.isNonProduction,
  nofollow: metas.isNonProduction,
  description: metas.description,
  twitter: {
    cardType: "summary",
    handle: metas.twitterHandle,
    site: metas.twitterHandle,
  },
  openGraph: {
    url: metas.url,
    type: "website",
    title: metas.title,
    description: metas.description,
    images: [
      {
        url: assets.favicon,
        alt: `${metas.title} Logo`,
      },
    ],
  },
};
