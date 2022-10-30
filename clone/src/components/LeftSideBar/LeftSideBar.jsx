import React, { useContext } from 'react'
import dataContext from '../../datacontext'
import './leftsidebar.css'
import Hamburger from './Hamburger'
import { useState } from 'react'
import { VscMenu } from "react-icons/vsc";
import { VscChevronLeft } from "react-icons/vsc";
import img from './logo1.svg'
import image from './copyright.svg'
import data from '../../roorData'
import Popup from '../Popup/Popup'
import { useEffect } from 'react'
const LeftSideBar = () => {

  const [sideopen, setSideopen] = useState(false);
  const [showOnlyYearSelector, setShowOnlyYearSelector] = useState(false)
  const { cropHighlight, setCropHighlight, seasonHighlight, setSeasonHighlight, allFarmerDetails, season, setSeason, crop, setCrop, ndvi, setAddressQuery, addressQuery, setAddress, setNdvi, setSatellite, leftDet, dates, setDates, param, setParam, setStart, start, end, setEnd, pop, setPop, setSpecDetails, specDetails } = useContext(dataContext)

  const geocoderData = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${addressQuery}&apiKey=DBqoNTB1sP3HLJ9T5QDJgbPIv8lZA_0W1cG-Je0wJqo`)
      const resp = await data.json()
      setAddress(resp)
      console.log('do validate')
    }
  }
  const specificDetails = async () => {
    if(param!=-1){
    const spData = await fetch(`https://new-ndvi-default-rtdb.firebaseio.com/${param}.json`)
    const response = await spData.json()
    setSpecDetails(response)
  }
}
 const openPopup = () => {
    console.log(specDetails)
    console.log(specDetails.Crop_Name);
    if (param != -1) {
      setPop(true);
      setParam(-1)
    } 
    
    else {
      alert("Please select the required fields")
    }

  }
  
  const sidemenu = () => {
    setSideopen(!sideopen);
  }
  const handleCropSelection = (e) => {
    const query = e.target.value
    var arr = []
    for (let i = 0; i < allFarmerDetails.length; i++) {
      if (allFarmerDetails[i].Crop_Name === query) {
        arr.push(allFarmerDetails[i].id)

      }
    }
    var settingArr = []
    for (let i = 0; i < data.features.length; i++) {
      for (let j = 0; j < arr.length; j++) {

        if (data.features[i].properties.id === arr[j]) {
          settingArr.push(data.features[i])
        }
      }
    }
    console.log(settingArr)
    var settingArrNew = [{ type: "FeatureCollection", features: settingArr }]
    console.log(settingArrNew[0])
    setCropHighlight(settingArrNew[0])


  }

  const handleSingleDateSelection=(e)=>{
    if(season==='Rabi'){
      setStart(`${e.target.value}-10-01`)
      setEnd(`${e.target.value}-01-30`)
      console.log("iss bar chala rabi")
    }
    else if(season==='Kharif'){
      setEnd(`${e.target.value}-09-31`)
      setStart(`${e.target.value}-06-01`)
      console.log("iss bar chala kharif")
      
    }
    else{
      setStart(`${e.target.value}-02-01`)
      setEnd(`${e.target.value}-05-30`)
    }
  }
  const handleSeasonSelection = (e) => {
    const query = e.target.value
    setSeason(query)
    var arr = []
    
    for (let i = 0; i < allFarmerDetails.length; i++) {
       if (allFarmerDetails[i].Season === query) {
        arr.push(allFarmerDetails[i].id)

       }
    }
    var settingArr = []
    for (let i = 0; i < data.features.length; i++) {
      for (let j = 0; j < arr.length; j++) {

         if (data.features[i].properties.id === arr[j]) {
          settingArr.push(data.features[i])
         }
      }
    }
    var settingArrNew = [{ type: "FeatureCollection", features: settingArr }]
    setSeasonHighlight(settingArrNew[0])

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
             </div>
    

                  <input className='location-select' type="text" placeholder='Type your Location' onKeyDown={(e) => {
                    setAddressQuery(e.target.value)
                    geocoderData(e)
                  }} />

            <div className="moreinfo">

              <button className="info-btn" onClick={()=>{
                specificDetails()
                openPopup()
                }}>More Info</button>

            </div>
            <div className="updateInfo">
            <select name="Season-select" onChange={(e) => { 
                handleSeasonSelection(e) 
              
                setShowOnlyYearSelector(true)
                }} className='Satellite-select' id="dropdown" placeholder='Select Satellite'>
                <option className='select-options1' value="" disabled selected hidden>Select Season</option>

                
                <option className='select-options' value="Rabi">Rabi</option>
                <option className='select-options' value="Kharif">Kharif</option>
                <option className='select-options' value="Zaid">Zaid</option>
              </select>
              <select name="Satellite-select" onChange={(e) => { setSatellite(e.target.value) }} className='Satellite-select' id="dropdown" placeholder='Select Satellite'>
                <option className='select-options1' value="" disabled selected hidden>Select Satellite </option>
                <option className='select-options' value="SENTINEL-2">SENTINEL-2</option>
                <option className='select-options' value="MODIS">MODIS</option>
              </select>
              <select name="Crop-select" onChange={(e) => { handleCropSelection(e) }} className='Satellite-select' id="dropdown" placeholder='Select Satellite'>
                <option className='select-options1' value="" disabled selected hidden>Select Crop</option>
                {season==="Rabi"&&<option className='select-options' value="linseed">linseed</option>}
                {season==="Rabi"&&<option className='select-options' value="pulses">pulses</option>}
                {season==="Rabi"&&<option className='select-options' value="corn">corn</option>}
                {season==="Kharif"&&<option className='select-options' value="pulses">pulses</option>}
                {season==="Rabi"&&<option className='select-options' value="wheat">wheat</option>}
                {season==="Kharif"&&<option className='select-options' value="rice">rice</option>}
                {season==="Kharif"&&<option className='select-options' value="maize">maize</option>}
                {season==="Kharif"&&<option className='select-options' value="soybean">soybean</option>}
                {season==="Kharif"&&<option className='select-options' value="ragi">ragi</option>}
                {season==="Zaid"&& <option className='select-options' value="tomatoes">tomatoes</option>}
                {season==="Zaid"&& <option className='select-options' value="melon">melon</option>}
              </select>
              
{!showOnlyYearSelector ?
                  <>
                Start Date
                  <input type="date" className='dateinput' onChange={(e) => {
                    setStart(e.target.value)
                    console.log(e.target.value)
                  }} name="startdate" id="" />
                 End Date
                  <input type="date" className='dateinput' onChange={(e) => setEnd(e.target.value)} name="enddate" />
                  </> : <>
                  Select Year
                 
                  <select name="Year-select" onChange={(e) => {handleSingleDateSelection(e)}} className='Satellite-select' id="dropdown" placeholder='Select Satellite'>
                    <option className='select-options1' value="" disabled selected hidden>Select Year </option>
                    <option className='select-options' value="2010">2010</option>
                    <option className='select-options' value="2011">2011</option>
                    <option className='select-options' value="2012">2012</option>
                    <option className='select-options' value="2013">2013</option>
                    <option className='select-options' value="2014">2014</option>
                    <option className='select-options' value="2015">2015</option>
                    <option className='select-options' value="2016">2016</option>
                    <option className='select-options' value="2017">2017</option>
                    <option className='select-options' value="2018">2018</option>
                    <option className='select-options' value="2019">2019</option>
                    <option className='select-options' value="2020">2020</option>
                    <option className='select-options' value="2021">2021</option>
                  </select>
                  <button onClick={()=>setShowOnlyYearSelector(false)}>Reset</button>
                  </>
    }
                 
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