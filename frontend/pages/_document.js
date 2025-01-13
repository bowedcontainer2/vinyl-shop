import Document, { Html, Head, NextScript, Main } from 'next/document';
import Header from '../components/Header';

export default class myDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Header />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
