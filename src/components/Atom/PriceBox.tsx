const PriceBox = ({ title = "상품금액", price = "0" }) => {
  return (
    <div className="flex flex-col items-center bg-[#f4f4f4] p-3 rounded">
      <p className="text-sm">{title}</p>
      <p className="text-red-500">₩{price}</p>
    </div>
  );
};

export default PriceBox;
