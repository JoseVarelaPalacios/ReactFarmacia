import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd'; 
import DivTable from '../../Components/DivTable';
import DivSelectV from '../../Components/DivSelectV'; 
import DivSelectM from '../../Components/DivSelectM'; 
import DivInput from '../../Components/DivInput';
import Modal from '../../Components/Modal';
import { confirmation, sendRequest } from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [id, setId] = useState('');
  const [cliente_id, setCliente_Id] = useState('');
  const [medicamento_id, setMedicamento_Id] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');
  const [clientes, setClientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('d-none');
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  
  const close = useRef();
  const NameInput = useRef(); 
  let method = '';
  let url = '';

  useEffect(() => {
    getVentas(1);
    getClientes();
    getMedicamentos();
  }, []);

  const getVentas = async (page) => {
    const res = await sendRequest('GET', '', `/api/ventas?page=${page}`, '');
    setVentas(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable('');
    setClassLoad('d-none');
  };

  // --- CORRECCIÓN AQUÍ: Agregamos la opción "Seleccione" al principio ---
  const getClientes = async () => {
    const res = await sendRequest('GET', '', '/api/clientes', '');
    // Creamos un cliente "falso" que sirva de placeholder
    const placeholder = [{ id: '', nombre: '-- Seleccione Cliente --', apellidos: '' }];
    // Lo unimos con la lista real
    setClientes([...placeholder, ...res]);
  };

  // --- CORRECCIÓN AQUÍ: Lo mismo para Medicamentos ---
  const getMedicamentos = async () => {
    try {
      let allMedicamentos = [];
      let page = 1;
      let totalPages = 1;
      do {
        const res = await sendRequest('GET', '', `/api/medicamentos?page=${page}`, ''); 
        allMedicamentos = [...allMedicamentos, ...res.data];
        totalPages = res.last_page || Math.ceil(res.total / res.per_page);
        page++;
      } while (page <= totalPages);
      
      // Agregamos el placeholder al principio
      const placeholder = [{ id: '', name: '-- Seleccione Medicamento --' }];
      setMedicamentos([...placeholder, ...allMedicamentos]);
      
    } catch (error) {
      console.error('Error al obtener los medicamentos:', error);
    }
  };

  const deleteVenta = (id, cliente) => {
    confirmation(`la venta de ${cliente}`, `/api/ventas/${id}`, 'ventas');
  };

  const clear = () => {
    setCliente_Id('');
    setMedicamento_Id('');
    setCantidad('');
  };

  const openModal = (op, c, m, cant, ve) => {
    clear();
    setTimeout(() => {
      if (NameInput.current) NameInput.current.focus();
    }, 600);
    setOperation(op);
    setId(ve);
    if (op === 1) {
      setTitle('Registrar Nueva Venta');
    } else {
      setTitle('Editar Venta Existente');
      setCliente_Id(c);
      setMedicamento_Id(m);
      setCantidad(cant);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    
    // VALIDACIÓN EXTRA: Asegurarnos de que no envíen el ID vacío
    if(!cliente_id || !medicamento_id) {
        // Puedes usar una alerta más bonita si tienes SweetAlert
        alert("Por favor selecciona un Cliente y un Medicamento");
        return; 
    }

    const formData = { cliente_id, medicamento_id, cantidad };

    if (operation === 1) {
      method = 'POST';
      url = '/api/ventas';
    } else {
      method = 'PUT';
      url = `/api/ventas/${id}`;
    }

    const res = await sendRequest(method, formData, url, '', true);

    if (method === 'PUT' && res.status === true) {
      close.current.click();
    }
    if (res.status === true) {
      clear();
      getVentas(page);
    }
  };

  const goPage = (pa) => {
    setPage(pa);
    getVentas(pa);
  };

  return (
    <div className="container-fluid p-4 bg-white">
      
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-primary fw-bold mb-0">
          <i className="fa-solid fa-cash-register me-2"></i> Registro de Ventas
        </h2>
        <button
          className="btn btn-primary rounded-pill px-4 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalVentas"
          onClick={() => openModal(1)}
        >
          <i className="fas fa-cart-plus me-2"></i> Registrar Venta
        </button>
      </div>

      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        
        {ventas.length === 0 && classLoad === 'd-none' && (
            <div className="alert alert-info text-center mt-3">
                <i className="fa-solid fa-receipt me-2"></i> No hay ventas registradas hoy.
            </div>
        )}

        {ventas.length > 0 && (
          <>
            <table className="table table-striped table-hover border rounded shadow-sm">
              <thead className="table-primary text-center text-uppercase">
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Medicamento</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {ventas.map((row, i) => (
                  <tr key={row.id} className="text-center align-middle">
                    <td>{i + 1 + (page - 1) * pageSize}</td>
                    <td className="text-capitalize fw-semibold">{row.cliente}</td>
                    <td className="text-capitalize text-primary">{row.medicamento}</td>
                    <td>
                        <span className="badge bg-secondary fs-6">{row.cantidad}</span>
                    </td>
                    <td>
                        <div className="btn-group" role="group">
                            <button
                                className="btn btn-warning btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#modalVentas"
                                onClick={() => openModal(2, row.cliente_id, row.medicamento_id, row.cantidad, row.id)}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteVenta(row.id, row.cliente)}
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

      <Modal title={title} modal="modalVentas">
        <div className="modal-body">
          <form onSubmit={save}>
            <label className="form-label text-muted small">Seleccionar Cliente</label>
            <DivSelectV
              icon="fas fa-user"
              required
              value={cliente_id}
              className="form-select mb-3"
              options={clientes}
              handleChange={(e) => setCliente_Id(e.target.value)}
            />
            
            <label className="form-label text-muted small">Seleccionar Medicamento</label>
            <DivSelectM
              icon="fas fa-pills"
              required
              value={medicamento_id}
              className="form-select mb-3"
              options={medicamentos}
              handleChange={(e) => setMedicamento_Id(e.target.value)}
            />
            
            <label className="form-label text-muted small">Cantidad a vender</label>
            <DivInput
              type="number"
              icon="fas fa-sort-numeric-up"
              value={cantidad}
              className="form-control mb-3"
              placeholder="Cantidad"
              required
              min="1"
              ref={NameInput}  
              handleChange={(e) => setCantidad(e.target.value)}
            />
            
            <div className="d-grid mt-4">
              <button className="btn btn-success">
                <i className="fas fa-cash-register me-2"></i> Cobrar / Guardar
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

export default Ventas;