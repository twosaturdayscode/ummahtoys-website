import Image from "next/image";
import Head from "next/head";

export default function Chisiamo() {
  return (
    <>
    <Head>
        <title>Chi siamo | Ummah Toys Shop</title>
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
      <main className="grid grid-cols-1 sm:grid-cols-12 grid-flow-row w-full my-10 mb-16 gap-10">
        <h1 className="col-span-full sm:col-start-2 sm:col-end-12 text-5xl text-zinc-700 font-[CeraPro] text-center md:text-left">
          Chi siamo
        </h1>
        <div className="col-span-full sm:col-start-2 sm:col-end-12 mx-auto flex flex-col lg:flex-row justify-between gap-10">
          <div className="relative w-3/4 lg:w-full h-full aspect-square shadow-xl mx-auto">
            <Image
              className="bg-clip-content rounded-xl brightness-90"
              src={"/assets/chi-siamo.png"}
              alt="I fondatori di Ummah toys, Farouk, Mazen e Hassan"
              layout="fill"
            />
          </div>
          <div className="w-full flex flex-col gap-7">
            <p className="font-light w-full px-5 sm:p-1">
              Ummah Toys nasce nel Maggio 2021 con un obiettivo preciso:{" "}
              <strong>
                avvicinare i bambini musulmani alla religione in modo
                divertente,
              </strong>{" "}
              da qui il nostro motto:{" "}
              <span className="underline decoration-sky-500 decoration-2">
                Imparare l’Islam giocando.
              </span>
              <br />
              <br />
              Ummah Toys ha introdotto nel mercato nazionale giocattoli unici e
              inediti diventando la prima azienda in Italia a produrre e
              commercializzare giochi di qualità in italiano per bambini
              musulmani. Tutti i nostri giochi sono conformi alla normativa
              vigente e sicuri per i piccoli della nostra ummah.
              <br />
              <br />
              Con l’ambizione dei suoi tre fondatori, Ummah Toys vuole essere
              presente nelle camerette di ogni bambino e bambina musulmani.
              UmmahToys è un alleato nella educazione islamica dei tuoi figli ed
              è al servizio di : famiglie, moschee e tutti gli operatori che si
              occupano di educazione islamica.
            </p>
            <div className="relative w-72 aspect-video mx-auto">
              <Image
                src={"/assets/logo.png"}
                alt="Logo di Ummah toys"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
