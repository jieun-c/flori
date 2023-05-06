import { Link } from "react-router-dom";

const NavList = () => {
  return (
    <nav className="text-sm">
      <Link to="/products">Products</Link>
    </nav>
  );
};

export default NavList;
