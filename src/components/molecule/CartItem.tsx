import { CiTrash } from "react-icons/ci";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";
import Quantity from "../Atom/Quantity";
import { ICart } from "../../@type";
import { deleteDB, updateDB } from "../../services/api";

const CartItem = ({ carts, cart }: { carts: ICart[]; cart: ICart }) => {
  const deleteCart = (cartId: string) => {
    const confirm = window.confirm("해당 상품을 삭제하시겠습니까?");
    if (!confirm) return;

    const filteredItem = carts.filter((c: ICart) => c.cartId !== cartId);
    deleteDB("/carts", filteredItem);
    alert("삭제되었습니다.");
  };

  const onIncrease = async () => {
    const updateData = carts.map((c: ICart) => {
      if (c.cartId === cart.cartId) {
        return { ...c, count: c.count + 1 };
      } else {
        return { ...c };
      }
    });
    await updateDB("/carts", updateData);
  };

  const onDecrease = async () => {
    const updateData = carts.map((c: ICart) => {
      if (c.cartId === cart.cartId) {
        return { ...c, count: cart.count - 1 <= 0 ? 1 : cart.count - 1 };
      } else {
        return { ...c };
      }
    });
    await updateDB("/carts", updateData);
  };

  return (
    <li className="flex justify-between">
      {/* Product Img */}
      <div className="w-28 shrink-0">
        <Image34 src={cart.imageUrl} alt={cart.productName} />
      </div>

      {/* Product Info */}
      <div className="p-1 flex-1">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold truncate ...">
          {cart.brandName}
        </span>
        <p className="text-sm font-bold truncate ... mt-2 mb-4">{cart.productName}</p>

        <p className="text-sm mb-2">{cart.option}</p>

        <Price
          discount={cart.discount}
          originPrice={cart.originPrice}
          price={cart.price}
          count={cart.count}
        />
      </div>

      {/* Control */}
      <div className="flex items-center">
        <Quantity count={cart.count} onIncrease={onIncrease} onDecrease={onDecrease} />
        <button className="ml-4" onClick={() => deleteCart(cart.cartId)}>
          <CiTrash size={24} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
