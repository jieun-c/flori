import { CiCirclePlus, CiStop1 } from "react-icons/ci";
import PriceBox from "../Atom/PriceBox";
import CartItem from "../molecule/CartItem";
import { useEffect, useState } from "react";
import { database } from "../../firebase.config";
import { onValue, ref } from "firebase/database";
import { useRecoilState } from "recoil";
import { cartsAtom } from "../../store";
import { ICart } from "../../@type";

const Cart = () => {
  const [carts, setCarts] = useRecoilState(cartsAtom);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartRef = ref(database, `/carts`);

    const unsubscribe = onValue(cartRef, (data: any) => {
      const valdata = data.val();
      if (!data.exists()) {
        setCarts([]);
        return;
      }
      setCarts(valdata);

      let price = 0;
      valdata.map((data: any) => {
        price = price + data.price * data.count;
      });
      setTotalPrice(price);
    });

    return unsubscribe;
  }, []);

  return (
    <main className="max-w-5xl p-1 m-auto">
      <h1 className="text-lg text-center py-5">내 장바구니</h1>

      {carts.length !== 0 ? (
        <>
          {/* List */}
          <ul className="grid grid-cols-1 gap-2">
            {carts.map((cart: ICart) => (
              <CartItem key={cart.cartId} carts={carts} cart={cart} />
            ))}
          </ul>

          <hr className="my-4" />

          {/* 상품 가격 안내 */}
          <div className="flex justify-center items-center gap-2">
            <PriceBox title="상품총액" price={totalPrice} />
            <div className="relative">
              <CiCirclePlus size={24} />
            </div>
            <PriceBox title="배송비" price={3000} />
            <div className="relative">
              <CiStop1 size={24} />
              <span className="absolute top-1 left-2 text-xs">=</span>
            </div>
            <PriceBox title="총 가격" price={totalPrice + 3000} />
          </div>

          <div className="flex justify-center pt-10 pb-5">
            <button className="bg-red-500 text-white py-2 px-8 rounded">주문하기</button>
          </div>
        </>
      ) : (
        <>
          <p className="text-center">상품을 추가해주세요!</p>
        </>
      )}
    </main>
  );
};

export default Cart;
