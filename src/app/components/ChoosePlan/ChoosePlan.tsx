"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BillingToggle from "./BillingToggle";
import PlanCard from "./PlanCard";
import FeatureComparison from "./FeatureComparison";

import "./ChoosePlan.css";

export default function ChoosePlan() {
  const router = useRouter();

  const [billing, setBilling] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const [selectedPlan, setSelectedPlan] = useState<
    "basic" | "premium"
  >("premium");

  function handleContinue() {
    // Stripe checkout will go here later
    router.push("/for-you");
  }

  const basicPrice =
    billing === "monthly" ? "$7.99" : "$79.99";

  const premiumPrice =
    billing === "monthly" ? "$12.99" : "$129.99";

  return (
    <section className="choose-plan">

      <div className="choose-plan__container">

        <h1 className="choose-plan__title">
          Choose Your Plan
        </h1>

        <p className="choose-plan__subtitle">
          Start listening and reading in less than a minute.
          Cancel anytime.
        </p>

        <BillingToggle
          billing={billing}
          setBilling={setBilling}
        />

        <div className="choose-plan__plans">

          <PlanCard
            title="Basic"
            price={basicPrice}
            billing={billing}
            active={selectedPlan === "basic"}
            onClick={() =>
              setSelectedPlan("basic")
            }
            features={[
              "Unlimited Reading",
              "Text Summaries",
              "Mobile Access",
            ]}
          />

          <PlanCard
            title="Premium"
            badge="MOST POPULAR"
            price={premiumPrice}
            billing={billing}
            active={selectedPlan === "premium"}
            onClick={() =>
              setSelectedPlan("premium")
            }
            features={[
              "Unlimited Reading",
              "Unlimited Listening",
              "Offline Audio",
              "New Releases",
              "Priority Access",
            ]}
          />

        </div>

        <FeatureComparison />

        <button
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue to Checkout →
        </button>

      </div>

    </section>
  );
}