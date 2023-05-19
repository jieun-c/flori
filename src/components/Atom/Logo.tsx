import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to="/" className="block h-full">
        <img src="/flori/images/logo.svg" alt="logo" className="h-full" />
      </Link>
    </>
  );
};

export default Logo;
