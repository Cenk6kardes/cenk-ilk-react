import { useEffect, useState } from "react";
import Square from "../Square/Square";
import classes from "./Board.module.css";

const initialBoard = ["", "", "", "", "", "", "", "", ""];

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    checkWinner();
    if (winner || !board.includes("")) {
      setIsGameOver(true);
    }
  }, [winner, board]);

  function onSelect() {
    if (board[this] !== "" || isGameOver) {
      return;
    }
    const newBoard = board.map((square, index) => {
      if (index === this) {
        return turn;
      }
      return square;
    });
    setTurn(turn === "X" ? "O" : "X");

    setBoard(newBoard);
  }

  function checkWinner() {
    const conditions = [
      [0, 1, 2],
      [1, 4, 7],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [2, 5, 8]
    ];
    conditions.forEach((position) => {
      if (
        board[position[0]] !== "" &&
        board[position[0]] === board[position[1]] &&
        board[position[0]] === board[position[2]]
      ) {
        setWinner(board[position[0]]);
      }
    });
  }

  function resetBoard() {
    setBoard(initialBoard);
    setIsGameOver(false);
    setWinner("");
    setTurn("X");
  }

  return (
    <div className={classes.container}>
      {winner && <h3 className={classes.turn}>Winner {winner}</h3>}
      {!isGameOver && <h3 className={classes.turn}>Turn Of &quot;{turn}&quot;</h3>}
      {!winner && isGameOver && <h3 className={classes.turn}>No winner</h3>}

      <div className={classes.board}>
        {board.map((val, index) => (
          <Square key={index} value={val} onSquareClick={onSelect.bind(index)} className={classes.square}></Square>
        ))}
      </div>
      <button className={classes.reset} onClick={resetBoard}>
        Reset
      </button>
    </div>
  );
}
