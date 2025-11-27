import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const OneModematrix = ({ data, width = 700, height = 700 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create unique words list
    const wordsSet = new Set();
    data.forEach(d => {
      wordsSet.add(d.word1);
      wordsSet.add(d.word2);
    });
    const words = Array.from(wordsSet);
    const n = words.length;

    // Create adjacency matrix
    const matrix = Array(n).fill(null).map(() => Array(n).fill(0));
    const wordIndex = new Map(words.map((w, i) => [w, i]));
    
    data.forEach(d => {
      const i = wordIndex.get(d.word1);
      const j = wordIndex.get(d.word2);
      matrix[i][j] = d.frequency;
      matrix[j][i] = d.frequency; // Make symmetric
    });

    const margin = { top: 120, right: 20, bottom: 20, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const cellSize = Math.min(innerWidth / n, innerHeight / n);

    // Color scale
    const maxFreq = d3.max(data, d => d.frequency);
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, maxFreq]);

    // Create SVG
    svg
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw cells
    const rows = g.selectAll('.row')
      .data(matrix)
      .enter()
      .append('g')
      .attr('class', 'row')
      .attr('transform', (d, i) => `translate(0, ${i * cellSize})`);

    rows.selectAll('.cell')
      .data((row, i) => row.map((value, j) => ({ value, i, j })))
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => d.j * cellSize)
      .attr('y', 0)
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .attr('fill', d => d.value > 0 ? colorScale(d.value) : '#f5f5f5')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 0.5)
      .on('mouseover', function() {
        d3.select(this).attr('stroke', '#000').attr('stroke-width', 2);
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke', '#ccc').attr('stroke-width', 0.5);
      })
      .append('title')
      .text(d => `${words[d.i]} - ${words[d.j]}: ${d.value}`);

    // Add text in cells with values
    rows.selectAll('.cell-text')
      .data((row, i) => row.map((value, j) => ({ value, i, j })))
      .enter()
      .filter(d => d.value > 0)
      .append('text')
      .attr('class', 'cell-text')
      .attr('x', d => d.j * cellSize + cellSize / 2)
      .attr('y', cellSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', Math.min(10, cellSize / 3))
      .attr('fill', d => d.value > maxFreq / 2 ? 'white' : 'black')
      .text(d => d.value);

    // Row labels (left)
    g.selectAll('.row-label')
      .data(words)
      .enter()
      .append('text')
      .attr('class', 'row-label')
      .attr('x', -5)
      .attr('y', (d, i) => i * cellSize + cellSize / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', Math.min(11, cellSize / 2))
      .text(d => d);

    // Column labels (top)
    g.selectAll('.col-label')
      .data(words)
      .enter()
      .append('text')
      .attr('class', 'col-label')
      .attr('x', (d, i) => i * cellSize + cellSize / 2)
      .attr('y', -5)
      .attr('text-anchor', 'start')
      .attr('transform', (d, i) => `rotate(-45, ${i * cellSize + cellSize / 2}, -5)`)
      .attr('font-size', Math.min(11, cellSize / 2))
      .text(d => d);

    // Add color legend
    const legendWidth = 200;
    const legendHeight = 15;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 30}, 30)`);

    const legendScale = d3.scaleLinear()
      .domain([0, maxFreq])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5);

    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorScale(0));

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorScale(maxFreq));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#legend-gradient)');

    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis);

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text('빈도 (Frequency)');

  }, [data, width, height]);

  return (
    <div className="matrix-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default OneModematrix;
