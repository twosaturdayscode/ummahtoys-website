import Image from "next/image";

const ProductRow = ({ product }) => {
  return (
    <div className="w-full h-20 flex items-center gap-5 p-2 text-zinc-700">
      <div className="relative flex-none w-16 h-full">
        <div className="absolute z-10 -top-2 -right-2 w-5 h-5 p-1 flex items-center justify-center rounded-full text-white text-xs bg-zinc-500">
          <span>{product.quantity}</span>
        </div>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          layout={"fill"}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2">
          {product.categories &&
            product.categories.map((category) => (
              <span key={category.id} className="text-xs text-zinc-500">
                {category.name}
              </span>
            ))}
        </div>
        <span className="w-full">{product.name}</span>
      </div>
      <span className="font-bold">€{product.price * product.quantity}</span>
    </div>
  );
};

export default ProductRow;
