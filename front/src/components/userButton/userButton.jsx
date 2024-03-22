import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userReducer";
import "../../styles/components/header.css";

function UserButton() {
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  const handleProfileClick = () => {
    setActiveLink("profil");
  };

  function logoutHandler() {
    dispatch(logout(token));
    navigate("/login");
    setActiveLink("login");
  }

  if (token !== null && token !== "") {
    return (
      <div className="main-navlink">
        <Link
          to="/profil"
          className={`main-nav-item ${
            activeLink === "profil" ? "active-link" : ""
          }`}
          onClick={handleProfileClick}
        >
          <i className="fa fa-user-circle sign-in-logo"></i>
          {userName}
        </Link>
        <Link
          to="/login"
          className={`main-nav-item ${
            activeLink === "login" ? "active-link" : ""
          }`}
          onClick={logoutHandler}
        >
          <i className="fa fa-sign-out logout-logo"></i>
          Sign Out
        </Link>
      </div>
    );
  } else {
    return (
      <div className="main-navlink">
        <Link
          to="/login"
          className={`main-nav-item ${
            activeLink === "login" ? "active-link" : ""
          }`}
        >
          <i className="fa fa-user-circle sign-in-logo"></i>
          Sign in
        </Link>
      </div>
    );
  }
}

export default UserButton;
