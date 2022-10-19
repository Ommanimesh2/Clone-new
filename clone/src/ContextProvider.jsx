import React, { useState } from 'react'
import dataContext from './datacontext'
const ContextProvider = (props) => {
    const [globalData,setGlobalData]=useState([])
    const [param,setParam]=useState(0)
    const [ndvi,setNdvi]=useState([])
    const [dates,setDates]=useState([])
    const [start,setStart]=useState("")
    const [end,setEnd]=useState("")
    const [pop,setPop]=useState(false)
    const [specDetails,setSpecDetails]=useState([])
    const [leftDet,setLeftDet]=useState([])
    const [showGraphData,setShowGraphData]=useState([])
    const [satellite,setSatellite]=useState('')
    const [yAxis,setYAxis]=useState('')
    const [climVars,setClimVars]=useState([])
      return (
        <div>
          <dataContext.Provider value={{climVars,setClimVars,yAxis,setYAxis,satellite,setSatellite,showGraphData,setShowGraphData,leftDet,setLeftDet,specDetails,setSpecDetails,pop,setPop,ndvi,setNdvi,dates,setDates,param,setParam,start,setStart,end,setEnd}} >
            {props.children}
          </dataContext.Provider>
        </div>
      )
    }
    
    export default ContextProvider
    