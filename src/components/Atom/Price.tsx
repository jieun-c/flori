import React from "react";

const Price = ({ isDiscount = true, discountRate = 0, price = 0 }) => {
  return (
    <>
      {isDiscount ? (
        <>
          <p className="text-xs text-slate-500 line-through">₩ 33000</p>
          <div className="flex justify-between items-center">
            <p className="text-md text-red-500">₩ 30000</p>
            <p className="text-sm text-red-500">10%</p>
          </div>
        </>
      ) : (
        <p className="text-md">₩ 30000</p>
      )}
    </>
  );
};

export default Price;
