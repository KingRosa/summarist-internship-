"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

export default function Header() {
  const {
  isLoggedIn,
  openLogin,
  logout,
} = useAuth();


  const [loading, setLoading] = useState(true);

  




  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="header">
      <div className="header__container">

        <div />

       <div className="header__actions">
  <SearchBar />

  {!isLoggedIn ? (
    <button
      className="header__login-btn"
      onClick={openLogin}
    >
      Login
    </button>
  ) : (
    <button
      className="header__login-btn"
      onClick={logout}
    >
      Logout
    </button>
  )}
</div>

      </div>
    </header>
  );
}




