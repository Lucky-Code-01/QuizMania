import React, { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import axios from 'axios';
import Result from '../Result/Result';
export default function Quiz() {
    const[count,setCount] = useState(1);
    const[question,setQuestion] = useState([]);
    const[randomIndex,setRandomIndex] = useState(0);
    const[score,setScore] = useState(0);
    const[mode,setMode] = useState("easy");
    const[isClicked, setIsClicked] = useState(false);
    const inp1 = useRef(null);
    const inp2 = useRef(null);
    const inp3 = useRef(null);
    const inp4 = useRef(null);
    const inputrefArray = [inp1,inp2,inp3,inp4];
    let TotalResult = question.length;
    let CurrentData = [];
    let optionsArray =  [];

    // question mode
    const handleMode = (e)=>{
      const questionMode = e.target.value;
      setMode(questionMode);
    }

    const getQuestion = async()=>{
        const response = await axios.get(`https://the-trivia-api.com/v2/questions?category=general_knowledge,science,geography/difficulties${mode}`);
        setQuestion(response.data);
    }
  
    // for page change & pagination logic
    const getDataNext = (e)=>{
        e.preventDefault(); 
        if(isClicked === true){
          const initialRandomIndex = Math.floor(Math.random() * 4);
          setRandomIndex(initialRandomIndex);
          setCount(count + 1);
          setIsClicked(false);
          inputrefArray.map((option)=>{
            option.current.classList.remove("right");
            option.current.classList.remove("wrong");
          })
        }
    }

    // check result 
    const handleClick = (e,index)=>{
      if(isClicked === false){
        const correctAnswer = CurrentData[0].correctAnswer;
        let correctAnswerIndex = optionsArray.indexOf(correctAnswer);
        if(index === correctAnswerIndex){
          e.target.classList.add("right");
          setScore(score + 1);
          setIsClicked(true);
        }
        else{
          e.target.classList.add("wrong");
          inputrefArray[correctAnswerIndex].current.classList.add("right");
          setIsClicked(true);
        }
        
      }
    } 

    useEffect(()=>{
      getQuestion();
      const initialRandomIndex = Math.floor(Math.random() * 4);
      setRandomIndex(initialRandomIndex);
    },[mode]);

    // swap option function 
    const swapOption = (CurrentData)=>{
      if(count<=10){
        const correctOption = CurrentData[0].correctAnswer;
        for(let i = 0; i<CurrentData[0].incorrectAnswers.length; i++){
          optionsArray.push(CurrentData[0].incorrectAnswers[i]);
        }
        if(optionsArray.length>1){
          optionsArray.splice(randomIndex,0,correctOption);
        }
      }
    }

    if(count>1){
      let itemPerPage = 1;
      const lastIndex = count * itemPerPage;
      const firstIndex = lastIndex - itemPerPage;
      if(question.length>1){
        CurrentData = question.slice(firstIndex,lastIndex);
        swapOption(CurrentData);
      }
    }
    else{
      if(question.length>1){
        CurrentData = question.slice(0,1);
        swapOption(CurrentData);
      }
    }
    

  return (
    <div className='quiz-box'>
      {
        count>10?<Result score = {score}/>:<>
        <div className="sub-box1">
        <p className='head1'>Quiz App</p>
        <form action="" className='quiz-level'>
            <div className='level-head'>
                <p>Easy</p>
                <input type='radio' checked={mode === "easy"} className='modeInput' value="easy" onChange={handleMode}/>
            </div>
            <div className='level-head'>
                <p>Medium</p>
                <input type='radio' checked={mode === "medium"} className='modeInput' value="medium" onChange={handleMode}/>
            </div>
            <div className='level-head'>
                <p>Hard</p>
                <input type='radio' checked={mode === "hard"} className='modeInput' value="hard" onChange={handleMode}/>
            </div>
        </form>
          </div>
          <hr className='hr'/>
          <div className="sub-box2">
        {
          CurrentData.map((data,index)=>{
            return <div key={index}>
              <p className='question-text'>{count + ". "}{data.question.text}</p>
              <div className="quiz-question-box">
                <li className='quiz-inp' ref={inp1} onClick={(e)=>handleClick(e,0)}>{optionsArray[0]}</li>
                <li className='quiz-inp' ref={inp2} onClick={(e)=>handleClick(e,1)}>{optionsArray[1]}</li>
                <li className='quiz-inp' ref={inp3} onClick={(e)=>handleClick(e,2)}>{optionsArray[2]}</li>
                <li className='quiz-inp' ref={inp4} onClick={(e)=>handleClick(e,3)}>{optionsArray[3]}</li>
              </div>
              <div className='btn-box'><button className='submit' onClick={(e)=>getDataNext(e)}>Next</button></div>
            </div>
            
          })
        }
        <div className='extra-info'>
            <span className='question-info'>{count} of {TotalResult} question</span>
        </div>
          </div>
        </>
      }
    </div>
  )
}
