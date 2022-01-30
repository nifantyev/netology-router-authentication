import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthFetch from '../hooks/useAuthFetch';
import AuthContext from '../contexts/AuthContext';
import Logout from '../components/Logout';
import NewsItem from '../components/NewsItem';

const News = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    loading,
    error,
    data: news,
  } = useAuthFetch(`${process.env.REACT_APP_BASE_API_URL}/private/news`);

  const onLogout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <Logout onLogout={onLogout} />
      {loading && (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {news && (
        <div className="container">
          {error && (
            <div class="row">
              <div class="col">{error}</div>
            </div>
          )}
          <div className="row">
            {news.map((o) => (
              <div key={o.id} className="col-4">
                <NewsItem
                  id={o.id}
                  src={o.image}
                  title={o.title}
                  content={o.content}
                  onClick={(id) => navigate(`/news/${id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default News;
