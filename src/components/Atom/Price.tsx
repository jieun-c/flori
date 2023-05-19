import React from "react";

const Price = ({ discount = 0, originPrice = 0, price = 0 }) => {
  return (
    <>
      {discount !== 0 ? (
        <>
          <p className="text-xs text-slate-500 line-through">₩ {originPrice}</p>
          <div className="flex justify-between items-center">
            <p className="text-md text-red-500">₩ {price}</p>
            <p className="text-sm text-red-500">{discount}%</p>
          </div>
        </>
      ) : (
        <p className="text-md pt-4">₩ {price}</p>
      )}
    </>
  );
};

export default Price;
