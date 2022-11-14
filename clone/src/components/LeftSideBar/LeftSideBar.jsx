import React, { useContext, useEffect } from 'react'
import dataContext from '../../datacontext'
import './leftsidebar.css'
import Hamburger from '../Hamburger/Hamburger'
import { useState } from 'react'
import { VscMenu } from "react-icons/vsc";
import { VscChevronLeft } from "react-icons/vsc";
import img from '../../Assets/logo1.svg'
import srch from "../../Assets/search.png"
import image from '../../Assets/copyright.svg'
import data from '../../Updated_data'
const LeftSideBar = () => {

  const [sideopen, setSideopen] = useState(false);
  const [seasonSelected, setSeasonSelected] = useState("Select Season")
  const [cropSelected, setCropSelected] = useState("Select Crop")
  const [satelliteSelected, setSatelliteSelected] = useState("Select Satellite")
  const [showOnlyYearSelector, setShowOnlyYearSelector] = useState(false)
  const { cropHighlight,search,setSearch,centroid,setCentroid,khasra,setKhasra,setCropHighlight, seasonHighlight, setSeasonHighlight, allFarmerDetails, season, setSeason, crop, setCrop, ndvi, setAddressQuery, addressQuery, setAddress, setNdvi, setSatellite, leftDet, dates, setDates, param, setParam, setStart, start, end, setEnd, pop, setPop, setSpecDetails, specDetails } = useContext(dataContext)
  const [track,setTrack]=useState()
  const geocoderData = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${addressQuery}&apiKey=DBqoNTB1sP3HLJ9T5QDJgbPIv8lZA_0W1cG-Je0wJqo`)
      const resp = await data.json()
      setAddress(resp)
      console.log('do validate')
    }
  }
  function findCentroid(e){
    const length=e.length;
    var latArr=[]
    var longArr=[]
    for(let i=0; i<length; i++){
      latArr.push(e[i][0])
      longArr.push(e[i][1])
    }
    let latCentroid=0
    let longCentroid=0
    let centroid=[]
    for(let i=0; i<length; i++){
      latCentroid+=latArr[i]
      longCentroid+=longArr[i]
      
    }
    centroid[1]=latCentroid/length
    centroid[0]=longCentroid/length
    return centroid
  }

function markset(){
    setParam(khasra)
    for (let i = 0; i < data.features.length; i++) {
      console.log(data.features[i].properties.id, parseInt(khasra))
     if(data.features[i].properties.id==parseInt(khasra))
     {
     setCentroid(findCentroid(data.features[i].geometry.coordinates[0]))
     setSearch(true)
  }
  else{
    console.log("not matching")
  }
}
}

  const specificDetails = async () => {
    try {
      
    
    if(param!=null){
    const spData = await fetch(`https://soassist-54548-default-rtdb.firebaseio.com/${param}.json`)
    const response = await spData.json()
    if(!response){
      alert("Select a available plot num")
      window.location.reload()
    }

    setSpecDetails(response)
      
      setPop(true)
  }
  
} catch (error) {
      
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
      setStart(`${e.target.value}null0-01`)
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
useEffect(()=>{
document.getElementById('khasraSearch').value=param
},[param])
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
                  <div className="title">Khasra Number</div>
                  <div className="search">
                   <input type="text" className="value" id='khasraSearch' placeholder={
                      (param ? param :
                        (
                          param && !param ? "Not Available" : "Enter Khasra Number"
                       )
                      )
                      } onChange={(e)=>{
                        setKhasra(e.target.value)
                      }
                    }/>
                     <button className="srch-btn" onClick={()=>{
                             markset()
                           
      
                      }}><img src={srch}></img></button>
                </div>
                </div>
             </div>
    

                  {/* <input className='location-select' type="text" placeholder='Type your Location' onKeyDown={(e) => {
                    setAddressQuery(e.target.value)
                    geocoderData(e)
                  }} /> */}

            <div className="moreinfo">

              <button className="info-btn" onClick={()=>{
                specificDetails()

                }}>More Info</button>

            </div>
            <div className="updateInfo">
            <select name="Season-select" onChange={(e) => { 
                handleSeasonSelection(e) 
                setSeasonSelected(e.target.value)
                setShowOnlyYearSelector(true)
                }} className='Satellite-select' id="dropdown" value={seasonSelected} placeholder='Select Season'>
                <option className='select-options1' value="Select Season" disabled selected hidden>Select Season</option>
                <option className='select-options' onClick={(e)=>{setSeasonSelected(e.target.value)}} value="Rabi">Rabi</option>
                <option className='select-options' onClick={(e)=>{setSeasonSelected(e.target.value)}} value="Kharif">Kharif</option>
                <option className='select-options' onClick={(e)=>{setSeasonSelected(e.target.value)}} value="Zaid">Zaid</option>
              </select>
              <select name="Satellite-select" onChange={(e) => { 
                setSatelliteSelected(e.target.value)
                setSatellite(e.target.value) }} className='Satellite-select' id="dropdown" value={satelliteSelected} placeholder='Select Satellite'>
                <option className='select-options1' value="Select Satellite" disabled selected hidden >Select Satellite </option>
                <option className='select-options' value="SENTINEL-2" onClick={(e)=>{setSatelliteSelected(e.target.value)}}>SENTINEL-2</option>
                <option className='select-options' value="MODIS" onClick={(e)=>{setSatelliteSelected(e.target.value)}}>MODIS</option>
              </select>
              <select name="Crop-select" onChange={(e) => { 
                setCropSelected(e.target.value)
                handleCropSelection(e) }} className='Satellite-select' id="dropdown" value={cropSelected} placeholder='Select Satellite'>
                <option className='select-options1' value="Select Crop" disabled selected hidden>Select Crop</option>
                {season==="Rabi"&&<option className='select-options'  onClick={(e)=>{setCropSelected(e.target.value)}} value="linseed">linseed</option>}
                {season==="Rabi"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}}  value="pulses">pulses</option>}
                {season==="Rabi"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="corn">corn</option>}
                {season==="Kharif"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="pulses">pulses</option>}
                {season==="Rabi"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="wheat">wheat</option>}
                {season==="Kharif"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="rice">rice</option>}
                {season==="Kharif"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="maize">maize</option>}
                {season==="Kharif"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="soybean">soybean</option>}
                {season==="Kharif"&&<option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="ragi">ragi</option>}
                {season==="Zaid"&& <option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="tomatoes">tomatoes</option>}
                {season==="Zaid"&& <option className='select-options' onClick={(e)=>{setCropSelected(e.target.value)}} value="melon">melon</option>}
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
                  <button className="reset-btn" onClick={()=>{
                    setCropSelected("Select Crop")
                    setSatelliteSelected("Select Satellite")
                    setSeasonSelected("Select Season")
                    setCropHighlight([])
                    setSeasonHighlight([])
                    setShowOnlyYearSelector(false)}}>Reset</button>
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

export default LeftSideBar;
