import { useParams } from 'react-router-dom';
import { ShortestPath } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const ShortestPathPage = () => {
  const { season } = useParams();
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page shortest-path-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>최단경로 분석 (Shortest Path Analysis)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <p className="description">
          두 단어 사이의 최단 경로를 찾습니다. Dijkstra와 A* 알고리즘을 선택할 수 있습니다.
          경로의 가중치는 동시출현 빈도의 역수로 계산됩니다 (빈도가 높을수록 거리가 가깝습니다).
        </p>
        <ShortestPath data={data.ngram} width={900} height={600} />
      </div>
    </div>
  );
};

export default ShortestPathPage;
