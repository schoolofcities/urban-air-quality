<script>
    import no2_pct from '$lib/data/federal_pct_pollutant/no2_pct.json';
    import no2_pct_medium from '$lib/data/federal_pct_pollutant/no2_pct_medium.json';
    import no2_pct_high from '$lib/data/federal_pct_pollutant/no2_pct_high.json';
    import o3_pct from '$lib/data/federal_pct_pollutant/o3_pct.json';
    import o3_pct_medium from '$lib/data/federal_pct_pollutant/o3_pct_medium.json';
    import o3_pct_high from '$lib/data/federal_pct_pollutant/o3_pct_high.json';
    import pm25_pct from '$lib/data/federal_pct_pollutant/pm25_pct.json';
    import pm25_pct_medium from '$lib/data/federal_pct_pollutant/pm25_pct_medium.json';
    import pm25_pct_high from '$lib/data/federal_pct_pollutant/pm25_pct_high.json';

    import ButtonGroup from '$lib/ButtonGroup.svelte';
    import Heatmap from '$lib/Heatmap.svelte';
    import GraphicTitle from '$lib/GraphicTitle.svelte';
    import LegendGraduatedBreakpoints from '$lib/LegendGraduatedBreakpoints.svelte';
    import { GRADUATED_COLORS, AIR_POLLUTANTS_PCT_BREAKS } from '$lib/constants.js';

    const pollutantOptions = [
        { value: 'PM2.5', label: 'PM2.5' },
        { value: 'NO2', label: 'NO2' },
        { value: 'O3', label: 'O3' }
    ];

    const aqhiThresholdOptions = [
        // { value: 'All', label: 'All (1+)' },
        { value: 'Medium', label: 'Medium (4+)' },
        { value: 'High', label: 'High (7+)' },
    ];

    const federalPctPollutantData = {
        'PM2.5_All': pm25_pct,
        'PM2.5_Medium': pm25_pct_medium,
        'PM2.5_High': pm25_pct_high,
        'NO2_All': no2_pct,
        'NO2_Medium': no2_pct_medium,
        'NO2_High': no2_pct_high,
        'O3_All': o3_pct,
        'O3_Medium': o3_pct_medium,
        'O3_High': o3_pct_high
    };

    let pollutant = $state('PM2.5');
    let aqhiThreshold = $state('Medium');
    let currentPollutantData = $state(pm25_pct_medium);
    
    function updateCurrentData() {
        const key = `${pollutant}_${aqhiThreshold}`;
        currentPollutantData = federalPctPollutantData[key] || null;
    }
    
    function pollutantSelect(value) {
        pollutant = value;
        updateCurrentData();
    }

    function aqhiThresholdSelect(value) {
        aqhiThreshold = value;
        updateCurrentData();
    }
</script>

<div>
    <GraphicTitle
        title="Pollution associated with wildfires (PM2.5) is increasingly responsible for poor air quality"
        subtitle="Average percent contribution of different pollutants to AQHI, for all recorded hours above a threshold"
    />

    <ButtonGroup 
        options={pollutantOptions}
        bind:selectedValue={pollutant}
        onSelect={pollutantSelect}
        label="Select a pollutant:"
    />

    <ButtonGroup 
        options={aqhiThresholdOptions}
        bind:selectedValue={aqhiThreshold}
        onSelect={aqhiThresholdSelect}
        label="Select AQHI threshold:"
    />

    <LegendGraduatedBreakpoints 
        colors={GRADUATED_COLORS}
        breakpoints={AIR_POLLUTANTS_PCT_BREAKS[aqhiThreshold]}
        title="Percent contribution to AQHI"
        showNA={true}
        percent={true}
    />

    <Heatmap 
        data={currentPollutantData}
        colors={GRADUATED_COLORS}
        breakpoints={AIR_POLLUTANTS_PCT_BREAKS[aqhiThreshold]}
    />
</div>
