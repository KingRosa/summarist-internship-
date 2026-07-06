import SelectedBook from "@/app/components/SelectedBook/SelectedBook";
import BookList from "@/app/components/BookList/BookList";

export default function ForYouPage() {
  return (
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
  );
}






















