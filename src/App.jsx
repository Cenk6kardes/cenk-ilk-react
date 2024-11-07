import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Toastr from "./components/Toastr/Toastr";
import { RouterProvider } from "react-router-dom";
import { router } from "./util/routes";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function App() {
  const toastrVisible = useSelector((state) => state.toastr.isVisible);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      {toastrVisible && <Toastr></Toastr>}
    </QueryClientProvider>
  );
}

export default App;
