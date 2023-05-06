import { CiShoppingCart, CiUser, CiReceipt } from "react-icons/ci";
import { Link } from "react-router-dom";
import Logo from "../Atom/Logo";
import AvatarBadge from "../molecule/AvatarBadge";
import NavList from "../molecule/NavList";

const Header = ({ height }: { height: string }) => {
  return (
    <header className={`bg-white w-full fixed z-10 ${height}`}>
      <div className="flex justify-between items-center w-full h-full px-1 mx-auto max-w-5xl">
        {/* Left Area */}
        <div className="flex-1">
          <NavList />
        </div>

        {/* Center Area */}
        <div className={`${height} py-1`}>
          <Logo />
        </div>

        {/* Right Area */}
        <div className="flex-1 flex justify-end items-center gap-1">
          <div className="hidden md:block mr-2">
            <AvatarBadge url="test" name="최지은" />
          </div>

          <Link to="/seller/product">
            <CiReceipt size={25} />
          </Link>
          <Link to="/cart">
            <CiShoppingCart size={25} title="cart" />
          </Link>

          <button>
            <CiUser size={25} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
