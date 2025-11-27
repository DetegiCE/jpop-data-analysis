import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NgramNetwork = ({ data, width = 800, height = 600 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create nodes from unique words
    const nodesMap = new Map();
    data.forEach(d => {
      if (!nodesMap.has(d.word1)) {
        nodesMap.set(d.word1, { id: d.word1 });
      }
      if (!nodesMap.has(d.word2)) {
        nodesMap.set(d.word2, { id: d.word2 });
      }
    });

    const nodes = Array.from(nodesMap.values());
    const links = data.map(d => ({
      source: d.word1,
      target: d.word2,
      frequency: d.frequency
    }));

    // Calculate node degrees
    const nodeDegrees = new Map();
    links.forEach(link => {
      nodeDegrees.set(link.source, (nodeDegrees.get(link.source) || 0) + link.frequency);
      nodeDegrees.set(link.target, (nodeDegrees.get(link.target) || 0) + link.frequency);
    });

    const maxDegree = d3.max(Array.from(nodeDegrees.values()));

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw links
    const link = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.frequency) * 2);

    // Draw link labels
    const linkLabels = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .text(d => d.frequency)
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .attr('text-anchor', 'middle');

    // Create node groups
    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Draw node circles
    node.append('circle')
      .attr('r', d => 10 + (nodeDegrees.get(d.id) / maxDegree) * 20)
      .attr('fill', (d, i) => colorScale(i))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Draw node labels
    node.append('text')
      .text(d => d.id)
      .attr('font-size', '12px')
      .attr('dx', 15)
      .attr('dy', 4)
      .attr('font-weight', 'bold');

    // Add title tooltips
    node.append('title')
      .text(d => `${d.id}\n연결 강도: ${nodeDegrees.get(d.id)}`);

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      linkLabels
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => simulation.stop();
  }, [data, width, height]);

  return (
    <div className="ngram-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default NgramNetwork;
