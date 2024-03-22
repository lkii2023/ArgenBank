import React from "react";
import { NavLink } from "react-router-dom";
import UserButton from "../userButton/userButton";
import Logo from "../../assets/img/argentBankLogo.webp";
import { useSelector } from "react-redux";
import "../../styles/components/header.css";

function Header() {
  const token = useSelector((state) => state.user.token);
  return (
    <nav className="main-nav">
      <NavLink
        className="main-nav-logo"
        to={"/"}
      >
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <UserButton token={token} />
      </div>
    </nav>
  );
}

export default Header;
