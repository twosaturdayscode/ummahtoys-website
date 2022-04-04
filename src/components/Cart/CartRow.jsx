import { HiTrash } from "react-icons/hi";
import Image from "next/image";
import CartQuantitySelect from "./CartQuantitySelect";

const CartRow = ({
  name,
  image,
  price,
  quantity,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 md:grid-rows-1 gap-6 gap-y-3 py-6 h-40 text-zinc-700">
      <div className="col-span-4 md:col-span-2 flex gap-6">
        <div className="relative w-24 h-24">
          <Image
            className="object-cover w-full h-full"
            src={image.src}
            alt={image.alt}
            layout="fill"
          />
        </div>
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="hidden md:block">€{price}</span>
        </div>
      </div>
      <div className="hidden col-span-2 md:block">
        <div className="flex items-center justify-end gap-4">
          <div className="w-32 h-12">
            <CartQuantitySelect
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
          <button className="p-2" onClick={handleRemoveItem}>
            <HiTrash className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="text-right text-lg font-semibold md:flex justify-end col-start-5">
        <span>€{price * quantity}</span>
      </div>
      <div className="flex flex-row col-span-full gap-4 col-start-2 items-center pl-10 pt-4 sm:pt-0 md:hidden">
        <div className="w-32 h-10 md:h-12">
          <CartQuantitySelect
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
          />
        </div>
        <button onClick={handleRemoveItem}>
          <HiTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartRow;
