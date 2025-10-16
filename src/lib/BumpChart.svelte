<script>
    import { scaleLinear, scalePoint, line, curveCardinal } from 'd3';
    
    let { 
        data = {}, 
        topN = 5,
        width = 800,
        height = 400,
        margin = { top: 20, right: 100, bottom: 20, left: 100 }
    } = $props();

    let hoveredCity = $state(null);
    let tooltip = $state({ visible: false, x: 0, y: 0, city: '', period: '', rank: '' });

    // Process data to get time periods and city rankings
    let timePeriodsRaw = $derived(data && Object.keys(data).length > 0 
        ? Object.keys(Object.values(data)[0]).sort()
        : []);

    let cities = $derived(Object.keys(data || {}));

    // Find cities that appear in top N at any point
    let relevantCities = $derived.by(() => {
        if (!data || Object.keys(data).length === 0) return [];
        
        const citySet = new Set();
        timePeriodsRaw.forEach(period => {
            const rankings = cities
                .map(city => ({ city, rank: data[city][period] }))
                .filter(item => item.rank !== null && item.rank !== undefined)
                .sort((a, b) => a.rank - b.rank)
                .slice(0, topN);
            
            rankings.forEach(item => citySet.add(item.city));
        });
        
        return Array.from(citySet);
    });

    // Create color scale for cities
    let cityColors = $derived.by(() => {
        const colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'];
        const colorMap = {};
        
        // Assign colors to cities that are in top N at start or end
        const startRankings = cities
            .map(city => ({ city, rank: data[city]?.[timePeriodsRaw[0]] }))
            .filter(item => item.rank !== null && item.rank !== undefined)
            .sort((a, b) => a.rank - b.rank)
            .slice(0, topN);
        
        const endRankings = cities
            .map(city => ({ city, rank: data[city]?.[timePeriodsRaw[timePeriodsRaw.length - 1]] }))
            .filter(item => item.rank !== null && item.rank !== undefined)
            .sort((a, b) => a.rank - b.rank)
            .slice(0, topN);
        
        const labeledCities = new Set([
            ...startRankings.map(r => r.city),
            ...endRankings.map(r => r.city)
        ]);
        
        let colorIndex = 0;
        relevantCities.forEach(city => {
            if (labeledCities.has(city)) {
                colorMap[city] = colors[colorIndex % colors.length];
                colorIndex++;
            } else {
                colorMap[city] = '#999'; // Gray for intermediate-only cities
            }
        });
        
        return colorMap;
    });

    // Create scales
    let xScale = $derived(scalePoint()
        .domain(timePeriodsRaw)
        .range([margin.left, width - margin.right])
        .padding(0.1));

    let yScale = $derived(scaleLinear()
        .domain([1, topN])
        .range([margin.top, height - margin.bottom]));

    // Create line generator
    let lineGenerator = $derived(line()
        .x(d => xScale(d.period))
        .y(d => yScale(Math.min(d.rank, topN + 0.5))) // Cap at slightly below visible area
        .curve(curveCardinal));

    // Process data for each city
    let cityData = $derived.by(() => {
        return relevantCities.map(city => {
            const points = timePeriodsRaw.map(period => ({
                period,
                rank: data[city][period] || (topN + 1) // Off-chart if no data
            }));
            
            return {
                city,
                points,
                color: cityColors[city],
                path: lineGenerator(points.filter(p => p.rank <= topN + 0.5))
            };
        });
    });

    // Get labels for start and end
    let startLabels = $derived.by(() => {
        if (!timePeriodsRaw.length) return [];
        const startPeriod = timePeriodsRaw[0];
        return cities
            .map(city => ({ city, rank: data[city]?.[startPeriod] }))
            .filter(item => item.rank !== null && item.rank !== undefined && item.rank <= topN)
            .sort((a, b) => a.rank - b.rank);
    });

    let endLabels = $derived.by(() => {
        if (!timePeriodsRaw.length) return [];
        const endPeriod = timePeriodsRaw[timePeriodsRaw.length - 1];
        return cities
            .map(city => ({ city, rank: data[city]?.[endPeriod] }))
            .filter(item => item.rank !== null && item.rank !== undefined && item.rank <= topN)
            .sort((a, b) => a.rank - b.rank);
    });

    function handleMouseOver(event, city, period, rank) {
        hoveredCity = city;
        tooltip = {
            visible: true,
            x: event.clientX,
            y: event.clientY,
            city,
            period,
            rank: rank.toString()
        };
    }

    function handleMouseOut() {
        hoveredCity = null;
        tooltip = { ...tooltip, visible: false };
    }
