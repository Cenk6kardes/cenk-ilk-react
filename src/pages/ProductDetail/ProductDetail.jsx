import httpFetch from "../../util/fetch";
import { useLoaderData } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cartSlice";
import { showToastr } from "../../store/toastrSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const product = useLoaderData();
  const cartItem = useSelector((state) => state.cart.items.find((itemInsideCart) => itemInsideCart.id === product.id));
  let quantity = 0;
  if (cartItem) {
    quantity = cartItem.quantity;
  }
  function addItem() {
    dispatch(addItemToCart(product));
    dispatch(showToastr({ message: "Sepete Eklendi", type: "success" }));
  }
  function removeItem() {
    dispatch(removeItemFromCart(product));
    dispatch(showToastr({ message: "Sepetten Çıkarıldı !", type: "warning" }));
  }
  return (
    <div className={classes.container}>
      <div className={classes.image_container}>
        <img className={classes.image} src={product.imagePath} alt={product.title} />
      </div>
      <div className={classes.body}>
        <h2 className={classes.title}>{product.title}</h2>
        <p className={classes.description}>{product.description}</p>
      </div>
      <div className="px-6 py-4 mb-8 flex">
        <div>
          <p className="inline-block text-2xl mr-8 font-semibold">{product.price} ₺</p>

          <p className="inline-block text text-yellow-500 text-2xl font-semibold">{product.star} ★</p>
        </div>
        <div className="ml-auto flex">
          {quantity > 0 && (
            <div className="flex">
              <p className="mr-2 text-xl text-orange-500 font-semibold text">Sepette {quantity} adet var !</p>
              <button
                onClick={removeItem}
                className="inline-block bg-red-400 rounded-lg px-3 py-1 text-md font-semibold text-red-800 mr-2 mb-2"
              >
                Sepetten Çıkar
              </button>
            </div>
          )}
          <button
            onClick={addItem}
            className="inline-block bg-blue-400 rounded-lg px-3 py-1 text-md font-semibold text-blue-800 mr-2 mb-2"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ params }) => {
  return await httpFetch(
    `https://react-shopping-16a1b-default-rtdb.europe-west1.firebasedatabase.app/products/${params.productId}.json`
  );
};
