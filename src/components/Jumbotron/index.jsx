import Image from "next/image";

export default function Jumbotron() {
  return (
    <div className="flex flex-row w-full h-72 text-white bg-[#F58466] my-20 justify-end items-center px-10">
      <div className="absolute hidden md:block w-20 md:w-44 lg:w-80 left-5 lg:left-16">
        <Image
          src={"/assets/jumbotron-dad.svg"}
          layout="responsive"
          width={140}
          height={200}
          alt=""
        />
      </div>
      <span className="w-full font-[CeraPro] font-black text-2xl md:text-3xl lg:text-4xl pl-0 md:pl-44 lg:pl-96">
        Un bambino musulmano forte cresce per padroneggiare la vita
        con il mondo nelle sue mani e la fede nel suo cuore. <br />
        <span className="text-base pl-8">- Ummah Toys</span>
      </span>
    </div>
  );
}
