"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  email: string;
  password: string;
  isGuest?: boolean;

  hasSubscription?: boolean;
}

interface AuthContextType {
  user: User | null;

  isLoggedIn: boolean;
  hasSubscription: boolean;

  isLoginOpen: boolean;
  isRegisterMode: boolean;

  openLogin: () => void;
  closeLogin: () => void;

  switchToLogin: () => void;
  switchToRegister: () => void;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    email: string,
    password: string
  ) => Promise<void>;

  guestLogin: () => Promise<void>;

  logout: () => void;

  activateSubscription: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [hasSubscription, setHasSubscription] =
    useState(false);

  const [isLoginOpen, setIsLoginOpen] =
    useState(false);

  const [isRegisterMode, setIsRegisterMode] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("summarist-user");

    if (!storedUser) return;

    const parsed = JSON.parse(storedUser);

    setUser(parsed);

    setIsLoggedIn(true);

    setHasSubscription(
      parsed.hasSubscription ?? false
    );
  }, []);

  function saveUser(user: User) {
    localStorage.setItem(
      "summarist-user",
      JSON.stringify(user)
    );

    setUser(user);

    setIsLoggedIn(true);

    setHasSubscription(
      user.hasSubscription ?? false
    );
  }

  function openLogin() {
    setIsRegisterMode(false);
    setIsLoginOpen(true);
  }

  function closeLogin() {
    setIsLoginOpen(false);
  }

  function switchToRegister() {
    setIsRegisterMode(true);
  }

  function switchToLogin() {
    setIsRegisterMode(false);
  }

  async function login(
    email: string,
    password: string
  ) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    const users: User[] = JSON.parse(
      localStorage.getItem("summarist-users") ||
        "[]"
    );

    const existingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!existingUser) {
      throw new Error("User not found");
    }

    saveUser(existingUser);

    setIsLoginOpen(false);
  }

  async function register(
    email: string,
    password: string
  ) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    if (password.length < 6) {
      throw new Error(
        "Password must be at least 6 characters."
      );
    }

    const users: User[] = JSON.parse(
      localStorage.getItem("summarist-users") ||
        "[]"
    );

    const exists = users.find(
      (user) => user.email === email
    );

    if (exists) {
      throw new Error(
        "User already exists"
      );
    }

    const newUser: User = {
      email,
      password,
      hasSubscription: false,
    };

    users.push(newUser);

    localStorage.setItem(
      "summarist-users",
      JSON.stringify(users)
    );

    saveUser(newUser);

    setIsLoginOpen(false);
  }

  async function guestLogin() {
    const guestUser: User = {
      email: "guest@summarist.com",
      password: "",
      isGuest: true,
      hasSubscription: false,
    };

    saveUser(guestUser);

    setIsLoginOpen(false);
  }

  function activateSubscription() {
    if (!user) return;

    const updatedUser = {
      ...user,
      hasSubscription: true,
    };

    localStorage.setItem(
      "summarist-user",
      JSON.stringify(updatedUser)
    );

    const users: User[] = JSON.parse(
      localStorage.getItem("summarist-users") ||
        "[]"
    );

    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email
        ? updatedUser
        : u
    );

    localStorage.setItem(
      "summarist-users",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);

    setHasSubscription(true);
  }

  function logout() {
    localStorage.removeItem(
      "summarist-user"
    );

    setUser(null);

    setIsLoggedIn(false);

    setHasSubscription(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        isLoggedIn,

        hasSubscription,

        isLoginOpen,

        isRegisterMode,

        openLogin,

        closeLogin,

        switchToLogin,

        switchToRegister,

        login,

        register,

        guestLogin,

        logout,

        activateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}