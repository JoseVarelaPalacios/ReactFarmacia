import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Laboratorios from './Views/Laboratorios/Index';
import CreateLaboratorio from './Views/Laboratorios/Create';
import EditLaboratorio from './Views/Laboratorios/Edit';
import Medicamentos from './Views/Medicamentos/Index';
import Graphic1 from './Views/Medicamentos/Graphic1';
import Graphic2 from './Views/Ventas/Graphic2';
import Login from './Views/Login';
import Register from './Views/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Clientes from './Views/Clientes/Index';
import CreateCliente from './Views/Clientes/Create';  // Importa tu componente de creación de cliente
import EditCliente from './Views/Clientes/Edit';  // Importa el componente para editar cliente
import Empleados from './Views/Empleados/Index';
import CreateEmpleado from './Views/Empleados/Create';  // Importa tu componente de creación de cliente
import EditEmpleado from './Views/Empleados/Edit';  // Importa 
import Ventas from './Views/Ventas/Index';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Laboratorios />} />
          <Route path="/create" element={<CreateLaboratorio />} />
          <Route path="/edit/:id" element={<EditLaboratorio />} />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/create" element={<CreateCliente />} />  {/* Ruta para crear cliente */}
          <Route path="/clientes/edit/:id" element={<EditCliente />} />  {/* Ruta para editar cliente */}
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/empleados/create" element={<CreateEmpleado />} />  {/* Ruta para crear cliente */}
          <Route path="/empleados/edit/:id" element={<EditEmpleado />} />  {/* Ruta para editar cliente */}
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/graphic1" element={<Graphic1 />} />
          <Route path="/graphic2" element={<Graphic2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
