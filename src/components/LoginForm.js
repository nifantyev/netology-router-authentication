import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const logo = (
    <div className="col">
      <h2>Neto Social</h2>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        {logo}
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-outline-success"
            onClick={() => onLogin(form.login, form.password)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
