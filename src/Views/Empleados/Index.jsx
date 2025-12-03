import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd'; 
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import { confirmation, sendRequest } from '../../functions';

// 1. CORRECCIÓN: El nombre del componente debe ser Empleados
const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async() => {
    const res = await sendRequest('GET', '', '/api/empleados', '');
    setEmpleados(res);
    setClassTable('');
    setClassLoad('d-none');
  };

  const deleteEmpleado = (id, nombre) => {
    confirmation(nombre, ('/api/empleados/' + id), '/empleados');
  };

  return (
    <div className="container-fluid p-4 bg-white">
      
      {/* 2. HEADER PROFESIONAL: Título con ícono de corbata */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-primary fw-bold mb-0">
          <i className="fa-solid fa-user-tie me-2"></i> Personal de Farmacia
        </h2>
        <Link to="/empleados/create" className="btn btn-primary rounded-pill px-4 shadow-sm">
          <i className="fa-solid fa-user-plus me-2"></i> Nuevo Empleado
        </Link>
      </div>

      {/* 3. ANCHO DE TABLA: Usamos col="10" para que quepan los correos largos */}
      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        
        {/* Estado Vacío */}
        {empleados.length === 0 && classLoad === 'd-none' && (
            <div className="alert alert-info text-center mt-3" role="alert">
                <i className="fa-solid fa-info-circle me-2"></i> No hay empleados registrados.
            </div>
        )}

        {empleados.length > 0 && (
            <table className="table table-striped table-hover border rounded shadow-sm">
            <thead className="table-primary text-center text-uppercase">
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo Electrónico</th>
                <th>Editar</th>
                <th>Eliminar</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {empleados.map((row, i) => (
                <tr key={row.id} className="text-center align-middle">
                    <td>{i + 1}</td>
                    {/* Nombres capitalizados para formalidad */}
                    <td className="text-capitalize fw-semibold">{row.nombre}</td>
                    <td className="text-capitalize">{row.apellidos}</td>
                    {/* Correo en fuente monoespaciada o normal, color muted */}
                    <td className="text-muted">{row.correo}</td>
                    <td>
                    <Link to={'/empleados/edit/' + row.id} className="btn btn-warning btn-sm shadow-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>
                    </td>
                    <td>
                    <button
                        className="btn btn-danger btn-sm shadow-sm"
                        onClick={() => deleteEmpleado(row.id, row.nombre)}
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

export default Empleados; // 4. IMPORTANTE: Exportar con el nombre correcto