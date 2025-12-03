import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest } from '../functions';
import DivInput from '../Components/DivInput';
import axios from 'axios'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const go = useNavigate();

  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
  };

  const register = async (e) => {
    e.preventDefault();
    await csrf();
    const form = { name: name, email: email, password: password };
    const res = await sendRequest('POST', form, '/api/auth/register', '', false);
    
    if (res.status == true) {
      go('/login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
         style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1920&auto=format&fit=crop')", // Misma imagen del Login
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
        <div className="col-md-4 col-lg-3">
          <div className="card border-0 shadow-lg p-4 rounded-4">
            
            {/* Encabezado con Branding */}
            <div className="text-center mb-4">
              <div className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3" 
                   style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                  <i className="fa-solid fa-user-plus"></i> {/* Ícono diferente para distinguir Registro */}
              </div>
              <h3 className="fw-bold text-dark">NUEVA CUENTA</h3>
              <p className="text-muted small">Registro de Personal - Servifarmacia</p>
            </div>

            <div className="card-body p-0">
              <form onSubmit={register}>
                
                {/* Nombre */}
                <div className="mb-3">
                  <DivInput
                    type="text"
                    icon="fa-user"
                    value={name}
                    className="form-control form-control-lg bg-light"
                    placeholder="Nombre Completo"
                    required="required"
                    handleChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <DivInput
                    type="email"
                    icon="fa-at"
                    value={email}
                    className="form-control form-control-lg bg-light"
                    placeholder="Correo Electrónico"
                    required="required"
                    handleChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
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
                
                {/* Botón de Acción */}
                <div className="d-grid mb-4">
                  <button className="btn btn-success btn-lg rounded-pill fw-bold shadow-sm">
                    <i className="fa-solid fa-check-circle me-2"></i> REGISTRARSE
                  </button>
                </div>
              </form>
              
              {/* Enlace para volver al Login */}
              <div className="text-center border-top pt-3">
                <span className="text-muted small">¿Ya tienes una cuenta? </span>
                <Link to="/login" className="text-decoration-none fw-bold text-primary">
                  Inicia Sesión aquí
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

export default Register;