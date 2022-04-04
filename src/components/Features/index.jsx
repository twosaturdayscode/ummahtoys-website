import Image from "next/image";

export default function Features() {
  return (
    <section className="flex flex-col gap-12 justify-center items-center w-full px-6 text-center my-14">
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="font-[CeraPro] font-bold text-3xl md:text-4xl text-zinc-700">
          Cosa caratterizza i nostri giochi?
        </h2>
        <p className="text-sm lg:text-base font-light text-gray-500 leading-relaxed">
          Tutti i giochi e i libri affrontano in maniera semplice ed efficace
          gli argomenti principali e fondamentali dell&apos;Islam.
          <br />I nostri prodotti sono sicuri per la salute dei tuoi bambini,
          inoltre offriamo un servizio di assistenza clienti di qualità per
          assicurarci che la tua esperienza sia sempre al top!
        </p>
      </div>
      <div className="w-full flex flex-row gap-10 justify-center items-center flex-wrap text-lg md:text-xl font-medium text-zinc-700">
        <article className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <Image src="/assets/box-shipping.svg" alt="" width={80} height={80} />
          <span>Ottimo servizio e qualità</span>
        </article>
        <article className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <Image src="/assets/target.svg" alt="" width={80} height={80} />
          <span>Realizzati per le nuove generazioni</span>
        </article>
        <article className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <Image src="/assets/moonstar.svg" alt="" width={80} height={80} />
          <span>L&apos;Islam semplice e fondamentale</span>
        </article>
        <article className="w-56 h-5/6 flex flex-col gap-3 justify-center items-center px-2">
          <Image src="/assets/europe.svg" alt="" width={80} height={80} />
          <span>Conformi alle direttive EU</span>
        </article>
      </div>
    </section>
  );
}
