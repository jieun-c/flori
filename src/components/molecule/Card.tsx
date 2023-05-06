import useNav from "../../hooks/useNav";
import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";

const Card = () => {
  const { navFn } = useNav("/products/123", { id: "123" });

  return (
    <>
      {/* Card Design */}
      <div
        className="bg-white shadow-md rounded overflow-hidden cursor-pointer flex flex-col hover:[&_img]:scale-105 hover:[&_img]:duration-300"
        onClick={navFn}
      >
        {/* Product Image - 3:4 */}
        <Image34 src="/images/banners/1.jpg" alt="1.webp" />

        {/* Product Info */}
        <div className="p-1">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold truncate ...">
            Flori
          </span>
          <p className="text-sm font-bold truncate ... mt-2 mb-4">
            솔리드 텍스쳐 스퀘어넥 미디 원피스
          </p>

          <Price />
        </div>
      </div>
    </>
  );
};

export default Card;
