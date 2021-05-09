import {NextSeoProps} from "next-seo";
import { assets } from "./assets";
import {metas} from "./metas";

export const seoProps: NextSeoProps = {
  titleTemplate: metas.title,
  title: metas.title,
  defaultTitle: metas.title,
  // @ts-expect-error disable index
  dangerouslySetAllPagesToNoIndex: !metas.isProduction,
  dangerouslySetAllPagesToNoFollow: !metas.isProduction,
  noindex: !metas.isProduction,
  nofollow: !metas.isProduction,
  description: metas.description,
  twitter: {
    cardType: "summary",
    handle: metas.twitter.handle,
    site: metas.twitter.handle,
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
