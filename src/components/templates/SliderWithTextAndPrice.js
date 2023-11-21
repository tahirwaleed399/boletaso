import React, { useRef, useState } from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EventPopup from "../templates/PopUp/EventSeatListPopUp";

// icon
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";

// component
import Header from "./SliderHeader";
import { useGetTicketsByEventQuery } from "@/Redux/RtkQuery/GeneralQueries";

// styles
const Container = styled.section`
	padding: 4rem 0;

	@media (min-width: 601px) and (max-width: 1024px) {
		padding: 2rem 0;
	}
`;

const Wrapper = styled.div`
	width: 92%;
	margin: auto;
`;

const HeaderBox = styled.div`
	margin-bottom: 2rem;

	@media (min-width: 601px) and (max-width: 1024px) {
		margin-bottom: 1rem;
	}
`;

const SliderContainer = styled.div``;

const SliderWrapper = styled.div`
	padding: 1rem;

	@media (max-width: 600px) {
		padding: 0.5rem;
	}

	@media (min-width: 601px) and (max-width: 1024px) {
		padding: 0.5rem;
	}
`;

const SliderImageBox = styled.div`
	overflow: hidden;
`;

const SliderImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const SliderTextBox = styled.div`
	padding: 1rem;

	@media (max-width: 600px) {
	}

	@media (min-width: 601px) and (max-width: 1024px) {
		padding: 1rem 0.5rem;
	}
`;

const SliderTextSplitBox = styled.div`
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 600px) {
	}

	@media (min-width: 601px) and (max-width: 1024px) {
	}
`;

const SliderTitle = styled.p`
	font-size: 1.2rem;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 22ch;

	@media (max-width: 600px) {
		max-width: 17ch;
	}

	@media (min-width: 601px) and (max-width: 1024px) {
		font-size: 0.75rem;
	}
`;

const SliderPrice = styled.p`
	font-size: 0.9rem;
	font-weight: 400;

	@media (min-width: 601px) and (max-width: 1024px) {
		font-size: 0.6rem;
	}
`;

const SliderDetails = styled.p`
	color: #fff;
	font-size: 0.9rem;
	font-weight: 200;
	margin-top: 0.5rem;
	letter-spacing: 0.5px;

	@media (min-width: 601px) and (max-width: 1024px) {
		font-size: 0.6rem;
	}
`;

const SliderBox = styled.div`
	background-color: #201d6b;
	border-radius: 1rem;
	overflow: hidden;
	cursor: pointer;

	&:hover ${SliderImage} {
		scale: 1.06;
		transition: all 0.25s ease-out;
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		border-radius: 0.5rem;
	}
`;

const SliderButtonContainer = styled.div`
	display: flex;
	width: 97%;
	margin: 2rem auto 0 auto;

	@media (max-width: 600px) {
		display: none;
	}
`;

const SliderButtonWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const SliderButtonBox = styled.div`
	background-color: #8581ff;
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
	cursor: pointer;
	z-index: 1;
`;

const SliderButtonDarkBox = styled.div`
	background-color: #3e39d1;
	display: flex;
	align-items: center;
	height: 100%;
	width: 100%;
	cursor: pointer;
	z-index: 1;
`;

export default function SliderWithTextAndPrice({ idTag, sliderHeader, sliderData, sliderRef }) {
	// ref
	const [showAllList, setShowAllList] = useState(false);
	const [openEventPopUp, setOpenEventPopUp] = useState(false);
	const [eventListNameToForward, setEventListNameToForward] = useState("");
	const [eventListDescriptionToForward, setEventListDescriptionToForward] = useState("");
	const [selectedEvent, setSelectedEvent] = useState(null);

	const {data : tickets , isLoading : ticketsLoading , isSuccess : ticketsSuccess}  = useGetTicketsByEventQuery(selectedEvent ? selectedEvent.id : '');
	

	const sliderRefDetail = useRef(sliderRef);

	// slider settings
	var settings = {
		dots: true,
		infinite: false,
		arrows: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Container id={idTag}>
			<Wrapper>
				<HeaderBox>
					<Header light={false}>{sliderHeader}</Header>
				</HeaderBox>

				{/* Slider */}
				<SliderContainer>
					<Slider {...settings} ref={sliderRefDetail}>
						{sliderData.map((item, index) => (
							<SliderWrapper key={index} onClick={() => {
								setOpenEventPopUp(true);
								setEventListNameToForward(item.eventName);
								setEventListDescriptionToForward(item.eventLocation);
								setSelectedEvent(item)
							}}>
								<SliderBox>
									<SliderImageBox>
										<SliderImage
											src={item.image_1}
											alt={item.description}
											height='auto'
											width='auto'
											loading='lazy'
										/>
									</SliderImageBox>
									<SliderTextBox>
										<SliderTextSplitBox>
											<SliderTitle>{item.description}</SliderTitle>
											<SliderPrice>{14}$</SliderPrice>
										</SliderTextSplitBox>
										<SliderDetails>{item.description}</SliderDetails>
									</SliderTextBox>
								</SliderBox>
							</SliderWrapper>
						))}
					</Slider>
					{
				ticketsSuccess && selectedEvent && <EventPopup
				openPopUp={openEventPopUp}
				setOpenPopUp={setOpenEventPopUp}
				eventName={eventListNameToForward}
				eventDescription={eventListDescriptionToForward}
				eventListingData={tickets.tickets}
				event={selectedEvent}
			/>
			}
				</SliderContainer>

				<SliderButtonContainer>
					<SliderButtonWrapper>
						<SliderButtonBox
							onClick={() => {
								sliderRefDetail?.current?.slickPrev();
							}}
						>
							<ArrowLeftRoundedIcon
								sx={{ color: "#fff", fontSize: { xs: "2rem", sm: "1.5rem", md: "2.3rem" } }}
							/>
						</SliderButtonBox>

						<SliderButtonDarkBox
							onClick={() => {
								sliderRefDetail?.current?.slickNext();
							}}
						>
							<ArrowRightRoundedIcon
								sx={{
									color: "#fff",
									fontSize: { xs: "2rem", sm: "1.5rem", md: "2.3rem" },
									height: "100%",
								}}
							/>
						</SliderButtonDarkBox>
					</SliderButtonWrapper>
				</SliderButtonContainer>
			</Wrapper>
		</Container>
	);
}
