import {assets, metas} from "@/constants";
import {clx} from "@/lib";
import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document";

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
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="icon" type="image/png" href={assets.favicon} />
          {localCsses.map((v, i) => (
            <link key={i} rel="stylesheet" href={`${localCssFolder}${v}`} type="text/css" />
          ))}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body
          className={clx({
            "debug-screens": !metas.isProduction,
          })}
        >
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
