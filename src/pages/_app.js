import React, { useState } from "react";
import Layout from "@/components/Layout";
import StateProvider from "@/context/StateContext";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// language
import "@/components/i18n";
import { Provider, useSelector } from "react-redux";
import store from "@/Redux/store";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/shared/Loader";

export default function App({ Component, pageProps }) {
	const [navLightTheme, setNavLightTheme] = useState(true);
	const [openSignInPopUp, setOpenSignInPopUp] = useState(false);
	const [openLoginPopUp, setOpenLoginPopUp] = useState(false);

	return (
		<Provider store={store}>
		<StateProvider.Provider
			value={{
				navLightTheme,
				setNavLightTheme,
				openSignInPopUp,
				setOpenSignInPopUp,
				openLoginPopUp,
				setOpenLoginPopUp,
			}}
		>
		 <Loader />
			<Toaster />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StateProvider.Provider>
		</Provider>
	);
}
