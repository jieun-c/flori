import { CiTrash } from "react-icons/ci";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";
import Quantity from "../Atom/Quantity";

const CartItem = () => {
  return (
    <li className="flex justify-between">
      {/* Product Img */}
      <div className="w-28 shrink-0">
        <Image34 />
      </div>

      {/* Product Info */}
      <div className="p-1 flex-1">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold truncate ...">
          Flori
        </span>
        <p className="text-sm font-bold truncate ... mt-2 mb-4">
          솔리드 텍스쳐 스퀘어넥 미디 원피스
        </p>

        <p>Small</p>

        <Price />
      </div>

      {/* Control */}
      <div className="flex items-center">
        <Quantity count={1} />
        <button className="ml-4">
          <CiTrash size={24} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
