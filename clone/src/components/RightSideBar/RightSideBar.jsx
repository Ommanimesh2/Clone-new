import React from 'react'
import "./rightsidebar.css"
import { useState } from 'react'
import dataContext from '../../datacontext';
import { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
export default function RightSideBar() {
    const {ndvi,setNdvi,dates,yAxis,setYAxis,start,end,setSpecDetails,satellite,param,setDates}=useContext(dataContext)
    const [selectIndex,setSelectIndex]=useState('')
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      const options = {
        responsive: true,
        scales: {
            x: {
              grid: {
    
                color:'#5a5b5c'
                
              },
              title: {
                display:true,
                text:"DATES",
                font: {
                    size: 21,
                      },
                color: 'white'
            },
            
            ticks: {
                font: {
                    size: 10,
                  weight: "bold"
                },
                color: 'white',
            },
        },
        
        y: {
          grid: {
    
            color:'#5a5b5c'
            
          },
            title: {
                display:true,
                text:`${yAxis}`,
                font: {
                    size: 21,
                //   weight: "bold"
                },
                color: 'white'
              },
      
              ticks: {
                beginAtZero: true,
                display:false,
                font: {
                  size: 12,
                  weight: "bold"
                },
                color: 'white'
              }
            }
          },
          plugins: {
           
            legend: {
                labels: {
                    font: {
                        size: 23,
                        weight: "bold"
                    }
                }
            }
        }
    }
    

    // const specificDetails = async () => {
    //   const spData = await fetch(`https://new-ndvi-default-rtdb.firebaseio.com/${param}.json`)
    //   const response = await spData.json()
    //   setSpecDetails(response)
    // }
    const splitKeyValue = obj => {
      const keys = Object.keys(obj);
      console.log("object is " + keys);
      const dates1 = [];
      const ndvi1 = [];
      for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] !== "" && keys[i] != 'id' && keys[i] != 'Geometry' && keys[i] != 'Area') {
          const sDate = new Date(start)
          const eDate = new Date(end)

          const keyarr = keys[i].split('-')
          var temp = keyarr[0]
          keyarr[0] = keyarr[1]
          keyarr[1] = temp
          keyarr.join('-')
          const comp = new Date(keyarr)
    //  if(comp != "Invalid Date"){}
          if (comp > sDate && comp < eDate) {
  
            dates1.push(keyarr);
            ndvi1.push(obj[keys[i]]);
          }
        }
  
  
      };
      dates1.sort(function (a, b) {
        var dateA = new Date(a),
          dateB = new Date(b);
        if (dateB > dateA) {
          return -1;
        } else {
          return 1;
        }
      });
      var dates2=[];
      dates1.forEach((e)=>{
        console.log(e);
    
     
        if (e[0]=='01') dates2.push('Jan')
       else if (e[0]=='02')dates2.push('Feb')
       else   if (e[0]=='03')dates2.push('Mar')
       else if (e[0]=='04')dates2.push('Apr')
       else if (e[0]=='05')dates2.push('May')
       else if (e[0]=='06')dates2.push('June')
       else  if (e[0]=='07')dates2.push('July')
       else  if (e[0]=='08')dates2.push('Aug')
       else if (e[0]=='09')dates2.push('Sep')
       else if (e[0]=='10')dates2.push('Oct')
       else if (e[0]=='11')dates2.push('Nov')
       else if (e[0]=='12')dates2.push('Dec')

      })
      setNdvi(ndvi1)
      setDates(dates2)

  
    };
   
    const handleModis=async ()=>{

        if(selectIndex=='NDVI'){

          const data = await fetch(`https://modis-ea7f2-default-rtdb.firebaseio.com/${param}.json`)
          const resp = await data.json();
          console.log(resp);
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('NDVI ')
        }
       else if(selectIndex=='Precipitation'){
          const data = await fetch(`https://precipitation-41e14-default-rtdb.firebaseio.com/${param}.json`)
          const resp = await data.json();
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('Precipitation')
          // resp ? splitKeyValue(resp):alert("no data found")
        }
       else if(selectIndex=='Temperature'){
          const data = await fetch(`https://temperature-51769-default-rtdb.firebaseio.com/${param}.json`)
          const resp = await data.json();
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('Temperature')
            
        }
      
    }
    const handleSentinel=async ()=>{
      console.log(selectIndex);
        if(selectIndex=='EVI'){
          const inData=await fetch(`https://stable-glass-363410-default-rtdb.firebaseio.com/${param}.json`)
          const resp=await inData.json()
          resp ? splitKeyValue(resp):alert("no data found")
          
          setYAxis('EVI ')
        }
        else if(selectIndex=='NDVI'){
          const inData=await fetch(`https://test-c1701-default-rtdb.firebaseio.com/${param}.json`)
          const resp=await inData.json()
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('NDVI ')
          
          
        }
        else if(selectIndex=='GNDVI'){
          console.log("current selected index", param);
          const inData=await fetch(`https://updated-gndvi-default-rtdb.firebaseio.com/${param}.json`)
          const resp=await inData.json()
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('GNDVI')
          
          
        }
        else if(selectIndex=='NDRE'){
          
          const inData=await fetch(`https://ndre-11d99-default-rtdb.firebaseio.com/${param}.json`)
          const resp=await inData.json()
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('NDRE ')
          // resp ? splitKeyValue(resp):alert("no data found")
        }
        else if(selectIndex=='Precipitation'){
          const data = await fetch(`https://precipitation-41e14-default-rtdb.firebaseio.com/${param}.json`)
          const resp = await data.json();
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('Precipitation')
          // resp ? splitKeyValue(resp):alert("no data found")
        }
        else if(selectIndex=='Temperature'){
          const data = await fetch(`https://temperature-51769-default-rtdb.firebaseio.com/${param}.json`)
          const resp = await data.json();
          resp ? splitKeyValue(resp):alert("no data found")
          setYAxis('Temperature')
            
        }



    }
      const datad={
        labels:dates,
        datasets: [
          {
            label: `Calculated Values`,
            data: ndvi,
            fill: false,
            borderColor: 'green',
            backgroundColor: 'red',
          }
        ]
    
      }
   
  return (
    <div className='graph-logo'>
{satellite=='SENTINEL-2' ? <div className="ig">
              <select name="index-select" onChange={(e) => setSelectIndex(e.target.value)}
        defaultValue={selectIndex}  className='index-select' id="dropdown" placeholder='Select Index'>
                <option className='select-options' value="" disabled selected hidden>Select Index </option>
                <option className='select-options' value="NDVI">NDVI</option>
                <option className='select-options' value="EVI">EVI</option>
                <option className='select-options' value="NDRE">NDRE</option>
                <option className='select-options' value="GNDVI">GNDVI</option>
                <option className='select-options' value="Temperature">Temperature</option>
                <option className='select-options' value="Precipitation">Precipitation</option>
              </select>
             <button className='plot-btn' onClick={()=>{
                  handleSentinel()
                  
                }}>Plot</button>
</div>: satellite=='MODIS'?<div className="ig">
              <select name="index-select" onChange={(e) => setSelectIndex(e.target.value)}
        defaultValue={selectIndex}  className='index-select' id="dropdown" placeholder='Select Index'>
                <option className='select-options' value="" disabled selected hidden>Select Index </option>
                <option className='select-options' value="NDVI">NDVI</option>
                <option className='select-options' value="Temperature">Temperature</option>
                <option className='select-options' value="Precipitation">Precipitation</option>
              </select>
             <button className='plot-btn' onClick={()=>{
               handleModis()
               
        
             }}>Plot</button>
</div> :<div className='nodata'><p>Select the Crop Field and the time series for data analysis</p></div>}

      {ndvi.length>2 
      ? 
    <div className='graphcontainer'>
     <Line style={{height:"200px",width:"1200px"}} options={options} data={datad} />
      
    </div>
      :
      <> </>}
      
    </div>
  )
}