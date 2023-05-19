import { useEffect, useState } from "react";
import GridLayout from "../organism/GridLayout";
import { IProduct } from "../../@type";
import { database } from "../../firebase.config";
import { onValue, ref } from "firebase/database";

const Products = () => {
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
      <main className="max-w-5xl p-1 m-auto">
        <GridLayout datas={products} />
      </main>
    </>
  );
};

export default Products;
