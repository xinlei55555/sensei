import { Link } from "react-router-dom";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo_no_bg.png";
import HamburgerIcon from "../../assets/Hamburger_icon.png";
function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
}

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const width = useWindowWidth();
  useEffect(() => {
    if (window.innerWidth > 750 && drawerOpen) {
      setDrawerOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  const CompressedNavBar = () => {
    return (
      <nav
        className="items-center justify-between p-4 bg-[#f2ece4]"
        style={{ fontFamily: "Roboto" }}
      >
        <ul className="flex flex-col items-center ">
          <Link to="/penpal">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                PenPal
              </a>
            </li>
          </Link>
          <Link to="/intelliCards">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                IntelliCards
              </a>
            </li>
          </Link>
          <Link to="/intelliCards">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                Sensei
              </a>
            </li>
          </Link>
          <Link to="/login">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                Logout
              </a>
            </li>
          </Link>
        </ul>
      </nav>
    );
  };
  if (width >= 750) {
    return (
      <nav
        className="flex items-center justify-between bg-[#f2ece4] shadow-md"
        style={{
          fontFamily: "Roboto",
          position: "sticky",
          // boxShadow: "-3px 6px 10px -9px rgba(0,0,0,0.52)",
        }}
      >
        <Link to="/">
          <img src={Logo} className="h-[100px]" alt="logo" />
        </Link>
        <div
          style={{ display: "flex", listStyle: "none", alignItems: "center" }}
        >
          <Link to="/penpal">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                PenPal
              </a>
            </li>
          </Link>
          <Link to="/intelliCards">
            <li>
              <a className="text-black hover:rounded-lg  px-5 py-5   hover:text-slate-900 hover:bg-slate-200">
                IntelliCards
              </a>
            </li>
          </Link>
          <Link to="/intelliCards">
            <li className="px-5 py-5">
              <a className=" text-black hover:rounded-lg px-5 py-5 hover:text-slate-900 hover:bg-slate-200">
                Sensei
              </a>
            </li>
          </Link>
        </div>
        <ul className="flex pr-5">
          <Link to="/login">
            <li>
              <a className="text-black hover:rounded-lg  px-5 py-5   hover:text-slate-900 hover:bg-slate-200">
                Logout
              </a>
            </li>
          </Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <div className="p-4 ">
        <div className="flex justify-between items-center">
          <Link to="/account">
            <img src={Logo} className="h-20" alt="logo" />
          </Link>
          <div
            className="hover:rounded-lg cursor-pointer mt-4 p-3"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
          >
            <img src={HamburgerIcon} className="h-5 " alt="Icon" />
          </div>
        </div>
        {drawerOpen && <CompressedNavBar />}
      </div>
    );
  }
};

export default NavBar;
