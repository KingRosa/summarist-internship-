import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";

import AuthProvider from "./context/AuthContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Book Summary App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <div className="app-shell">
            <Sidebar />

            <div className="app-main">
              <Header />

              <main className="app-content">
                {children}
              </main>

              <Footer />
            </div>

            <LoginModal />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}