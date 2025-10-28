<script>
    import aqhi_7plus_3y from '$lib/data/federal_num_days_rankings/3year/aqhi_7plus_rank.json';
    import aqhi_plus_7plus_3y from '$lib/data/federal_num_days_rankings/3year/aqhi_plus_7plus_rank.json';
    import pm25_55_5plus_3y from '$lib/data/federal_num_days_rankings/3year/pm25_55_5plus_rank.json';
    import aqhi_7plus_5y from '$lib/data/federal_num_days_rankings/5year/aqhi_7plus_rank.json';
    import aqhi_plus_7plus_5y from '$lib/data/federal_num_days_rankings/5year/aqhi_plus_7plus_rank.json';
    import pm25_55_5plus_5y from '$lib/data/federal_num_days_rankings/5year/pm25_55_5plus_rank.json';

    import aqhi_7plus from '$lib/data/federal_num_days/aqhi_7plus.json';
    import aqhi_11 from '$lib/data/federal_num_days/aqhi_11plus.json';
    import aqhi_plus_7plus from '$lib/data/federal_num_days/aqhi_plus_7plus.json';
    import aqhi_plus_11 from '$lib/data/federal_num_days/aqhi_plus_11plus.json';
    import pm25_55_5plus from '$lib/data/federal_num_days/pm25_55_5plus.json';
    import pm25_225_5plus from '$lib/data/federal_num_days/pm25_225_5plus.json';

    import ButtonGroup from '$lib/ButtonGroup.svelte';
    import RankingsChart from './RankingsChart.svelte';
    import GraphicTitle from '$lib/GraphicTitle.svelte';
    import LegendGraduatedBreakpoints from '$lib/LegendGraduatedBreakpoints.svelte';
    import { GRADUATED_COLORS, RANKINGS_NUM_DAYS_BREAKS } from '$lib/constants.js';

    const airQualityOptions = [
        { value: 'AQHI', label: 'AQHI' },
        { value: 'AQHI+', label: 'AQHI+' },
        { value: 'PM2.5', label: 'PM2.5' }
    ];

    const federalNumDayRankings = {
        'AQHI_7+': aqhi_7plus_5y,
        'AQHI+_7+': aqhi_plus_7plus_5y,
        'PM2.5_55.5+': pm25_55_5plus_5y,
    };

    const federalNumDaysData = {
        'AQHI_7+': aqhi_7plus,
        'AQHI_11': aqhi_11,
        'AQHI+_7+': aqhi_plus_7plus,
        'AQHI+_11': aqhi_plus_11,
        'PM2.5_55.5+': pm25_55_5plus,
        'PM2.5_225.5+': pm25_225_5plus
    };

    let airQualityMeasure = $state('AQHI');
    let currentAirQualityRankings = $state(aqhi_7plus_5y);
    let currentAirQualityData = $state(aqhi_7plus);

    function updateCurrentData() {
        let key;
        if (airQualityMeasure === 'PM2.5') {
            key = 'PM2.5_55.5+';
        } else {
            key = `${airQualityMeasure}_7+`;
        }
        currentAirQualityRankings = federalNumDayRankings[key] || aqhi_7plus_5y;
        currentAirQualityData = federalNumDaysData[key] || aqhi_7plus;
    }

    function airQualityMeasureSelect(value) {
        airQualityMeasure = value;
        updateCurrentData();
    }
</script>

<div>
    <GraphicTitle
        title="Prairie cities are seeing the worst increases in bad air quality, associated with recent wildfires"
        subtitle="Cities ranked by number of recorded days where the maximum value of AQHI or PM2.5 exceeded the 'High' or 'Unhealthy' thresholds respectively"
    />

    <ButtonGroup 
        options={airQualityOptions}
        bind:selectedValue={airQualityMeasure}
        onSelect={airQualityMeasureSelect}
        label="Select an air quality measure:"
    />

    <LegendGraduatedBreakpoints 
        colors={GRADUATED_COLORS}
        breakpoints={RANKINGS_NUM_DAYS_BREAKS[airQualityMeasure]}
        title="Number of days per period"
    />

    <RankingsChart 
        data={currentAirQualityRankings} 
        topN={10}
        numDaysData={currentAirQualityData}
        colors={GRADUATED_COLORS}
        breakpoints={RANKINGS_NUM_DAYS_BREAKS[airQualityMeasure]}
    />
</div>