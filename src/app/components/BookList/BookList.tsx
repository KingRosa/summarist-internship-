"use client";

import { useEffect, useState } from "react";

import BookCard from "../BookCard/BookCard";
import BookSkeleton from "../BookSkeleton/BookSkeleton";

import {
  getBooks,
  BookCardData,
} from "../../services/book";

import "./BookList.css";

interface BookListProps {
  title: string;
  status: string;
}

export default function BookList({
  title,
  status,
}: BookListProps) {
  const [books, setBooks] = useState<BookCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);

        const data = await getBooks(status);

        console.log("Books:", data);

        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [status]);

  return (
    <section className="book-list">

      <div className="book-list__header">
        <h2 className="book-list__title">
          {title}
        </h2>
      </div>

      <div className="book-list__row">

        {loading ? (

          Array.from({ length: 6 }).map((_, index) => (
            <BookSkeleton key={index} />
          ))

        ) : (

          books.map((book) => (
  <BookCard
    key={book.id}
    id={book.id}
    title={book.title}
    author={book.author}
    subTitle={book.subTitle}
    imageLink={book.imageLink}
    averageRating={book.averageRating}
    totalRating={book.totalRating}
    audioLink={book.audioLink}
    subscriptionRequired={book.subscriptionRequired}
    keyIdeas={book.keyIdeas}
    type={book.type}
    status={book.status}
  />
))
         

        )}

      </div>

    </section>
  );
}