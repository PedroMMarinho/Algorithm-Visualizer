import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
