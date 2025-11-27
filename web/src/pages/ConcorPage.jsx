import { useParams } from 'react-router-dom';
import { ConcorAnalysis } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const ConcorPage = () => {
  const { season, clusters } = useParams();
  const numClusters = parseInt(clusters) || 2;
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page concor-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>CONCOR 분석 ({numClusters}군집)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <p className="description">
          CONCOR (Convergence of Iterated Correlations) 분석은 네트워크에서 구조적 등위성을 기반으로 
          노드들을 군집화하는 방법입니다. 같은 군집에 속한 단어들은 유사한 연결 패턴을 가집니다.
        </p>
        <ConcorAnalysis 
          data={data.ngram} 
          numClusters={numClusters} 
          width={900} 
          height={650} 
        />
      </div>
    </div>
  );
};

export default ConcorPage;
