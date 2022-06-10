import Link from "next/link";
import Image from "next/image";
import MobileNavLink from "./MobileNavLink";
import { HiOutlineShoppingBag } from "react-icons/hi";
import CartCounter from "./CartCounter";

const DesktopNav = () => {
  const DesktopNavLink = ({ children, href }) => (
    <Link href={href}>
      <a className="font-medium text-sm">{children}</a>
    </Link>
  );

  return (
    <nav className="w-full h-14 md:h-24 grid grid-flow-row md:grid-cols-12 grid-cols-1 items-center px-8 md:px-20 my-2 md:my-0 gap-4">
      <Link href={"/"} passHref>
        <a className="h-full flex flex-row items-center gap-4 justify-self-center md:justify-self-auto col-span-4">
          <Image
            priority
            src="/assets/logo-only.png"
            alt="Ummah Toys logo"
            width={80}
            height={50}
          />
          <span className="font-['Baloo_2'] font-black text-3xl text-gray-800 pt-2">
            Ummah Toys
          </span>
        </a>
      </Link>
      <div className="hidden md:flex flex-row gap-6 items-center col-start-5 col-span-4">
        <DesktopNavLink href={"/"}>Home</DesktopNavLink>
        <DesktopNavLink href={"/store"}>Store</DesktopNavLink>
        <DesktopNavLink href={"/chi-siamo"}>Chi siamo</DesktopNavLink>
        <DesktopNavLink href={"/contatti"}>Contatti</DesktopNavLink>
      </div>
      <div className="hidden md:flex flex-row items-center justify-self-end col-start-10 col-span-2">
        <MobileNavLink href={"/cart"}>
          <HiOutlineShoppingBag className="w-6 h-6" />
          <span>Carrello</span>
          <CartCounter>{/* <span>{cart.length}</span> */}</CartCounter>
        </MobileNavLink>
      </div>
    </nav>
  );
};

export default DesktopNav;
