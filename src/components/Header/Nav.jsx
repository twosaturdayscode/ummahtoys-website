import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import Topbar from "./components/Topbar";

const Nav = () => {
  return (
    <>
      <Topbar>Benvenuto nello store!</Topbar>
      <MobileNav />
      <DesktopNav />
    </>
  );
};

export default Nav;
