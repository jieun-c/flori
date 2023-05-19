import { useLocation } from "react-router-dom";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";
import { ChangeEvent, useEffect, useState } from "react";
import { ICart, IProduct } from "../../@type";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../store";
import { readDB, updateDB, writeDB } from "../../services/api";

const ProductDetail = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState<IProduct>();
  const [option, setOption] = useState("");
  const currentUser = useRecoilValue(currentUserAtom);

  useEffect(() => {
    if (state) {
      setProduct(state);
      setOption(state.options[0]);
    }
  }, []);

  const changeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setOption(event.currentTarget.value);
  };

  const addCart = async () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const carts: ICart[] | null = await readDB(`/carts/${currentUser.uid}`);
    const cart = carts?.find(
      (cart: ICart) => cart.productId === product?.productId && cart.option === option
    );

    if (!carts || !cart) {
      // 새로운 아이템 추가
      const save = {
        cartId: Date.now().toString(),
        userId: currentUser.uid,
        productId: product?.productId,
        count: 1,
        option,
        imageUrl: product?.images[0].url,
        brandName: product?.brandName,
        productName: product?.name,
        originPrice: product?.originPrice,
        price: product?.price,
        discount: product?.discount,
      } as ICart;
      writeDB(`/carts/${currentUser.uid}`, save);
    } else {
      // 수량 추가
      const idx = carts.findIndex((c: ICart) => c.cartId === cart.cartId);
      carts.splice(idx, 1, { ...cart, count: cart.count + 1 });

      await updateDB(`/carts/${currentUser.uid}`, carts);
    }
    alert("장바구니에 추가 되었습니다.");
  };

  return (
    <main className="max-w-5xl px-1 py-3 m-auto flex flex-col sm:flex-row">
      {product && (
        <>
          {/* Product Image */}
          <div className="w-full max-w-xs m-auto">
            <Image34 src={product.images[0].url} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="flex-1 px-3">
            <div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
                {product.brandName}
              </span>
              <p className="text-sm font-bold mt-2 mb-4">{product.name}</p>
              <Price
                discount={product.discount}
                originPrice={product.originPrice}
                price={product.price}
              />
            </div>

            {/* Options */}
            <select
              className="block w-full border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-5"
              onChange={changeOption}
            >
              {product.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              className="bg-red-500 text-white py-2 px-8 rounded w-full mt-2"
              onClick={addCart}
            >
              장바구니에 담기
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductDetail;
