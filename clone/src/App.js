import './App.css';
import React, { useContext } from 'react';
import Map from './components/Map/Map';
import Leftsidebar from './components/LeftSideBar/LeftSideBar';
import RightSideBar from './components/RightSideBar/RightSideBar';
import { useState } from 'react';
import Loading from './components/Loading/Loading';
import dataContext from './datacontext';
import Popup from './components/Popup/Popup';
function App(){
  const {pop,setPop}=useContext(dataContext)
  const [loading, setLoading]=useState(true);
setTimeout(() => {
  setLoading(false)
}, 2500);
  return (
    <>
     {loading ? (<Loading/>) :(<></>)}
    <div className="body">
      <div className="leftsidebar"><Leftsidebar/></div>
      <div className="rightsidebar">
      <Map/>
    {pop ? <Popup/> :  <RightSideBar/>}
   
    </div>
    </div>
    </>
  );
}

export default (App);