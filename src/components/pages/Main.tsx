import { useEffect } from "react";
import GridLayout from "../organism/GridLayout";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase.config";
import { useRecoilState } from "recoil";
import { productsAtom } from "../../store";

const Main = () => {
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
      {/* Banner */}
      <div className="h-60">
        <div className="w-full h-full bg-no-repeat bg-cover bg-center bg-[url('/public/images/banners/2.jpg')]" />
      </div>

      {/* Grid */}
      <div className="max-w-5xl p-1 m-auto">
        {products.length === 0 ? (
          <p className="text-xs">등록된 상품이 없습니다.</p>
        ) : (
          <GridLayout datas={products} />
        )}
      </div>
    </>
  );
};

export default Main;
