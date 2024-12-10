import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest } from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const go = useNavigate();
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
  };
  const login = async (e) => {
    e.preventDefault();
    await csrf();
    const form = { email: email, password: password };
    const res = await sendRequest('POST', form, '/api/auth/login', '', false);
    if (res.status == true) {
      storage.set('authToken', res.token);
      storage.set('authUser', res.data);
      go('/');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-100">
        <div className="col-md-4 offset-md-4">
          <div className="card border-0 shadow-sm p-4">
            <div className="card-header bg-primary text-white text-center fs-4 fw-bold mb-3">
              LOGIN
            </div>
            <div className="card-body">
              <form onSubmit={login}>
                <div className="mb-4">
                  <DivInput
                    type="email"
                    icon="fa-at"
                    value={email}
                    className="form-control"
                    placeholder="Email"
                    required="required"
                    handleChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <DivInput
                    type="password"
                    icon="fa-key"
                    value={password}
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    handleChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid mb-3">
                  <button className="btn btn-primary btn-lg">
                    <i className="fa-solid fa-door-open"></i> Login
                  </button>
                </div>
              </form>
              <div className="text-center">
                <Link to="/register" className="text-decoration-none text-primary">
                  <i className="fa-solid fa-user-plus"></i> Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
