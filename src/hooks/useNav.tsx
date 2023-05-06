import { useNavigate } from "react-router-dom";

const useNav = (url = "/", params = {}) => {
  const navigate = useNavigate();
  const navFn = () => {
    navigate(url, params);
  };

  return { navFn };
};

export default useNav;
