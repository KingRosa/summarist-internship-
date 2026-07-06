"use client";

import Link from "next/link";
import Image from "next/image";

import useAudioDuration from "@/hooks/useAudioDuration";
import formatDuration from "@/utils/formatDuration";

import "./BookCard.css";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  averageRating: number;
  totalRating: number;
  audioLink?: string;
  subscriptionRequired: boolean;
  keyIdeas: number;
  type: string;
  status: string;
  // REMOVED: duration prop from here, as the component calculates it
}

export default function BookCard({
  id,
  title,
  author,
  subTitle,
  imageLink,
  averageRating,
  totalRating,
  audioLink,
  subscriptionRequired,
  keyIdeas,
  type,
  status,
  // REMOVED: duration from here
}: BookCardProps) {
  // This hook provides the 'duration' variable
  const { duration, loading } = useAudioDuration(audioLink);

  return (
    <Link href={`/book/${id}`} className="book-card">
      <figure className="book-card__image">
        <Image
          src={imageLink}
          alt={title}
          width={172}
          height={260}
          className="book-card__img"
        />
      </figure>

      <div className="book-card__content">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">{author}</p>
        <p className="book-card__subtitle">{subTitle}</p>

        <div className="book-card__footer">
          <span className="book-card__rating">
            ⭐ {averageRating.toFixed(1)}
          </span>
          <span className="book-card__reviews">
            ({totalRating})
          </span>
          <span className="book-card__duration">
            {loading ? "-- mins" : formatDuration(duration)}
          </span>
        </div>
      </div>
    </Link>
  );
}

















