import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./CartDetailModal.module.css";
import { addItemToCart, removeItemFromCart } from "../../store/cartSlice";

const CartDetailModal = forwardRef(function CartDetailModal(props, ref) {
  const dialog = useRef();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      hide() {
        dialog.current.close();
      }
    };
  });

  function addItem(product) {
    dispatch(addItemToCart(product));
  }
  function removeItem(product) {
    dispatch(removeItemFromCart(product));
  }

  return createPortal(
    <dialog onClose={close} ref={dialog} className={classes.dialog}>
      <h3 className={classes.title}>Cart</h3>
      <div className={classes.products}>
        {cart.items &&
          cart.items.map((product) => (
            <div key={product.id}>
              <div className={classes.product}>
                <div className={classes.productInfo}>
                  <p>{product.title}</p>
                  <p>({product.price}₺)</p>
                </div>
                <div className={classes.productButtons}>
                  <button
                    onClick={() => {
                      removeItem(product);
                    }}
                    className={classes.quantityButton}
                  >
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() => {
                      addItem(product);
                    }}
                    className={classes.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
      </div>
      <p className={classes.total}>Toplam: {cart.totalPrice} ₺</p>
      <div className={classes.buttonGroup}>
        <button className="bg-blue-400 rounded-lg px-3 py-1 text-md font-semibold text-blue-800 mr-2 mb-2">
          Ödeme Yap
        </button>
        <button
          onClick={() => dialog.current.close()}
          className="bg-red-400 rounded-lg px-3 py-1 text-md font-semibold text-red-800 mr-2 mb-2"
        >
          Kapat
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartDetailModal;
