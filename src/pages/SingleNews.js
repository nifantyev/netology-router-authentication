import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthFetch from '../hooks/useAuthFetch';
import AuthContext from '../contexts/AuthContext';
import NewsItem from '../components/NewsItem';
import Logout from '../components/Logout';

const SingleNews = () => {
  const { id } = useParams();
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    loading,
    error,
    data: newsItem,
  } = useAuthFetch(`${process.env.REACT_APP_BASE_API_URL}/private/news/${id}`);

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
      {!loading && !newsItem && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>404 Not Found</h1>
            </div>
          </div>
        </div>
      )}
      {newsItem && (
        <div className="container">
          {error && (
            <div class="row">
              <div class="col">{error}</div>
            </div>
          )}
          <div className="row">
            <div className="col-4 offset-4">
              <NewsItem
                id={newsItem.id}
                src={newsItem.image}
                title={newsItem.title}
                content={newsItem.content}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleNews;
