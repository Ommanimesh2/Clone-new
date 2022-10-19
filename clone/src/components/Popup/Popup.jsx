import React from 'react'
import "./popup.css"
import { useContext } from 'react';
import dataContext from '../../datacontext';
import { VscChromeClose } from "react-icons/vsc";
const Popup = () => {
    const {pop,setPop,specDetails}=useContext(dataContext)
    console.log(specDetails);
  return (
    <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              Details
              <VscChromeClose style={{height:"50px",width:"50px",position:"relative",top:"2vh",left:"150vh"}} onClick={()=>setPop(false)}/>
              <div className="grid-container">
                <div className="grid-items">
                    <div className="head">Id</div>
                    <div className="val">{specDetails.id}</div>
                </div>
                <div className="grid-items">
                    <div className="head">Crop Name</div>
                    <div className="val">{specDetails.Crop_Name}</div>
                </div>
                <div className="grid-items">
                    <div className="head">Seed Type</div>
                    <div className="val">{specDetails.Seed_Type}</div>
                    
                </div>
                <div className="grid-items">
                    <div className="head">Season</div>
                    <div className="val">{specDetails.Season}</div>
                    
                </div>
                <div className="grid-items">
                    <div className="head">Sowing Date</div>
                    <div className="val">{specDetails.Sowing_Date}</div>
                    
                </div>
                <div className="grid-items">
                    <div className="head">Harvesting Date</div>
                    <div className="val">{specDetails.Harvesting_Date}</div>
                    
                </div>
                <div className="grid-items">
                    <div className="head">Farmer Name</div>
                    <div className="val">{specDetails.Farmer_Name}</div>
                    
                </div>
                <div className="grid-items">
                    <div className="head">Crop Type</div>
                    <div className="val">{specDetails.Crop_Type}</div>
                    
                </div>
              </div>
            </div>

    
             </div>
  )
}

export default Popup