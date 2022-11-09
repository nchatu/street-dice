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
  const [players, setPlayers] = useState([
    {id: 1, name: 'Nuwan', isShooter: true, isOpponent: false },
    {id: 1, name: 'David', isShooter: false, isOpponent: true },
    {id: 1, name: 'Sam', isShooter: false, isOpponent: false },
    {id: 1, name: 'Ryan', isShooter: false, isOpponent: false },
    {id: 1, name: 'James', isShooter: false, isOpponent: false },
  ])
  const [winner, setWinner] = useState(null)

  const getRandomNumber = () => Math.ceil(Math.random() * 6)

  const rollDice = () => {
    setDiceOneNumber(getRandomNumber())
    setDiceTwoNumber(getRandomNumber())
  }
 
  const wonByShooter = () => {
    setGameWonByShooter(true)
    setGameWonByOpponent(false)
    setWinner(getShooter())
  }
  const wonByOpponent = () => {
    setGameWonByShooter(false)
    setGameWonByOpponent(true)
    setWinner(getOpponent())
  }

  const resetGame = () => {
    setGameWonByShooter(false)
    setGameWonByOpponent(false)
    setWinner(null)
  }

  const getShooter = () => players.find(p => p.isShooter)

  const getOpponent = () => players.find(p => p.isOpponent)

  useEffect(() => {
    setTotal(diceOneNumber + diceTwoNumber)
  }, [diceOneNumber, diceTwoNumber])


  useEffect(() => {
    resetGame()
    if(total){
      //setTotal(diceOneNumber + diceTwoNumber)
      if(point){
        if(total === point){
          wonByShooter()
          setPoint(null)
         
        }else if(total === 7){
          wonByOpponent()
          setPoint(null)
        }else{
          //roll again
        }
      }else{
       
        if(total === 7 || total === 11){
          wonByShooter()
        }else if(total === 2 || total === 3 || total === 12){
          wonByOpponent()
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
        <div>Shooter: { getShooter().name }</div>
        <div>Opponent: { getOpponent().name }</div>
        <div>Winner: { winner?.name }</div>
      </div>
      <div className='grid-item btn-roll'><button onClick={rollDice}>Roll</button></div>
     
     </div>
    </div>
  );
}

export default App;
