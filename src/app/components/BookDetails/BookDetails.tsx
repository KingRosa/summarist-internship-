"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FaStar,
  FaRegClock,
  FaPlay,
  FaBookOpen,
  FaBookmark,
} from "react-icons/fa";

import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";

import { BookDetailsData } from "@/app/services/book";
import { useAuth } from "@/app/context/AuthContext";

import BookList from "../BookList/BookList";

import useAudioDuration from "@/hooks/useAudioDuration";
import formatDuration from "@/utils/formatDuration";

import "./BookDetails.css";

import {
  addBook,
  getLibraryBooks,
} from "@/utils/libraryStorage";

interface BookDetailsProps {
  book: BookDetailsData;
}

export default function BookDetails({
  book,
}: BookDetailsProps) {
  const router = useRouter();

  const {
    isLoggedIn,
    openLogin,
  } = useAuth();

  const {
    duration,
    loading,
  } = useAudioDuration(book.audioLink);

  const [isBookSaved, setIsBookSaved] =
    useState(false);

  useEffect(() => {
    const savedBooks = getLibraryBooks();

    const exists = savedBooks.some(
      (saved) => saved.id === book.id
    );

    setIsBookSaved(exists);
  }, [book]);

  function handleRead() {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    router.push(`/player/${book.id}`);
  }

  function handleListen() {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    router.push(`/player/${book.id}`);
  }

  function handleBookmark() {
    if (!isLoggedIn) {
      openLogin();
      return;
    }

    // FIX: Construct a new object that includes duration
    // to satisfy the LibraryBook type requirement
    const bookToSave = {
      ...book,
      duration: duration,
    };

    addBook(bookToSave);

    setIsBookSaved(true);
  }

  return (
    <section className="book-details">
      <div className="book-details__container">
        {/* LEFT */}
        <aside className="book-details__left">
          <Image
            src={book.imageLink}
            alt={book.title}
            width={300}
            height={450}
            priority
            className="book-details__image"
          />

          {book.subscriptionRequired && (
            <div className="book-details__premium">
              PREMIUM
            </div>
          )}
        </aside>

        {/* RIGHT */}
        <div className="book-details__right">
          <p className="book-details__type">
            {book.type}
          </p>

          <h1 className="book-details__title">
            {book.title}
          </h1>

          <h2 className="book-details__subtitle">
            {book.subTitle}
          </h2>

          <p className="book-details__author">
            by {book.author}
          </p>

          {/* STATS */}
          <div className="book-details__stats">
            <div className="book-details__stat">
              <FaStar />
              <span>
                {book.averageRating.toFixed(1)}
              </span>
            </div>

            <div className="book-details__stat">
              <IoPeopleOutline />
              <span>
                {book.totalRating.toLocaleString()} Ratings
              </span>
            </div>

            <div className="book-details__stat">
              <FaRegClock />
              <span>
                {loading
                  ? "-- mins"
                  : formatDuration(duration)}
              </span>
            </div>

            <div className="book-details__stat">
              <HiOutlineLightBulb />
              <span>
                {book.keyIdeas} Key Ideas
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="book-details__buttons">
            <button
              className="book-details__btn"
              onClick={handleRead}
            >
              <FaBookOpen />
              <span>Read</span>
            </button>

            {book.audioLink && (
              <button
                className="book-details__btn book-details__btn--secondary"
                onClick={handleListen}
              >
                <FaPlay />
                <span>Listen</span>
              </button>
            )}
          </div>

          {/* BOOKMARK */}
          <button
            className="book-details__bookmark"
            onClick={handleBookmark}
          >
            <FaBookmark />
            <span>
              {isBookSaved
                ? "Saved to My Library"
                : "Add to My Library"}
            </span>
          </button>

          {/* SUMMARY */}
          <section className="book-details__section">
            <h3>Summary</h3>
            <p>{book.summary}</p>
          </section>

          {/* ABOUT */}
          <section className="book-details__section">
            <h3>What's it about?</h3>
            <p>{book.bookDescription}</p>
          </section>

          {/* AUTHOR */}
          <section className="book-details__section">
            <h3>About the Author</h3>
            <p>{book.authorDescription}</p>
          </section>

          {/* TAGS */}
          {book.tags.length > 0 && (
            <section className="book-details__section">
              <h3>Tags</h3>
              <div className="book-details__tags">
                {book.tags.map((tag) => (
                  <span key={tag} className="book-details__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* RELATED BOOKS */}
      <div className="book-details__related">
        <BookList title="Recommended For You" status="recommended" />
        <BookList title="Suggested Books" status="suggested" />
      </div>
    </section>
  );
}