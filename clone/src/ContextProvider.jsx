import React, { useState } from 'react'
import dataContext from './datacontext'
const ContextProvider = (props) => {
    const [centroid,setCentroid]=useState([])
    const [search,setSearch]=useState(false)
    const [khasra,setKhasra]=useState()
    const [dates,setDates]=useState([])
    const [param,setParam]=useState(null)
    const [ndvi,setNdvi]=useState([])
    const [dates,setDates]=useState([])
    const [start,setStart]=useState("")
    const [end,setEnd]=useState("")
    const [pop,setPop]=useState(false)
    const [instructpop, setInstructpop]=useState(false)
    const [welcome, setWelcome]=useState(true)
    const [specDetails,setSpecDetails]=useState([])
    const [leftDet,setLeftDet]=useState([])
    const [showGraphData,setShowGraphData]=useState([])
    const [satellite,setSatellite]=useState('')
    const [yAxis,setYAxis]=useState('')
    const [climVars,setClimVars]=useState([])
    const [address,setAddress]=useState([])
    const [allFarmerDetails,setAllFarmerDetails]=useState([])
    const [cropHighlight,setCropHighlight]=useState([])
    const [seasonHighlight,setSeasonHighlight]=useState([])
    const [crop,setCrop]=useState('')
    const [season,setSeason]=useState('')
    const [addressQuery,setAddressQuery]=useState('roorkee')
    
      return (
        <div>
          <dataContext.Provider value={{centroid,setCentroid,search,khasra,setKhasra,setSearch,cropHighlight,setCropHighlight,seasonHighlight,setSeasonHighlight,crop,setCrop,season,setSeason,allFarmerDetails,setAllFarmerDetails,address,setAddress,addressQuery,setAddressQuery,climVars,setClimVars,yAxis,setYAxis,satellite,setSatellite,showGraphData,setShowGraphData,leftDet,setLeftDet,specDetails,setSpecDetails,pop,setPop,welcome,setWelcome,instructpop,setInstructpop,ndvi,setNdvi,dates,setDates,param,setParam,start,setStart,end,setEnd}} >
            {props.children}
          </dataContext.Provider>
        </div>
      )
    }
    
    export default ContextProvider
    
