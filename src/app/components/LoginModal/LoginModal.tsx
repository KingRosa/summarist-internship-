"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

// Import pre-initialized auth from your firebase library file
import { auth } from "../../../lib/firebase"; 
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

import { useAuth } from "@/app/context/AuthContext";
import "./LoginModal.css";

export default function LoginModal() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const {
    isLoginOpen,
    isRegisterMode,
    closeLogin,
    switchToLogin,
    switchToRegister,
    login,
    register,
    guestLogin,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Google Login Handler
  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, provider);
      closeLogin();
      router.push("/for-you");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  }

  // Forgot Password Handler
  async function handleForgotPassword() {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      if (isRegisterMode) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        await register(email, password);
      } else {
        await login(email, password);
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      closeLogin();
      router.push("/for-you");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  async function handleGuestLogin() {
    await guestLogin();
    closeLogin();
    router.push("/for-you");
  }

  if (!isLoginOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeLogin}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLogin}>✕</button>

        <h2>{isRegisterMode ? "Create your account" : "Log in to Summarist"}</h2>

        <button className="login-social-btn" onClick={handleGuestLogin}>
          <FaUser />
          <span>Login as Guest</span>
        </button>

        <div className="modal-divider"><span>or</span></div>

        <button className="google-social-btn" onClick={handleGoogleLogin}>
          <FcGoogle />
          <span>Login with Google</span>
        </button>

        <div className="modal-divider"><span>or</span></div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegisterMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="submit-btn" type="submit">
            {isRegisterMode ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="modal-footer">
          {!isRegisterMode && (
            <button className="forgot-password" type="button" onClick={handleForgotPassword}>
              Forgot your password?
            </button>
          )}

          <p className="switch-auth">
            {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
            <button type="button" onClick={isRegisterMode ? switchToLogin : switchToRegister}>
              {isRegisterMode ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}