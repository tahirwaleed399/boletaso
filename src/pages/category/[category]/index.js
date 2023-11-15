import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";

// component
const HeroWithButton = dynamic(() => import("@/components/templates/hero/Hero"));
const TrendingSlider = dynamic(() => import("@/components/templates/Slider/TrendingSlider"));
const BrowseDropdown = dynamic(() => import("@/components/home/BrowseDropdown"));
const CategorySlider = dynamic(() => import("@/components/templates/Slider/CategorySlider"));
const SliderWithTextAndPrice = dynamic(() => import("@/components/templates/SliderWithTextAndPrice"));

// Data
import {
	musicTrendingSliderData,
	musicCategorySliderData,
	regConcertSliderData,
	popConcertSliderData,
	rockConcertSliderData,
} from "../../../components/json/sliderData";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAllSubCategories, selectCategoryByName, selectSubCategoriesByCategoryId } from "@/Redux/Slices/categoriesSlice";
import { useGetEventsByCategoryQuery, useGetEventsBySubCategoryQuery } from "@/Redux/RtkQuery/GeneralQueries";

// style
const Main = styled.main`
	padding-bottom: 8rem;
`;

export default function Home() {

	const router = useRouter()
	const category = useSelector(state => selectCategoryByName(state, router.query.category ?? ''));
	const subCategories = useSelector(state => selectSubCategoriesByCategoryId(state, category ?  category.id : ''));
	const {data : events , isSuccess} = useGetEventsByCategoryQuery({categoryId :  category ? category.id :''});

	return (
		<>
			<Head>
				<title>Boletaso | Music Page</title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Main>
				
		
				{/* Hero */}
				{
					category && <HeroWithButton
					header={category.name}
					image='/images/banner/musicMain.png'
					description1={category.description}
				/>
				}
				{/* Trending Slider */}
				{isSuccess &&
					<TrendingSlider
					sliderHeader='Trending Events near you'
					sliderData={events.events}
					sliderRef='musicTrendSlider'
				/>
				}
				{/* Browse Location DropDown Menu */}
				<BrowseDropdown />
				{/* Category Slider */}
				{subCategories && <CategorySlider
					sliderHeader='Sub Categories'
					sliderData={subCategories}
					sliderRef='musicCategoriesSlider'
				/>}

				{/* Reggaeton Slider */}
				{
					subCategories && subCategories.map((subCategory , index)=>{
						return <SubCategoriesEvents subCategory={subCategory} key={index}></SubCategoriesEvents>
					})
				}
				
			</Main>
		</>
	);
}


function SubCategoriesEvents({subCategory}){
const {data , isLoading , isSuccess} = useGetEventsBySubCategoryQuery({subCategoryId : subCategory.id})

	return (<>
	{
		isSuccess && data.events.length > 0 &&<>

<SliderWithTextAndPrice
		idTag='musicReggaeton'
		sliderHeader={subCategory.name}
		sliderData={data.events}
		sliderRef='musicConcertSlider'
	/>
		</>
	}
	
	</>)

}