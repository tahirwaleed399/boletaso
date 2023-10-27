import React, { useContext } from "react";
import StateContext from "@/context/StateContext";
import Link from "next/link";
import styled from "styled-components";
import {
	SwipeableDrawer,
	List,
	ListItem,
	IconButton,
	Divider,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";

// component
import SignInPopUp from "../templates/PopUp/SignInPopUp";
import LoginPopUp from "../templates/PopUp/LoginPopUp";

// Material icons
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import SportsBasketballRoundedIcon from "@mui/icons-material/SportsBasketballRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavbarItems } from "./Navbar";
// style
const MobileButtonLink = styled.a`
	width: 100%;
	border-radius: 0.2rem;
`;

const MobileButton = styled.button`
	/* color */
	color: #000;
	/* display */
	display: flex;
	align-items: center;
	gap: 1rem;
	/* font */
	font-family: "Montserrat";
	font-size: 1rem;
	font-weight: 500;
	background: transparent;
	display: flex;
	align-items: center;
	border: none;
	margin: 0.5rem 0;
	padding: 0.5rem 0;
	width: 100%;
	cursor: pointer;
`;

export default function SwipeBar({ open, setOpen }) {
	const { openSignInPopUp, setOpenSignInPopUp, openLoginPopUp, setOpenLoginPopUp } = useContext(StateContext);

	// Drawer Handler for Tablet and Mobile device
	const drawerHandlerClose = (open) => {
		setOpen(!open);
	};

	const { navbarItems, loading, error , moreItems , status } = useNavbarItems();

	return (
		<SwipeableDrawer
			anchor='right'
			open={open}
			onOpen={drawerHandlerClose}
			onClose={drawerHandlerClose}
			PaperProps={{
				sx: {
					width: 300,
					borderRadius: "2rem 0 0 2rem",
				},
			}}
		>
			<List sx={{ width: 300 }}>
				<ListItem sx={{ justifyContent: "flex-end" }}>
					<IconButton onClick={drawerHandlerClose}>
						<CloseIcon
							sx={{
								// borderRadius: "50%",
								// background: "var(--MainColor)",
								color: "var(--purpleColor)",
								fontSize: "2rem",
								padding: ".2rem",
							}}
						/>
					</IconButton>
				</ListItem>
				<Divider />

				<Divider />
				{/* Home */}
				<ListItem>
					<MobileButtonLink href='/'>
						<MobileButton onClick={drawerHandlerClose}>
							<HomeRoundedIcon sx={{ color: "var(--purpleColor)", fontSize: "1.5rem" }} />
							Home
						</MobileButton>
					</MobileButtonLink>
				</ListItem>
				<Divider /> 

				{/* music Menu */}
				{
  status === 'succeeded' && 
  navbarItems.map((item, idx) => (
    <>
      <ListItem
        sx={{
          padding: ".2rem",
        }}
      >
        <Accordion
          square={true}
          sx={{
            border: "none",
            width: "100%",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${idx + 1}a-content`}
            id={`panel${idx + 1}a-header`}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <GraphicEqRoundedIcon sx={{ color: "var(--purpleColor)", fontSize: "1.5rem" }} />
              {Object.keys(item)[0]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.values(item)[0].map((subItem, index) => (
              <Link href={subItem.link} key={index}>
                <MobileButton onClick={drawerHandlerClose}>{subItem.title}</MobileButton>
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      </ListItem>
      <Divider />
    </>
  ))
}


				{/* more Menu */}
				{
					moreItems.length > 0 && <>
					 <ListItem
					sx={{
						padding: ".2rem",
					}}
				>
					<Accordion
						square={true}
						// disableGutters
						sx={{
							border: "none",
							width: "100%",
							outline: "none",
							boxShadow: "none",
						}}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							<Typography
								sx={{
									fontFamily: "Montserrat",
									fontWeight: "500",
									display: "flex",
									alignItems: "center",
									gap: "0.8rem",
								}}
							>
								<TheaterComedyRoundedIcon sx={{ color: "var(--purpleColor)", fontSize: "1.5rem" }} />
								More
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{comedyMenu.map((item, index) => (
								<Link href={item.link} key={index}>
									<MobileButton onClick={drawerHandlerClose}>{item.label}</MobileButton>
								</Link>
							))}
						</AccordionDetails>
					</Accordion>
				</ListItem> 
				<Divider />
					</>
				}

				{/* Login  */}
				<ListItem>
					<MobileButton onClick={setOpenLoginPopUp}>
						<AccountCircleRoundedIcon sx={{ color: "var(--purpleColor)", fontSize: "1.5rem" }} />
						Login
					</MobileButton>
				</ListItem>
				<Divider />

				{/* Get Started  */}
				<ListItem>
					<MobileButton onClick={setOpenLoginPopUp}>
						<PersonAddAltRoundedIcon sx={{ color: "var(--purpleColor)", fontSize: "1.5rem" }} />
						Get Started
					</MobileButton>
				</ListItem>
				<Divider />
			</List>

			<SignInPopUp openSignInPopUp={openSignInPopUp} setOpenSignInPopUp={setOpenSignInPopUp} />

			<LoginPopUp openLoginPopUp={openLoginPopUp} setOpenLoginPopUp={setOpenLoginPopUp} />
		</SwipeableDrawer>
	);
}
