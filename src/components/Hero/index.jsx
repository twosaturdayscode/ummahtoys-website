import { HiChevronRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid grid-flow-col-dense grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-12 gap-5 px-10 my-5">
      <div className="flex flex-col md:justify-center gap-4 row-start-2 md:row-start-1 md:col-start-2 md:col-end-8 text-center md:text-left">
        <h1 className="font-[CeraPro] font-black text-4xl lg:text-6xl text-zinc-700">
          Negozio online di giochi per bambini musulmani!
        </h1>
        <p className="text-sm lg:text-base font-light text-gray-500">
          Il primo negozio online in Italia di giochi islamici per insegnare
          l’Islam agli eroi di domani, perchè imparare divertendosi si può.
        </p>
        <div className="w-full flex flex-row items-center justify-center md:justify-start gap-0 text-sm lg:text-base">
          <Link href="/store" passHref>
            <a className="py-4 px-4 md:py-5 md:px-6 h-5 flex flex-row gap-1 justify-center items-center border-2 border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition">
              <span>Val al negozio</span>
              <HiChevronRight className="w-4 h-4" />
            </a>
          </Link>
          <Link href="/chi-siamo" passHref>
            <a className="py-4 px-4 md:py-5 md:px-6 h-5 flex flex-row gap-1 justify-center items-center rounded-md hover:underline transition">
              <span>Scopri chi siamo</span>
              <HiChevronRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
      <div className="relative w-full h-72 lg:h-[466px] row-start-1 md:col-start-8 md:col-end-12">
        <Image
          src="/assets/hero-mom.svg"
          alt="Una mamma che legge un libro al suo bambino"
          layout="fill"
        />
      </div>
    </section>
  );
}
