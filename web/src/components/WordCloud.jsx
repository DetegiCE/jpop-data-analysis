import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ data, width = 800, height = 500 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const words = data.map(d => ({
      text: d.word,
      size: Math.sqrt(d.frequency) * 8,
      frequency: d.frequency,
      percentage: d.percentage
    }));

    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font('sans-serif')
      .fontSize(d => d.size)
      .on('end', draw);

    layout.start();

    function draw(words) {
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      
      svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'sans-serif')
        .style('fill', (d, i) => colorScale(i))
        .style('cursor', 'pointer')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text(d => d.text)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', `${d.size * 1.2}px`)
            .style('font-weight', 'bold');
        })
        .on('mouseout', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', `${d.size}px`)
            .style('font-weight', 'normal');
        })
        .append('title')
        .text(d => `${d.text}: ${d.frequency} (${d.percentage}%)`);
    }
  }, [data, width, height]);

  return (
    <div className="wordcloud-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default WordCloud;
