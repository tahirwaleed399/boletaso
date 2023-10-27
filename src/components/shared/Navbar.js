import React, { useState, useContext, useEffect } from "react";
import StateContext from "@/context/StateContext";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { AppBar, Toolbar, Divider, Paper, InputBase, IconButton, MenuItem, Button, Menu, Popover } from "@mui/material";

// component
import MobileBar from "./MobileBar";
import SignInPopUp from "../templates/PopUp/SignInPopUp";
import LoginPopUp from "../templates/PopUp/LoginPopUp";

// icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { popoverClasses } from "@mui/material/Popover";
import { useSelector } from "react-redux";
import { selectUser } from "@/Redux/Slices/authSlice";
import { selectSubCategoriesByCategoryId } from "@/Redux/Slices/categoriesSlice";

// styles
const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 95%;
	margin: auto;
	padding-block: 0.8rem;

	@media (max-width: 600px) {
		width: 100%;
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		width: 98%;
	}
`;

const Logo = styled.a``;

const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	flex-grow: 1;
`;

const ImageWrapper = styled.div``;

const LogoImage = styled.img`
	width: 10rem;
	height: 100%;
	object-fit: cover;

	@media (max-width: 600px) {
		width: 8.5rem;
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		width: 7rem;
	}
`;

//Search Box
const SearchBox = styled.div`
	@media (max-width: 1024px) {
		display: none;
	}
`;

// Tabs Button
const TabWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	flex: 4;

	@media (max-width: 1024px) {
		display: none;
	}
`;

const TabBox = styled.div``;

// CTA Buttons
const CtaWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.7rem;

	@media (max-width: 600px) {
		display: none;
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		gap: 0.1rem;
	}
`;

const CtaBox = styled.div``;

const CtaButton = styled.button`
	background: transparent;
	color: ${(props) => (props.lightcolor === "light" ? "#fff" : "#000")};
	font-family: "Poppins";
	font-weight: ${(props) => (props.lightcolor === "light" ? "400" : "500")};
	font-size: 0.9rem;
	padding: 0.5rem 0.7rem;

	&:hover {
		background-color: #fff;
		color: #464646;
		transition: all 0.2s ease-in-out;
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		font-size: 0.6rem;
	}
`;

const CtaButtonOulined = styled.button`
	background: transparent;
	color: ${(props) => (props.lightcolor === "light" ? "#fff" : "#000")};
	font-family: "Poppins";
	font-size: 0.85rem;
	padding: 0.55rem 2rem;
	border: ${(props) => (props.lightcolor === "light" ? "1px solid #fff" : "1px solid #000")};

	&:hover {
		background-color: #fff;
		color: #464646;
		transition: all 0.2s ease-in-out;
	}

	@media (max-width: 1024px) {
		display: none;
	}
`;

// Mobile Style
const MobileWrapper = styled.div`
	display: none;
	@media (max-width: 1024px) {
		display: flex;
	}
`;

