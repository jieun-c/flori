import { IProduct } from "../../@type";
import useNav from "../../hooks/useNav";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";

const Card = ({ data }: { data: IProduct }) => {
  const { navFn } = useNav(`/products/${data.productId}`, { state: data });
  const { brandName, name, images, discount, originPrice, price } = data;

  return (
    <>
      {/* Card Design */}
      <div
        className="bg-white shadow-md rounded overflow-hidden cursor-pointer flex flex-col hover:[&_img]:scale-105 hover:[&_img]:duration-300"
        onClick={navFn}
      >
        {/* Product Image - 3:4 */}
        <Image34 src={images[0].url} alt={name} />

        {/* Product Info */}
        <div className="p-1">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold truncate ...">
            {brandName}
          </span>
          <p className="text-sm font-bold truncate ... mt-2 mb-4">{name}</p>

          <Price discount={discount} originPrice={originPrice} price={price} />
        </div>
      </div>
    </>
  );
};

export default Card;
