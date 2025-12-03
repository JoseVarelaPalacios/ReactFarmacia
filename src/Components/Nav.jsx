import { NavLink, useNavigate } from 'react-router-dom'; // Usamos NavLink en lugar de Link
import storage from '../Storage/storage';
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();
    const user = storage.get('authUser');

    const logout = async () => {
        try {
            const authToken = storage.get('authToken');
            if (!authToken) {
                return navigate('/login');
            }
            await axios.post('/api/auth/logout', {}, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            storage.remove('authToken');
            storage.remove('authUser');
            navigate('/login');
        } catch (error) {
            console.error('Error logout:', error);
            storage.remove('authToken'); // Forzamos borrado local si falla API
            storage.remove('authUser');
            navigate('/login');
        }
    };

    // Función para asignar clase activa (Azul si estás en esa página)
    const activeClass = ({ isActive }) => 
        isActive ? 'nav-link text-primary fw-bold border-bottom border-primary' : 'nav-link text-dark fw-semibold';

    return (
        <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                {/* 1. BRANDING: Nombre real y logo (emoji por ahora) */}
                <span className="navbar-brand text-primary fw-bold fs-4">
                    <i className="fa-solid fa-plus-square me-2"></i> SERVIFARMACIA
                </span>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {user ? (
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            {/* 2. MENU: Usamos NavLink para resaltar dónde estamos */}
                            <li className="nav-item px-2">
                                <NavLink to="/" className={activeClass}>
                                    <i className="fas fa-flask me-1"></i> LABORATORIOS
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink to="/medicamentos" className={activeClass}>
                                    <i className="fas fa-pills me-1"></i> MEDICAMENTOS
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink to="/clientes" className={activeClass}>
                                    <i className="fas fa-users me-1"></i> CLIENTES
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink to="/empleados" className={activeClass}>
                                    <i className="fas fa-user-tie me-1"></i> EMPLEADOS
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink to="/ventas" className={activeClass}>
                                    <i className="fas fa-cash-register me-1"></i> VENTAS
                                </NavLink>
                            </li>
                            {/* 3. NOMBRES REALES: Adiós a "Grafica 1" */}
                            <li className="nav-item px-2">
                                <NavLink to="/graphic1" className={activeClass}>
                                    <i className="fas fa-chart-pie me-1"></i> REPORTES
                                </NavLink>
                            </li>
                            <li className="nav-item px-2">
                                <NavLink to="/graphic2" className={activeClass}>
                                    <i className="fas fa-trophy me-1"></i> TOP VENTAS
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav align-items-center">
                            {/* 4. USUARIO: Capitalizado (Jose en vez de jose) */}
                            <li className="nav-item me-3 text-secondary text-capitalize">
                                <i className="fa-solid fa-circle-user me-2"></i>
                                {user.name}
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={logout}>
                                    <i className="fa-solid fa-right-from-bracket me-2"></i> Salir
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