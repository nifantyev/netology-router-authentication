import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function useAuthFetch(url) {
  const { token, handleLogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      handleLogout();
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const json = await response.json();
          setData(json);
          setLoading(false);
        } else {
          if (response.status === 401) {
            handleLogout();
            navigate('/');
          } else {
            setData(null);
            setLoading(false);
          }
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [token, url, navigate, handleLogout]);

  return { loading, error, data };
}
