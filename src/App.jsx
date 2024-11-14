import { QueryClientProvider } from "@tanstack/react-query";
import Toastr from "./components/Toastr/Toastr";
import { RouterProvider } from "react-router-dom";
import { router } from "./util/routes";
import { useSelector } from "react-redux";
import { queryClient } from "./util/routes";

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
