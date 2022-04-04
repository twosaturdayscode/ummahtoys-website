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
              Link <br /> rapidi
            </span>
            <div className="font-light text-gray-400 flex flex-col gap-2">
              <Link href={"/"}>
                <a>Home</a>
              </Link>
              <Link href={"/"}>
                <a>Chi Siamo</a>
              </Link>
              <Link href={"/"}>
                <a>Shop</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold">Info</span>
            <div className="font-light text-gray-400 flex flex-col gap-2">
              <Link href={"/"}>
                <a>Donazioni</a>
              </Link>
              <Link href={"/"}>
                <a>Contatti</a>
              </Link>
              <Link href={"/"}>
                <a>Termini di reso</a>
              </Link>
              <Link href={"/"}>
                <a>Termini di servizio</a>
              </Link>
              <Link href={"/"}>
                <a>Privacy</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <span className="font-bold">La nostra mission</span>
          <div className="font-light text-gray-400 flex flex-col gap-2">
            <p>
              Quality materials, good designs, craftsmanship and sustainability.
              Quality materials, good designs, craftsmanship and sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
