<script>
    let { data = {}, topN = 5, numDaysData = {}, colors = [], breakpoints = [] } = $props();

    // Process data to get time periods
    let timePeriodsRaw = $derived(data && Object.keys(data).length > 0 
        ? Object.keys(Object.values(data)[0]).sort()
        : []);

    let cities = $derived(Object.keys(data || {}));

    // Function to get color based on value and breakpoints
    function getColor(value) {
        if (value === null || value === undefined) return '#4a90e2'; // Default blue for null values
        
        for (let i = 0; i < breakpoints.length; i++) {
            if (value < breakpoints[i]) {
                return colors[i];
            }
        }
        return colors[colors.length - 1]; // Return last color for values above highest breakpoint
    }

    // Function to aggregate num days data for a period
    function aggregateNumDaysForPeriod(city, period) {
        if (!numDaysData || !numDaysData[city]) return null;
        
        // Parse period range (e.g., "2005-2007" or "2005")
        const periodParts = period.split('-');
        let startYear, endYear;
        
        if (periodParts.length === 2) {
            startYear = parseInt(periodParts[0]);
            endYear = parseInt(periodParts[1]);
        } else {
            startYear = endYear = parseInt(periodParts[0]);
        }
        
        let total = 0;
        let validYears = 0;
        
        for (let year = startYear; year <= endYear; year++) {
            const yearStr = year.toString();
            const value = numDaysData[city][yearStr];
            if (value !== null && value !== undefined) {
                total += value;
                validYears++;
            }
        }
        
        // Return null if no valid data, otherwise return total
        return validYears > 0 ? total : null;
    }

    // Process rankings for each time period
    let periodRankings = $derived.by(() => {
        if (!data || Object.keys(data).length === 0) return [];
        
        return timePeriodsRaw.map(period => {
            const rankings = cities
                .map(city => ({ 
                    city, 
                    rank: data[city][period],
                    numDaysValue: aggregateNumDaysForPeriod(city, period)
                }))
                .filter(item => item.rank !== null && item.rank !== undefined)
                .sort((a, b) => a.rank - b.rank)
                .slice(0, topN)
                .map((item, index) => ({ ...item, displayRank: index + 1 }));
            
            return {
                period,
                rankings
            };
        });
    });
</script>

<div class="rankings-chart-container">
    <div class="rankings-chart">
        <div class="chart-header">
            {#each periodRankings as periodData}
                <div class="period-column">
                    <div class="period-label">{periodData.period}</div>
                </div>
            {/each}
        </div>

        <div class="chart-body">
            {#each Array.from({length: topN}, (_, i) => i + 1) as rank}
                <div class="rank-row">
                    {#each periodRankings as periodData}
                        <div class="rank-cell">
                            {#if periodData.rankings[rank - 1]}
                                {@const cityData = periodData.rankings[rank - 1]}
                                <div 
                                    class="city-rectangle"
                                    style="background-color: {getColor(cityData.numDaysValue)}"
                                    title="{cityData.city}: {cityData.numDaysValue ?? 'No data'} days (Rank {cityData.rank})"
                                >
                                    <span class="city-name">{cityData.city}</span>
                                </div>
                            {:else}
                                <div class="empty-rectangle"></div>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .rankings-chart-container {
        width: 100%;
        margin-top: 10px;
    }

    .rankings-chart {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .chart-header {
        display: flex;
        width: 100%;
        margin-bottom: 5px;
    }

    .period-column {
        flex: 1;
        display: flex;
        justify-content: center;
        padding: 0 3px;
        min-width: 0;
    }

    .period-label {
        font-size: 14px;
        font-family: OpenSansBold, sans-serif;
        color: var(--brandGray90);
        text-align: center;
    }

    .chart-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0px;
    }

    .rank-row {
        display: flex;
        width: 100%;
        gap: 6px;
    }

    .rank-cell {
        flex: 1;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
    }

    .city-rectangle {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        box-sizing: border-box;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    .city-rectangle:hover {
        opacity: 0.8;
    }

    .city-name {
        font-size: 12px;
        font-family: OpenSans, sans-serif;
        color: white;
        text-align: center;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        width: 100%;
    }

    .empty-rectangle {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        border-radius: 0px;
        border: 1px dashed #ccc;
    }

    @media (max-width: 768px) {
        .period-label {
            font-size: 14px;
        }

        .rank-cell {
            height: 28px;
        }

        .city-name {
            font-size: 12px;
            white-space: normal;
            line-height: 1.1;
            overflow-wrap: break-word;
            word-break: break-word;
        }
    }

    @media (max-width: 400px) {
        .period-label {
            font-size: 12px;
        }

        .rank-cell {
            height: 28px;
        }

        .city-name {
            font-size: 10px;
            line-height: 1.0;
        }

        .rank-row {
            gap: 3px;
        }
    }
</style>
