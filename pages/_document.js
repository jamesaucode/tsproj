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
        <link rel="stylesheet" href="../static/reset.css" media="none" onLoad="if(media!='all')media='all'"/>
        <link rel="stylesheet" href="../static/fa.css" media="none" onLoad="if(media!='all')media='all'"/>
        <link rel="stylesheet" href="../static/nprogress.css" media="none" onLoad="if(media!='all')media='all'"/>
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/3e94c075aa.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;