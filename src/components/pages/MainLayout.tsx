import { Outlet } from "react-router-dom";
import Header from "../organism/Header";

const MainLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header height="h-20" />
      <div className="pb-[5rem]" />
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="pb-[5rem]" />
      <footer className="bg-zinc-100">
        <div className="max-w-5xl p-1 m-auto">
          <p className="text-xs text-center py-2">ⓒ 2023. jieun-c All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
