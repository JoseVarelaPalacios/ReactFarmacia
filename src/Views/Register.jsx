import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../functions';
import DivInput from '../Components/DivInput';

const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const go = useNavigate();
  const csrf = async()=>{
    await axios.get('/sanctum/csrf-cookie');
  }
  const register = async(e) =>{
    e.preventDefault();
    await csrf();
    const form = {name:name,email:email,password:password};
    const res = await sendRequest('POST',form,'/api/auth/register','',false);
    if (res.status == true) {
      go('/login');
    }
  }
  return (
    <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 col-lg-4 mx-auto">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary text-white text-center fw-bold fs-4 py-3">
              REGISTER
            </div>
            <div className="card-body p-5">
              <form onSubmit={register}>
                <div className="mb-4">
                  <DivInput
                    type="text"
                    icon="fa-user"
                    value={name}
                    className="form-control"
                    placeholder="Name"
                    required="required"
                    handleChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <DivInput
                    type="email"
                    icon="fa-at"
                    value={email}
                    className="form-control"
                    placeholder="Email"
                    required="required"
                    handleChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <DivInput
                    type="password"
                    icon="fa-key"
                    value={password}
                    className="form-control"
                    placeholder="Password"
                    required="required"
                    handleChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid mb-3">
                  <button className="btn btn-primary btn-lg">
                    <i className="fa-solid fa-door-open"></i> Register
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

export default Register