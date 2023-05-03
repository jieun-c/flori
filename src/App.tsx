import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRole from "./components/pages/AdminRole";
import Cart from "./components/pages/Cart";
import Main from "./components/pages/Main";
import MainLayout from "./components/pages/MainLayout";
import NotFound from "./components/pages/NotFound";
import ProductDetail from "./components/pages/ProductDetail";
import Products from "./components/pages/Products";
import CreateProduct from "./components/pages/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/seller/product",
        element: <CreateProduct />,
      },
      {
        path: "/admin/role",
        element: <AdminRole />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
