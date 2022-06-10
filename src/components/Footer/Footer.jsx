import Newsletter from "./components/Newsletter";
import Socials from "./components/SocialLinks";
import FooterLinks from "./components/FooterLinks";
import PayServiceIcons from "./components/PayServiceIcons";

export default function Footer() {
  return (
    <>
      <FooterLinks />
      <section className="flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between md:items-start w-3/4 mx-auto mt-8">
        {/* <Newsletter /> */}
        <Socials />
      </section>
      <div className="w-full border-t-[0.5px] p-5 flex flex-col gap-3 items-center mt-8 mb-14 md:mb-0">
        <PayServiceIcons />
        <span className="text-xs text-gray-400">
          © {new Date().getFullYear()} - Ummah Toys. Fatto con amore per la comunità. P.IVA: 11570680964 - Denominazione: BEST OF ME DI MAZEN HUSSEIN
        </span>
      </div>
    </>
  );
}
