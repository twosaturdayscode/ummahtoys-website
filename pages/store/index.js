import { useState } from "react";

import { getWooCategories, getWooProducts } from "../../src/api";

import CategorySelect from "../../src/components/CategorySelect";
import ProductCard from "../../src/components/ProductCard";

const Store = ({ products, categories }) => {
  const [currentCategory, setCurrentCategory] = useState("tutti");

  const filteredProducts =
    currentCategory === "tutti"
      ? products
      : products.filter((product) =>
          product.categories.some(
            (category) => category.slug === currentCategory
          )
        );

  return (
    <>
      <main className="grid grid-cols-12 grid-flow-row w-full my-10 mb-16 gap-8">
        <h1 className="col-span-full col-start-2 col-end-12 text-5xl text-zinc-700 font-[CeraPro] text-center md:text-left">
          Store
        </h1>
        <section className="col-span-full col-start-2 col-end-12 flex flex-row justify-between flex-wrap font-light text-zinc-700 my-5">
          <div className="flex flex-row gap-3 items-center">
            <span className=" text-lg">Filtri:</span>
            <CategorySelect
              onCategoryChange={(category) => {
                setCurrentCategory(category);
              }}
              categoryList={categories}
            />
          </div>
          <div>{filteredProducts.length + " prodotti"}</div>
        </section>
        <section className="col-span-full col-start-2 col-end-12 w-full flex justify-center">
          {filteredProducts.length !== 0 ? (
            <div className="w-full grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              {filteredProducts.map((product, i) => {
                return <ProductCard key={i} product={product} />;
              })}
            </div>
          ) : (
            <span className="text-xl text-gray-400">
              Non ci sono prodotti per questa categoria
            </span>
          )}
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const products = await getWooProducts();
  const categories = await getWooCategories();

  return {
    props: {
      products: products || [],
      categories: categories || [],
    },
    revalidate: 1,
  };
}

export default Store;
