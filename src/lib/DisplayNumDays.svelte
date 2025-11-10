<script>
    import aqhi_7plus from '$lib/data/federal_num_days/aqhi_7plus.json';
    import aqhi_11 from '$lib/data/federal_num_days/aqhi_11plus.json';
    import aqhi_plus_7plus from '$lib/data/federal_num_days/aqhi_plus_7plus.json';
    import aqhi_plus_11 from '$lib/data/federal_num_days/aqhi_plus_11plus.json';
    import pm25_55_5plus from '$lib/data/federal_num_days/pm25_55_5plus.json';
    import pm25_225_5plus from '$lib/data/federal_num_days/pm25_225_5plus.json';

    import ButtonGroup from '$lib/ButtonGroup.svelte';
    import Heatmap from '$lib/Heatmap.svelte';
    import GraphicTitle from '$lib/GraphicTitle.svelte';
    import LegendGraduatedBreakpoints from '$lib/LegendGraduatedBreakpoints.svelte';
    import { GRADUATED_COLORS, AIR_MEASURE_NUM_DAYS_BREAKS } from '$lib/constants.js';

    const airQualityOptions = [
        { value: 'AQHI', label: 'AQHI' },
        { value: 'AQHI+', label: 'AQHI+' },
        { value: 'PM2.5', label: 'PM<sub>2.5</sub>' }
    ];

    const aqhiThresholdOptions = [
        { value: '7+', label: 'High (7+)' },
        { value: '11', label: 'Very High (11)' }
    ];

    const pm25ThresholdOptions = [
        { value: '55.5+', label: 'Unhealthy (55.5+)' },
        { value: '225.5+', label: 'Hazardous (225.5+)' }
    ];

    const federalNumDaysData = {
        'AQHI_7+': aqhi_7plus,
        'AQHI_11': aqhi_11,
        'AQHI+_7+': aqhi_plus_7plus,
        'AQHI+_11': aqhi_plus_11,
        'PM2.5_55.5+': pm25_55_5plus,
        'PM2.5_225.5+': pm25_225_5plus
    };

    let airQualityMeasure = $state('AQHI');
    let threshold = $state('7+');
    let currentAirQualityData = $state(aqhi_7plus);
    
    function updateCurrentData() {
        const key = `${airQualityMeasure}_${threshold}`;
        currentAirQualityData = federalNumDaysData[key] || null;
    }
    
    function airQualityMeasureSelect(value) {
        airQualityMeasure = value;
        // Reset threshold to first option when measure changes
        if (value === 'PM2.5') {
            threshold = '55.5+';
        } else {
            threshold = '7+';
        }
        updateCurrentData();
    }

    function thresholdSelect(value) {
        threshold = value;
        updateCurrentData();
    }
</script>

<div aria-label="Chart showing the number of recorded days where the maximum value of AQHI or PM2.5 exceeded a threshold. Trends show that cities across Canada are seeing a rise in poor air quality">

    <div aria-hidden="true">
    
        <GraphicTitle
            title="Cities across Canada are seeing a rise in poor air quality"
            subtitle="Number of recorded days where the maximum value of AQHI or PM<sub>2.5</sub> exceeded a threshold"
        />

        <ButtonGroup 
            options={airQualityOptions}
            bind:selectedValue={airQualityMeasure}
            onSelect={airQualityMeasureSelect}
            label="Select an air quality measure:"
        />

        <ButtonGroup 
            options={airQualityMeasure === 'PM2.5' ? pm25ThresholdOptions : aqhiThresholdOptions}
            bind:selectedValue={threshold}
            onSelect={thresholdSelect}
            label="Select threshold level:"
        />

        <LegendGraduatedBreakpoints 
            colors={GRADUATED_COLORS}
            breakpoints={AIR_MEASURE_NUM_DAYS_BREAKS[airQualityMeasure]}
            title="Number of days per year"
            showNA={true}
            rangeLabels={true}
        />

        <Heatmap 
            data={currentAirQualityData}
            colors={GRADUATED_COLORS}
            breakpoints={AIR_MEASURE_NUM_DAYS_BREAKS[airQualityMeasure]}
        />
    </div>
</div>
