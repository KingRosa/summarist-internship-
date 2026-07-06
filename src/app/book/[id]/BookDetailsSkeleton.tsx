import "./BookDetailsSkeleton.css";

export default function BookDetailsSkeleton() {
  return (
    <section className="book-details">

      <div className="container">

        <div className="skeleton-back" />

        <div className="book-details__wrapper">

          {/* Left */}

          <div className="book-details__left">

            <div className="skeleton-image" />

          </div>

          {/* Right */}

          <div className="book-details__right">

            <div className="skeleton skeleton-author" />

            <div className="skeleton skeleton-title" />

            <div className="skeleton skeleton-subtitle" />

            <div className="skeleton-row">

              <div className="skeleton skeleton-pill" />

              <div className="skeleton skeleton-pill" />

              <div className="skeleton skeleton-pill" />

            </div>

            <div className="skeleton skeleton-heading" />

            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text short" />

            <div className="skeleton-buttons">

              <div className="skeleton skeleton-button" />

              <div className="skeleton skeleton-button" />

              <div className="skeleton skeleton-button" />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}