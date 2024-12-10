import React, { useEffect, useState, useRef } from 'react';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import DivSelectV from '../../Components/DivSelectV';
import DivInput from '../../Components/DivInput';
import Modal from '../../Components/Modal';
import { confirmation, sendRequest } from '../../functions';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import DivSelectM from '../../Components/DivSelectM';

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
  const NameInput = useRef();  // Definir la referencia para el input
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

  const getClientes = async () => {
    const res = await sendRequest('GET', '', '/api/clientes', '');
    setClientes(res);
  };

  const getMedicamentos = async () => {
    const res = await sendRequest('GET', '', '/api/medicamentos', '');
    setMedicamentos(res.data);
  };

  const deleteVenta = (id, cliente) => {
    confirmation(cliente, `/api/ventas/${id}`, 'ventas');
  };

  const clear = () => {
    setCliente_Id('');
    setMedicamento_Id('');
    setCantidad('');
  };

  const openModal = (op, c, m, cant, ve) => {
    clear();
    setTimeout(() => {
      if (NameInput.current) {
        NameInput.current.focus();
      }
    }, 600);  // Espera 600ms antes de enfocar el campo
    setOperation(op);
    setId(ve);
    if (op === 1) {
      setTitle('Crear Venta');
    } else {
      setTitle('Actualizar Venta');
      setCliente_Id(c);
      setMedicamento_Id(m);
      setCantidad(cant);
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const formData = {
      cliente_id: cliente_id,
      medicamento_id: medicamento_id,
      cantidad: cantidad,
    };

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
      setTimeout(() => {
        if (NameInput.current) {
          NameInput.current.focus();
        }
      }, 3000);  // Enfoca después de guardar
    } else {
      console.error('Error al guardar la venta:', res.message);
    }
  };

  const goPage = (pa) => {
    setPage(pa);
    getVentas(pa);
  };

  return (
    <div className="container-fluid p-4 bg-light">
      <DivAdd>
        <button
          className="btn btn-primary mb-4"
          data-bs-toggle="modal"
          data-bs-target="#modalVentas"
          onClick={() => openModal(1)}
        >
          <i className="fas fa-plus-circle"></i> Agregar Venta
        </button>
      </DivAdd>
      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        <table className=" table table-striped table-hover border rounded mx-auto">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Medicamento</th>
              <th>Cantidad</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((row, i) => (
              <tr key={row.id} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{row.cliente}</td>
                <td>{row.medicamento}</td>
                <td>{row.cantidad}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modalVentas"
                    onClick={() =>
                      openModal(
                        2,
                        row.cliente_id,
                        row.medicamento_id,
                        row.cantidad,
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
                    onClick={() => deleteVenta(row.id, row.cliente)}
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
      <Modal title={title} modal="modalVentas">
        <div className="modal-body">
          <form onSubmit={save}>
            <DivSelectV
              icon="fas fa-user"
              required
              value={cliente_id}
              className="form-select mb-3"
              options={clientes}
              handleChange={(e) => setCliente_Id(e.target.value)}
            />
            <DivSelectM
              icon="fas fa-pills"
              required
              value={medicamento_id}
              className="form-select mb-3"
              options={medicamentos}
              handleChange={(e) => setMedicamento_Id(e.target.value)}
            />
            <DivInput
              type="number"
              icon="fas fa-cogs"
              value={cantidad}
              className="form-control mb-3"
              placeholder="Cantidad"
              required
              ref={NameInput}  
              handleChange={(e) => setCantidad(e.target.value)}
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

export default Ventas;
