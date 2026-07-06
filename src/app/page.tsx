import HomeHero from "./components/HomeHero/HomeHero";
import Features from "./components/Features/Features";
import Statistics from "./components/Statistics/Statistics";
import Reviews from "./components/Reviews/Reviews";
import Numbers from "./components/Numbers/Numbers";

import SelectedBook from "./components/SelectedBook/SelectedBook";
import BookList from "./components/BookList/BookList";

export default function Home() {
  return (
    <>
      <HomeHero />

      <Features />

      <Statistics />

      <Reviews />

      <Numbers />

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
  );
}