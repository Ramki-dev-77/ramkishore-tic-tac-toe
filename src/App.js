import { useEffect, useState } from 'react';
import './App.css';
import sound from '../src/button_click.mp3';
import winSound from '../src/win-sound.wav';
import drawSound from '../src/draw-sound.wav';

//Button to click and view  a X or O
function Button({value,onClick}){
  return <button className='btn' onClick={onClick}>
      {value}
  </button>
}

function App() {

  //board is an array to fill the X or O.
  let [board,setBoard] = useState(Array(9).fill(null));

  //isX is used to check X or O. 
  const [isX,setIsX] = useState(true);
  

  //To set the winner of the game.
  const [winner,setWinner] = useState("");

  //To check whether the game is draw.
  const [draw,setDraw] = useState(0);

  const [handleComputer,setHandleComputer] = useState(false);
  const [computerIndex,setComputerIndex] = useState(false);
  //To restaqrt the game.
  const handleRestart = ()=>{
    window.location.reload();
  }

  //UseEffect - very Important.. used to dynamically update the winner
  useEffect(()=>{
      if((board[0] === "X" && board[1] === "X" && board[2] === "X") || 
        (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
        (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
        (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
        (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
        (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
        (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
        (board[2] === "X" && board[4] === "X" && board[6] === "X")){
        setWinner('X');
        const audio = new Audio(winSound).play();
      }
      else if((board[0] === "O" && board[1] === "O" && board[2] === "O") || 
        (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
        (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
        (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
        (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
        (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
        (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
        (board[2] === "O" && board[4] === "O" && board[6] === "O"))
        {
          setWinner('O');
          const audio = new Audio(winSound).play();
        }
        else{
          if(draw === 9 && winner === ""){
            console.log(winner);
            const audio = new Audio(drawSound).play();
          }
        }
      
  },[board]);

  //To handle the clicked box to set Whether X or O
  const handleClick = (i)=>{
    //Very Important!!! because to set the new value -> old value must be present
    const newBoard = [...board];

    //If winner wins do not handle the click function
    if(winner !== ''){
      return
    }

    //if the value already takes place no should overwrite
    if(board[i] !== null) return;

    const audio = new Audio(sound).play();
    setDraw(draw=> draw + 1);
    newBoard[i] = isX ? "X" : "O"
    setBoard(newBoard);
    setIsX(!isX);
  }
  return (
    <div className="App">
      <h2>Tic Tac Toe - {isX ? <span>X move now</span>:<span>O move now</span>}</h2>
      <div className='board'>
        <Button value={board[0]} onClick={()=>handleClick(0)}/>
        <Button value={board[1]} onClick={()=>handleClick(1)}/>
        <Button value={board[2]} onClick={()=>handleClick(2)}/>
        <Button value={board[3]} onClick={()=>handleClick(3)}/>
        <Button value={board[4]} onClick={()=>handleClick(4)}/>
        <Button value={board[5]} onClick={()=>handleClick(5)}/>
        <Button value={board[6]} onClick={()=>handleClick(6)}/>
        <Button value={board[7]} onClick={()=>handleClick(7)}/> 
        <Button value={board[8]} onClick={()=>handleClick(8)}/>
      </div>
      <div className='win-status-restart'>
        {winner === "X" ? <h2>X wins</h2> : winner === "O" ? <h2>O wins</h2>: draw === 9 ? <h2>Draw</h2> : null}
        <button className='restart-btn' onClick={handleRestart}>Restart</button>
      </div>
      
    </div>
  );
}

export default App;
