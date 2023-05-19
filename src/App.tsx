import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { readDB, writeDB } from "./services/api";
import { IUser, USER_ROLES } from "./@type";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "./store";

import MainLayout from "./components/pages/MainLayout";
import NotFound from "./components/pages/NotFound";
import Main from "./components/pages/Main";
import Products from "./components/pages/Products";
import ProductDetail from "./components/pages/ProductDetail";
import Cart from "./components/pages/Cart";
import CreateProduct from "./components/pages/CreateProduct";
import Users from "./components/pages/Users";

const App = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
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
          element: currentUser ? <Cart /> : <Navigate to="/" />,
        },
        {
          path: "/seller/product",
          element:
            currentUser?.role === USER_ROLES.SELLER || currentUser?.role === USER_ROLES.ADMIN ? (
              <CreateProduct />
            ) : (
              <Navigate to="/" />
            ),
        },
        {
          path: "/admin/user",
          element: currentUser?.role === USER_ROLES.ADMIN ? <Users /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(true);

    // auth 정보가 변경될 때마다 실행
    const unsubscribe = onAuthStateChanged(auth, async (session: any) => {
      if (!session) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const users: IUser[] | null = await readDB("/users");
      const user = users?.find((user: IUser) => user.uid === session.uid);

      if (!users || !user) {
        // 회원가입
        const save = {
          uid: session.uid,
          displayName: session.displayName,
          email: session.email,
          photoURL: session.photoURL,
          role: USER_ROLES.CUSTOMER,
        } as IUser;

        writeDB("/users", save);
        setCurrentUser(save);
      } else {
        // 가입된 정보 반환
        setCurrentUser({ ...user });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return loading ? <>loading..</> : <RouterProvider router={router} />;
};

export default App;
