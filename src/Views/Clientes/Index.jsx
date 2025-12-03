import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd'; // Lo mantenemos por si lo usas en otro lado
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import { confirmation, sendRequest } from '../../functions';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async() => {
    const res = await sendRequest('GET', '', '/api/clientes', '');
    setClientes(res);
    setClassTable('');
    setClassLoad('d-none');
  };

  const deleteCliente = (id, nombre) => {
    confirmation(nombre, ('/api/clientes/' + id), '/clientes');
  };

  return (
    <div className="container-fluid p-4 bg-white">
      
      {/* 1. HEADER PROFESIONAL: Título y Botón alineados */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-primary fw-bold mb-0">
          <i className="fa-solid fa-users me-2"></i> Catálogo de Clientes
        </h2>
        <Link to="/clientes/create" className="btn btn-primary rounded-pill px-4 shadow-sm">
          <i className="fa-solid fa-user-plus me-2"></i> Nuevo Cliente
        </Link>
      </div>

      {/* 2. ANCHO DE TABLA: Usamos col="10" (off="1") para que la dirección quepa bien */}
      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        
        {/* 3. ESTADO VACÍO (Empty State) */}
        {clientes.length === 0 && classLoad === 'd-none' && (
            <div className="alert alert-info text-center mt-3" role="alert">
                <i className="fa-solid fa-info-circle me-2"></i> No hay clientes registrados en el sistema.
            </div>
        )}

        {clientes.length > 0 && (
            <table className="table table-striped table-hover border rounded shadow-sm">
            <thead className="table-primary text-center text-uppercase">
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Dirección</th> {/* Tilde en Dirección */}
                <th>Editar</th>
                <th>Eliminar</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {clientes.map((row, i) => (
                <tr key={row.id} className="text-center align-middle">
                    <td>{i + 1}</td>
                    {/* 4. TEXTO CAPITALIZADO: Para que los nombres se vean formales */}
                    <td className="text-capitalize fw-semibold">{row.nombre}</td>
                    <td className="text-capitalize">{row.apellidos}</td>
                    <td className="text-muted small">{row.direccion}</td> {/* Texto un poco más pequeño para dirección */}
                    <td>
                    <Link to={'/clientes/edit/' + row.id} className="btn btn-warning btn-sm shadow-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>
                    </td>
                    <td>
                    <button
                        className="btn btn-danger btn-sm shadow-sm"
                        onClick={() => deleteCliente(row.id, row.nombre)}
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

export default Clientes;