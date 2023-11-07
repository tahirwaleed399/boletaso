import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
import { Grid } from "@mui/material";

// component
const PageTicketHero = dynamic(() => import("@/components/templates/hero/PageTicketHero"));
const TrendingSliderWithoutImage = dynamic(() => import("@/components/templates/Slider/TrendingSliderWithoutImage"));
const ImageSliderNoDetail = dynamic(() => import("@/components/templates/Slider/ImageSliderNoDetail"));
const PerformerList = dynamic(() => import("@/components/pageSection/PerformerList"));
const EventList = dynamic(() => import("@/components/pageSection/EventList"));

// Json Data
import { RaggTrendingData, RaggCategoryData } from "@/components/json/MusicData";
import { avatarMoreData } from "@/components/json/AvatarData";
import { raggEventData } from "@/components/json/EventData";
import { useGetEventQuery } from "@/Redux/RtkQuery/GeneralQueries";
import { useRouter } from "next/router";

// styles
const Container = styled.section`
	padding: 2rem 0;

	@media (min-width: 601px) and (max-width: 1024px) {
		padding: 2rem 0;
	}
`;

const Wrapper = styled.div`
	width: 92%;
	margin: auto;
`;

const HeaderBox = styled.div`
	margin-bottom: 1.5rem;

	@media (min-width: 601px) and (max-width: 1024px) {
		margin-bottom: 1rem;
	}
`;

const GridContainer = styled.div``;

const EventContainer = styled.div``;

const PerformerContainer = styled.div``;

export default function RaggaeTicket() {
	const {data  , isLoading , isSuccess} = useGetEventQuery();
	const router = useRouter()
	return ( 
		<>
			<Head>
				<title>Boletaso | Pop Music</title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{/* Hero Page */}
				<PageTicketHero
					header={router.query.subCategory}
					description='Popular music, better known as “pop,” traces its roots back to the 1950s in both the United States and the United Kingdom. Most pop songs are known for repetitive, catchy lyrics that are easy to both sing and dance along too.'
					image='/images/musicPage/banner/Pop.png'
				/>

				{/* Trending Slider */}
				<TrendingSliderWithoutImage
					sliderHeader='Events near American Fork, UT'
					sliderData={RaggTrendingData}
					sliderRef='musicPopTrendSlider'
				/>

				{/* Category Slider */}
				<ImageSliderNoDetail
					sliderHeader='Popular Reggae Shows'
					sliderData={RaggCategoryData}
					sliderRef='musicPopCategoriesSlider'
				/>

				{/* Grid Events and Performer*/}
				<Container>
					<Wrapper>
						<GridContainer>
							<Grid container spacing={8} justifyContent='space-between'>
								<Grid item xs={12} sm={8} md={8}>
									<EventContainer>
										{
											isSuccess && <EventList sectionHeader='All Shows' dataList={data.events} />
										}
									</EventContainer>
								</Grid>
								<Grid item xs={12} sm={4} md={4}>
									<PerformerContainer>
										<PerformerList sectionHeader='Top Artists' dataList={avatarMoreData} />
									</PerformerContainer>
								</Grid>
							</Grid>
						</GridContainer>
					</Wrapper>
				</Container>
			</main>
		</>
	);
}

