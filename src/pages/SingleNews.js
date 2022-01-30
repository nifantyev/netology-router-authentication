import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import NewsItem from '../components/NewsItem';
import Logout from '../components/Logout';

const SingleNews = () => {
  const { id } = useParams();
  const { token, handleLogout } = useContext(AuthContext);
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchNewsItem = async () => {
        try {
          setError(null);
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_BASE_API_URL}/private/news/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const json = await response.json();
            setNewsItem(json);
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
      fetchNewsItem();
    } else {
      handleLogout();
      navigate('/');
    }
  }, [id, token, handleLogout, navigate]);

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
      {token && newsItem && (
        <>
          <Logout onLogout={onLogout} />
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
        </>
      )}
    </>
  );
};

export default SingleNews;
