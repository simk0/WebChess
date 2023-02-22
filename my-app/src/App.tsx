import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player"
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const[currentplayer, setCurrentPLayer] = useState<Player | null>(null);
    useEffect(()=>{
        restart()
        setCurrentPLayer(whitePlayer)
    }, [])
    function restart(){
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
    function swapPLayer(){
        setCurrentPLayer(currentplayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }
  return (
    <div className={"app"}>
        <Timer
            restart={restart}
            currentPlayer={currentplayer}
        />
      <BoardComponent
      board={board}
      setBoard={setBoard}
      currentPlayer = {currentplayer}
      swapPlayer = {swapPLayer}
      />
        <div>
            <LostFigures
                title="Lost Black Figures"
                figures={board.lostBlackFigures}/>
            <LostFigures
                title="Lost White Figures"
                figures={board.lostWhiteFigures}/>
        </div>
    </div>
  );
}

export default App;
