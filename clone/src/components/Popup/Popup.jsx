import React from 'react'
import "./popup.css"
import { useContext } from 'react';
import dataContext from '../../datacontext';
import { VscChromeClose } from "react-icons/vsc";
const Popup = () => {
    const {pop,setPop,param,specDetails}=useContext(dataContext)
     return (

    <div className="modal">
    <div className="overlay"></div>
    
    <div className="modal-inner">
             <div className="topbar">
                 <div style={{fontSize:"24px",fontWeight:"normal"}}>Details</div>
                 <VscChromeClose style={{height:"24px",width:"24px"}} onClick={()=>setPop(false)}/></div>
             <div className="main">
              <div className="left">
                <div className="farmer-img">
                    <img src={JSON.parse(specDetails.farmer_photo).download_uri_ ? JSON.parse(specDetails.farmer_photo).download_uri_ :""} alt="" />
                </div>
                <div className="detail-container">
                <div className="detail">
                   <div className="option">Khasra Number</div>
                   <div className="answer">{param ? param:"Nil"}</div>
               </div>
                <div className="detail">
                   <div className="option">Aadhar Number</div>
                   <div className="answer">{specDetails.adhar_number_ ?specDetails.adhar_number_:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Crop cover in Ground </div>
                   <div className="answer">{specDetails.crop_cover_in_ground_percentage ?specDetails.crop_cover_in_ground_percentage:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Crop growth stage</div>
                   <div className="answer">{specDetails.crop_growth_stage ?specDetails.crop_growth_stage:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Crop health</div>
                   <div className="answer">{specDetails.crop_health_condition ?specDetails.crop_health_condition:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">District</div>
                   <div className="answer">{specDetails.district_ ?specDetails.district_:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Mobile Number</div>
                   <div className="answer">{specDetails.mobile_number_ ?specDetails.mobile_number_:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Name</div>
                   <div className="answer">{specDetails.name_ ?specDetails.name_:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Size of field</div>
                   <div className="answer">{specDetails.size_of_field ?specDetails.size_of_field:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Soil</div>
                   <div className="answer">{specDetails.soil_condition_ ?specDetails.soil_condition_:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">State</div>
                   <div className="answer">{specDetails.state ?specDetails.state:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Type of crop</div>
                   <div className="answer">{specDetails.types_of_crops ?specDetails.types_of_crops:"Nil"}</div>
               </div>
               <div className="detail">
                   <div className="option">Village</div>
                   <div className="answer">{specDetails.village_ ?specDetails.village_:"Nil"}</div>
               </div>
                </div>
              </div>
              <div className="right">
                 <img src={JSON.parse(specDetails.all_crop_images).list_download_uri[0]} alt="" srcset="" />

                
              </div>
             </div>
             </div>



             </div>
   //<div className="modal">
   //    <div className="topbar">
    //              <div style={{fontSize:"24px",fontWeight:"normal"}}>Details</div>
    //              <VscChromeClose style={{height:"24px",width:"24px"}} onClick={()=>setPop(false)}/></div>
    //          <div className="main">
    //           <div className="left">
    //             
    //           </div>
    //           <div className="right">
    //             <div className="image">
    //             </div>
    //           </div>
    //          </div>
    //          </div>



    //          </div>
             
  )
}

export default Popup
