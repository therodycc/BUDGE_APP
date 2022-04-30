import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return initialProps
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png" />
                    <link rel="stylesheet" type="text/css" href="/assets/css/material-dashboard.min.css" />
                    <link rel="stylesheet" type="text/css" href="/assets/css/styles.css" />
                    <link rel="stylesheet" type="text/css" href="/assets/css/loading-square.css" />
                    {/* jsPDF */}
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
                </Head>
                <body>
                    <Main />
                    <script src="https://kit.fontawesome.com/2e2971d45d.js" crossOrigin="anonymous"></script>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument