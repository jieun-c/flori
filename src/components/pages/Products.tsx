import { useEffect } from "react";
import GridLayout from "../organism/GridLayout";
import { database } from "../../firebase.config";
import { onValue, ref } from "firebase/database";
import { useRecoilState } from "recoil";
import { productsAtom } from "../../store";

const Products = () => {
  const [products, setProducts] = useRecoilState(productsAtom);

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
        {products.length === 0 ? (
          <p className="text-xs">등록된 상품이 없습니다.</p>
        ) : (
          <GridLayout datas={products} />
        )}
      </main>
    </>
  );
};

export default Products;
