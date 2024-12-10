import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import DivSelect from '../../Components/DivSelect';
import DivInput from '../../Components/DivInput';
import Modal from '../../Components/Modal';
import { confirmation, sendRequest } from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [caducidad, setCaducidad] = useState('');
  const [precio, setPrecio] = useState('');
  
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');
  const [laboratorio_id, setLaboratorio_id] = useState('');
  const [laboratorios, setLaboratorios] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const NameInput = useRef();
  const close = useRef();
  let method = '';
  let url = '';

  useEffect(() => {
    getMedicamentos(1);
    getLaboratorios();
  }, []);

  const getMedicamentos = async (page) => {
    const res = await sendRequest('GET', '', '/api/medicamentos?page=' + page, '');
    setMedicamentos(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  };

  const getLaboratorios = async () => {
    const res = await sendRequest('GET', '', '/api/laboratorios', '');
    setLaboratorios(res);
  };

  const deleteMedicamento = (id, name) => {
    confirmation(name, '/api/medicamentos/' + id, 'medicamentos');
  };

  const clear = () => {
    setName('');
    setDescripcion('');
    setCaducidad('');
    setPrecio('');
    setLaboratorio_id('1');
  };

  const openModal = (op, n, d, c, p, l, me) => {
    clear();
    setTimeout(() => NameInput.current.focus(), 600);
    setOperation(op);
    setId(me);
    if (op == 1) {
      setTitle('Create medicamento');
    } else {
      setTitle('Update medicamento');
      setName(n);
      setDescripcion(d);
      setCaducidad(c);
      setPrecio(p);
      setLaboratorio_id(l);
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      descripcion,
      caducidad,
      precio,
      laboratorio_id,
    };

    if (operation == 1) {
      method = 'POST';
      url = '/api/medicamentos';
    } else {
      method = 'PUT';
      url = '/api/medicamentos/' + id;
    }

    const res = await sendRequest(method, formData, url, '', true);

    if (method == 'PUT' && res.status === true) {
      close.current.click();
    }
    if (res.status === true) {
      clear();
      getMedicamentos(page);
      setTimeout(() => NameInput.current.focus(), 3000);
    } else {
      console.error('Error al guardar el medicamento:', res.message);
    }
  };

  const goPage = (pa) => {
    setPage(pa);
    getMedicamentos(pa);
  };

  return (
    <div className="container-fluid p-4 bg-light">
      <DivAdd>
        <button
          className="btn btn-primary mb-4"
          data-bs-toggle="modal"
          data-bs-target="#modalMedicamentos"
          onClick={() => openModal(1)}
        >
          <i className="fas fa-plus-circle"></i> Agregar Medicamento
        </button>
      </DivAdd>
      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        <table className="table table-striped table-hover border rounded">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>DESCRIPCIÓN</th>
              <th>CADUCIDAD</th>
              <th>PRECIO</th>
              <th>LABORATORIO</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((row, i) => (
              <tr key={row.id} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{row.name}</td>
                <td>{row.descripcion}</td>
                <td>{row.caducidad}</td>
                <td>{row.precio}</td>
                <td>{row.laboratorio}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalMedicamentos"
                    onClick={() =>
                      openModal(
                        2,
                        row.name,
                        row.descripcion,
                        row.caducidad,
                        row.precio,
                        row.laboratorio_id,
                        row.id
                      )
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMedicamento(row.id, row.name)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControl
          changePage={(page) => goPage(page)}
          next={true}
          limit={pageSize}
          page={page}
          total={rows}
        />
      </DivTable>
      <Modal title={title} modal="modalMedicamentos">
        <div className="modal-body">
          <form onSubmit={save}>
            <DivInput
              type="text"
              icon="fas fa-font"
              value={name}
              className="form-control mb-3"
              placeholder="Nombre"
              required
              ref={NameInput}
              handleChange={(e) => setName(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fas fa-info-circle"
              value={descripcion}
              className="form-control mb-3"
              placeholder="Descripción"
              required
              handleChange={(e) => setDescripcion(e.target.value)}
            />
            <DivInput
              type="date"
              icon="fas fa-calendar-alt"
              value={caducidad}
              className="form-control mb-3"
              placeholder="Caducidad"
              required
              handleChange={(e) => setCaducidad(e.target.value)}
            />
            <DivInput
              type="number"
              icon="fas fa-dollar-sign"
              value={precio}
              className="form-control mb-3"
              placeholder="Precio"
              required
              handleChange={(e) => setPrecio(e.target.value)}
            />
            <DivSelect
              icon="fas fa-warehouse"
              required
              value={laboratorio_id}
              className="form-select mb-3"
              options={laboratorios}
              handleChange={(e) => setLaboratorio_id(e.target.value)}
            />
            <div className="d-grid">
              <button className="btn btn-success">
                <i className="fas fa-save"></i> Guardar
              </button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Medicamentos;
