import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="shortcut icon"
            href="/assets/images/favicon.png"
            type="image/png"
          />
          <link rel="stylesheet" href="/assets/css/styles.css" />
          <link rel="stylesheet" href="node_modules/rcc-react-lib/dist/style.css" />
          {/* Eliminar el link al CSS */}
          {/* jsPDF */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
