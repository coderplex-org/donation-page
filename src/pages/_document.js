import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="text-gray-900 antialiased leading-tight">
        <Head />
        <body className="bg-gray-100">
          <Main />
          <NextScript />
          <script src="https://checkout.razorpay.com/v1/checkout.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
