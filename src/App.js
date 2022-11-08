import './App.css';
import React, { useState, useEffect} from 'react'
import Dice from "./Dice";
import { findByLabelText } from '@testing-library/react';

function App() {
  
  const [diceOneNumber, setDiceOneNumber] = useState(null)
  const [diceTwoNumber, setDiceTwoNumber] = useState(null)
  const [total, setTotal] = useState()
  const [gameWonByShooter, setGameWonByShooter] = useState(false)
  const [gameWonByOpponent, setGameWonByOpponent] = useState(false)
  const [point, setPoint] = useState()

  const getRandomNumber = () => Math.ceil(Math.random() * 6)

  const rollDice = () => {
    setDiceOneNumber(getRandomNumber())
    setDiceTwoNumber(getRandomNumber())
  }

  useEffect(() => {
    setTotal(diceOneNumber + diceTwoNumber)
  }, [diceOneNumber, diceTwoNumber])

  useEffect(() => {
    setGameWonByShooter(false)
    setGameWonByOpponent(false)
    if(total){
      //setTotal(diceOneNumber + diceTwoNumber)
      if(point){
        if(total === point){
          setGameWonByShooter(true)
          setGameWonByOpponent(false)

          setPoint(null)
         
        }else if(total === 7){
          setGameWonByShooter(false)
          setGameWonByOpponent(true)

          setPoint(null)
        }else{
          //roll again
        }
      }else{
       
        if(total === 7 || total === 11){
          setGameWonByShooter(true)
          setGameWonByOpponent(false)

          
        }else if(total === 2 || total === 3 || total === 12){
          setGameWonByShooter(false)
          setGameWonByOpponent(true)
          
        }else{
          //set point
          setPoint(total)
        }
      }
    }
  }, [total])

  return (
    <div className="App">
     <div className='grid-container'>
      <div className='grid-item dice1'>
        Dice 1
        <Dice number={diceOneNumber} />
      </div>
      <div className='grid-item dice2'>
        Dice 2
        <Dice number={diceTwoNumber} />
      </div>
      <div className='grid-item total'>
        <div>Total: {total}</div>
        <div>Point: {point}</div>
      </div>
      <div className='grid-item result'>
        <div>Shooter Win? { gameWonByShooter && <span>Yes</span> }</div>
        <div>Opponent Win? { gameWonByOpponent && <span>Yes</span> }</div>
      </div>
      <div className='grid-item btn-roll'><button onClick={rollDice}>Roll</button></div>
     
     </div>
    </div>
  );
}

export default App;
