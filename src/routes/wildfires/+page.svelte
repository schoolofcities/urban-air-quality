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
	
	<meta name="description" content="Analysis of wildfire impacts on urban air quality and public health" />
	<meta name="author" content="Urban Air Quality Research Team">
	<meta rel="canonical" href="https://example.com/wildfires">

	<meta property="og:title" content="Wildfires and Air Quality" />
	<meta property="og:description" content="Analysis of wildfire impacts on urban air quality and public health" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://example.com/wildfires" />
	<meta property="og:locale" content="en_CA">

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Wildfires and Air Quality" />
	<meta name="twitter:description" content="Analysis of wildfire impacts on urban air quality and public health" />

	<meta name="citation_title" content="Wildfires and Urban Air Quality">
	<meta name="citation_author" content="Author Name 1">
	<meta name="citation_author" content="Author Name 2">
	<meta name="citation_publication_date" content="2025/01/15">
	<meta name="citation_journal_title" content="Urban Air Quality Research">
	<meta name="citation_abstract_html_url" content="https://example.com/wildfires">
</svelte:head>

<main>
	<Logo logoType="Blue" backgroundColor="var(--brandWhite)"/>

	<ImageSingle
		imageURL="https://example.com/wildfire-smoke-city.jpg"
		caption="Wildfire smoke affecting urban air quality."
		source="Example Source."
		altText="City skyline obscured by wildfire smoke"
		maxWidth="680px"
	/>

	<TitleStandard
		title="Wildfires and Urban Air Quality"
		subtitle="Understanding the impact of wildfire smoke on city air pollution and public health"
	/>

	<div class="text">
		<AuthorDate
			authors="<a href='' target='_blank'>Research Team</a>"
			date="January 2025"
		/>

		<DisplayNumDays />

		<p>
			Wildfires have become an increasingly significant threat to urban air quality, with smoke plumes traveling hundreds of miles from fire sources to affect metropolitan areas. This analysis examines the relationship between wildfire activity and air pollution levels in urban environments.<Footnote id={addFootnote(fns[0])} />
		</p>

		<DisplayPctPollutant />

		<p>
			The impact of wildfire smoke on air quality extends beyond immediate visibility concerns, affecting particulate matter concentrations, ozone levels, and overall air quality indices that directly impact public health.<Footnote id={addFootnote(fns[1])} />
		</p>

		<h2>Key Findings</h2>

		<DisplayCityRankings />

		<p>
			Recent wildfire seasons have demonstrated the far-reaching effects of smoke on urban air quality, with cities experiencing hazardous air quality conditions even when fires are located hundreds of kilometers away.<Footnote id={addFootnote(fns[2])} />
		</p>

		<p>
			Understanding these patterns is crucial for developing effective air quality management strategies and public health preparedness plans for wildfire-affected regions.
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
