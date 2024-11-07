import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartDetailModal from "../CartDetailModal/CartDetailModal";

export default function MainNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dialog = useRef();

  function handleLogout() {
    console.log("logged Out");
    setIsDropdownOpen(false);
  }

  function showCart() {
    dialog.current.open();
  }
  return (
    <header className="mb-6">
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li>
            <NavLink to="/products" className={classes.img_cover}>
              <img className={classes.logo} src={logo} alt="logo_seller" />
            </NavLink>
          </li>
          <li>
            <NavLink to="games/tictactoe" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
              Tic-Tac-Toe
            </NavLink>
          </li>
          <li className="ml-auto relative">
            <a
              onClick={() => {
                setIsDropdownOpen((prev) => !prev);
              }}
            >
              Cenk Altıkardeş
            </a>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
          <li>
            <a className="flex items-center" onClick={showCart}>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-10 pt-3 w-7">
                  <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                </svg>
              </p>
              <p className="mr-1">Cart</p>
              <p className="mt-1">
                <small>{totalPrice}₺</small>
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <CartDetailModal ref={dialog}></CartDetailModal>
    </header>
  );
}
