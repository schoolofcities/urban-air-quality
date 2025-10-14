<script>
    let { data = {}, colors = [], breakpoints = [] } = $props();

    // Extract columns dynamically from the data
    let columns = $derived(data && Object.keys(data).length > 0 
        ? Object.keys(Object.values(data)[0]).sort()
        : []);

    // Extract rows
    let rows = $derived(Object.keys(data || {}));

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
        {#each rows as row}
            <div class="heatmap-row">
                <div class="row-label">{row}</div>
                <div class="column-cells">
                    {#each columns as column}
                        <div 
                            class="cell"
                            style="background-color: {getColor(data[row][column])}"
                            title="{row} {column}: {data[row][column] ?? 'No data'}"
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

    .row-label {
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

    .column-cells {
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
        .row-label {
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
        .row-label {
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
