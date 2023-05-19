import { useLocation } from "react-router-dom";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";
import { useEffect, useState } from "react";
import { IProduct } from "../../@type";

const ProductDetail = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    if (state) setProduct(state);
    console.log(state);
  }, []);
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
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-5">
              {product.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductDetail;
