import Image from "next/image";
import Link from "next/link";

export default function FooterLinks() {
  return (
    <section className="flex flex-col items-center gap-10 w-3/4 mx-auto">
      <div className="w-3/4 h-px bg-gray-300 rounded-xl" />
      <div className="flex flex-col  md:flex-row md:justify-between gap-10 md:items-start w-full h-full">
        <div className="flex flex-row gap-20 items-start justify-center md:justify-between w-full md:w-1/2">
          <div className="hidden lg:block">
            <Image
              src={"/assets/logo.png"}
              alt="Ummah Toys logo"
              width={140}
              height={87}
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold">
              Link rapidi
            </span>
            <div className="font-light text-zinc-600 flex flex-col gap-2">
              <Link href={"/"}>
                <a className="hover:underline">Home</a>
              </Link>
              <Link href={"/chi-siamo"}>
                <a className="hover:underline">Chi Siamo</a>
              </Link>
              <Link href={"/store"}>
                <a className="hover:underline">Shop</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold">Info</span>
            <div className="font-light text-zinc-600 flex flex-col gap-2">
              <Link href={"/donazioni"}>
                <a className="hover:underline">Donazioni</a>
              </Link>
              <Link href={"/contatti"}>
                <a className="hover:underline">Contatti</a>
              </Link>
              <Link href={"/termini-di-reso"}>
                <a className="hover:underline">Termini di reso</a>
              </Link>
              <Link href={"/termini-di-servizio"}>
                <a className="hover:underline">Termini di servizio</a>
              </Link>
              <Link href={"/privacy"}>
                <a className="hover:underline">Privacy</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <span className="font-bold">La nostra mission</span>
          <div className="font-light text-zinc-700 flex flex-col gap-2">
            <p>
              Vogliamo dare dignità ad ogni bambino musulmano in Italia,
              mettendo a disposizioni delle famiglie musulmane i migliori
              strumenti per l&apos;educazione dei propri figli.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
