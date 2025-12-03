import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest } from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';
import axios from 'axios'; 

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
    <div className="d-flex justify-content-center align-items-center vh-100" 
         style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1920&auto=format&fit=crop')",
             backgroundSize: 'cover', 
             backgroundPosition: 'center',
             position: 'relative'
         }}>
         
      {/* Capa oscura (Overlay) */}
      <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1
      }}></div>

      <div className="row w-100 justify-content-center" style={{ zIndex: 2 }}>
        <div className="col-md-4 col-lg-3"> {/* Un poco más angosto para verse elegante */}
          <div className="card border-0 shadow-lg p-4 rounded-4">
            
            {/* Encabezado con Logo */}
            <div className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                  <i className="fa-solid fa-pills"></i>
              </div>
              <h3 className="fw-bold text-dark">SERVIFARMACIA</h3>
              <p className="text-muted small">Acceso al Sistema</p>
            </div>

            <div className="card-body p-0">
              <form onSubmit={login}>
                <div className="mb-3">
                  <DivInput
                    type="email"
                    icon="fa-envelope" // Cambié el ícono a uno más estándar de correo
                    value={email}
                    className="form-control form-control-lg bg-light" // Inputs más grandes y grisaceos
                    placeholder="Correo Electrónico"
                    required="required"
                    handleChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <DivInput
                    type="password"
                    icon="fa-key"
                    value={password}
                    className="form-control form-control-lg bg-light"
                    placeholder="Contraseña"
                    required="required"
                    handleChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="d-grid mb-4">
                  <button className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm">
                    <i className="fa-solid fa-right-to-bracket me-2"></i> INGRESAR
                  </button>
                </div>
              </form>
              
              <div className="text-center border-top pt-3">
                <span className="text-muted small">¿No tienes cuenta? </span>
                <Link to="/register" className="text-decoration-none fw-bold text-primary">
                  Registrate
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer Copyright */}
          <div className="text-center text-white-50 mt-3 small">
             &copy; 2024 Servifarmacia 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;