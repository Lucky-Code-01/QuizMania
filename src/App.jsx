import React, { useState } from 'react'
import './App.css';
import Quiz from './Component/QuizApp/Quiz';
export default function App() {
  return (
    <div className='App'>
      <h1 className='head'>Welcome To Quiz <span className='com-ani ani1'>M</span>
        <span className='com-ani ani2'>a</span>
        <span className='com-ani ani3'>n</span>
        <span className='com-ani ani4'>i</span>
        <span className='com-ani ani5'>a</span></h1>
      <Quiz/>
    </div>
  )
}
