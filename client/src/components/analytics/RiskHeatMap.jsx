import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const RiskHeatMap = () => {
  const questResult = useSelector((state) => state.questResult.questResults);

  // Prepare data for the heatmap based on impact and likelihood
  const heatmapData = questResult.map((result) => ({
    impact: result.imp,
    likelihood: result.lik,
    riskScore: result.imp * result.lik,
    scenario: result.scen,
  }));

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000;
    const height = 400;

    const svg = d3
      .select('#risk-assessment')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // Get unique and sorted likelihood and impact values
    const uniqueLikelihoods = Array.from(new Set(heatmapData.map(d => d.likelihood))).sort((a, b) => a - b);
    const uniqueImpacts = Array.from(new Set(heatmapData.map(d => d.impact))).sort((a, b) => a - b);

    const xScale = d3
      .scaleBand()
      .domain(uniqueLikelihoods)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleBand()
      .domain(uniqueImpacts)
      .range([height - margin.bottom, margin.top])
      .padding(0.1);

    const colorScale = d3
      .scaleSequential()
      .domain([0, d3.max(heatmapData, (d) => d.riskScore)])
      .interpolator(d3.interpolateMagma); // Adjust color scheme as needed

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Create axes
    g.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format(".0f")));


    g.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".0f")));

    // Create heatmap cells
    g.selectAll('.cell')
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', (d) => xScale(d.likelihood))
      .attr('y', (d) => yScale(d.impact))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => colorScale(d.riskScore))
      .append('title')
      .text((d) => `Impact: ${d.impact}\nLikelihood: ${d.likelihood}\nRisk Score: ${d.riskScore}\nScenario: ${d.scenario} `);

    // Add risk labels for legend
    const riskLabels = {
      low: 'Low (0-30)',
      medium: 'Medium (40-60)',
      high: 'High (70-100)',
    };

    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - margin.right - 80}, ${margin.top})`); // Adjusted position

    const legendRectSize = 10;
    const legendSpacing = 4;

    Object.entries(riskLabels).forEach(([key, value], i) => {
      legend
        .append('rect')
        .attr('x', 0)
        .attr('y', i * (legendRectSize + legendSpacing))
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('fill', colorScale(key === 'low' ? 15 : key === 'medium' ? 50 : 85)); // Midpoints for colors

      legend
        .append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', i * (legendRectSize + legendSpacing) + legendRectSize / 2)
        .attr('dominant-baseline', 'middle')
        .attr('x', legendRectSize + legendSpacing + 5) // Added padding to the right
        .attr('fill', 'blue') // Set text color to red for legend labels
    .text(value);
    });

    // Clean up on component unmount
    return () => {
      d3.select('#risk-assessment').selectAll('*').remove();
    };
  }, [heatmapData]);

  return (
    <div>
      <h1>Impact vs. Likelihood Heatmap</h1>
      <div id="risk-assessment"></div>
    </div>
  );
};

export default RiskHeatMap;