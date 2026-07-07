// app/layout.tsx
"use client"; // Required to use context hooks
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginModal from "./components/LoginModal/LoginModal";
import "./globals.css"


import AuthProvider, { useAuth } from "./context/AuthContext";// ... other imports

function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  return (
    <div className={`app-shell ${isLoggedIn ? "logged-in" : ""}`}>
      {/* Conditionally render the Sidebar */}
      {isLoggedIn && <Sidebar />}

      <div className="app-main">
        <Header />
        <main className="app-content">
          {children}
        </main>
        <Footer />
      </div>

      <LoginModal />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}