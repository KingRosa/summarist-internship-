"use client"; // Required to use hooks in the page

import HomeHero from "./components/HomeHero/HomeHero";
import Features from "./components/Features/Features";
import Statistics from "./components/Statistics/Statistics";
import Reviews from "./components/Reviews/Reviews";
import Numbers from "./components/Numbers/Numbers";
import SelectedBook from "./components/SelectedBook/SelectedBook";
import BookList from "./components/BookList/BookList";
import { useAuth } from "./context/AuthContext"; // Import your hook

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <HomeHero />
      <Features />
      <Statistics />
      <Reviews />
      <Numbers />

      {/* Only show the book sections if the user is logged in */}
      {isLoggedIn ? (
        <>
          <SelectedBook />
          <BookList
            title="Recommended For You"
            status="recommended"
          />
          <BookList
            title="Suggested Books"
            status="suggested"
          />
        </>
      ) : (
        // Optional: Add a message or keep it empty for logged-out users
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Please log in to view our book library.</p>
        </div>
      )}
    </>
  );
}