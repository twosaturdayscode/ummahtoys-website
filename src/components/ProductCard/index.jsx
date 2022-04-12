import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="w-full group relative">
      <Link href={`/store/${product.slug}`}>
        <a className="block relative  rounded overflow-hidden transform group-hover:scale-105 transition-all cursor-pointer peer">
          {product.images[0]?.src && (
            <Image
              alt={product.images[0]?.alt}
              className="object-cover object-center w-full h-full block"
              layout="responsive"
              height={100}
              width={100}
              src={product.images[0]?.src}
            />
          )}
        </a>
      </Link>
      <div className="mt-4">
        {product.categories[0]?.name && (
          <h3 className="text-gray-500 text-xs tracking-widest mb-1">
            {product.categories[0].name}
          </h3>
        )}
        <Link href={`/store/${product.slug}`}>
          <a className="hover:underline group-hover:underline">
            <h2 className="text-gray-900">{product.name}</h2>
          </a>
        </Link>
        <p className="mt-1 text-lg font-light tracking-wide">
          €{product.price}
        </p>
      </div>
      {product.stock_quantity <= 0 && (
        <div className="absolute top-3 -right-3 bg-red-500 py-1 px-2 text-sm text-white rounded transform transition group-hover:-translate-y-2">
          Esaurito
        </div>
      )}
    </article>
  );
}
