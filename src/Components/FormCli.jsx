import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';
import { useNavigate } from 'react-router-dom';  // Para redirección

const FormCli = ({ id, title }) => {  // Desestructuración de props
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    
    const NameInput = useRef();  // Definimos el useRef correctamente
    const navigate = useNavigate();  // Para la redirección
    let method = 'POST';
    let url = '/api/clientes';
    let redirect = '/';

    useEffect(() => {
        if (id) {
            getCliente();
        }
        if (NameInput.current) {
            NameInput.current.focus();  // Foco en el input cuando se carga el componente
        }
    }, [id]);

    const getCliente = async () => {
        if (id) {
            const res = await sendRequest('GET', '', `${url}/${id}`);
            setNombre(res.data.nombre);
            setApellidos(res.data.apellidos);
            setDireccion(res.data.direccion);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        if (id) {
            method = 'PUT';
            url = `/api/clientes/${id}`;
            navigate('/clientes');  
        }
        
        const formData = {
            nombre,
            apellidos,
            direccion
        };

        const res = await sendRequest(method, formData, url, '');
        if (res.status === true) {
            setNombre('');
            setApellidos('');
            setDireccion('');
            
            // Si es un POST, redirigir al inicio
            if (method === 'POST') {
                navigate('/clientes');  // Redirigir a la página principal
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
                                    value={direccion} 
                                    className="form-control mb-3" 
                                    placeholder="Dirección" 
                                    required 
                                    handleChange={(e) => setDireccion(e.target.value)} 
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

export default FormCli;
