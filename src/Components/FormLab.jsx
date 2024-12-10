import React, {useEffect,useState,useRef} from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormLab = (params) => {
    const [laboratorio,setName]= useState('');
    const NameInput = useRef();
    let method= 'POST';
    let url = '/api/laboratorios';
    let redirect='';
    useEffect(() => {
        NameInput.current.focus();
        getLaboratorio();
    },[]);
    const getLaboratorio = async() =>{
        if (params.id !== null) {
            const res = await sendRequest('GET','',(url+'/'+params.id));
            setName(res.data.laboratorio);
        }
    }
    const save = async(e) =>{
        e.preventDefault();
        if (params.id !== null) {
            method='PUT';
            url = '/api/laboratorios/'+params.id;
            redirect = '/';
        }
        const res = await sendRequest(method,{laboratorio:laboratorio},url,redirect);
        if (method == 'POST' && res.status == true) {
            setName('');
        }
    }
    return (
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100">
                <div className="col-md-4 mx-auto">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white text-center fw-bold fs-5 py-3">
                            {params.title}
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={save}>
                                <DivInput 
                                    type="text" 
                                    icon="fa-building"
                                    value={laboratorio} 
                                    className="form-control mb-3" 
                                    placeholder="Name" 
                                    required="required" 
                                    ref={NameInput} 
                                    handleChange={(e) => setName(e.target.value)} 
                                />
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-lg">
                                        <i className="fa-solid fa-save"></i> Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default FormLab