export default function Navbar() {
	const router = useRouter();
	const { navLightTheme, setNavLightTheme, openSignInPopUp, setOpenSignInPopUp, openLoginPopUp, setOpenLoginPopUp } =
		useContext(StateContext);
const user =  useSelector(selectUser)
	const [openMobileBar, setOpenMobileBar] = useState(false);
	const [currencyText, setCurrencyText] = useState("USD");

	const [anchorElCurrency, setAnchorElCurrency] = useState(null);
	const [anchorElTabNo1, setAnchorElTabNo1] = useState(null);
	const [anchorElTabNo2, setAnchorElTabNo2] = useState(null);
	const [anchorElMore, setAnchorElMore] = useState(null);

	const openCurrency = Boolean(anchorElCurrency);
	const openTabNo1 = Boolean(anchorElTabNo1);
	const openTabNo2 = Boolean(anchorElTabNo2);
	const openMore = Boolean(anchorElMore);
	const { navbarItems, loading, error , moreItems , status } = useNavbarItems();
	const handleClick = (stateName) => (event) => {
		stateName(event.currentTarget);
	};

	const handleClose = (stateName) => () => {
		stateName(null);
	};
useEffect(()=>{
console.log({navbarItems , moreItems})
},[loading , error , navbarItems , moreItems])
	const currencies = [
		{
			title: "USD",
			addDivider: true,
		},
		{
			title: "EUR",
			addDivider: true,
		},
		{
			title: "BTC",
			addDivider: true,
		},
		{
			title: "JPY",
			addDivider: false,
		},
	];

	const sportData = [
		{
			title: "Home",
			addDivider: true,
			link: "/sports",
		},
		{
			title: "Basketball",
			addDivider: true,
			link: "/sports/basketballTicket",
		},
		{
			title: "Baseball",
			addDivider: true,
			link: "/sports/baseballTicket",
		},
		{
			title: "Soccer",
			addDivider: true,
			link: "/sports/soccerTicket",
		},
		{
			title: "WWE",
			addDivider: false,
			link: "/sports/wweTicket",
		},
	];

	const musicData = [
		{
			title: "Home",
			addDivider: true,
			link: "/music",
		},
		{
			title: "Reggaetón",
			addDivider: true,
			link: "/music/raggTicket",
		},
		{
			title: "Rock",
			addDivider: true,
			link: "/music/rockTicket",
		},
		{
			title: "Pop",
			addDivider: true,
			link: "/music/popTicket",
		},
		{
			title: "Salsa",
			addDivider: false,
			link: "/music/salsaTicket",
		},
	];

	const moreData = [
		{
			title: "Home",
			addDivider: true,
			link: "/more",
		},
		{
			title: "Comedy",
			addDivider: true,
			link: "/more/comedyTicket",
		},
		{
			title: "Festivals",
			addDivider: true,
			link: "/more/festivalTicket",
		},
		{
			title: "Theatre",
			addDivider: true,
			link: "/more/theatreTicket",
		},
		{
			title: "Other events",
			addDivider: true,
			link: "/more",
		},
		{
			title: "Museums",
			addDivider: false,
			link: "/more",
		},
	];

	function handleCloseM() {
		setAnchorEl(null);
	}

	useEffect(() => {
		setNavLightTheme(true);
	}, []);

	useEffect(() => {
		function handleKeyUp() {
			if (window.scrollY > 50) {
				setAnchorElTabNo1(null);
				setAnchorElTabNo2(null);
				setAnchorElMore(null);
			}
		}

		window.addEventListener("scroll", handleKeyUp);
		return () => window.removeEventListener("scroll", handleKeyUp);
	}, []);

	return (
		<AppBar
			position='absolute'
			elevation={2}
			sx={{
				background: `${navLightTheme ? "#000" : "#fff"}`,
				background: `${
					navLightTheme ? "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%)" : "#fff"
				}`,
				transition: "all .2s ease-in-out",
			}}
		>
			<Toolbar>
				<Wrapper>
					<LogoWrapper>
						{/* Logo */}
						<Logo href='/'>
							<ImageWrapper>
								<div>
									<LogoImage
										src={navLightTheme ? "/logo.png" : "/logoBlack.png"}
										alt='Boletaso'
										loading='lazy'
										height='auto'
										width='auto'
									/>
								</div>
							</ImageWrapper>
						</Logo>

						{/* Search Bar */}
						<SearchBox>
							<Paper
								sx={{
									p: "2px 4px",
									display: "flex",
									alignItems: "center",
									width: 320,
									backgroundColor: navLightTheme ? "#464646" : "#fcfcfc",
								}}
							>
								<IconButton sx={{ p: "10px" }} aria-label='menu'>
									<SearchIcon sx={{ color: navLightTheme ? "#fff" : "#000" }} />
								</IconButton>
								<InputBase
									size='small'
									placeholder='Search by team, artist, event, or venue'
									sx={{
										ml: 0.5,
										flex: 1,
										color: navLightTheme ? "#fff" : "#000",
										fontFamily: "Montserrat",

										"&::placeholder": {},
										input: {
											"&::placeholder": {
												color: navLightTheme ? "#fcfcfc" : "#000",
												fontSize: "0.8rem",
												opacity: "1",
											},
										},
									}}
								/>
							</Paper>
						</SearchBox>
					</LogoWrapper>

					<TabWrapper>
			{
							status ==='succeeded' && <>
							
							<TabBox>
							<Link href={'/sample'}>
								<Button
									id='tab-no1'
									aria-controls={openTabNo1 ? "music-menu" : undefined}
									aria-haspopup='true'
									aria-expanded={openTabNo1 ? "true" : undefined}
									onMouseOver={handleClick(setAnchorElTabNo1)}
									sx={{
										color: navLightTheme ? "#fff" : "#000",
										textTransform: "none",
										fontFamily: "Poppins",
										fontWeight: navLightTheme ? "300" : "400",
										letterSpacing: ".5px",
									}}
								>
									{Object.keys(navbarItems[0])[0]}
									<ArrowDropDownIcon sx={{ fontSize: "1.2rem" }} />
								</Button>
							</Link>
						</TabBox>

						<TabBox>
							<Link href={'/sample'}>
								<Button
									id='tab-no2'
									
									aria-haspopup='true'
									aria-expanded={openTabNo2 ? "true" : undefined}
									onMouseOver={handleClick(setAnchorElTabNo2)}
									sx={{
										color: navLightTheme ? "#fff" : "#000",
										textTransform: "none",
										fontFamily: "Poppins",
										fontWeight: navLightTheme ? "300" : "400",
										letterSpacing: ".5px",
									}}
								>
									{Object.keys(navbarItems[1])[0]}
									<ArrowDropDownIcon sx={{ fontSize: "1.2rem" }} />
								</Button>
							</Link>
						</TabBox>
							</>
						}
						
						

					{moreItems.length > 0 &&  <TabBox>
							<Link href='/more'>
								<Button
									id='more-button'
									aria-controls={openMore ? "more-menu" : undefined}
									aria-haspopup='true'
									aria-expanded={openMore ? "true" : undefined}
									onMouseOver={handleClick(setAnchorElMore)}
									sx={{
										color: navLightTheme ? "#fff" : "#000",
										textTransform: "none",
										fontFamily: "Poppins",
										fontWeight: navLightTheme ? "300" : "400",
										letterSpacing: ".5px",
										position: "relative",
										zIndex: "0",
									}}
								>
									More
									<ArrowDropDownIcon sx={{ fontSize: "1.2rem" }} />
								</Button>
							</Link>
						</TabBox> }
						
					</TabWrapper>

					{/* CTA Button */}
					<CtaWrapper>
						<CtaBox>
							<Link href='/user/startselling'>
								<CtaButton lightcolor={navLightTheme ? "light" : "dark"}>Start Selling</CtaButton>
							</Link>
						</CtaBox>
						<Divider
							orientation='vertical'
							sx={{ backgroundColor: "#fcfcfc", height: "100%", height: 28, m: 0.5 }}
						/>
						{
							!user  && <>
							<CtaBox>
							<CtaButton
								lightcolor={navLightTheme ? "light" : "dark"}
								onClick={() => setOpenLoginPopUp(true)}
							>
								Login
							</CtaButton>
						</CtaBox>

						<CtaBox>
							<CtaButtonOulined
								lightcolor={navLightTheme ? "light" : "dark"}
								onClick={() => setOpenSignInPopUp(true)}
							>
								Get Started
							</CtaButtonOulined>
						</CtaBox></>
						}
						{
							user  && <>
							<CtaBox>
							<CtaButton
								lightcolor={navLightTheme ? "light" : "dark"}
								
							>
								Dashboard
							</CtaButton>
						</CtaBox>
							
							</>
						}

						{/* Currency Menu */}
						<CtaBox>
							<Button
								id='currency-button'
								aria-controls={openCurrency ? "currency-menu" : undefined}
								aria-haspopup='true'
								aria-expanded={openCurrency ? "true" : undefined}
								onClick={handleClick(setAnchorElCurrency)}
								sx={{ color: navLightTheme ? "#fff" : "#000", textTransform: "none" }}
							>
								{`$ ${currencyText}`}
								<ArrowDropDownIcon sx={{ fontSize: "1.2rem" }} />
							</Button>
						</CtaBox>
					</CtaWrapper>

					{/* Mobile Menu Button */}
					<MobileWrapper onClick={() => setOpenMobileBar(true)} style={{ cursor: "pointer" }}>
						<MenuIcon sx={{ fontSize: { xs: "2.5rem", sm: "2rem" }, color: "var(--colorPrime)" }} />
					</MobileWrapper>
				</Wrapper>

				{/* Currency Menu */}
				<Menu
					id='currency-menu'
					anchorEl={anchorElCurrency}
					open={openCurrency}
					onClose={handleClose(setAnchorElCurrency)}
					MenuListProps={{
						"aria-labelledby": "currency-button",
					}}
					sx={{
						"& .MuiPaper-root": {
							backgroundColor: "#464646",
							width: 120,
						},
					}}
					disableScrollLock={true}
				>
					{currencies.map((item, index) => (
						<MenuItem
							key={index}
							sx={{
								color: "#fff",
								fontFamily: "Poppins",
								padding: "0.7rem 1rem 0.3rem 1rem",
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}
							onClick={() => setCurrencyText(item.title)}
						>
							{item.title}
							{item.addDivider && (
								<Divider sx={{ backgroundColor: "#fff", width: "90%", margin: "auto", mt: 2 }} />
							)}
						</MenuItem>
					))}
				</Menu>

			 {
					status ==='succeeded' &&  <>
					
					<Menu
					hideBackdrop
					id='music-menu'
					anchorEl={anchorElTabNo1}
					open={openTabNo1}
					// onClose={handleClose(setAnchorElMusic)}
					MenuListProps={{
						"aria-labelledby": "music-button",
						onMouseLeave: handleClose(setAnchorElTabNo1),
					}}
					sx={{
						"& .MuiPaper-root": {
							backgroundColor: "#464646",
							width: 180,
						},
					}}
					disableScrollLock={true}
				>
					{Object.values(navbarItems[0])[0].map((item, index) => (
						<Link href={item.link} key={index}>
							<MenuItem
								sx={{
									color: "#fff",
									fontFamily: "Poppins",
									padding: "0.7rem 1rem 0.3rem 1rem",
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
								}}
								onClick={handleClose(setAnchorElTabNo1)}
							>
								{item.title}
								{item.addDivider && (
									<Divider sx={{ backgroundColor: "#fff", width: "90%", margin: "auto", mt: 2 }} />
								)}
							</MenuItem>
						</Link>
					))}
				</Menu>

				<Menu
					hideBackdrop
					id='music-menu'
					anchorEl={anchorElTabNo2}
					open={openTabNo2}
					// onClose={handleClose(setAnchorElMusic)}
					MenuListProps={{
						"aria-labelledby": "music-button",
						onMouseLeave: handleClose(setAnchorElTabNo2),
					}}
					sx={{
						"& .MuiPaper-root": {
							backgroundColor: "#464646",
							width: 180,
						},
					}}
					disableScrollLock={true}
				>
					{Object.values(navbarItems[1])[0].map((item, index) => (
						<Link href={item.link} key={index}>
							<MenuItem
								sx={{
									color: "#fff",
									fontFamily: "Poppins",
									padding: "0.7rem 1rem 0.3rem 1rem",
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
								}}
								onClick={handleClose(setAnchorElTabNo2)}
							>
								{item.title}
								{item.addDivider && (
									<Divider sx={{ backgroundColor: "#fff", width: "90%", margin: "auto", mt: 2 }} />
								)}
							</MenuItem>
						</Link>
					))}
				</Menu></>
				} 

				
			{
				moreItems.length > 0 && 	<Menu
				hideBackdrop={true}
				disablePortal={true}
				id='more-menu'
				anchorEl={anchorElMore}
				open={openMore}
				onClose={handleClose(setAnchorElMore)}
				MenuListProps={{
					"aria-labelledby": "more-button",
					onMouseLeave: handleClose(setAnchorElMore),
				}}
				sx={{
					"& .MuiPaper-root": {
						backgroundColor: "#464646",
						width: 180,
					},
				}}
				disableScrollLock={true}
			>
				{moreData.map((item, index) => (
					<Link href={item.link} key={index}>
						<MenuItem
							key={index}
							sx={{
								color: "#fff",
								fontFamily: "Poppins",
								padding: "0.7rem 1rem 0.3rem 1rem",
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}
							onClick={handleClose(setAnchorElMore)}
						>
							{item.title}
							{item.addDivider && (
								<Divider sx={{ backgroundColor: "#fff", width: "90%", margin: "auto", mt: 2 }} />
							)}
						</MenuItem>
					</Link>
				))}
			</Menu>
			}
			</Toolbar>

			<SignInPopUp openSignInPopUp={openSignInPopUp} setOpenSignInPopUp={setOpenSignInPopUp} />

			<LoginPopUp openLoginPopUp={openLoginPopUp} setOpenLoginPopUp={setOpenLoginPopUp} />

			<MobileBar open={openMobileBar} setOpen={setOpenMobileBar} />
		</AppBar>
	);
}

export const useNavbarItems = () => {
    const categories = useSelector(state => state.categories.categories);
    const allSubCategories = useSelector(state => state.categories.subCategories);
    const status = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);

    let navbarItems = [];
    let moreItems = [];

    // Handle the fetch status
    if (status === 'loading') {
        return {
            navbarItems: [],
            moreItems: [],
            loading: true,
            error: null,
        };
    }

    if (status === 'failed') {
        return {
            navbarItems: [],
            moreItems: [],
            loading: false,
            error,
        };
    }



    categories.forEach((category, index) => {
        const itemsArray = [];

        // Add category homepage link
        itemsArray.push({
            title: category.name,
            addDivider: true,
            link: `/category/${category.name}`,
        });

        // Filter subcategories for this category
        const relatedSubCategories = allSubCategories.filter(subCategory => subCategory.category.id === category.id);
        relatedSubCategories.forEach(subCategory => {
            itemsArray.push({
                title: subCategory.name,
                addDivider: true,
                link: `/category/${category.name}/${subCategory.name}`,
            });
        });

        const categoryItem = {
            [category.name]: itemsArray
        };

        if (index < 2) {
            navbarItems.push(categoryItem);
        } else {
            moreItems.push(categoryItem);
        }
    });

    return {
        navbarItems,
        moreItems,
        loading: false,
        error: null,
		status
    };
}
