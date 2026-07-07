"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BillingToggle from "./BillingToggle";
import PlanCard from "./PlanCard";
import FeatureComparison from "./FeatureComparison";
import "./ChoosePlan.css";
import { useAuth } from "../../context/AuthContext"; // Ensure path is correct
export default function ChoosePlan({ bookId }: { bookId?: string }) {
  const router = useRouter();
  const { activateSubscription } = useAuth(); // 1. Access the function
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("premium");

 function handleContinue() {
  activateSubscription();

  const pendingBook = localStorage.getItem(
    "summarist-pending-book"
  );

  if (pendingBook) {
    localStorage.removeItem(
      "summarist-pending-book"
    );

    router.push(`/player/${pendingBook}`);

    return;
  }

  router.push("/for-you");
}

  const basicPrice = billing === "monthly" ? "$7.99" : "$79.99";
  const premiumPrice = billing === "monthly" ? "$12.99" : "$129.99";

  return (
    <section className="choose-plan">
      <div className="choose-plan__container">
        <h1 className="choose-plan__title">Choose Your Plan</h1>
        <BillingToggle billing={billing} setBilling={setBilling} />
        
        <div className="choose-plan__plans">
          <PlanCard 
            title="Basic" 
            price={basicPrice} 
            billing={billing} 
            active={selectedPlan === "basic"} 
            onClick={() => setSelectedPlan("basic")} 
            // Ensure features is passed as an empty array if not defined
            features={["Unlimited Reading", "Text Summaries", "Mobile Access"]} 
          />
          
          <PlanCard 
            title="Premium" 
            badge="MOST POPULAR" 
            price={premiumPrice} 
            billing={billing} 
            active={selectedPlan === "premium"} 
            onClick={() => setSelectedPlan("premium")} 
            features={["Unlimited Reading", "Unlimited Listening", "Offline Audio", "New Releases", "Priority Access"]} 
          />
        </div>

        <FeatureComparison />
        
        <button className="continue-btn" onClick={handleContinue}>
          Continue to Checkout →
        </button>
      </div>
    </section>
  );
}