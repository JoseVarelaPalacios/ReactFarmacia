import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd';
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
    <div className="container-fluid p-4 bg-light">
      <DivAdd>
        <Link to="/clientes/create" className="btn btn-primary mb-3">
          <i className="fa-solid fa-circle-plus"></i> Agregar Cliente
        </Link>
      </DivAdd>
      <DivTable col="6" off="3" classLoad={classLoad} classTable={classTable}>
        <table className="table table-striped table-hover border rounded">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Direccion</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clientes.map((row, i) => (
              <tr key={row.id} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{row.nombre}</td>
                <td>{row.apellidos}</td>
                <td>{row.direccion}</td>
                <td>
                  <Link to={'/clientes/edit/' + row.id} className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCliente(row.id, row.nombre)}
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
