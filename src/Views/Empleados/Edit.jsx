import React from 'react';
import { useParams } from 'react-router-dom';
import FormEmp from '../../Components/FormEmp';

const Edit = () => {
  const {id} = useParams();

  return (
    <FormEmp id= {id} title='Edit Empleado'></FormEmp>
  )
}

export default Edit