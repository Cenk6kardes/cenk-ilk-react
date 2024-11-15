import { lazy, Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Layout/Root";
import MainPage from "../pages/MainPage/MainPage";
import { loader as productDetailLoader } from "../pages/ProductDetail/ProductDetail";

export const queryClient = new QueryClient();

const WelcomePage = lazy(() => import("../pages/Welcome/welcome"));
const TicTacToePage = lazy(() => import("../pages/TicTacToe/TicTacToe"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetail/ProductDetail"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <WelcomePage />
          </Suspense>
        )
      },
      {
        path: "/products",
        element: <MainPage />
      },
      {
        path: "/products/:productId",
        loader: productDetailLoader(queryClient),
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetailPage></ProductDetailPage>
          </Suspense>
        )
      },

      {
        path: "games/tictactoe",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TicTacToePage />
          </Suspense>
        )
      }
    ]
  }
]);
// https://tkdodo.eu/blog/react-query-meets-react-router
