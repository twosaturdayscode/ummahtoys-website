import { HiChevronRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

export default function MostLoved({ products }) {
  const lovedProductsOnly = products
    ?.filter((product) => product.tags.some((tag) => tag.name === "loved"))
    .slice(0, 2);

  return (
    <section className="flex flex-col max-w-7xl mx-auto gap-8 md:text-left justify-center px-10 md:px-20 lg:px-30">
      <div className="flex flex-col gap-5">
        <h2 className="font-[CeraPro] font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-700">
          I più amati
        </h2>
        <p className="text-sm lg:text-base font-light text-gray-500">
          Ecco i nostri prodotti più amati da voi!
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 grid-flow-row gap-3 sm:px-20 md:px-0">
        <Link href={`/store/${lovedProductsOnly[0].slug}`} passHref>
          <article className="md:col-span-3 md:row-span-full shadow-sm rounded relative  w-full cursor-pointer">
            <div className="relative w-full h-full rounded">
              <Image
                src={lovedProductsOnly[0].images[0].src}
                alt={lovedProductsOnly[0].images[0].alt}
                layout="fill"
                className="object-cover -z-10 rounded"
              />
              <div className="w-full h-full text-white flex flex-col gap-4 items-center p-8 justify-end bg-gradient-to-b from-transparent via-transparent to-gray-800 rounded">
                <span className="w-full text-3xl font-[CeraPro] font-bold">
                  {lovedProductsOnly[0].name}
                </span>
                <a className="w-full flex flex-row gap-2 items-center justify-end hover:underline z-10">
                  Vedi di più <HiChevronRight className="w-4 h-4" />{" "}
                </a>
              </div>
            </div>
          </article>
        </Link>
        <Link href={`/store/${lovedProductsOnly[1].slug}`} passHref>
          <article className="md:col-span-2 shadow-sm relative h-full w-full cursor-pointer">
            <div className="w-full h-full rounded">
              <Image
                src={lovedProductsOnly[1].images[0].src}
                alt={lovedProductsOnly[1].images[0].alt}
                layout="fill"
                className="object-cover -z-10 rounded"
              />
              <div className="w-full h-full text-white flex flex-col gap-4 items-center p-8 justify-end bg-gradient-to-b from-transparent via-transparent to-gray-800 rounded">
                <span className="w-full text-3xl font-[CeraPro] font-bold">
                  {lovedProductsOnly[1].name}
                </span>
                <a className="w-full flex flex-row gap-2 items-center justify-end hover:underline z-10">
                  Vedi di più <HiChevronRight className="w-4 h-4" />{" "}
                </a>
              </div>
            </div>
          </article>
        </Link>
        <article className="md:col-span-2 shadow-sm relative h-full w-full">
          <div className="bg-[url('/assets/carte-decorative.jpg')] bg-cover bg-no-repeat bg-center w-full h-full rounded">
            <div className="w-full h-full text-white flex flex-col gap-5 items-center p-8 justify-center bg-gradient-to-b from-transparent to-gray-800 rounded">
              <span className="w-full text-4xl font-[CeraPro] text-center">
                SCOPRI TUTTI GLI ALTRI GIOCHI
              </span>
              <Link href="/" passHref>
                <a className="py-5 px-6 md:py-5 md:px-6 h-5 flex flex-row gap-1 justify-center items-center bg-white text-zinc-700 rounded-md hover:bg-gray-800 hover:text-white transition">
                  <span>Val al negozio</span>
                  <HiChevronRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
