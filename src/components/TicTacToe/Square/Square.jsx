import classes from "./Square.module.css";
export default function Square({ value, onSquareClick, isWinnerSquare }) {
  return (
    <button onClick={onSquareClick} className={classes.square + (isWinnerSquare ? " " + classes.winner : "")}>
      {value}
    </button>
  );
}
