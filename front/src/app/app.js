import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Profil from "../pages/profil/profil";
import Error from "../pages/error/error";
import PrivateRoute from "../components/auth/privateRoute";
import "../styles/utils/base.css";
import "../styles/utils/variables.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
