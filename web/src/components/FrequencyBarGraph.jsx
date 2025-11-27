import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#a4de6c', '#d0ed57', '#8dd1e1', '#83a6ed', '#8884d8', '#82ca9d'];

const FrequencyBarGraph = ({ data, title = "단어 빈도 그래프" }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = data.slice(0, 15).map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="graph-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="word" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            stroke="#8884d8"
            label={{ value: '빈도 (Frequency)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            label={{ value: '백분율 (%)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="custom-tooltip" style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}>
                    <p><strong>{data.word}</strong></p>
                    <p>빈도: {data.frequency}</p>
                    <p>백분율: {data.percentage}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="frequency" 
            name="빈도 (Frequency)"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyBarGraph;
