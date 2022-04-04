import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="w-full group">
      <Link href={`/store/${product.slug}`}>
        <a className="block relative  rounded overflow-hidden transform hover:scale-105 transition-all cursor-pointer peer">
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
        <Link href={`/store/${product.id}`}>
          <a className="hover:underline group-hover:underline">
            <h2 className="text-gray-900">{product.name}</h2>
          </a>
        </Link>
        <p className="mt-1 text-lg font-light tracking-wide">
          €{product.regular_price}
        </p>
      </div>
    </article>
  );
}
