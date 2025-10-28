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
				We obtained hourly pollutant data for PM<sub>2.5</sub>, NO<sub>2</sub>, and O<sub>3</sub> from the <a href="https://data-donnees.az.ec.gc.ca/data/air/monitor/national-air-pollution-surveillance-naps-program/" target="_blank">National Air Pollution Surveillance (NAPS)</a> program for 2005-2023, and from <a href="https://openaq.org/" target="_blank">OpenAQ</a> for 2024-2025 (through September 29). For cities with multiple sensors, we selected those offering the most consistent temporal coverage and proximity to the city center.
			</p>

			<p>
				Air quality was assessed using the national Air Quality Health Index (AQHI), developed by <a href="https://pubmed.ncbi.nlm.nih.gov/18376646/" target="_blank">Stieb et al. (2008)</a>. The AQHI is an <a href="https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)#Calculation" target="_blank">exponential formula</a> combining the relative contributions of three-hour averages of PM<sub>2.5</sub>, NO<sub>2</sub>, and O<sub>3</sub>. We also computed AQHI+, a <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/Technical%20guidelines%20for%20Ontario's%20AQHI%20Plus%20and%20advisory%20program%20(April%202021).docx" target="_blank">Government of Ontario-specific extension</a> that increases sensitivity to short-term pollution spikes and outliers. Our full implementation of both measures is <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/analysis/processing/get_federal_pollutants_aqhi.ipynb" target="_blank">available here</a>.
			</p>

			<p>
				Because AQHI is derived from additive pollutant-specific components, we can estimate a single pollutant's percent contribution by recomputing the index while omitting the other two. This forms the basis of the relative contribution analysis presented in the second figure, with the corresponding code <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/analysis/processing/get_federal_pct_pollutant.ipynb" target="_blank">available here</a>.
			</p>

			<p>
				We restrict results to years where at least 50% of pollutant data is available. Due to variation in seasonal trends, we opted against any interpolation of missing data. We then count the number of days exceeding specified thresholds based on daily maximum values to measure exposure, and aggregate these counts into five-year intervals to assess long-term rankings.
			</p>

			<p>
				All code and <a href="https://github.com/schoolofcities/urban-air-quality/tree/main/data/processed" target="_blank">processed data</a> are publicly available in the accompanying <a href="https://github.com/schoolofcities/urban-air-quality/tree/main" target="_blank">GitHub repository</a>.
			</p>
		</div>
	</div>

	<div class="text">
		<Footnotes footnotes={footnotes} />
	</div>

	<Footer />
</main>
