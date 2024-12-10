import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import { confirmation, sendRequest } from '../../functions';

const Clientes = () => {
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
    <div className="container-fluid p-4 bg-light">
      <DivAdd>
        <Link to="/empleados/create" className="btn btn-primary mb-3">
          <i className="fa-solid fa-circle-plus"></i> Agregar Empleado
        </Link>
      </DivAdd>
      <DivTable col="6" off="3" classLoad={classLoad} classTable={classTable}>
        <table className="table table-striped table-hover border rounded">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {empleados.map((row, i) => (
              <tr key={row.id} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{row.nombre}</td>
                <td>{row.apellidos}</td>
                <td>{row.correo}</td>
                <td>
                  <Link to={'/empleados/edit/' + row.id} className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmpleado(row.id, row.nombre)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default Clientes;
