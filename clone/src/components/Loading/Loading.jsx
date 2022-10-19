import React from 'react'
import "./Loading.css"
import Logo from './logo1.svg'
import Typewriter from 'typewriter-effect';
export default function Loading() {
  return (
    <div className='loading-container'>
       {/* <div className="spinner"></div> */}
       <img src={Logo} alt="" srcset="" />
       <div className="loading">
       <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('Loading...')

      .pauseFor(200)
      .deleteAll()
      .start();
  }}
/>
       </div>
    </div>
  )
}