<script>
    let { colors = [], breakpoints = [], title = "Legend" } = $props();

    let legendWidth = $state(0);
</script>

<div class="legend-section">
    <div class="legend-title">
        <p>{title}</p>
    </div>
    
    <div class="legend" bind:offsetWidth={legendWidth}>
        <svg width='100%' height='25'>
            {#if legendWidth && breakpoints.length > 0}
                {@const boxWidth = legendWidth / (colors.length + 0.1)}
                
                {#each colors as color, i}
                    <rect
                        class="legend-box"
                        width={boxWidth}
                        height="12"
                        x={boxWidth * i}
                        y="0"
                        stroke="white" 
                        stroke-width="1"
                        fill={color}
                    />
                {/each}

                {#each breakpoints as breakpoint, i}
                    <text 
                        class="legend-label" 
                        text-anchor="middle" 
                        x={boxWidth * (i + 1)} 
                        y="25"
                    >
                        {i === 0 ? `<${breakpoint}` : 
                         i === breakpoints.length - 1 ? `>${breakpoint}` : 
                         breakpoint}
                    </text>
                {/each}
            {/if}
        </svg>
    </div>
</div>

<style>
    .legend-section {
        margin: 10px 0;
        padding-top: 5px;
    }

    .legend-title {
        margin-bottom: 10px;
        margin-left: 0px;
    }

    .legend-title p {
        font-family: SourceSerif;
        font-size: 16px;
        line-height: 22px;
        font-weight: normal;
        color: var(--brandGray90);
        margin-bottom: -5px;
    }

    .legend-label {
        font-size: 14px;
        fill: #000000;
        font-family: OpenSans;
    }
</style>
