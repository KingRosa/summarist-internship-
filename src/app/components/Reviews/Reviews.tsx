"use client";

import { FaStar } from "react-icons/fa";

import "./Reviews.css";

const reviews = [
  {
    name: "Sarah",
    review:
      "Summarist has completely changed how I learn. I can finish an entire book summary during my commute.",
  },
  {
    name: "Michael",
    review:
      "The audio summaries are fantastic. I can absorb new ideas while exercising or driving.",
  },
  {
    name: "Emily",
    review:
      "Perfect for busy professionals. I’ve learned more in the past month than I did all last year.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="container">
        <div className="row">

          <h2 className="section__title">
            What our members say
          </h2>

          <div className="reviews__wrapper">

            {reviews.map((review, index) => (
              <div
                className="review"
                key={index}
              >
                <div className="review__header">

                  <strong>{review.name}</strong>

                  <div className="review__stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                </div>

                <p className="review__body">
                  {review.review}
                </p>
              </div>
            ))}

          </div>

          <div className="reviews__btn--wrapper">
            <button className="btn home__cta--btn">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}