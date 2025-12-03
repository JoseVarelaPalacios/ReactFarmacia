import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd'; // Lo mantenemos por compatibilidad
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
    if (op === 1) {
      setTitle('Registrar Medicamento');
    } else {
      setTitle('Editar Medicamento');
      setName(n);
      setDescripcion(d);
      setCaducidad(c);
      setPrecio(p);
      setLaboratorio_id(l);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const formData = { name, descripcion, caducidad, precio, laboratorio_id };

    if (operation === 1) {
      method = 'POST';
      url = '/api/medicamentos';
    } else {
      method = 'PUT';
      url = '/api/medicamentos/' + id;
    }

    const res = await sendRequest(method, formData, url, '', true);

    if (method === 'PUT' && res.status === true) {
      close.current.click();
    }
    if (res.status === true) {
      clear();
      getMedicamentos(page);
      setTimeout(() => NameInput.current.focus(), 3000);
    }
  };

  const goPage = (pa) => {
    setPage(pa);
    getMedicamentos(pa);
  };

  // 1. LÓGICA DEL SEMÁFORO DE CADUCIDAD
  const getBadgeCaducidad = (dateString) => {
    const today = new Date();
    const expiration = new Date(dateString);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return <span className="badge bg-danger">VENCIDO ({dateString})</span>;
    if (diffDays < 90) return <span className="badge bg-warning text-dark">POR VENCER ({dateString})</span>; // Menos de 3 meses
    return <span className="badge bg-success">{dateString}</span>;
  };

  return (
    <div className="container-fluid p-4 bg-white">
      
      {/* 2. HEADER PROFESIONAL */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-primary fw-bold mb-0">
          <i className="fa-solid fa-pills me-2"></i> Inventario de Medicamentos
        </h2>
        <button
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalMedicamentos"
          onClick={() => openModal(1)}
        >
          <i className="fas fa-plus-circle me-2"></i> Nuevo Medicamento
        </button>
      </div>

      <DivTable col="12" off="0" classLoad={classLoad} classTable={classTable}>
        
        {/* Estado Vacío */}
        {medicamentos.length === 0 && classLoad === 'd-none' && (
             <div className="alert alert-info text-center mt-3">
                <i className="fa-solid fa-box-open me-2"></i> Inventario vacío. Agrega productos.
             </div>
        )}

        {medicamentos.length > 0 && (
          <>
            <table className="table table-striped table-hover border rounded shadow-sm">
              <thead className="table-primary text-center text-uppercase">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Caducidad</th>
                  <th>Precio</th>
                  <th>Laboratorio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {medicamentos.map((row, i) => (
                  <tr key={row.id} className="text-center align-middle">
                    <td>{i + 1 + (page - 1) * pageSize}</td>
                    <td className="fw-bold text-start text-capitalize">{row.name}</td>
                    <td className="text-start small text-muted">{row.descripcion}</td>
                    
                    {/* 3. APLICAMOS EL SEMÁFORO */}
                    <td>{getBadgeCaducidad(row.caducidad)}</td>
                    
                    {/* 4. FORMATO DE MONEDA */}
                    <td className="fw-bold text-success">
                        $ {parseFloat(row.precio).toFixed(2)}
                    </td>
                    
                    <td className="text-secondary">{row.laboratorio}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                            className="btn btn-warning btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#modalMedicamentos"
                            onClick={() => openModal(2, row.name, row.descripcion, row.caducidad, row.precio, row.laboratorio_id, row.id)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteMedicamento(row.id, row.name)}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="d-flex justify-content-center mt-3">
                <PaginationControl
                changePage={(page) => goPage(page)}
                next={true}
                limit={pageSize}
                page={page}
                total={rows}
                />
            </div>
          </>
        )}
      </DivTable>

      {/* MODAL MANTENIDO EXACTAMENTE IGUAL PERO CON TÍTULOS DINÁMICOS */}
      <Modal title={title} modal="modalMedicamentos">
        <div className="modal-body">
          <form onSubmit={save}>
            <DivInput
              type="text"
              icon="fas fa-font"
              value={name}
              className="form-control mb-3"
              placeholder="Nombre Comercial"
              required
              ref={NameInput}
              handleChange={(e) => setName(e.target.value)}
            />
            <DivInput
              type="text"
              icon="fas fa-info-circle"
              value={descripcion}
              className="form-control mb-3"
              placeholder="Sustancia Activa / Descripción"
              required
              handleChange={(e) => setDescripcion(e.target.value)}
            />
            <label className="form-label text-muted small">Fecha de Caducidad</label>
            <DivInput
              type="date"
              icon="fas fa-calendar-alt"
              value={caducidad}
              className="form-control mb-3"
              required
              handleChange={(e) => setCaducidad(e.target.value)}
            />
            <DivInput
              type="number"
              icon="fas fa-dollar-sign"
              value={precio}
              className="form-control mb-3"
              placeholder="Precio de Venta"
              step="0.01" // Permite decimales
              required
              handleChange={(e) => setPrecio(e.target.value)}
            />
            <label className="form-label text-muted small">Laboratorio</label>
            <DivSelect
              icon="fas fa-flask"
              required
              value={laboratorio_id}
              className="form-select mb-3"
              options={laboratorios}
              handleChange={(e) => setLaboratorio_id(e.target.value)}
            />
            <div className="d-grid mt-4">
              <button className="btn btn-success">
                <i className="fas fa-save me-2"></i> Guardar Medicamento
              </button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal" ref={close}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Medicamentos;