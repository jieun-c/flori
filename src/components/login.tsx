import { auth } from "../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h3>구글 로그인 테스트</h3>
      <button onClick={loginWithGoogle}>로그인</button>
      <button onClick={() => logout()}>로그아웃 </button>
    </div>
  );
};

export default Login;
