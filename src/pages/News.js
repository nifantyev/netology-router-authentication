import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Logout from '../components/Logout';
import NewsItem from '../components/NewsItem';

const News = () => {
  const { token, handleLogout } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchNews = async () => {
        try {
          setError(null);
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API_URL}/private/news`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setNews(json);
            setLoading(false);
          } else {
            if (response.status === 401) {
              handleLogout();
              navigate('/');
            }
          }
        } catch (e) {
          setError(e.message);
          setLoading(false);
        }
      };
      fetchNews();
    } else {
      handleLogout();
      navigate('/');
    }
  }, [token, handleLogout, navigate]);

  const onLogout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      {loading && (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {token && news && (
        <>
          <Logout onLogout={onLogout} />
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
        </>
      )}
    </>
  );
};

export default News;
