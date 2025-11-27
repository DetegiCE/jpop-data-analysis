import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';

const ConcorAnalysis = ({ data, numClusters = 2, width = 800, height = 600 }) => {
  const svgRef = useRef(null);
  
  // Calculate cluster info using useMemo to avoid setState in useEffect
  const clusterInfo = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Create nodes from unique words
    const wordsSet = new Set();
    data.forEach(d => {
      wordsSet.add(d.word1);
      wordsSet.add(d.word2);
    });
    const words = Array.from(wordsSet);

    // Create adjacency matrix for correlation
    const n = words.length;
    const wordIndex = new Map(words.map((w, i) => [w, i]));
    const adjMatrix = Array(n).fill(null).map(() => Array(n).fill(0));
    
    data.forEach(d => {
      const i = wordIndex.get(d.word1);
      const j = wordIndex.get(d.word2);
      adjMatrix[i][j] = d.frequency;
      adjMatrix[j][i] = d.frequency;
    });

    // Simple k-means clustering based on adjacency patterns
    const clusters = performClustering(adjMatrix, numClusters);
    
    // Create nodes with cluster assignments
    const nodes = words.map((word, i) => ({
      id: word,
      cluster: clusters[i],
      index: i
    }));

    // Color scale for clusters
    const clusterColors = d3.scaleOrdinal()
      .domain(d3.range(numClusters))
      .range(d3.schemeCategory10.slice(0, numClusters));

    // Calculate cluster statistics
    return d3.range(numClusters).map(c => {
      const clusterNodes = nodes.filter(n => n.cluster === c);
      return {
        cluster: c + 1,
        count: clusterNodes.length,
        words: clusterNodes.map(n => n.id),
        color: clusterColors(c)
      };
    });
  }, [data, numClusters]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create nodes from unique words
    const wordsSet = new Set();
    data.forEach(d => {
      wordsSet.add(d.word1);
      wordsSet.add(d.word2);
    });
    const words = Array.from(wordsSet);

    // Create adjacency matrix for correlation
    const n = words.length;
    const wordIndex = new Map(words.map((w, i) => [w, i]));
    const adjMatrix = Array(n).fill(null).map(() => Array(n).fill(0));
    
    data.forEach(d => {
      const i = wordIndex.get(d.word1);
      const j = wordIndex.get(d.word2);
      adjMatrix[i][j] = d.frequency;
      adjMatrix[j][i] = d.frequency;
    });

    // Simple k-means clustering based on adjacency patterns
    const clusters = performClustering(adjMatrix, numClusters);
    
    // Create nodes with cluster assignments
    const nodes = words.map((word, i) => ({
      id: word,
      cluster: clusters[i],
      index: i
    }));

    const links = data.map(d => ({
      source: d.word1,
      target: d.word2,
      frequency: d.frequency
    }));

    // Color scale for clusters
    const clusterColors = d3.scaleOrdinal()
      .domain(d3.range(numClusters))
      .range(d3.schemeCategory10.slice(0, numClusters));

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('cluster', forceCluster(nodes, numClusters, width, height))
      .force('collision', d3.forceCollide().radius(30));

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
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', d => Math.sqrt(d.frequency));

    // Draw cluster backgrounds
    const clusterCenters = getClusterCenters(numClusters, width, height);
    svg.append('g')
      .selectAll('circle')
      .data(clusterCenters)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 120)
      .attr('fill', (d, i) => clusterColors(i))
      .attr('opacity', 0.1)
      .attr('stroke', (d, i) => clusterColors(i))
      .attr('stroke-dasharray', '5,5');

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
      .attr('r', 15)
      .attr('fill', d => clusterColors(d.cluster))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Draw node labels
    node.append('text')
      .text(d => d.id)
      .attr('font-size', '11px')
      .attr('dx', 18)
      .attr('dy', 4)
      .attr('font-weight', 'bold');

    // Add title tooltips
    node.append('title')
      .text(d => `${d.id}\n군집: ${d.cluster + 1}`);

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

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
  }, [data, numClusters, width, height]);

  return (
    <div className="concor-container">
      <svg ref={svgRef}></svg>
      <div className="cluster-info">
        <h4>군집 정보 (Cluster Information)</h4>
        {clusterInfo.map((cluster) => (
          <div key={cluster.cluster} className="cluster-item" style={{ borderLeft: `4px solid ${cluster.color}` }}>
            <strong>군집 {cluster.cluster}</strong>: {cluster.count}개 단어
            <div className="cluster-words">
              {cluster.words.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple clustering algorithm (spectral-like)
function performClustering(adjMatrix, k) {
  const n = adjMatrix.length;
  const clusters = new Array(n).fill(0);
  
  // Calculate row sums for initial clustering
  const rowSums = adjMatrix.map(row => row.reduce((a, b) => a + b, 0));
  
  // Sort indices by row sum
  const sortedIndices = rowSums
    .map((sum, i) => ({ sum, i }))
    .sort((a, b) => b.sum - a.sum)
    .map(d => d.i);
  
  // Assign clusters based on sorted order
  const clusterSize = Math.ceil(n / k);
  sortedIndices.forEach((originalIndex, sortedPosition) => {
    clusters[originalIndex] = Math.min(Math.floor(sortedPosition / clusterSize), k - 1);
  });
  
  return clusters;
}

// Get cluster center positions
function getClusterCenters(k, width, height) {
  const centers = [];
  const angleStep = (2 * Math.PI) / k;
  const radius = Math.min(width, height) * 0.25;
  
  for (let i = 0; i < k; i++) {
    centers.push({
      x: width / 2 + radius * Math.cos(i * angleStep - Math.PI / 2),
      y: height / 2 + radius * Math.sin(i * angleStep - Math.PI / 2)
    });
  }
  
  return centers;
}

// Custom force to cluster nodes
function forceCluster(nodes, k, width, height) {
  const centers = getClusterCenters(k, width, height);
  const strength = 0.1;
  
  function force(alpha) {
    nodes.forEach(node => {
      const center = centers[node.cluster];
      node.vx += (center.x - node.x) * strength * alpha;
      node.vy += (center.y - node.y) * strength * alpha;
    });
  }
  
  return force;
}

export default ConcorAnalysis;
