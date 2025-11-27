import { Link } from 'react-router-dom';
import { datasetInfo } from '../data';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>J-POP 가사 데이터 분석</h1>
        <h2>J-POP Lyrics Data Analysis</h2>
        <p>일본 대중음악 가사의 계절별 분석 및 시각화</p>
        <p>Seasonal Analysis and Visualization of Japanese Pop Music Lyrics</p>
      </header>

      <section className="datasets-section">
        <h2>데이터셋 선택 (Select Dataset)</h2>
        <div className="dataset-cards">
          {Object.entries(datasetInfo).map(([key, info]) => (
            <Link
              key={key}
              to={`/${key}/wordcloud`}
              className="dataset-card"
              style={{ borderColor: info.color, backgroundColor: `${info.color}22` }}
            >
              <h3>{info.nameKr}</h3>
              <p>{info.name}</p>
              <div className="card-decoration" style={{ backgroundColor: info.color }}></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="visualizations-section">
        <h2>시각화 종류 (Visualization Types)</h2>
        <div className="viz-list">
          <div className="viz-item">
            <h4>워드클라우드 (Word Cloud)</h4>
            <p>단어 빈도를 시각적으로 표현한 워드클라우드</p>
          </div>
          <div className="viz-item">
            <h4>막대그래프 (Bar Graph)</h4>
            <p>단어 빈도를 막대그래프로 표현</p>
          </div>
          <div className="viz-item">
            <h4>N-gram 네트워크 (N-gram Network)</h4>
            <p>단어 간 연결 관계를 네트워크로 시각화</p>
          </div>
          <div className="viz-item">
            <h4>1-Mode 매트릭스 (1-Mode Matrix)</h4>
            <p>단어 간 동시출현 행렬 히트맵</p>
          </div>
          <div className="viz-item">
            <h4>CONCOR 분석 (CONCOR Analysis)</h4>
            <p>구조적 등위성 분석을 통한 군집화 (2, 4, 8 군집)</p>
          </div>
          <div className="viz-item">
            <h4>최단경로 분석 (Shortest Path)</h4>
            <p>Dijkstra와 A* 알고리즘을 이용한 최단경로 탐색</p>
          </div>
        </div>
      </section>

      <section className="data-info-section">
        <h2>데이터 정보 (Data Information)</h2>
        <div className="data-types">
          <div className="data-type">
            <h4>단어 빈도 (Word Frequency)</h4>
            <p>단어, 빈도, 백분율</p>
          </div>
          <div className="data-type">
            <h4>N-gram</h4>
            <p>단어1, 단어2, 빈도</p>
          </div>
          <div className="data-type">
            <h4>TF-IDF</h4>
            <p>단어, TF-IDF, DF, IDF</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
