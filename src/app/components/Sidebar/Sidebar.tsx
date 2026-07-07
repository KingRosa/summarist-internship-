"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HiOutlineHome,
  HiOutlineBookmark,
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineLogout,
} from "react-icons/hi";

import { IoSparklesOutline } from "react-icons/io5";

import Logo from "../../summarist-home-page/assets/logo.png";

import { useAuth } from "@/app/context/AuthContext";

import "./Sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();

  const {
    isLoggedIn,
    logout,
  } = useAuth();

  const [open, setOpen] = useState(false);

  // Hide the entire sidebar until the user logs in.
  if (!isLoggedIn) {
    return null;
  }

  const links = [
    {
      href: "/for-you",
      label: "For You",
      icon: <HiOutlineHome />,
    },
    {
      href: "/library",
      label: "My Library",
      icon: <HiOutlineBookmark />,
    },
    {
      href: "/highlights",
      label: "Highlights",
      icon: <IoSparklesOutline />,
    },
    {
      href: "/search",
      label: "Search",
      icon: <HiOutlineSearch />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <HiOutlineCog />,
    },
    {
      href: "/help",
      label: "Help & Support",
      icon: <HiOutlineQuestionMarkCircle />,
    },
  ];

  return (
    <>
      <button
        className="sidebar__toggle"
        onClick={() => setOpen(true)}
      >
        <HiOutlineMenu />
      </button>

      <div
        className={`sidebar__overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="sidebar__close"
          onClick={() => setOpen(false)}
        >
          <HiOutlineX />
        </button>

        <Link
          href="/"
          className="sidebar__logo"
          onClick={() => setOpen(false)}
        >
          <Image
            src={Logo}
            alt="Summarist"
            priority
          />
        </Link>

        <nav className="sidebar__nav">
          {links.map((link) => {
            const isDisabled =
              link.href === "/search" ||
              link.href === "/highlights";

            return (
              <Link
                key={link.label}
                href={isDisabled ? "#" : link.href}
                className={`sidebar__link ${
                  pathname === link.href ? "active" : ""
                } ${
                  isDisabled
                    ? "sidebar__link--disabled"
                    : ""
                }`}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__bottom">
          <button
            className="sidebar__login"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            <HiOutlineLogout />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
