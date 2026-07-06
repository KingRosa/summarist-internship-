"use client";

import { useEffect, useState } from "react";

import { api } from "@/app/services/api";
import BookCard from "../BookCard/BookCard";

import "./RelatedBooks.css";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  averageRating: number;
  duration: number;
  imageLink: string;
}

interface Props {
  currentBookId: string;
}

export default function RelatedBooks({
  currentBookId,
}: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await api.get(
          "/getBooks?status=recommended"
        );

        const filtered = data.filter(
          (book: Book) => book.id !== currentBookId
        );

        setBooks(filtered.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [currentBookId]);

  if (loading) {
    return (
      <section className="related-books">
        <h2>Recommended Books</h2>

        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="related-books">

      <h2 className="related-books__title">
        Recommended Books
      </h2>

      <div className="related-books__grid">

        {books.map((book) => (
          <BookCard
                key={book.id}
                id={book.id}
                image={book.imageLink}
                title={book.title}
                author={book.author}
                subtitle={book.subTitle}
                rating={book.averageRating}
                duration={book.duration} totalRating={0}          />
        ))}

      </div>

    </section>
  );
}
















