"use client";

import {
  FaBookOpen,
  FaRegLightbulb,
  FaStar,
} from "react-icons/fa";

import "./Numbers.css";

export default function Numbers() {
  return (
    <section id="numbers">
      <div className="container">
        <div className="row">

          <div className="numbers">

            <h2 className="section__title">
              Start growing with Summarist now
            </h2>

            <div className="numbers__wrapper">

              {/* Books */}

              <div className="numbers__card">

                <div className="numbers__icon">
                  <FaBookOpen />
                </div>

                <h3 className="numbers__title">
                  20+
                </h3>

                <p className="numbers__sub--title">
                  New book summaries every week
                </p>

              </div>

              {/* Ideas */}

              <div className="numbers__card">

                <div className="numbers__icon">
                  <FaRegLightbulb />
                </div>

                <h3 className="numbers__title">
                  1,000+
                </h3>

                <p className="numbers__sub--title">
                  Powerful ideas summarized
                </p>

              </div>

              {/* Reviews */}

              <div className="numbers__card">

                <div className="numbers__icon numbers__star--icon">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <h3 className="numbers__title">
                  4.8 / 5
                </h3>

                <p className="numbers__sub--title">
                  Average member rating
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}