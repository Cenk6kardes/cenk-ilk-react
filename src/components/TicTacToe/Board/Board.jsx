import { useEffect, useState } from "react";
import Square from "../Square/Square";
import classes from "./Board.module.css";

const initialBoard = ["", "", "", "", "", "", "", "", ""];

export default function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    checkWinner();
  }, [board]);

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
      [2, 4, 6]
    ];
    conditions.forEach((position) => {
      if (
        board[position[0]] !== "" &&
        board[position[0]] === board[position[1]] &&
        board[position[0]] === board[position[2]]
      ) {
        setIsGameOver(true);
        setTurn(board[position[0]]);
      }
    });
  }

  return (
    <div className={classes.container}>
      {isGameOver && <h3 className={classes.turn}>Winner {turn}</h3>}
      {!isGameOver && <h3 className={classes.turn}>Turn Of "{turn}"</h3>}

      <div className={classes.board}>
        {board.map((val, index) => (
          <Square key={index} value={val} onSquareClick={onSelect.bind(index)} className={classes.square}></Square>
        ))}
      </div>
      <button
        className={classes.reset}
        onClick={() => {
          setBoard(initialBoard);
          setIsGameOver(false);
          setTurn("X");
        }}
      >
        Reset
      </button>
    </div>
  );
}
