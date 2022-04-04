import { useCartContext } from "../../../context";

const CartCounter = () => {
  const { getCartItemsCount } = useCartContext();
  return (
    <div className="absolute top-0 right-2 text-white bg-zinc-700 rounded-full w-5 h-5 flex justify-center items-center text-xs">
      <span>{getCartItemsCount()}</span>
    </div>
  );
};

export default CartCounter;
