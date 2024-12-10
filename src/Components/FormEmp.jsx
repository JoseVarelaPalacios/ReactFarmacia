import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';
import { useNavigate } from 'react-router-dom';  // Para redirección

const FormEmp = ({ id, title }) => {  // Desestructuración de props
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    
    const NameInput = useRef();  // Definimos el useRef correctamente
    const navigate = useNavigate();  // Para la redirección
    let method = 'POST';
    let url = '/api/empleados';
    let redirect = '/';

    useEffect(() => {
        if (id) {
            getEmpleado();
        }
        if (NameInput.current) {
            NameInput.current.focus();  // Foco en el input cuando se carga el componente
        }
    }, [id]);

    const getEmpleado = async () => {
        if (id) {
            const res = await sendRequest('GET', '', `${url}/${id}`);
            setNombre(res.data.nombre);
            setApellidos(res.data.apellidos);
            setCorreo(res.data.correo);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        if (id) {
            method = 'PUT';
            url = `/api/empleados/${id}`;
            navigate('/empleados');  
        }
        
        const formData = {
            nombre,
            apellidos,
            correo
        };

        const res = await sendRequest(method, formData, url, '');
        if (res.status === true) {
            setNombre('');
            setApellidos('');
            setCorreo('');
            
            // Si es un POST, redirigir al inicio
            if (method === 'POST') {
                navigate('/empleados');  // Redirigir a la página principal
            }
        }
    };

    return (
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100">
                <div className="col-md-4 mx-auto">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white text-center fw-bold fs-5 py-3">
                            {title}
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={save}>
                                <DivInput 
                                    type="text" 
                                    icon="fa-building"
                                    value={nombre} 
                                    className="form-control mb-3" 
                                    placeholder="Nombre" 
                                    required 
                                    ref={NameInput}  // Asociamos el useRef al input
                                    handleChange={(e) => setNombre(e.target.value)} 
                                />
                                <DivInput 
                                    type="text" 
                                    icon="fa-user"
                                    value={apellidos} 
                                    className="form-control mb-3" 
                                    placeholder="Apellidos" 
                                    required 
                                    handleChange={(e) => setApellidos(e.target.value)} 
                                />
                                <DivInput 
                                    type="text" 
                                    icon="fa-home"
                                    value={correo} 
                                    className="form-control mb-3" 
                                    placeholder="Correo" 
                                    required 
                                    handleChange={(e) => setCorreo(e.target.value)} 
                                />
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg">
                                        <i className="fa-solid fa-save"></i> Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEmp;
