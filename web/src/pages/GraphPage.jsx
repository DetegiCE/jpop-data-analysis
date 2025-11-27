import { useParams } from 'react-router-dom';
import { FrequencyBarGraph } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const GraphPage = () => {
  const { season } = useParams();
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page graph-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>막대그래프 (Bar Graph)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <FrequencyBarGraph 
          data={data.wordFrequency} 
          title={`${info.nameKr} 단어 빈도 그래프`}
        />
      </div>
      
      <div className="tfidf-section">
        <h3>TF-IDF 데이터</h3>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>단어 (Word)</th>
              <th>TF-IDF</th>
              <th>DF</th>
              <th>IDF</th>
            </tr>
          </thead>
          <tbody>
            {data.tfidf.map((item, index) => (
              <tr key={item.word}>
                <td>{index + 1}</td>
                <td>{item.word}</td>
                <td>{item.tfidf.toFixed(3)}</td>
                <td>{item.df.toFixed(3)}</td>
                <td>{item.idf.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraphPage;
