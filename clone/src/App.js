import './App.css';
import React, { useEffect, useContext } from 'react';
import Map from './components/Map/Map';
import Leftsidebar from './components/LeftSideBar/LeftSideBar';
import RightSideBar from './components/RightSideBar/RightSideBar';
import { useState } from 'react';
import Loading from './components/Loading/Loading';
import dataContext from './datacontext';
import Instrucpopup from './components/instructionpopup.jsx/Instrucpopup';
import Popup from './components/Popup/Popup';
function App(){
  const {instructpop, setInstructpop}= useContext(dataContext)
  const {pop,setPop}=useContext(dataContext)
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setInstructpop(true);
    }, 2500);
  
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    {loading ? (<Loading/>) :(<></>)}
 
    
{ instructpop ? <><div className="leftsidebar"><Leftsidebar/></div> <Instrucpopup/> </> : <>
<div className="body">
 <div className="leftsidebar"><Leftsidebar/></div>


<div className="rightsidebar">
<Map/>
{pop ? <Popup/> :  <RightSideBar/>}

</div>


   </div>
   </>
   }
   </>
  );
}

export default (App);