import { useState,useEffect } from 'react'
import logo from './logo.svg'

import './App.css'

function App() {

  const dataCalcs  = {q_k:null,p_k:null,vk:'',cantidad:'',vm:[],gkm:[],bkm:[],tk:[],tm:[],tkm:[]}
  const [data,setData]= useState(dataCalcs)
  const grados=numero=>(numero*Math.PI)/180;
  const setNumbers=(event)=>{
    setData({
      ...data,
      [event.target.name]:Number(event.target.value)
    })
  }
  const setList=(event)=>{
      setData(d=>({...d,[event.target.name]:event.target.value.split(',')}))
  }
  useEffect(()=>{
    if(data.tk.length==data.cantidad && data.tm.length==data.cantidad && data.tm.at(-1)!=='' && data.tk.at(-1)!==''){
      const _tk = data.tk.map((t,i)=>t-data.tm[i])
      setData(d=>({...d,tkm:_tk}))
    }
    else{
      setData(d=>({...d,tkm:[]}))
    }
  },[data.tk,data.tm])

  const calcular=()=>{
    let  primeraSuma = 0;
    let  segundaSuma = 0;
    const {bkm,cantidad,gkm,tk,tkm,tm,vk,vm} = data;
    for(let i=0;i<cantidad;i++){

      primeraSuma= primeraSuma + vm[i]*(
        gkm[i]*Math.cos(grados(tkm[i]))+ bkm[i]*Math.sin(grados(tkm[i]))
      )
      segundaSuma = segundaSuma + vm[i]*(
        gkm[i]*Math.sin(grados(tkm[i]))- bkm[i]*Math.cos(grados(tkm[i]))
      )
    } 
    const p_k = data.vk*(primeraSuma);
    const  q_k =data.vk*(segundaSuma);
    setData({
      ...data,
      p_k,
      q_k
    })
  }

  return (
    <div className="App">
      <div className='container'>      
      <span>vk</span>
      <input  placeholder="vk"value={data.vk} name="vk" onChange={setNumbers} type="number" /><br/>
      <span>Cantidad</span>
      <input  placeholder="cantidad"value={data.cantidad} name="cantidad" onChange={setNumbers} type="number" /><br/>
      <span>vm</span>
      <input type="text" name="vm" value={data.vm.join()}  onChange={setList} /><br/>
      <span>gkm</span>
      <input type="text" name="gkm" value={data.gkm.join()}  onChange={setList} /><br/>
      <span>bkm</span>
      <input type="text" name="bkm" value={data.bkm.join()}  onChange={setList} /><br/>
      <span>tk</span>
      <input type="text" name="tk" value={data.tk.join()}  onChange={setList} /><br/>
      <span>tm</span>
      <input type="text" name="tm" value={data.tm.join()}  onChange={setList} /><br/>
      <span>tkm</span>
      <input type="text" name="tkm" value={data.tkm.join()}disabled /><br/>
      <button onClick={calcular}>
        Calcular
      </button>
      {
        data.p_k && (<h4>Pk: {data.p_k}</h4>)
      }
      {
        data.q_k && (<h4>QK : {data.q_k}</h4>)
      }
      </div>
    </div>
  )
}

export default App;
