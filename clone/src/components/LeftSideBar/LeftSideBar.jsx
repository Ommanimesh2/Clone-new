import React, { useContext } from 'react'
import dataContext from '../../datacontext'
import './leftsidebar.css'
import Hamburger from './Hamburger'
import { useState } from 'react'
import { VscMenu } from "react-icons/vsc";
import { VscChevronLeft } from "react-icons/vsc";
import img from './logo1.svg'
import image from './copyright.svg'
import Popup from '../Popup/Popup'
const LeftSideBar = () => {

  const [sideopen, setSideopen] = useState(false);
  const [data, setData] = useState([])
  const { ndvi, setNdvi, setSatellite, leftDet, dates, setDates, param, setStart, start, end, setEnd, pop, setPop, setSpecDetails, specDetails } = useContext(dataContext)
  
  const openPopup = () => {
    console.log(specDetails)
    console.log(specDetails.Crop_Name);
    if (specDetails.Crop_Name != undefined) {

      setPop(true);
    } else {
      alert("Please select the required fields")
    }

  }
  const sidemenu = () => {
    setSideopen(!sideopen);
  }
 

  const Check = () => {
    if (leftDet) {
      if (leftDet.Area) {
        return leftDet.Area
      }
      else {
        return "Not Available"
      }
    }
    else {
      return "Not Available"
    }
  }
  return (
    <>
      {sideopen ? <>

        <div className="logo-container">
          <img src={img} alt="" className='logo' />
          <div className="out-icon"><VscChevronLeft className='icon-left' onClick={sidemenu} /></div>
        </div>
        <div className="hams" style={{ transition: '1s width', position: 'absolute' }}>

          <Hamburger />
        </div>
      </> :

        <div className="container">

          <div className="icon-container"><VscMenu onClick={sidemenu} className='icon' />

          </div>
          <div className="infocontainer">
            < div className="areaField">
              <div className="infos">
                <div className="field">
                  <div className="title">Area</div>
                  <div className="value">{
                    (leftDet.Area ? leftDet.Area :
                      (
                        leftDet.id && !leftDet.Area ? "Not Available" : "Not Selected"
                      )
                    )

                  }</div>
                </div>
                <div className="field">
                  <div className="title">Id</div>
                  <div className="value">{leftDet.id ? leftDet.id : "Not Selected"}</div>
                </div>

              </div>
            </div>

            <div className="moreinfo">
              <div className="moredetails">
                {/* add details */}
              </div>
              <button className="info-btn" onClick={openPopup}>More Info</button>

            </div>
            <div className="updateInfo">

              <select name="Satellite-select" onChange={(e)=>{setSatellite(e.target.value)}} className='Satellite-select' id="dropdown" placeholder='Select Satellite'>
                <option className='select-options1' value="" disabled selected hidden>Select Your Option </option>
                <option className='select-options' value="SENTINEL-2">SENTINEL-2</option>
                <option className='select-options' value="MODIS">MODIS</option>
              </select>
             
              Start Date
              <input type="date" className='dateinput'  onChange={(e) => {
                setStart(e.target.value)
              }} name="startdate" id="" />
              End Date
              <input type="date" className='dateinput' onChange={(e) => setEnd(e.target.value)} name="enddate" />

            

 <div className="copyright">
  <img src={image} alt="" />
 </div>
            </div>
          </div>
        </div>

      }
    </>
  )
}

export default LeftSideBar