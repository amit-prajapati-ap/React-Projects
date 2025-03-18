import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MiniSideBar from "./MiniSideBar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const category = useSelector(state => state.categories.category)
  
  return (
    <div>
      <NavBar sidebar={sidebar} setSidebar={setSidebar} />
      <div className="flex flex-row">
        <MiniSideBar sidebar={sidebar} />
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />
      {children}
      </div>
    </div>
  );
};

export default Layout;
