import classes from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { showToastr } from "../../store/toastrSlice";

export default function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addItem() {
    dispatch(addItemToCart(product));
    dispatch(showToastr({ message: "Sepete Eklendi", type: "success" }));
  }
  return (
    <>
      <div className={classes.container}>
        <div>
          <img className={classes.image} src={product.imagePath} alt={product.title} />
        </div>
        <div className={`px-6 py-4 ${classes.description_container}`}>
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className={classes.description}>{product.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex">
          <div>
            <p className="inline-block text-lg mr-8 font-semibold">{product.price} ₺</p>

            <p className="inline-block text text-orange-500 text-lg font-semibold">{product.star} ★</p>
          </div>
          <div className="ml-auto">
            <button
              onClick={addItem}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2"
            >
              Sepete Ekle
            </button>
            <button
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
              className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2"
            >
              Detay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
