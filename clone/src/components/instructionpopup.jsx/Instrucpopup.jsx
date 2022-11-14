import React from 'react'
import './instructpopup.css'
import { useContext } from 'react';
import dataContext from '../../datacontext';
import { VscChromeClose } from "react-icons/vsc";
import popimage from '../../Assets/Frame.png'
import previmg from '../../Assets/Button.png'
import nextimg from '../../Assets/nextbtn.png'
import { useState } from 'react';
const Instrucpopup = () => {
    const {instructpop, setInstructpop}= useContext(dataContext)
    const{welcome, setWelcome}=useContext(dataContext);

const nextstart=()=>{
setWelcome(false);
}
  return (
      <div className="modalinstruct">
    <div className="overlayinstruct"></div>
    
    <div className="modal-innerinstruct">
     {welcome ?
     <div className="poptop">
     <div className="top-heading">
      <h1>  WELCOME TO BHOOMICAM</h1>
     </div>
     <div className="iconpop"> <VscChromeClose onClick={()=>setInstructpop(false)} className='iconclose'/></div>
        </div>
     : 
     <div className="poptop">
       <div className="top-heading">
        <h1>  Getting Started</h1>
       </div>
       <div className="iconpop"> <VscChromeClose onClick={()=>setInstructpop(false)} className='iconclose'/></div>
        </div>
       
       }
      

       
        {welcome ?
        <>
      <div className="frame-img"> <img src={popimage} alt="" />  </div> 
      <div className="popup-icon">
      <div className="next-icon"> <img src={previmg} alt="" onClick={nextstart}/></div>
      </div>
      </>
      : 
      <>
      <div className="instructions-container">
        <div className="instructions">

            <ol>
              <li>The website offers many features such as crop health analysis using various vegetation indexes, farm-specific real-time information, temperature and precipitation variation throughout the years.</li>
              <li>Use the map to select the field you want to view the details for.</li>
              <li>Various details about the crop field can be found in our extensive database like the name of the owner, crop type, contact, a sample image of the crop field, and the farmer, available to you via the ‘More Info’ button</li>
              <li>As of now, we offer 2 types of time-series analysis i.e. seasonal and time range based. </li>
              <li>If you are interested in understanding the crop health variation, you can select your preferred season from the dropdown and select the year you want to see. </li>
              <li>After that, you would need to select the satellite from which you want to analyze the data, i.e.
Sentinel 2 or MODiS. </li>
              <li>Selecting NDVI from the index dropdown would show you the crop health variations precisely. we also offer the data of indexes like EVI, GNDVI, NDRE, etc for in-depth analysis. Press the ‘Plot’ button to view the graph.</li>
              <li>The crop health analysis is done not only using satellite data but also using the real-time information we get from the farmers making our data both reliable and accurate.</li>
            </ol>
          
        </div>
      </div>
      
      <div className="popup-iconstarted">
 
       <img src={nextimg} alt="" onClick={nextstart}/>
       </div>
      </>
      }
  <div className="tagline">sowing the seeds for near future</div>
          </div>
          </div>
  
    </div>
    
  )
}

export default Instrucpopup
