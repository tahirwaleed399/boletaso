import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* favicon */}
					<link rel='icon' href='/favicon.ico' />
					{/* font type */}
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
						rel='stylesheet'
					/>
					{/* meta tag */}
					<meta name='title' content='Boletaso' />
					<meta name='description' content='' />
					<meta name='language' content='English' />

					<meta name='keywords' content='' />
					<link rel='canonical' href='http://Boletaso.com/' />

					<meta name='author' content='Boletaso' />

					<meta property='og:locale' content='en' />
					{/* apple touch icon */}
					{/* <link rel='apple-touch-icon' href='/apple-touch-icon.png' /> */}
					{/* manifest */}
					{/* <link rel='manifest' href='/manifest.json' /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
}
