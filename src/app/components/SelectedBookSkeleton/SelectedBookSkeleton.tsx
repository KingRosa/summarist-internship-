"use client";

import "./SelectedBookSkeleton.css";

export default function SelectedBookSkeleton() {
  return (
    <section className="selected-book-skeleton">

      <div className="selected-book-skeleton__image" />

      <div className="selected-book-skeleton__content">

        <div className="selected-book-skeleton__author" />

        <div className="selected-book-skeleton__title" />

        <div className="selected-book-skeleton__stats" />

        <div className="selected-book-skeleton__paragraph" />
        <div className="selected-book-skeleton__paragraph short" />

        <div className="selected-book-skeleton__buttons">

          <div className="selected-book-skeleton__button" />
          <div className="selected-book-skeleton__button secondary" />

        </div>

      </div>

    </section>
  );
}