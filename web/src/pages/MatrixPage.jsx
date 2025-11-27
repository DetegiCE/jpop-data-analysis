import { useParams } from 'react-router-dom';
import { OneModematrix } from '../components';
import { haruData, natsuData, akiData, fuyuData, datasetInfo } from '../data';

const getDataBySeason = (season) => {
  switch (season) {
    case 'natsu': return natsuData;
    case 'aki': return akiData;
    case 'fuyu': return fuyuData;
    default: return haruData;
  }
};

const MatrixPage = () => {
  const { season } = useParams();
  const data = getDataBySeason(season);
  const info = datasetInfo[season] || datasetInfo.haru;

  return (
    <div className="page matrix-page">
      <header className="page-header" style={{ borderColor: info.color }}>
        <h2>1-Mode 매트릭스 (1-Mode Matrix)</h2>
        <p>{info.nameKr} ({info.name}) 데이터셋</p>
      </header>
      
      <div className="page-content">
        <p className="description">
          단어 간 동시출현 빈도를 행렬 형태로 시각화합니다. 
          색이 진할수록 동시출현 빈도가 높습니다.
        </p>
        <OneModematrix data={data.ngram} width={750} height={750} />
      </div>
    </div>
  );
};

export default MatrixPage;
