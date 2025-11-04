<script>
    let { 
        colors = [], 
        breakpoints = [], 
        title = "Legend", 
        showNA = false,
        percent = false,
        rangeLabels = false,
    } = $props();

    let legendWidth = $state(0);

    let naBarWidth = $derived(showNA ? legendWidth * 0.12 : 0);
    let naGap = $derived(showNA ? legendWidth * 0.02 : 0); 
    let mainBarWidth = $derived(legendWidth - naBarWidth - naGap);
    let boxWidth = $derived(mainBarWidth / (colors.length + 0.1));
    let naBarStart = $derived(mainBarWidth + naGap); 

    function formatBreakpointLabel(breakpoint, index) {
        let label;
        if (index === 0) {
            label = `<${breakpoint}`;
        } else if (index === breakpoints.length - 1) {
            label = `≥${breakpoint}`;
        } else {
            label = breakpoint;
        }
        
        return percent ? `${label}%` : label;
    }

    function formatRangeLabel(index) {
        let label;
        if (index === 0) {
            // First range: <=X (where X is first breakpoint - 1)
            const upperBound = breakpoints[0] - 1;
            label = `≤${upperBound}`;
        } else if (index === colors.length - 1) {
            // Last range: X+ (where X is last breakpoint)
            const lowerBound = breakpoints[breakpoints.length - 1];
            label = `${lowerBound}+`;
        } else {
            // Middle ranges: X-Y (where X is previous breakpoint, Y is current breakpoint - 1)
            const lowerBound = breakpoints[index - 1];
            const upperBound = breakpoints[index] - 1;
            label = `${lowerBound}-${upperBound}`;
        }
        
        return percent ? `${label}%` : label;
    }
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

                <!-- Labels -->
                {#if rangeLabels}
                    <!-- Range labels centered under bars -->
                    {#each colors as color, i}
                        <text 
                            class="legend-label" 
                            text-anchor="middle" 
                            x={boxWidth * i + (boxWidth / 2)} 
                            y="25"
                        >
                            {formatRangeLabel(i)}
                        </text>
                    {/each}
                {:else}
                    <!-- Breakpoint labels at bar edges -->
                    {#each breakpoints as breakpoint, i}
                        <text 
                            class="legend-label" 
                            text-anchor="middle" 
                            x={boxWidth * (i + 1)} 
                            y="25"
                        >
                            {formatBreakpointLabel(breakpoint, i)}
                        </text>
                    {/each}
                {/if}

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
                        No data
                    </text>
                {/if}
            {/if}
        </svg>
    </div>
</div>

<style>
    .legend-section {
        margin: 0;
        padding-top: 5px;
    }

    .legend-title {
        margin-bottom: 10px;
        margin-left: 0px;
    }

    .legend-title p {
        font-family: OpenSans;
        font-size: 15px;
        line-height: 22px;
        color: var(--brandGray90);
        margin-bottom: -5px;
    }

    .legend-label {
        font-size: 14px;
        fill: #000000;
        font-family: OpenSans;
        margin-bottom: 5px;
    }

    @media (max-width: 768px) {
        .legend-label {
            font-size: 13px;
        }
    }

    @media (max-width: 400px) {
        .legend-label {
            font-size: 11px;
        }
    }
</style>
