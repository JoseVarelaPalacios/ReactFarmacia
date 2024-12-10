import { Link, useNavigate } from 'react-router-dom';
import storage from '../Storage/storage';
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            
            const authToken = storage.get('authToken');
            
            if (!authToken) {
                alert('No se encontró el token de autenticación');
                return navigate('/login');
            }

            const response = await axios.post('/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${authToken}` 
                }
            });

            console.log('Respuesta de logout:', response.data);

            storage.remove('authToken');
            storage.remove('authUser');

            
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar la sesión:', error);

            
            if (error.response) {
                alert(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error al cerrar la sesión'}`);
            } else {
                alert('Hubo un problema cerrando la sesión. Revisa la consola para más detalles.');
            }
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand text-primary fw-bold">FARMACIA</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                    aria-controls="nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {storage.get('authUser') ? (
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav mx-auto mb-2">
                            <li className="nav-item px-lg-5 h4 text-secondary">
                                {storage.get('authUser').name}
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-flask me-2"></i> LABORATORIOS
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/medicamentos" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-pills me-2"></i> MEDICAMENTOS
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/clientes" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-users me-2"></i> CLIENTES
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/empleados" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-user-tie me-2"></i> EMPLEADOS
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/ventas" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-chart-line me-2"></i> VENTAS
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/graphic1" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-chart-bar me-2"></i> GRAFICA 1
                                </Link>
                            </li>
                            <li className="nav-item px-lg-3">
                                <Link to="/graphic2" className="nav-link text-dark fw-semibold">
                                    <i className="fas fa-chart-bar me-2"></i> GRAFICA 2
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item px-lg-3">
                                <button className="btn btn-outline-danger" onClick={logout}>
                                    LOGOUT
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : ''}
            </div>
        </nav>
    );
};

export default Nav;
