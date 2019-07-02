import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <title>Study App</title>
        <meta charSet="utf-8" />
        <meta name="author" content="James Au" />
        <meta name="description" content="This is a web application for students to create study flashcards and share with people." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="shortcut icon" type="image/png" href="../static/images/favicon.ico"/>
        <link rel="stylesheet" href="../static/reset.css" />
        <link rel="stylesheet" href="../static/custom.css" />
        <link rel="stylesheet" href="../static/nprogress.css" />
        <body>
          <noscript>You need Javascript for this website to run correctly.</noscript>
          <Main />
          <NextScript />
          <script async src="https://kit.fontawesome.com/3e94c075aa.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;