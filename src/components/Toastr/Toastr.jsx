import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToastr } from "../../store/toastrSlice";
import classes from "./Toastr.module.css";

export default function Toastr() {
  const toastr = useSelector((state) => state.toastr);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(hideToastr());
    }, 2000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <div className={`${classes[toastr.type]} ${classes.toastr}`}>
      <p>{toastr.message}</p>
    </div>
  );
}
