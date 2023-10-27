import React from "react";
import Footer from "./shared/Footer";
import LanguageButton from "./button/LanguageButton";
import dynamic from "next/dynamic";
const Navbar =dynamic(() => import('./shared/Navbar'), { ssr: false });

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<LanguageButton />
			{children}
			<Footer />
		</>
	);
}
