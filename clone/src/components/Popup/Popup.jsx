import React from 'react'
import "./popup.css"
import { useContext } from 'react';
import dataContext from '../../datacontext';
import { VscChromeClose } from "react-icons/vsc";
const Popup = () => {
    const {pop,setPop,specDetails}=useContext(dataContext)
    // console.log(specDetails);
  return (
    <div className="modal">
    <div className="overlay"></div>
    
    <div className="modal-inner">
            {/* <div className="overlay"></div>
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
            </div> */}
             <div className="topbar">
                 <div style={{fontSize:"24px",fontWeight:"normal"}}>Details</div>
                 <VscChromeClose style={{height:"24px",width:"24px"}} onClick={()=>setPop(false)}/></div>
             <div className="main">
              <div className="left">
                <div className="detail">
                    <div className="option">Farmer's Name</div>
                    <div className="answer">{specDetails.Farmer_Name}</div>
                </div>
                <div className="detail">
                    <div className="option">Crop Name</div>
                    <div className="answer">{specDetails.Crop_Name}</div>
                </div>
                <div className="detail">
                    <div className="option">Crop Type</div>
                    <div className="answer">{specDetails.Crop_Type}</div>
                </div>
                <div className="detail">
                    <div className="option">Seed Type</div>
                    <div className="answer">{specDetails.Seed_Type}</div>
                </div>
                <div className="detail">
                    <div className="option">Sowing Date</div>
                    <div className="answer">{specDetails.Sowing_Date}</div>
                </div>
                <div className="detail">
                    <div className="option">Harvesting Date</div>
                    <div className="answer">{specDetails.Harvesting_Date}</div>
                </div>
                <div className="detail">
                    <div className="option">Season</div>
                    <div className="answer">{specDetails.Season}</div>
                </div>
              </div>
              <div className="right">
                <div className="image"></div>
              </div>
             </div>
             </div>



             </div>
             
  )
}

export default Popup
