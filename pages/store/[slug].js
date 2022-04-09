import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCartContext } from "../../src/context";
import {
  getWooProductById,
  getWooProductBySlug,
  getWooProducts,
} from "../../src/api";

import BackToButton from "../../src/components/BackToButton";
import QuantitySelect from "../../src/components/QuantitySelect";

export default function ProductPage({ product, variations }) {
  const { addItemToCart } = useCartContext();

  const isVariant = variations.length !== 0;

  const [variationProduct, setVariationProduct] = useState(
    isVariant ? variations[0] : null
  );
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addItemToCart(product, quantity);
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 my-10 px-5 md:px-16 lg:px-0">
      <BackToButton label={"Torna al negozio"} href={"/store"} />
      <div className="col-span-full lg:col-start-2 lg:col-end-8 flex flex-col w-full items-center mb-10">
        <div className="w-full relative py-5 px-10 sm:px-20 md:px-32 lg:px-28 xl:px-36">
          <Image
            className="object-cover object-center w-full block"
            src={currentImage.src}
            alt={currentImage.alt}
            layout={"responsive"}
            width={100}
            height={100}
          />
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-10 px-16">
          {product.images.map((image) => (
            <div
              key={image.id}
              className={`w-1/3 sm:w-1/4 md:w-1/5 rounded-lg relative cursor-pointer transition ${
                image.id !== currentImage.id
                  ? "opacity-50  hover:opacity-70"
                  : "ring-4 ring-indigo-400"
              }`}
              onClick={() => setCurrentImage(image)}
            >
              <Image
                className="object-cover object-center block rounded-lg"
                src={image.src}
                alt={image.alt}
                layout={"responsive"}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:col-start-8 lg:col-end-12 flex flex-col gap-8 text-zinc-800">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 uppercase text-gray-400 text-sm">
            {product.categories.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
          </div>
          <h1 className="text-3xl font-[CeraPro] font-bold mb-2">
            {product.name}
          </h1>
          <span className="text-2xl">€{product.price}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Descrizione</h2>
          <div
            className=" leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Quantità</h2>
          <div className=" w-40 h-12">
            <QuantitySelect
              handleChange={(quantity) => setQuantity(quantity)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 py-5">
          <button
            className="w-64 h-16 flex justify-center items-center bg-zinc-800 text-white focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600"
            onClick={handleAddToCart}
          >
            Aggiungi al carrello
          </button>
          <Link href={"/store"}>
            <a className="underline">Torna al negozio</a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  const products = await getWooProducts();

  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(props) {
  console.log(`Building slug: ${props.params.slug}`);
  const [product] = await getWooProductBySlug(props.params.slug);
  if (product.variations.length !== 0) {
    const variations = await Promise.all(
      product.variations.map(async (variationId) => {
        return await getWooProductById(variationId);
      })
    );

    return {
      props: {
        product,
        variations,
      },
    };
  }
  // When products are fetched by slug woocommerce always returns an array with one element
  return { props: { product, variations: [] } };
}
