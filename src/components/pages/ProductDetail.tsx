import Image34 from "../Atom/Image34";
import Price from "../Atom/Price";

const ProductDetail = () => {
  return (
    <main className="max-w-5xl px-1 py-3 m-auto flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="w-full max-w-xs m-auto">
        <Image34 />
      </div>

      {/* Product Info */}
      <div className="flex-1 px-3">
        <div className="w-fit">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">Flori</span>
          <p className="text-sm font-bold mt-2 mb-4">솔리드 텍스쳐 스퀘어넥 미디 원피스</p>
          <Price />
        </div>

        {/* Options */}
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-5">
          <option>Free Size</option>
        </select>
      </div>
    </main>
  );
};

export default ProductDetail;
