import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../features/home/components/header/header";
import Footer from "../features/home/components/footer/footer";
import ThemeBtn from "../shared/components/theme-btn/theme-btn";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <ThemeBtn />
      <Footer />
    </>
  );
};

export default memo(MainLayout);
