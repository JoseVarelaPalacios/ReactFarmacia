import React from 'react';
import { useParams } from 'react-router-dom';
import FormCli from '../../Components/FormCli';

const Edit = () => {
  const {id} = useParams();

  return (
    <FormCli id= {id} title='Edit Cliente'></FormCli>
  )
}

export default Edit