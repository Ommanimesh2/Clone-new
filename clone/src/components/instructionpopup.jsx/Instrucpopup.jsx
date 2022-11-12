import React from 'react'
import './instructpopup.css'
import { useContext } from 'react';
import dataContext from '../../datacontext';
import { VscChromeClose } from "react-icons/vsc";
const Instrucpopup = () => {
    const {instructpop, setInstructpop}= useContext(dataContext)
  return (
      <div className="modal">
    <div className="overlay"></div>
    
    <div className="modal-inner">
        HELLO world
        <VscChromeClose style={{height:"24px",width:"24px"}} onClick={()=>setInstructpop(false)}/>
        </div>
    </div>
    
  )
}

export default Instrucpopup
