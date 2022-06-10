import Head from "next/head";

export default function Contatti() {
  return (
    <>
      <Head>
        <title>Contatti | Ummah Toys Shop</title>
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
          Contatti
        </h1>
        <div className="col-span-full sm:col-start-2 sm:col-end-12 mx-auto flex flex-col px-5 gap-10">
          <p>
            Ecco tutti i nostri contatti, per qualsiasi evenenienza{" "}
            <strong>non esitare a contattarci</strong> ti risponderemo nel più
            breve tempo possibile.
          </p>
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-10">
              <span className="text-zinc-600">Indirizzo e-mail: </span>
              <span className="text-xl lowercase">UmmahToys@gmail.com</span>
            </div>
            <div className="flex gap-10">
              <span className="text-zinc-600">Cellulare / Whatsapp</span>
              <span className="text-xl lowercase">+39 351 551 8309</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
