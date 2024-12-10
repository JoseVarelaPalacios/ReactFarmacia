import React from 'react';
import { useParams } from 'react-router-dom';
import FormLab from '../../Components/FormLab';

const Edit = () => {
  const {id} = useParams();

  return (
    <FormLab id= {id} title='Edit Laboratorio'></FormLab>
  )
}

export default Edit