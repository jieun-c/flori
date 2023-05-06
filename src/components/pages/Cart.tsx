import { CiCirclePlus, CiStop1 } from "react-icons/ci";
import PriceBox from "../Atom/PriceBox";
import CartItem from "../molecule/CartItem";

const Cart = () => {
  return (
    <main className="max-w-5xl p-1 m-auto">
      <h1 className="text-lg text-center py-5">내 장바구니</h1>

      {/* List */}
      {/* overflow-y-auto */}
      <ul className="grid grid-cols-1 gap-2">
        <CartItem />
        <CartItem />
      </ul>

      <hr className="my-4" />

      {/* 상품 가격 안내 */}
      <div className="flex justify-center items-center gap-2">
        <PriceBox title="상품총액" price="10000" />
        <div className="relative">
          <CiCirclePlus size={24} />
        </div>
        <PriceBox title="배송비" price="3000" />
        <div className="relative">
          <CiStop1 size={24} />
          <span className="absolute top-1 left-2 text-xs">=</span>
        </div>
        <PriceBox title="총 가격" price="13000" />
      </div>

      <div className="flex justify-center pt-10 pb-5">
        <button className="bg-red-500 text-white py-2 px-8 rounded">주문하기</button>
      </div>
    </main>
  );
};

export default Cart;
