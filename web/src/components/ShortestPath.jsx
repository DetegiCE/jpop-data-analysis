import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';

const ShortestPath = ({ data, width = 800, height = 600 }) => {
  const svgRef = useRef(null);
  const [algorithm, setAlgorithm] = useState('dijkstra');

  // Calculate available words using useMemo
  const availableWords = useMemo(() => {
    if (!data || data.length === 0) return [];
    const wordsSet = new Set();
    data.forEach(d => {
      wordsSet.add(d.word1);
      wordsSet.add(d.word2);
    });
    return Array.from(wordsSet);
  }, [data]);

  // Initialize source and target words based on availableWords
  const [sourceWord, setSourceWord] = useState(() => '');
  const [targetWord, setTargetWord] = useState(() => '');

  // Derive actual source/target with fallback to first/last available words
  const actualSourceWord = sourceWord || (availableWords.length > 0 ? availableWords[0] : '');
  const actualTargetWord = targetWord || (availableWords.length > 1 ? availableWords[availableWords.length - 1] : '');

  // Calculate path result using useMemo
  const pathResult = useMemo(() => {
    if (!data || data.length === 0 || !actualSourceWord || !actualTargetWord) return null;
    
    const graph = buildGraph(data);
    let path;
    let visitedOrder = [];
    
    if (algorithm === 'dijkstra') {
      const result = dijkstra(graph, actualSourceWord, actualTargetWord);
      path = result.path;
      visitedOrder = result.visited;
    } else {
      const result = aStar(graph, actualSourceWord, actualTargetWord);
      path = result.path;
      visitedOrder = result.visited;
    }

    return {
      path,
      distance: calculatePathDistance(graph, path),
      visited: visitedOrder.length,
      algorithm: algorithm === 'dijkstra' ? 'Dijkstra' : 'A*',
      visitedOrder
    };
  }, [data, actualSourceWord, actualTargetWord, algorithm]);

  useEffect(() => {
    if (!data || data.length === 0 || !actualSourceWord || !actualTargetWord || !pathResult) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { path, visitedOrder } = pathResult;

    // Create visualization
    const wordsSet = new Set();
    data.forEach(d => {
      wordsSet.add(d.word1);
      wordsSet.add(d.word2);
    });

    const nodes = Array.from(wordsSet).map(word => ({
      id: word,
      isSource: word === actualSourceWord,
      isTarget: word === actualTargetWord,
      inPath: path.includes(word),
      visitedIndex: visitedOrder.indexOf(word)
    }));

    const links = data.map(d => ({
      source: d.word1,
      target: d.word2,
      frequency: d.frequency,
      weight: 1 / d.frequency, // Higher frequency = lower weight
      inPath: isLinkInPath(path, d.word1, d.word2)
    }));

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(35));

    // Draw links
    const link = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => d.inPath ? '#ff4444' : '#999')
      .attr('stroke-opacity', d => d.inPath ? 1 : 0.3)
      .attr('stroke-width', d => d.inPath ? 4 : Math.sqrt(d.frequency));

    // Draw link labels (weights)
    const linkLabels = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .text(d => d.frequency)
      .attr('font-size', '9px')
      .attr('fill', d => d.inPath ? '#ff4444' : '#666')
      .attr('font-weight', d => d.inPath ? 'bold' : 'normal')
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
      .attr('r', d => d.isSource || d.isTarget ? 20 : d.inPath ? 18 : 12)
      .attr('fill', d => {
        if (d.isSource) return '#4CAF50';
        if (d.isTarget) return '#2196F3';
        if (d.inPath) return '#FF9800';
        return '#ccc';
      })
      .attr('stroke', d => d.inPath ? '#ff4444' : '#fff')
      .attr('stroke-width', d => d.inPath ? 3 : 2);

    // Draw visit order numbers for algorithm visualization
    node.filter(d => d.visitedIndex >= 0)
      .append('text')
      .text(d => d.visitedIndex + 1)
      .attr('font-size', '8px')
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('dy', -25);

    // Draw node labels
    node.append('text')
      .text(d => d.id)
      .attr('font-size', d => d.isSource || d.isTarget ? '13px' : '11px')
      .attr('dx', 22)
      .attr('dy', 4)
      .attr('font-weight', d => d.inPath ? 'bold' : 'normal')
      .attr('fill', d => d.inPath ? '#333' : '#666');

    // Add title tooltips
    node.append('title')
      .text(d => {
        let text = d.id;
        if (d.isSource) text += ' (출발)';
        if (d.isTarget) text += ' (도착)';
        if (d.visitedIndex >= 0) text += `\n방문 순서: ${d.visitedIndex + 1}`;
        return text;
      });

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
  }, [data, actualSourceWord, actualTargetWord, pathResult, width, height]);

  return (
    <div className="shortest-path-container">
      <div className="controls">
        <div className="control-group">
          <label>출발 단어 (Source):</label>
          <select value={actualSourceWord} onChange={e => setSourceWord(e.target.value)}>
            {availableWords.map(word => (
              <option key={word} value={word}>{word}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>도착 단어 (Target):</label>
          <select value={actualTargetWord} onChange={e => setTargetWord(e.target.value)}>
            {availableWords.map(word => (
              <option key={word} value={word}>{word}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>알고리즘 (Algorithm):</label>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">A*</option>
          </select>
        </div>
      </div>
      
      {pathResult && (
        <div className="path-result">
          <h4>결과 (Result)</h4>
          <p><strong>알고리즘:</strong> {pathResult.algorithm}</p>
          <p><strong>경로:</strong> {pathResult.path.length > 0 ? pathResult.path.join(' → ') : '경로 없음'}</p>
          <p><strong>경로 길이:</strong> {pathResult.path.length > 0 ? pathResult.path.length - 1 : 0} 단계</p>
          <p><strong>총 거리 (가중치 합):</strong> {pathResult.distance.toFixed(3)}</p>
          <p><strong>방문한 노드 수:</strong> {pathResult.visited}</p>
        </div>
      )}
      
      <div className="legend">
        <span className="legend-item"><span className="dot source"></span> 출발점</span>
        <span className="legend-item"><span className="dot target"></span> 도착점</span>
        <span className="legend-item"><span className="dot path"></span> 경로상 노드</span>
        <span className="legend-item"><span className="line path-line"></span> 최단 경로</span>
      </div>
      
      <svg ref={svgRef}></svg>
    </div>
  );
};

// Build graph from n-gram data
function buildGraph(data) {
  const graph = new Map();
  
  data.forEach(d => {
    if (!graph.has(d.word1)) graph.set(d.word1, new Map());
    if (!graph.has(d.word2)) graph.set(d.word2, new Map());
    
    // Weight is inverse of frequency (higher frequency = shorter distance)
    const weight = 1 / d.frequency;
    graph.get(d.word1).set(d.word2, weight);
    graph.get(d.word2).set(d.word1, weight);
  });
  
  return graph;
}

// Dijkstra's algorithm
function dijkstra(graph, source, target) {
  const distances = new Map();
  const previous = new Map();
  const visited = new Set();
  const visitedOrder = [];
  const pq = [];
  
  // Initialize
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
    previous.set(node, null);
  }
  distances.set(source, 0);
  pq.push({ node: source, distance: 0 });
  
  while (pq.length > 0) {
    // Sort and get minimum
    pq.sort((a, b) => a.distance - b.distance);
    const { node } = pq.shift();
    
    if (visited.has(node)) continue;
    visited.add(node);
    visitedOrder.push(node);
    
    if (node === target) break;
    
    const neighbors = graph.get(node);
    if (neighbors) {
      for (const [neighbor, weight] of neighbors) {
        if (!visited.has(neighbor)) {
          const alt = distances.get(node) + weight;
          if (alt < distances.get(neighbor)) {
            distances.set(neighbor, alt);
            previous.set(neighbor, node);
            pq.push({ node: neighbor, distance: alt });
          }
        }
      }
    }
  }
  
  // Reconstruct path
  const path = [];
  let current = target;
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  if (path[0] !== source) {
    return { path: [], visited: visitedOrder };
  }
  
  return { path, visited: visitedOrder };
}

// A* algorithm (simplified - using simple heuristic)
function aStar(graph, source, target) {
  const gScore = new Map();
  const fScore = new Map();
  const previous = new Map();
  const visited = new Set();
  const visitedOrder = [];
  const openSet = [];
  
  // Simple heuristic (constant since we don't have spatial information)
  const heuristic = () => 0.1;
  
  for (const node of graph.keys()) {
    gScore.set(node, Infinity);
    fScore.set(node, Infinity);
    previous.set(node, null);
  }
  
  gScore.set(source, 0);
  fScore.set(source, heuristic());
  openSet.push({ node: source, f: fScore.get(source) });
  
  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const { node: current } = openSet.shift();
    
    if (visited.has(current)) continue;
    visited.add(current);
    visitedOrder.push(current);
    
    if (current === target) break;
    
    const neighbors = graph.get(current);
    if (neighbors) {
      for (const [neighbor, weight] of neighbors) {
        if (!visited.has(neighbor)) {
          const tentativeG = gScore.get(current) + weight;
          if (tentativeG < gScore.get(neighbor)) {
            previous.set(neighbor, current);
            gScore.set(neighbor, tentativeG);
            fScore.set(neighbor, tentativeG + heuristic());
            openSet.push({ node: neighbor, f: fScore.get(neighbor) });
          }
        }
      }
    }
  }
  
  // Reconstruct path
  const path = [];
  let current = target;
  while (current !== null) {
    path.unshift(current);
    current = previous.get(current);
  }
  
  if (path[0] !== source) {
    return { path: [], visited: visitedOrder };
  }
  
  return { path, visited: visitedOrder };
}

// Check if link is in path
function isLinkInPath(path, word1, word2) {
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === word1 && path[i + 1] === word2) ||
        (path[i] === word2 && path[i + 1] === word1)) {
      return true;
    }
  }
  return false;
}

// Calculate total path distance
function calculatePathDistance(graph, path) {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const neighbors = graph.get(path[i]);
    if (neighbors && neighbors.has(path[i + 1])) {
      distance += neighbors.get(path[i + 1]);
    }
  }
  return distance;
}

export default ShortestPath;
