<script>
	import '../../assets/global-styles.css';

	import Logo from '$lib/LogoTop.svelte';
	import TitleStandard from '$lib/TitleStandard.svelte';
	import TitleHalfSplit from '$lib/TitleHalfSplit.svelte';
	import TitleFullPage from '$lib/TitleFullPage.svelte';

	import AuthorDate from '$lib/AuthorDate.svelte';
	import ImageSingle from '$lib/ImageSingle.svelte';
	import Footer from '$lib/Footer.svelte';
	
	import DisplayNumDays from '$lib/DisplayNumDays.svelte';
	import DisplayPctPollutant from '$lib/DisplayPctPollutant.svelte';
	import DisplayCityRankings from '$lib/DisplayCityRankings.svelte';
	import AQHIBar from '$lib/AQHIBar.svelte';
</script>

<svelte:head>
	<title>Wildfires and Urban Air Quality | School of Cities</title>
	
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
	<!-- <Logo logoType="Blue" backgroundColor="var(--brandWhite)"/>

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
	/> -->

	<!-- <TitleHalfSplit
		title="Wildfires and urban air quality"
		subtitle="Tracking worsening air quality across Canada cities"
		image="./img/michelle-photo-toronto.png"
		imageAltText="Photo of Toronto on a smokey day in 2023"
		imageCaption=""
		imageSource=""
		titleFontColour="var(--brandBlack)"
		titleBorderColour="var(--brandRed)"
		subtitleFontColour="var(--brandBlack)"
		backgroundColour="#faf6e5"
		logoStyle='Light'
	/> -->

	<TitleFullPage
		title="Wildfires and urban air quality"
		subtitle="Examining worsening air quality across Canada cities"
		image="./img/toronto-smoky-jeff-june-2023.jpg"
		imageAltText="Photo of Toronto on a smokey day in 2023"
		imageOpacity=1
		
		titleFontColour="var(--brandWhite)"
		titleBorderColour="var(--brandWhite)"
		subtitleFontColour="var(--brandWhite)"

		logoType='White'
	/>




	<div class="text">
		<AuthorDate
			authors="<a href='https://www.linkedin.com/in/aniket-k-8a8b9921b/' target='_blank'>Aniket Kali</a>, <a href='https://jamaps.github.io/' target='_blank'>Jeff Allen</a>"
			date="November 2025"
		/>

		<p>
			Clean air is a basic part of a decent life in the city: it makes going outside pleasant as much as safe. The smoky smell of a barbeque might be nice before a summertime dinner, but less so when it <a href="https://www.cbc.ca/news/canada/toronto/air-quality-statement-in-effect-for-toronto-gta-1.7600597" target="_blank">coats your city</a> in noxious fumes. Bad air makes for <a href="https://www.canada.ca/en/environment-climate-change/campaigns/canadian-environment-week/clean-air-day/health-impacts-air-pollution.html" target="_blank">more trips to the hospital</a>, and a <a href="https://schoolofcities.github.io/air-pollution-and-premature-mortality" target="_blank">faster trek to the grave</a>. 
		</p>

		<p>
			Across Canada, recent years have seen a resurgence in poor air quality, and growing wildfires are the biggest culprit. 2025 was the <a href="https://www.theguardian.com/world/2025/aug/11/canada-wildfire-season" target="_blank">second worst wildfire</a> season on record, just two years after the record-shattering 2023 wildfire season. Man-made <a href="https://climateinstitute.ca/news/fact-sheet-wildfires/" target="_blank">climate</a> <a href="https://www.nature.com/articles/s41467-024-51154-7" target="_blank">change</a> is to thank—it makes for more extreme fire weather conditions, hotter and windier summers, and more erratic rainfall. 
		</p>

		<p>
			Below, we've plotted out the number of days that various cities across Canada were exposed to harmful levels of pollution, from 2005 to 2025, based on Canada's <a href="https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index.html" target="_blank"> Air Quality Health Index (AQHI)</a>. The AQHI ranges from 1 to 11, where at 'High' and 'Very High' levels at risk populations are recommended to reduce or avoid outdoor activities.
		</p>
		<AQHIBar/>
		<p>
			The AQHI is a combined metric based on three different pollutants:
		</p>
		<ul class="compact-list">
			<li><strong>PM<sub>2.5</sub>:</strong> Tiny pollution particles from things like wildfire smoke or traffic that can get deep into your lungs, like the haze from a nearby fire.</li>
			<li><strong>NO<sub>2</sub>:</strong> A gas mainly from vehicles or industry that irritates the lungs, like the sharp smell near a busy road.</li>
			<li><strong>O<sub>3</sub>:</strong> Formed when other pollutants mix with sunlight like on a smoggy summer day, it can make breathing harder.</li>
		</ul>

		<p>
			We specifically analyze two versions of the AQHI:
		</p>
		<ul class="compact-list">
			<li><strong>AQHI:</strong> Computed using the relative amounts of harmful pollutants in the air over any 3-hour period.</li>
			<li><strong>AQHI+:</strong> An extension of AQHI, sensitive to extreme events, like a passing smoke plume, or flaring industrial refinery.</li>
		</ul>

		<DisplayNumDays />

		<p>
			For years, <a href="https://news.ontario.ca/en/release/9974/improving-air-quality-in-the-southwest-greater-toronto-area" target="_blank">deliberate attempts</a> to improve air quality had been working, especially along Ontario's industrial corridor. The new wave of bad air is sweeping across cities in the Prairies, with increasing severity. But it isn't stopping there: slowly, but surely, it's making a comeback in Eastern Canada as well.
		</p>

		<DisplayCityRankings />

		<p>
			When we see poor air quality, where does it come from? In our analysis below, PM<sub>2.5</sub> is increasingly responsible. It's the pollutant released by wildfires after all, and these last three years have been the worst three wildfire seasons <a href="https://www.cbc.ca/newsinteractives/features/wildfires-tracker-canada" target="_blank">on record</a>.
		</p>

		<DisplayPctPollutant />
		
		<p>
			For a time, it seemed that poor air quality was set to <a href="https://www.cbc.ca/news/science/2023-wildfires-air-pollution-1.7619089" target="_blank">become a thing of the past</a> in Canadian cities; a health issue which had received successful treatment. And yet nowadays, it looks like it's never been worse.
		</p>

		<p>
			In a time of nation building projects, especially ones that look at pipelines and extractive industry, what will be left to make the air in our cities clean? No new infrastructure projects are going to let our lungs make use of diesel and smoke after all. 
		</p>

		<div class="details">
			<h2>Data & Methodology</h2>

			<p>
				We obtained hourly pollutant data for PM<sub>2.5</sub>, NO<sub>2</sub>, and O<sub>3</sub> from the <a href="https://data-donnees.az.ec.gc.ca/data/air/monitor/national-air-pollution-surveillance-naps-program/" target="_blank">National Air Pollution Surveillance (NAPS)</a> program for 2005-2023, and from <a href="https://openaq.org/" target="_blank">OpenAQ</a> for 2024-2025 (through October 31). For cities with multiple sensors, we selected those offering the most consistent temporal coverage and proximity to the city center.
			</p>

			<p>
				Air quality was assessed using the national Air Quality Health Index (AQHI), developed by <a href="https://pubmed.ncbi.nlm.nih.gov/18376646/" target="_blank">Stieb et al. (2008)</a>. The AQHI is an <a href="https://en.wikipedia.org/wiki/Air_Quality_Health_Index_(Canada)#Calculation" target="_blank">exponential formula</a> combining the relative contributions of three-hour averages of PM<sub>2.5</sub>, NO<sub>2</sub>, and O<sub>3</sub>. We also computed AQHI+, a <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/Technical%20guidelines%20for%20Ontario's%20AQHI%20Plus%20and%20advisory%20program%20(April%202021).docx" target="_blank">Government of Ontario-specific extension</a> that increases sensitivity to short-term pollution spikes and outliers. Our full implementation of both measures is <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/analysis/processing/get_federal_pollutants_aqhi.ipynb" target="_blank">available here</a>.
			</p>

			<p>
				Because AQHI is derived from additive pollutant-specific components, we can estimate a single pollutant's percent contribution by recomputing the index while omitting the other two. This forms the basis of the relative contribution analysis presented in the final figure, with the corresponding code <a href="https://github.com/schoolofcities/urban-air-quality/blob/main/analysis/processing/get_federal_pct_pollutant.ipynb" target="_blank">available here</a>.
			</p>

			<p>
				We restrict results to years where at least 50% of pollutant data is available. Due to variation in seasonal trends, we opted against any interpolation of missing data. We then count the number of days exceeding specified thresholds based on daily maximum values to measure exposure, and aggregate these counts into five-year intervals to assess long-term rankings.
			</p>

			<p>
				All code and <a href="https://github.com/schoolofcities/urban-air-quality/tree/main/data/processed" target="_blank">processed data</a> are publicly available in the accompanying <a href="https://github.com/schoolofcities/urban-air-quality/tree/main" target="_blank">GitHub repository</a>.
			</p>
		</div>
	</div>

	<Footer />
</main>

<style>
	.compact-list {
		margin-top: -10px;
		margin-bottom: 15px;
		padding-left: 20px;
	}

	.compact-list li {
		font-family: SourceSerif;
		font-size: 18px;
		line-height: 30px;
		color: var(--brandGray90);
		margin-bottom: 5px;
	}

	.compact-list li:last-child {
		margin-bottom: 0;
	}

	@media screen and (max-width: 600px) {
		.compact-list li {
			font-size: 17px;
			line-height: 26px;
		}
	}
</style>
