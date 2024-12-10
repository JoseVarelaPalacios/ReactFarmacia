import {useEffect, useState} from 'react';
import { sendRequest } from '../../functions';
import {Pie, Bar, getDatasetAtEvent} from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement, Tooltip,
  Legend,CategoryScale,LinearScale,BarElement,
  Title} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,BarElement, Title);

const Graphic2 = () => {
  const [info,setInfo]= useState([]);
  const [colors,setColors]=useState([]);
  let charOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true, 
        text: 'Cantidad de Ventas por Cliente', 
        font: {
          size: 20, 
          weight: 'bold', 
        },
        color: '#333', 
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  };

  useEffect(()=>{
    getData();
  },[]);
  const random = () =>{
    return Math.floor(Math.random()*256);

  }
  const getData = async() =>{
    const res = await sendRequest('GET','','/api/ventasbycliente','');
    setInfo(res);
    res.map(()=>(
      colors.push("rgb("+random()+","+random()+","+random()+")")
    ));
  }
  const charData = {
    labels: info.map(c => c.nombre),
    datasets:[{label:'Ventas',data:info.map( c => c.count),
      backgroundColor: colors}],
  }

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
      <div className='col-md-6 offset-md-3'>
        <Bar options={charOptions} data={charData} />
      </div>
      </div>
    </div>
  )
}

export default Graphic2