</script>

<div class="bump-chart-container">
    <svg {width} {height}>
        <!-- Grid lines -->
        {#each Array.from({length: topN}, (_, i) => i + 1) as rank}
            <line
                x1={margin.left}
                y1={yScale(rank)}
                x2={width - margin.right}
                y2={yScale(rank)}
                stroke="#f0f0f0"
                stroke-width="1"
            />
        {/each}

        <!-- Vertical grid lines -->
        {#each timePeriodsRaw as period}
            <line
                x1={xScale(period)}
                y1={margin.top}
                x2={xScale(period)}
                y2={height - margin.bottom}
                stroke="#f0f0f0"
                stroke-width="1"
            />
        {/each}

        <!-- Rank labels -->
        {#each Array.from({length: topN}, (_, i) => i + 1) as rank}
            <text
                x={margin.left - 10}
                y={yScale(rank)}
                text-anchor="end"
                dominant-baseline="middle"
                class="rank-label"
            >
                {rank}
            </text>
        {/each}

        <!-- Time period labels -->
        {#each timePeriodsRaw as period}
            <text
                x={xScale(period)}
                y={height - 5}
                text-anchor="middle"
                class="period-label"
            >
                {period}
            </text>
        {/each}

        <!-- City lines -->
        {#each cityData as cityInfo}
            <path
                d={cityInfo.path}
                fill="none"
                stroke={cityInfo.color}
                stroke-width={hoveredCity === cityInfo.city ? 3 : 2}
                class="city-line"
                role="button"
                tabindex="0"
                onmouseover={(e) => handleMouseOver(e, cityInfo.city, '', '')}
                onmouseout={handleMouseOut}
            />
        {/each}

        <!-- City points -->
        {#each cityData as cityInfo}
            {#each cityInfo.points as point}
                {#if point.rank <= topN}
                    <circle
                        cx={xScale(point.period)}
                        cy={yScale(point.rank)}
                        r={hoveredCity === cityInfo.city ? 5 : 3}
                        fill={cityInfo.color}
                        stroke="white"
                        stroke-width="1"
                        class="city-point"
                        role="button"
                        tabindex="0"
                        onmouseover={(e) => handleMouseOver(e, cityInfo.city, point.period, point.rank)}
                        onmouseout={handleMouseOut}
                    />
                {/if}
            {/each}
        {/each}

        <!-- Start labels -->
        {#each startLabels as label}
            <text
                x={margin.left - 15}
                y={yScale(label.rank)}
                text-anchor="end"
                dominant-baseline="middle"
                class="city-label"
                fill={cityColors[label.city]}
            >
                {label.city}
            </text>
        {/each}

        <!-- End labels -->
        {#each endLabels as label}
            <text
                x={width - margin.right + 15}
                y={yScale(label.rank)}
                text-anchor="start"
                dominant-baseline="middle"
                class="city-label"
                fill={cityColors[label.city]}
            >
                {label.city}
            </text>
        {/each}
    </svg>

    <!-- Tooltip -->
    {#if tooltip.visible}
        <div 
            class="tooltip"
            style="left: {tooltip.x + 10}px; top: {tooltip.y - 10}px;"
        >
            <strong>{tooltip.city}</strong><br>
            {tooltip.period}: Rank {tooltip.rank}
        </div>
    {/if}
</div>

<style>
    .bump-chart-container {
        position: relative;
        width: 100%;
        overflow-x: auto;
    }

    .city-line {
        cursor: pointer;
        transition: stroke-width 0.2s ease;
    }

    .city-line:hover {
        stroke-width: 3 !important;
    }

    .city-point {
        cursor: pointer;
        transition: r 0.2s ease;
    }

    .rank-label {
        font-size: 12px;
        font-family: TradeGothicBold, sans-serif;
        fill: var(--brandGray90);
    }

    .period-label {
        font-size: 11px;
        font-family: TradeGothicBold, sans-serif;
        fill: var(--brandGray90);
    }

    .city-label {
        font-size: 11px;
        font-family: TradeGothicBold, sans-serif;
        font-weight: bold;
    }

    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: 12px;
        font-family: OpenSans, sans-serif;
        pointer-events: none;
        z-index: 1000;
        max-width: 200px;
    }

    @media (max-width: 768px) {
        .rank-label, .period-label, .city-label {
            font-size: 10px;
        }
        
        .tooltip {
            font-size: 11px;
        }
    }
</style>
