import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AuthContext from '../contexts/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { token, profile, handleLogin } = useContext(AuthContext);
  const onLogin = async (login, password) => {
    handleLogin(login, password)
      .then(() => {
        navigate('/news');
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  useEffect(() => {
    if (token && profile) {
      navigate('/news');
    }
  }, [token, profile, navigate]);

  return (
    <>
      <LoginForm onLogin={onLogin} />
      <div className="container landing">
        <div className="row">
          <div className="col">
            <h1>Neto Social</h1>
            <p>Facebook and VK killer.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
