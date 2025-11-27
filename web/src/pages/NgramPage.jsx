import { useParams } from 'react-router-dom';
import { NgramNetwork } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const NgramPage = () => {
  const { season } = useParams();
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page ngram-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>N-gram 네트워크 (N-gram Network)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <NgramNetwork data={data.ngram} width={900} height={600} />
      </div>
      
      <div className="data-table">
        <h3>N-gram 데이터</h3>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>단어1 (Word 1)</th>
              <th>단어2 (Word 2)</th>
              <th>빈도 (Frequency)</th>
            </tr>
          </thead>
          <tbody>
            {data.ngram.map((item, index) => (
              <tr key={`${item.word1}-${item.word2}`}>
                <td>{index + 1}</td>
                <td>{item.word1}</td>
                <td>{item.word2}</td>
                <td>{item.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NgramPage;
