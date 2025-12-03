import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd'; // Mantengo DivAdd por si acaso lo necesitas
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import { confirmation, sendRequest } from '../../functions';

const Laboratorios = () => {
    const [laboratorios, setLaboratorios] = useState([]);
    const [classLoad, setClassLoad] = useState('');
    const [classTable, setClassTable] = useState('d-none');

    useEffect(() => {
        getLaboratorios();
    }, []);

    const getLaboratorios = async() => {
        const res = await sendRequest('GET', '', '/api/laboratorios', '');
        setLaboratorios(res);
        setClassTable('');
        setClassLoad('d-none');
    };

    const deleteLaboratorio = (id, laboratorio) => {
        confirmation(laboratorio, ('/api/laboratorios/' + id), '/');
    };

    return (
        <div className="container-fluid p-4 bg-white">
            
            {/* 1. MEJORA: Título y Botón alineados */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="text-primary fw-bold mb-0">
                    <i className="fa-solid fa-flask me-2"></i> Catálogo de Laboratorios
                </h2>
                <Link to="create" className="btn btn-primary rounded-pill px-4 shadow-sm">
                    <i className="fa-solid fa-plus-square me-2"></i> Agregar
                </Link>
            </div>

            {/* Colocamos DivTable y centramos en la vista */}
            <DivTable col="8" off="2" classLoad={classLoad} classTable={classTable}>

                {/* 2. MEJORA: Estado Vacío (Empty State) */}
                {laboratorios.length === 0 && classLoad === 'd-none' && (
                    <div className="alert alert-info text-center mt-3" role="alert">
                        <i className="fa-solid fa-info-circle me-2"></i> No se encontraron laboratorios registrados.
                    </div>
                )}

                {/* Muestra la tabla SOLO si hay laboratorios */}
                {laboratorios.length > 0 && (
                    <table className="table table-striped table-hover border rounded shadow-sm">
                        
                        {/* 3. MEJORA: Header de la tabla más limpio */}
                        <thead className="table-primary text-center text-uppercase">
                            <tr>
                                <th>#</th>
                                <th>Laboratorio</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {laboratorios.map((row, i) => (
                                <tr key={row.id} className="text-center align-middle">
                                    <td>{i + 1}</td>
                                    <td className="fw-semibold">{row.laboratorio}</td>
                                    <td>
                                        <Link to={'/edit/' + row.id} className="btn btn-warning btn-sm shadow-sm">
                                            <i className="fa-solid fa-edit"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm shadow-sm"
                                            onClick={() => deleteLaboratorio(row.id, row.laboratorio)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </DivTable>
        </div>
    );
};

export default Laboratorios;