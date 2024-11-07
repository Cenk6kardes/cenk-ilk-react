import classes from "./Square.module.css";
export default function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className={classes.square}>
      {value}
    </button>
  );
}
