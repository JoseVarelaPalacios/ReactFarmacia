import React, { useEffect, useState } from 'react';
import DivAdd from '../../Components/DivAdd';
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
    <div className="container-fluid p-4 bg-light">
      <DivAdd>
        <Link to="create" className="btn btn-primary mb-3">
          <i className="fa-solid fa-circle-plus"></i> Agregar Laboratorio
        </Link>
      </DivAdd>
      <DivTable col="6" off="3" classLoad={classLoad} classTable={classTable}>
        <table className="table table-striped table-hover border rounded">
          <thead className="table-dark text-center">
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
                <td>{row.laboratorio}</td>
                <td>
                  <Link to={'/edit/' + row.id} className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteLaboratorio(row.id, row.laboratorio)}
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

export default Laboratorios;
