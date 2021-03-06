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

import Zoom from "react-medium-image-zoom";

import { HiOutlineZoomIn } from "react-icons/hi";
import Head from "next/head";

export default function ProductPage({ product, variations }) {
  const { addItemToCart } = useCartContext();

  const isVariant = variations.length !== 0;

  const [currentProduct, setCurrentProduct] = useState(
    isVariant ? variations[0] : product
  );

  // TODO: Use placeholder when no image is fetched
  const [currentImage, setCurrentImage] = useState(currentProduct.images[0]);

  const [quantity, setQuantity] = useState(1);

  function handleVarProductChange(varProduct) {
    setCurrentProduct(varProduct);
    setCurrentImage(varProduct.images[0]);
  }

  function handleAddToCart() {
    addItemToCart(currentProduct, quantity);
  }

  return (
    <>
      <Head>
        <title>{currentProduct.name} | Ummah Toys Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-16x16.png"
          sizes="16x16"
        />
      </Head>
      <section className="grid grid-cols-1 lg:grid-cols-12 my-10 px-5 md:px-16 lg:px-0">
        <BackToButton label={"Torna al negozio"} href={"/store"} />
        <div className="col-span-full lg:col-start-2 lg:col-end-8 flex flex-col w-full items-center mb-10">
          <div className="w-full relative py-5 px-10 sm:px-20 md:px-32 lg:px-28 xl:px-36">
            <Zoom wrapStyle={{ minWidth: "100%" }}>
              <div className=" min-w-full relative">
                <Image
                  className="object-contain object-center w-full block"
                  src={currentImage.src}
                  alt={currentImage.alt}
                  layout={"responsive"}
                  width={100}
                  height={100}
                />
              </div>
            </Zoom>
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-10 px-16">
            {currentProduct.images.map((image) => (
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
              {currentProduct.categories.map((category) => (
                <span key={category.id}>{category.name}</span>
              ))}
            </div>
            <h1 className="text-3xl font-[CeraPro] font-bold mb-2">
              {currentProduct.name}
            </h1>
            <span className="text-2xl">???{currentProduct.price}</span>
          </div>
          {isVariant && (
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Modello</h2>
              <div className="flex flex-wrap gap-3">
                {variations.map((varProduct) => (
                  <button
                    key={varProduct.id}
                    className={`py-1 px-3 border rounded-md text-sm transition ${
                      varProduct.id === currentProduct.id
                        ? "ring-4 ring-indigo-500"
                        : "hover:ring-2 hover:ring-indigo-100"
                    }`}
                    onClick={() => handleVarProductChange(varProduct)}
                  >
                    {varProduct.attributes[0].option}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Descrizione</h2>
            <div
              className=" leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Quantit??</h2>
            <div className="w-40 h-12">
              {product.stock_quantity <= 0 ? (
                <div>
                  <span className="bg-red-500 text-xl text-white py-1 px-2 rounded-lg">
                    Esaurito
                  </span>
                </div>
              ) : (
                <QuantitySelect
                  handleChange={(quantity) => setQuantity(quantity)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 py-5">
            <button
              className="w-64 h-16 flex justify-center items-center bg-zinc-800 text-white focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600 disabled:bg-zinc-400 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
            >
              Aggiungi al carrello
            </button>
            <Link href={"/store"}>
              <a className="underline">Torna al negozio</a>
            </Link>
          </div>
        </div>
      </section>
    </>
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
      revalidate: 10,
    };
  }
  // When products are fetched by slug woocommerce always returns an array with one element
  return { props: { product, variations: [] }, revalidate: 10 };
}
