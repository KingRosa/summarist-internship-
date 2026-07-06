"use client";

import { FaCheck } from "react-icons/fa";

interface PlanCardProps {
  title: string;
  price: string;
  billing: "monthly" | "yearly";
  badge?: string;
  active: boolean;
  features: string[];
  onClick: () => void;
}

export default function PlanCard({
  title,
  price,
  billing,
  badge,
  active,
  features,
  onClick,
}: PlanCardProps) {
  return (
    <button
      type="button"
      className={`plan-card ${
        active ? "plan-card--active" : ""
      }`}
      onClick={onClick}
    >
      {badge && (
        <span className="plan-card__badge">
          {badge}
        </span>
      )}

      <h2 className="plan-card__title">
        {title}
      </h2>

      <div className="plan-card__price">

        <span className="plan-card__amount">
          {price}
        </span>

        <span className="plan-card__billing">
          /{billing === "monthly" ? "month" : "year"}
        </span>

      </div>

      {billing === "yearly" && (
        <p className="plan-card__save">
          Save 17%
        </p>
      )}

      <div className="plan-card__divider" />

      <ul className="plan-card__features">

        {features.map((feature) => (

          <li key={feature}>

            <FaCheck className="plan-card__icon" />

            <span>{feature}</span>

          </li>

        ))}

      </ul>

    </button>
  );
}