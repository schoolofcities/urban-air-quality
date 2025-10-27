<script>
	import '../assets/global-styles.css';

	import Logo from '$lib/LogoTop.svelte';
	import TitleStandard from '$lib/TitleStandard.svelte';
	import AuthorDate from '$lib/AuthorDate.svelte';
	import Footer from '$lib/Footer.svelte';
</script>



<svelte:head>
	<title>Urban Air Quality | School of Cities</title>

	<meta name="description" content="Analysis and visualization of urban air quality across Canadian cities" />
	<meta name="author" content="School of Cities">
	<meta rel="canonical" href="https://schoolofcities.github.io/urban-air-quality/">

	<meta property="og:title" content="Urban Air Quality" />
	<meta property="og:description" content="Analysis and visualization of urban air quality across Canadian cities" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://schoolofcities.github.io/urban-air-quality/" />
	<meta property="og:locale" content="en_CA">

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Urban Air Quality" />
	<meta name="twitter:description" content="Analysis and visualization of urban air quality across Canadian cities" />
	<meta name="twitter:site" content="https://schoolofcities.github.io/urban-air-quality/" />
</svelte:head>



<main>
	<Logo logoType="Blue" backgroundColor="var(--brandWhite)"/>

	<TitleStandard
		title="Urban Air Quality"
		subtitle=""
	/>

	<div class="text">

		<AuthorDate
			authors="<a href='https://www.linkedin.com/in/aniket-k-8a8b9921b/' target='_blank'>Aniket Kali</a>, <a href='https://jamaps.github.io/' target='_blank'>Jeff Allen</a>"
			date="October 2025"
		/>

		<p>
			Explore our analysis of air quality trends across Canadian cities. <a href="./wildfires">Learn about the impact of wildfires on urban air quality</a> and discover how different pollutants affect communities nationwide.
		</p>

	</div>

	<Footer />

</main>