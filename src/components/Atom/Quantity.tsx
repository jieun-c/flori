import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

const Quantity = ({ count = 1 }) => {
  return (
    <div className="flex items-center">
      <button>
        <CiSquareMinus size={24} />
      </button>
      <div className="flex-1 px-2">{count}</div>
      <button>
        <CiSquarePlus size={24} />
      </button>
    </div>
  );
};

export default Quantity;
