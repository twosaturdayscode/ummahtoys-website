import {
  HiHome,
  HiOutlineShoppingBag,
  HiShoppingCart,
  HiUserGroup,
} from "react-icons/hi";
import CartCounter from "./CartCounter";
import MobileNavLink from "./MobileNavLink";

const MobileNav = () => {
  return (
    <>
      <nav className="fixed z-50 bottom-0 left-0 right-0 w-full h-16 bg-white border-t-2 border-gray-100 md:hidden flex flex-row justify-between items-center px-3">
        <MobileNavLink href={"/"}>
          <HiHome className="w-6 h-6" />
          <span>Home</span>
        </MobileNavLink>
        <MobileNavLink href={"/store"}>
          <HiOutlineShoppingBag className="w-6 h-6" />
          <span>Store</span>
        </MobileNavLink>
        <MobileNavLink href={"/cart"}>
          <HiShoppingCart className="w-6 h-6" />
          <span>Carrello</span>
          <CartCounter>{/* <span>{cart.length}</span> */}</CartCounter>
        </MobileNavLink>
        <MobileNavLink href={"/chi-siamo"}>
          <HiUserGroup className="w-6 h-6" />
          <span>Chi siamo</span>
        </MobileNavLink>
      </nav>
    </>
  );
};

export default MobileNav;
