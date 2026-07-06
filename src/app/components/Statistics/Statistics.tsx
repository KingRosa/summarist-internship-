"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

import PricingTop from "../../summarist-home-page/assets/pricing-top.png";

import "./Statistics.css";

export default function Statistics() {
  return (
    <section id="statistics">
      <div className="container">
        <div className="row">

          {/* First Row */}

          <div className="statistics__wrapper">

            <div className="statistics__content--header">

              <h2 className="statistics__heading statistics__heading--active">
                Enhance your knowledge
              </h2>

              <h2 className="statistics__heading">
                Achieve greater success
              </h2>

              <h2 className="statistics__heading">
                Improve your health
              </h2>

              <h2 className="statistics__heading">
                Develop better parenting skills
              </h2>

              <h2 className="statistics__heading">
                Increase happiness
              </h2>

              <h2 className="statistics__heading">
                Be the best version of yourself!
              </h2>

            </div>

            <div className="statistics__content--details">

              <div className="statistics__data">
                <FaCheckCircle className="statistics__data--number" />
                <p className="statistics__data--title">
                  Expand your learning with summaries from bestselling nonfiction books.
                </p>
              </div>

              <div className="statistics__data">
                <FaCheckCircle className="statistics__data--number" />
                <p className="statistics__data--title">
                  Learn in just a few minutes instead of spending hours reading.
                </p>
              </div>

              <div className="statistics__data">
                <FaCheckCircle className="statistics__data--number" />
                <p className="statistics__data--title">
                  Available in both text and audio formats.
                </p>
              </div>

            </div>

          </div>

          {/* Pricing Image */}

          <div className="statistics__image">

            <Image
              src={PricingTop}
              alt="Pricing"
              className="statistics__pricing-image"
            />

          </div>

        </div>
      </div>
    </section>
  );
}