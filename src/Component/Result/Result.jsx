import React from 'react'
import './Result.css';
export default function Result(props) {
  const handleRestart = ()=>{
    window.location.reload();
  }
  return (
    <div className='Result-box'>
      <h1>Your Quiz Result Is !!!</h1>
      <h3>{props.score + ' Out of 10'}</h3>
      <button className='submit' onClick={handleRestart}>Restart</button>
    </div>
  )
}
