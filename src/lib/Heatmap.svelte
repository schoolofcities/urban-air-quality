<script>
    let { data = {}, colors = [], breakpoints = [] } = $props();

    // Extract years dynamically from the data
    let years = $derived(data && Object.keys(data).length > 0 
        ? Object.keys(Object.values(data)[0]).sort()
        : []);

    // Extract cities
    let cities = $derived(Object.keys(data || {}));

    // Function to get color based on value and breakpoints
    function getColor(value) {
        if (value === null || value === undefined) return '#ccc'; // Gray for null values
        
        for (let i = 0; i < breakpoints.length; i++) {
            if (value <= breakpoints[i]) {
                return colors[i];
            }
        }
        return colors[colors.length - 1]; // Return last color for values above highest breakpoint
    }
</script>

<div class="heatmap-container">
    <div class="heatmap">
        {#each cities as city}
            <div class="heatmap-row">
                <div class="city-label">{city}</div>
                <div class="year-cells">
                    {#each years as year}
                        <div 
                            class="cell"
                            style="background-color: {getColor(data[city][year])}"
                            title="{city} {year}: {data[city][year] ?? 'No data'}"
                        ></div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .heatmap-container {
        width: 100%;
        overflow-x: auto;
        margin-top: 20px;
    }

    .heatmap {
        display: flex;
        flex-direction: column;
        min-width: fit-content;
    }

    .heatmap-row {
        display: flex;
        align-items: center;
        margin-bottom: 1px;
    }

    .city-label {
        font-size: 12px;
        font-family: TradeGothicBold, sans-serif;
        color: var(--brandGray90);
        min-width: 120px;
        max-width: 120px;
        padding-right: 8px;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .year-cells {
        display: flex;
        gap: 1px;
        flex: 1;
    }

    .cell {
        aspect-ratio: 1;
        min-width: 16px;
        min-height: 16px;
        border: 1px solid #fff;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    .cell:hover {
        opacity: 0.8;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .city-label {
            font-size: 10px;
            min-width: 80px;
            max-width: 80px;
            padding-right: 4px;
        }

        .cell {
            min-width: 12px;
            min-height: 12px;
        }
    }

    @media (max-width: 350px) {
        .city-label {
            font-size: 8px;
            min-width: 60px;
            max-width: 60px;
            padding-right: 2px;
        }

        .cell {
            min-width: 10px;
            min-height: 10px;
        }
    }
</style>
