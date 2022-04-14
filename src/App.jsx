import { useState,useEffect } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'

import image1 from './assets/img1.jpg'
import image2 from './assets/img2.jpg'
import image3 from './assets/img3.jpg'
import image4 from './assets/img4.jpg'
import image5 from './assets/img5.jpg'

import './App.css'

function App() {

  const dataCalcs  = {q_k:null,p_k:null,vk:'',cantidad:'',vm:[],gkm:[],bkm:[],tk:[],tm:[],tkm:[]}
  const  [display, setDisplay] = useState(true)
  const [dataHkmNkm,setHkmNkm] = useState({
    hkm:null,
    nkm:null,
  })
  const [data,setData]= useState(dataCalcs)
  const grados=numero=>(numero*Math.PI)/180;
  const setNumbers=(event)=>{

    setData({
      ...data,
      [event.target.name]:(event.target.value)
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
    setData({
      ...data,
      vk:Number(data.vk),
      cantidad:Number(data.cantidad)
    })
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

  const calcularRapshonMatrices=()=>{
    let hkm = (data.vk*data.vm[0])*(
        data.gkm[0]*Math.sin(grados(data.tkm[0]))-data.bkm[0]*Math.cos(grados(data.tkm[0]))
      )
    let nkm =(data.vk*data.vm[0])*(
      data.gkm[0]*Math.cos(grados(data.tkm[0]))+data.bkm[0]*Math.sin(grados(data.tkm[0]))
    )
      setHkmNkm({
        hkm,
        nkm
      })
  }

  return (
    <div className="App">
      <div className='container'>      
      <span>vk</span>
      <input  type="text" value={data.vk} name="vk" onChange={setNumbers}  /><br/>
      <span>Cantidad</span>
      <input  placeholder="cantidad" type="text" value={data.cantidad} name="cantidad" onChange={setNumbers}  /><br/>
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
        Calcular rapshon potencias
      </button>
      <button onClick={calcularRapshonMatrices}>
        Calcular rapshon matrices
      </button>
      <button onClick={()=>setDisplay(display=>!display)}>
        {display?'Ocultar':'carlos'}
      </button>
      {
        data.p_k && (<h4  className='pk'>Pk: {data.p_k}</h4>)
      }
      {
        data.q_k && (<h4 className='qk'>QK : {data.q_k}</h4>)
      }
      {
        dataHkmNkm.hkm &&   (<h4 className='qk'>hkm = lkm : {dataHkmNkm.hkm}</h4>)
      }
      {
        dataHkmNkm.nkm &&  (<h4 className='pk'>nkm = -jkm : {dataHkmNkm.nkm}</h4>)
      }
      </div>
      <div className="pdf" style={display ? {display:'block'} : {display:'none'} }>
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
        <img src={image5} alt="" />
      </div>
      
    </div>
  )
}
export default App;
