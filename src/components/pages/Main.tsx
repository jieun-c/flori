import { useEffect, useState } from "react";
import GridLayout from "../organism/GridLayout";
import { IProduct } from "../../@type";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase.config";

const Main = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const productRef = ref(database, `products`);

    const unsubscribe = onValue(productRef, (data: any) => {
      const valdata = data.val();
      setProducts(valdata);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="h-60">
        <div className="w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/public/images/banners/2.jpg')]" />
      </div>

      {/* Grid */}
      <div className="max-w-5xl p-1 m-auto">
        <GridLayout datas={products} />
      </div>
    </>
  );
};

export default Main;
