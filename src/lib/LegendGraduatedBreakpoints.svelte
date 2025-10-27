<script>
    let { 
        colors = [], 
        breakpoints = [], 
        title = "Legend", 
        showNA = false 
    } = $props();

    let legendWidth = $state(0);

    let naBarWidth = $derived(showNA ? legendWidth * 0.12 : 0);
    let naGap = $derived(showNA ? legendWidth * 0.02 : 0); 
    let mainBarWidth = $derived(legendWidth - naBarWidth - naGap);
    let boxWidth = $derived(mainBarWidth / (colors.length + 0.1));
    let naBarStart = $derived(mainBarWidth + naGap); 
</script>

<div class="legend-section">
    <div class="legend-title">
        <p>{title}</p>
    </div>
    
    <div class="legend" bind:offsetWidth={legendWidth}>
        <svg width='100%' height='25'>
            {#if legendWidth && breakpoints.length > 0}
                <!-- Main color bars -->
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

                <!-- Breakpoint labels -->
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

                <!-- NA bar if enabled -->
                {#if showNA}
                    <rect
                        class="legend-box"
                        width={naBarWidth}
                        height="12"
                        x={naBarStart}
                        y="0"
                        stroke="white" 
                        stroke-width="1"
                        fill="#ccc"
                    />
                    
                    <text 
                        class="legend-label" 
                        text-anchor="middle" 
                        x={naBarStart + (naBarWidth / 2)} 
                        y="25"
                    >
                        NA
                    </text>
                {/if}
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
        margin-bottom: 5px;
    }
</style>
