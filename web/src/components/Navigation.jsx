import { Link, useParams, useLocation } from 'react-router-dom';
import { datasetInfo } from '../data';

const Navigation = () => {
  const { season } = useParams();
  const location = useLocation();
  const currentSeason = season || 'haru';
  
  const visualizations = [
    { path: 'wordcloud', name: '워드클라우드', nameJp: 'Word Cloud' },
    { path: 'graph', name: '막대그래프', nameJp: 'Bar Graph' },
    { path: 'ngram', name: 'N-gram 네트워크', nameJp: 'N-gram Network' },
    { path: 'matrix', name: '1-Mode 매트릭스', nameJp: '1-Mode Matrix' },
    { path: 'concor/2', name: 'CONCOR (2군집)', nameJp: 'CONCOR (2 clusters)' },
    { path: 'concor/4', name: 'CONCOR (4군집)', nameJp: 'CONCOR (4 clusters)' },
    { path: 'concor/8', name: 'CONCOR (8군집)', nameJp: 'CONCOR (8 clusters)' },
    { path: 'shortest-path', name: '최단경로 분석', nameJp: 'Shortest Path' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">
          <h1>J-POP 가사 데이터 분석</h1>
          <span>J-POP Lyrics Data Analysis</span>
        </Link>
      </div>
      
      <div className="nav-seasons">
        <h3>계절 선택 (Season)</h3>
        <div className="season-buttons">
          {Object.entries(datasetInfo).map(([key, info]) => (
            <Link
              key={key}
              to={`/${key}/${location.pathname.split('/').slice(2).join('/') || 'wordcloud'}`}
              className={`season-btn ${currentSeason === key ? 'active' : ''}`}
              style={{ 
                backgroundColor: currentSeason === key ? info.color : 'transparent',
                borderColor: info.color
              }}
            >
              {info.nameKr}
              <span className="season-jp">{info.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="nav-visualizations">
        <h3>시각화 메뉴 (Visualizations)</h3>
        <ul>
          {visualizations.map(viz => (
            <li key={viz.path}>
              <Link
                to={`/${currentSeason}/${viz.path}`}
                className={location.pathname.includes(viz.path) ? 'active' : ''}
              >
                {viz.name}
                <span className="viz-en">{viz.nameJp}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
