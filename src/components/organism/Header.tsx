import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../store";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";
import { USER_ROLES } from "../../@type";
import { CiShoppingCart, CiEdit, CiLogin, CiLogout, CiUser } from "react-icons/ci";
import AvatarBadge from "../molecule/AvatarBadge";
import NavList from "../molecule/NavList";
import Logo from "../Atom/Logo";

const Header = ({ height }: { height: string }) => {
  const currentUser = useRecoilValue(currentUserAtom);

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    const confirm = window.confirm("로그아웃 하시겠습니까?");
    if (!confirm) return;

    signOut(auth)
      .then((result) => {
        alert("로그아웃 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          {/* Badge */}
          {currentUser && (
            <div className="hidden md:block mr-2">
              <AvatarBadge url={currentUser.photoURL} name={currentUser.displayName} />
            </div>
          )}

          {/* User Management */}
          {currentUser?.role === USER_ROLES.ADMIN && (
            <Link to="/admin/user">
              <CiUser size={25} title="사용자 목록" />
            </Link>
          )}

          {/* Create Product */}
          {(currentUser?.role === USER_ROLES.SELLER || currentUser?.role === USER_ROLES.ADMIN) && (
            <Link to="/seller/product">
              <CiEdit size={25} title="상품 등록" />
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => {
              if (!currentUser) alert("로그인 후 장바구니 사용이 가능합니다.");
            }}
          >
            <CiShoppingCart size={25} title="장바구니" />
          </Link>

          {/* Login / Logout */}
          {currentUser ? (
            <button onClick={logout}>
              <CiLogout size={25} title="로그아웃" />
            </button>
          ) : (
            <button onClick={login}>
              <CiLogin size={25} title="로그인" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
