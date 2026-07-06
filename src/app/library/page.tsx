"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

import useLibrary from "@/hooks/useLibrary";
import formatDuration from "@/utils/formatDuration";
import LibraryLogo from "../summarist-home-page/assets/login.png";
import "./Library.css";

export default function LibraryPage() {
  // 1. Updated to use deleteBook
  const { books, deleteBook } = useLibrary();

  return (
    <section className="library">
      <div className="container">
        <div className="library__header">
          <h1>My Library</h1>

          <p>
            {books.length} {books.length === 1 ? "Book" : "Books"} Saved
          </p>
        </div>

        {books.length === 0 ? (
          <div className="library__empty">
            <FaBookOpen className="library__empty-icon" />

            <h2>No books saved yet</h2>

            <p>
              <img
                src={LibraryLogo}
                alt="LibraryLogo"
                className="library-logo"
              />
            </p>

            <Link href="/for-you" className="library__browse-btn">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="library__grid">
            {books.map((book) => (
              <div key={book.id} className="library__card">
                <Link href={`/book/${book.id}`}>
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={180}
                    height={270}
                    className="library__image"
                  />
                </Link>

                <div className="library__content">
                  <p className="library__author">{book.author}</p>

                  <Link href={`/book/${book.id}`} className="library__title">
                    {book.title}
                  </Link>

                  <p className="library__subtitle">{book.subTitle}</p>

                  <div className="library__stats">
                    <span>⭐ {book.averageRating.toFixed(1)}</span>

                    <span>{book.totalRating.toLocaleString()} Ratings</span>

                    <span>{formatDuration(book.duration)}</span>
                  </div>

                  <div className="library__buttons">
                    <Link
                      href={`/player/${book.id}`}
                      className="library__read-btn"
                    >
                      Read
                    </Link>

                    {/* 2. Updated to call deleteBook */}
                    <button
                      className="library__remove-btn"
                      onClick={() => deleteBook(book.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}