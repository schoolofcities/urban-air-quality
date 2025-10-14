<script>
    import ButtonGroup from '$lib/ButtonGroup.svelte';
    
    let airQualityMeasure = $state('AQHI');
    let threshold = $state('7+');
    
    const airQualityOptions = [
        { value: 'AQHI', label: 'AQHI' },
        { value: 'AQHI+', label: 'AQHI+' },
        { value: 'PM2.5', label: 'PM2.5' }
    ];

    const aqhiThresholdOptions = [
        { value: '7+', label: 'High and Very High (7+)' },
        { value: '11', label: 'Very High (11)' }
    ];

    const pm25ThresholdOptions = [
        { value: '55.5+', label: 'Unhealthy and Hazardous (55.5+)' },
        { value: '250.5+', label: 'Hazardous (250.5+)' }
    ];
    
    function airQualityMeasureSelect(value) {
        airQualityMeasure = value;
        // Reset threshold to first option when measure changes
        if (value === 'PM2.5') {
            threshold = '55.5+';
        } else {
            threshold = '7+';
        }
    }

    function thresholdSelect(value) {
        threshold = value;
    }
</script>

<div>
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
</div>
