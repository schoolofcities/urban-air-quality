<script>
    import aqhi_7plus_3y from '$lib/data/federal_num_days_rankings/3year/aqhi_7plus_rank.json';
    import aqhi_plus_7plus_3y from '$lib/data/federal_num_days_rankings/3year/aqhi_plus_7plus_rank.json';
    import pm25_55_5plus_3y from '$lib/data/federal_num_days_rankings/3year/pm25_55_5plus_rank.json';
    import aqhi_7plus_5y from '$lib/data/federal_num_days_rankings/5year/aqhi_7plus_rank.json';
    import aqhi_plus_7plus_5y from '$lib/data/federal_num_days_rankings/5year/aqhi_plus_7plus_rank.json';
    import pm25_55_5plus_5y from '$lib/data/federal_num_days_rankings/5year/pm25_55_5plus_rank.json';

    import ButtonGroup from '$lib/ButtonGroup.svelte';
    import BumpChart from './BumpChart.svelte';

    const airQualityOptions = [
        { value: 'AQHI', label: 'AQHI' },
        { value: 'AQHI+', label: 'AQHI+' },
        { value: 'PM2.5', label: 'PM2.5' }
    ];

    const federalNumDayRankings = {
        'AQHI_7+': aqhi_7plus_3y,
        'AQHI+_7+': aqhi_plus_7plus_3y,
        'PM2.5_55.5+': pm25_55_5plus_3y,
    };

    let airQualityMeasure = $state('AQHI');
    let currentAirQualityRankings = $state(aqhi_7plus_3y);

    function updateCurrentData() {
        let key;
        if (airQualityMeasure === 'PM2.5') {
            key = 'PM2.5_55.5+';
        } else {
            key = `${airQualityMeasure}_7+`;
        }
        currentAirQualityRankings = federalNumDayRankings[key] || aqhi_7plus_3y;
    }

    function airQualityMeasureSelect(value) {
        airQualityMeasure = value;
        updateCurrentData();
    }
</script>

<div>
    <ButtonGroup 
        options={airQualityOptions}
        bind:selectedValue={airQualityMeasure}
        onSelect={airQualityMeasureSelect}
        label="Select an air quality measure:"
    />

    <BumpChart data={currentAirQualityRankings} topN={10} />
</div>