import { useParams } from 'react-router-dom';
import { WordCloud } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const WordCloudPage = () => {
  const { season } = useParams();
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page wordcloud-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>워드클라우드 (Word Cloud)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <WordCloud data={data.wordFrequency} width={900} height={550} />
      </div>
      
      <div className="data-table">
        <h3>단어 빈도 데이터 (Word Frequency Data)</h3>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>단어 (Word)</th>
              <th>빈도 (Frequency)</th>
              <th>백분율 (Percentage)</th>
            </tr>
          </thead>
          <tbody>
            {data.wordFrequency.map((item, index) => (
              <tr key={item.word}>
                <td>{index + 1}</td>
                <td>{item.word}</td>
                <td>{item.frequency}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WordCloudPage;
