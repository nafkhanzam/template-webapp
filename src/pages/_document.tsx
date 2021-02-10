import {assets} from "@/constants";
import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";

const propertyMetas: {
  property: string;
  content: string;
}[] = [];

const itemProps: {
  itemProp: string;
  content: string;
}[] = [];

const nameMetas: {
  name: string;
  content: string;
}[] = [];

const localCssFolder = "/assets/css/";
const localCsses: string[] = [];

const localJsFolder = "/assets/js/";
const localJses: string[] = [];

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          {[...propertyMetas, ...itemProps, ...nameMetas].map((v, i) => (
            <meta key={i} {...v} />
          ))}
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="icon" type="image/png" href={assets.favicon} />
          {localCsses.map((v, i) => (
            <link key={i} rel="stylesheet" href={`${localCssFolder}${v}`} type="text/css" />
          ))}
        </Head>
        <body>
          {localJses.map((v, i) => (
            <script key={i} src={`${localJsFolder}${v}`}></script>
          ))}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
