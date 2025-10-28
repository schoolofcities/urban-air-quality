<script>
	import '../../assets/global-styles.css';

	import Logo from '$lib/LogoTop.svelte';
	import TitleStandard from '$lib/TitleStandard.svelte';
	import AuthorDate from '$lib/AuthorDate.svelte';
	import ImageSingle from '$lib/ImageSingle.svelte';
	import Footer from '$lib/Footer.svelte';
	
	import DisplayNumDays from '$lib/DisplayNumDays.svelte';
	import DisplayPctPollutant from '$lib/DisplayPctPollutant.svelte';
	import DisplayCityRankings from '$lib/DisplayCityRankings.svelte';
	
	import Footnote from '$lib/Footnote.svelte';
	import Footnotes from '$lib/Footnotes.svelte';
	import { createFootnoteStore } from '$lib/footnoteUtils';

	const footnoteStore = createFootnoteStore();
	const { footnotes, addFootnote } = footnoteStore;

	const fns = [
		'Wildfire research citation or reference',
		'Air quality monitoring data source',
		'Climate change impact studies'
	];
</script>

<svelte:head>
	<title>Wildfires and Air Quality | Urban Air Quality</title>
	
	<meta name="description" content="Analysis of worsening urban air quality and wildfire pollutants" />
	<meta name="author" content="Urban Air Quality Research Team">
	<meta rel="canonical" href="https://schoolofcities.github.io/urban-air-quality/wildfires">

	<meta property="og:title" content="Wildfires and Air Quality" />
	<meta property="og:description" content="Analysis of worsening urban air quality and wildfire pollutants" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://schoolofcities.github.io/urban-air-quality/wildfires" />
	<meta property="og:locale" content="en_CA">

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Wildfires and Air Quality" />
	<meta name="twitter:description" content="Analysis of worsening urban air quality and wildfire pollutants" />
</svelte:head>

<main>
	<Logo logoType="Blue" backgroundColor="var(--brandWhite)"/>

	<ImageSingle
		imageURL="./img/toronto-wildfires.png"
		caption="Wildfire smoke covering Toronto."
		source="CBC."
		altText="Toronto skyline obscured by wildfire smoke"
		maxWidth="680px"
	/>

	<TitleStandard
		title="Wildfires and Urban Air Quality"
		subtitle="Examining worsening air quality across Canada cities"
	/>

	<div class="text">
		<AuthorDate
			authors="<a href='https://www.linkedin.com/in/aniket-k-8a8b9921b/' target='_blank'>Aniket Kali</a>, <a href='https://jamaps.github.io/' target='_blank'>Jeff Allen</a>"
			date="October 2025"
		/>

		<p>
			Some background about worsening air quality and health risks, definitions of AQHI, and intuition about different pollutants
		</p>

		<DisplayNumDays />

		<p>
			Connect this to wildfires specifically and explain the following graph which has to do with rise in contribution from PM2.5.<Footnote id={addFootnote(fns[0])} />
		</p>

		<DisplayPctPollutant />

		<p>
			Discuss the geographic nature of this - point to the fact that Prairie cities are experiencing the worst of this. Also note the decline in bad air quality along Ontario's industrial belt which is returning now.<Footnote id={addFootnote(fns[1])} />
		</p>

		<DisplayCityRankings />

		<p>
			Briefly conclude, about risks, solutions, and tie to the nation building theme and moment we're in.<Footnote id={addFootnote(fns[2])} />
		</p>

		<div class="details">
			<h2>Data & Methodology</h2>
			<p>
				This analysis combines wildfire occurrence data, air quality monitoring records, and meteorological information to assess the impact of wildfires on urban air quality metrics.
			</p>
			<p>
				Data sources include government air quality monitoring networks, satellite-based fire detection systems, and weather station records spanning the past decade.
			</p>
		</div>
	</div>

	<div class="text">
		<Footnotes footnotes={footnotes} />
	</div>

	<Footer />
</main>
