import { useQuery } from "@tanstack/react-query";
import Product from "../../components/Product/Product";
import classes from "./MainPage.module.css";
import httpFetch from "../../util/fetch";

export default function MainPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await httpFetch("https://react-shopping-16a1b-default-rtdb.europe-west1.firebasedatabase.app/products.json")
  });
  if (error) {
    return;
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className={classes.section}>
        <div className={classes.products_container}>
          {data && data.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </section>
    </>
  );
}
