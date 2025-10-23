<script>
    import { scaleLinear, scalePoint, line, curveMonotoneX } from 'd3';
    
    let { 
        data = {}, 
        topN = 5,
        width = 600,
        height = 300,
        margin = { top: 20, right: 120, bottom: 40, left: 120 }
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

    // Create color scale for cities with more unique colors
    let cityColors = $derived.by(() => {
        const colors = [
            '#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf',
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f',
            '#bcbd22', '#17becf', '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5', '#c49c94'
        ];
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
        .range([margin.top, height - margin.bottom - 20])); // Leave more space for x-axis labels

    // Create line generator with smoother curves
    let lineGenerator = $derived(line()
        .x(d => d.x !== undefined ? d.x : xScale(d.period))
        .y(d => yScale(Math.min(d.rank, topN))) // Clamp at topN
        .curve(curveMonotoneX));

    // Process data for each city with simpler segment handling
    let cityData = $derived.by(() => {
        return relevantCities.map(city => {
            const rawPoints = timePeriodsRaw.map(period => ({
                period,
                rank: data[city][period],
                inTopN: data[city][period] !== null && data[city][period] !== undefined && data[city][period] <= topN
            }));

            // Create simpler line segments - just connect consecutive visible points
            const lineSegments = [];
            let currentSegment = [];

            for (let i = 0; i < rawPoints.length; i++) {
                const point = rawPoints[i];
                const prevPoint = rawPoints[i - 1];
                const nextPoint = rawPoints[i + 1];

                if (point.inTopN) {
                    // Point is visible, add it to current segment
                    currentSegment.push({
                        period: point.period,
                        rank: point.rank
                    });
                } else {
                    // Point is not visible
                    if (currentSegment.length > 0) {
                        // Close current segment with exit at topN boundary
                        if (prevPoint && prevPoint.inTopN) {
                            currentSegment.push({
                                period: point.period,
                                rank: topN,
                                x: xScale(prevPoint.period) + (xScale(point.period) - xScale(prevPoint.period)) * 0.7
                            });
                        }
                        
                        lineSegments.push([...currentSegment]);
                        currentSegment = [];
                    }
                    
                    // Prepare entry for next visible point
                    if (nextPoint && nextPoint.inTopN) {
                        currentSegment.push({
                            period: nextPoint.period,
                            rank: topN,
                            x: xScale(point.period) + (xScale(nextPoint.period) - xScale(point.period)) * 0.3
                        });
                    }
                }
            }

            // Add final segment
            if (currentSegment.length > 0) {
                lineSegments.push(currentSegment);
            }

            // Generate cleaner paths
            const paths = lineSegments
                .filter(segment => segment.length >= 2)
                .map(segment => lineGenerator(segment));

            // Visible points for rendering
            const visiblePoints = rawPoints.filter(p => p.inTopN);

            return {
                city,
                color: cityColors[city],
                paths,
                points: visiblePoints
            };
        });
    });

    // Get labels for start and end with collision avoidance
    let startLabels = $derived.by(() => {
        if (!timePeriodsRaw.length) return [];
        const startPeriod = timePeriodsRaw[0];
        const labels = cities
            .map(city => ({ city, rank: data[city]?.[startPeriod] }))
            .filter(item => item.rank !== null && item.rank !== undefined && item.rank <= topN)
            .sort((a, b) => a.rank - b.rank);
        
        // Adjust positions for overlapping labels
        const adjustedLabels = [];
        const used_positions = new Set();
        
        labels.forEach(label => {
            let position = label.rank;
            while (used_positions.has(position) && position <= topN + 2) {
                position += 0.3;
            }
            used_positions.add(position);
            adjustedLabels.push({ ...label, adjustedRank: position });
        });
        
        return adjustedLabels;
    });

    let endLabels = $derived.by(() => {
        if (!timePeriodsRaw.length) return [];
        const endPeriod = timePeriodsRaw[timePeriodsRaw.length - 1];
        const labels = cities
            .map(city => ({ city, rank: data[city]?.[endPeriod] }))
            .filter(item => item.rank !== null && item.rank !== undefined && item.rank <= topN)
            .sort((a, b) => a.rank - b.rank);
        
        // Adjust positions for overlapping labels
        const adjustedLabels = [];
        const used_positions = new Set();
        
        labels.forEach(label => {
            let position = label.rank;
            while (used_positions.has(position) && position <= topN + 2) {
                position += 0.3;
            }
            used_positions.add(position);
            adjustedLabels.push({ ...label, adjustedRank: position });
        });
        
        return adjustedLabels;
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
                y2={yScale(topN)}
                stroke="#f0f0f0"
                stroke-width="1"
            />
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
            {#each cityInfo.paths as path}
                <path
                    d={path}
                    fill="none"
                    stroke={cityInfo.color}
                    stroke-width={hoveredCity === cityInfo.city ? 4 : 3}
                    class="city-line"
                    role="button"
                    tabindex="0"
                    onmouseover={(e) => handleMouseOver(e, cityInfo.city, '', '')}
                    onmouseout={handleMouseOut}
                />
            {/each}
        {/each}

        <!-- City points -->
        {#each cityData as cityInfo}
            {#each cityInfo.points as point}
                <circle
                    cx={xScale(point.period)}
                    cy={yScale(point.rank)}
                    r={hoveredCity === cityInfo.city ? 6 : 4}
                    fill={cityInfo.color}
                    stroke="white"
                    stroke-width="2"
                    class="city-point"
                    role="button"
                    tabindex="0"
                    onmouseover={(e) => handleMouseOver(e, cityInfo.city, point.period, point.rank)}
                    onmouseout={handleMouseOut}
                />
            {/each}
        {/each}

        <!-- Start labels -->
        {#each startLabels as label}
            <text
                x={margin.left - 15}
                y={yScale(label.adjustedRank)}
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
                y={yScale(label.adjustedRank)}
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
            {#if tooltip.period}
                {tooltip.period}: Rank {tooltip.rank}
            {:else}
                {tooltip.city}
            {/if}
        </div>
    {/if}
</div>

<style>
    .bump-chart-container {
        position: relative;
        width: 100%;
        max-width: 600px;
        overflow: visible;
    }

    .city-line {
        cursor: pointer;
        transition: stroke-width 0.2s ease;
    }

    .city-line:hover {
        stroke-width: 4 !important;
    }

    .city-point {
        cursor: pointer;
        transition: r 0.2s ease;
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
        .period-label, .city-label {
            font-size: 10px;
        }
        
        .tooltip {
            font-size: 11px;
        }
    }
</style>
