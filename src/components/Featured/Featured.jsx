import ProductCard from "../ProductCard";

export default function ShowcaseProducts({ products }) {
  // If a product is featured, it will have its property 'featured' set to true
  const featuredProductsOnly = products
    ?.filter((product) => product.featured)
    .slice(0, 4);

  return (
    <section className="w-full flex flex-col gap-5 justify-center items-center my-20 text-center px-5">
      <h2 className="font-[CeraPro] font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-700">
        Cresci tuo figlio nel migliore dei modi!
      </h2>
      <p className="text-sm lg:text-base font-light text-zinc-500">
        Il nostro obiettivo è fornire ai genitori risorse islamiche di qualità
        che trasmettano i valori musulmani ai bambini di oggi.
      </p>
      <div className="w-full grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-12 sm:px-32">
        {featuredProductsOnly &&
          featuredProductsOnly.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
