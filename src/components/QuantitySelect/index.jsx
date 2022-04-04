import { HiMinus, HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function QuantitySelect({ initialValue = 1, handleChange }) {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    handleChange(quantity);
  }, [quantity, handleChange]);

  return (
    <div className="w-full h-full border-[1px] border-zinc-800 flex flex-row justify-between items-center select-none">
      <button
        className={`w-full h-full flex justify-center items-center cursor-pointer ${
          quantity <= 1 ? "text-gray-300" : ""
        }`}
        disabled={quantity <= 1}
        onClick={() => setQuantity((qnty) => (qnty <= 1 ? qnty : qnty - 1))}
      >
        <HiMinus className="w-4 h-4" />
      </button>
      <div className="w-full h-full flex justify-center items-center">
        <span>{quantity}</span>
      </div>
      <button
        className="w-full h-full flex justify-center items-center cursor-pointer"
        onClick={() => setQuantity((qnty) => qnty + 1)}
      >
        <HiPlus className="w-4 h-4" />
      </button>
    </div>
  );
}
