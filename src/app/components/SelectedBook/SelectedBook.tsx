"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  FaStar,
  FaBookOpen,
  FaPlay,
  FaRegClock,
} from "react-icons/fa";

import { api } from "@/app/services/api";
import { useAuth } from "@/app/context/AuthContext";

import useAudioDuration from "@/hooks/useAudioDuration";
import formatDuration from "@/utils/formatDuration";

import SelectedBookSkeleton from "../SelectedBookSkeleton/SelectedBookSkeleton";

import "./SelectedBook.css";

interface Book {
  id: string;

  title: string;
  author: string;
  subTitle: string;

  summary: string;

  averageRating: number;
  totalRating: number;

  duration: number;

  imageLink: string;

  audioLink?: string;

  subscriptionRequired: boolean;

  keyIdeas: number;

  type: string;

  bookDescription: string;

  authorDescription: string;

  tags: string[];
}

export default function SelectedBook() {
  const router = useRouter();

  const {
    isLoggedIn,
    openLogin,
  } = useAuth();

  const [book, setBook] = useState<Book | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSelectedBook() {
      try {
        setLoading(true);
        
        const { data } = await api.get(
          "/getBooks?status=selected"
          
        );
        console.log("Selected Book API:", data[0]);

        setBook(data[0]);
      } catch (error) {
        console.error(
          "Failed to fetch selected book:",
          error
          
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedBook();
  }, []);

  const {
    duration,
    loading: durationLoading,
  } = useAudioDuration(book?.audioLink);

  function handleRead() {
    if (!book) return;

    if (!isLoggedIn) {
      openLogin();
      return;
    }

    

    router.push(`/player/${book.id}`);
  }

  function handleListen() {
  if (!book) return;

  if (!isLoggedIn) {
    openLogin();
    return;
  }

  if (book.subscriptionRequired) {
    localStorage.setItem(
      "summarist-pending-book",
      book.id
    );

    router.push("/choose-plan");
    return;
  }

  router.push(`/player/${book.id}`);
}
  if (loading) {
    return <SelectedBookSkeleton />;
  }

  if (!book) {
    return null;
  }

  return (
    <section className="selected-book">

      <h2 className="selected-book__heading">
        Selected just for you
      </h2>

      <div className="selected-book__card">

        <div className="selected-book__image">

          <Image
            src={book.imageLink}
            alt={book.title}
            width={220}
            height={320}
            priority
          />

          {book.subscriptionRequired && (
            <div className="selected-book__premium">
              PREMIUM
            </div>
          )}

        </div>

        <div className="selected-book__content">

          <p className="selected-book__author">
            {book.author}
          </p>

          <h2 className="selected-book__title">
            {book.title}
          </h2>

          <p className="selected-book__subtitle">
            {book.subTitle}
          </p>

          <div className="selected-book__stats">

            <span>
              <FaStar />
              {book.averageRating.toFixed(1)}
            </span>

            <span>
              ({book.totalRating.toLocaleString()} Ratings)
            </span>

            <span>
              <FaRegClock />

              {durationLoading
                ? "-- mins"
                : formatDuration(duration)}
            </span>

          </div>

          <p className="selected-book__description">
            {book.summary}
          </p>

          <div className="selected-book__buttons">

            <button
              className="primary-btn"
              onClick={handleRead}
            >
              <FaBookOpen />

              <span>Read Now</span>
            </button>

            {book.audioLink && (
              <button
                className="secondary-btn"
                onClick={handleListen}
              >
                <FaPlay />

                <span>Listen</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}




























