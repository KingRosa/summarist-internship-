"use client";

interface BillingToggleProps {
  billing: "monthly" | "yearly";
  setBilling: React.Dispatch<
    React.SetStateAction<"monthly" | "yearly">
  >;
}

export default function BillingToggle({
  billing,
  setBilling,
}: BillingToggleProps) {
  return (
    <div className="billing-toggle">

      <button
        type="button"
        className={`billing-toggle__option ${
          billing === "monthly"
            ? "billing-toggle__option--active"
            : ""
        }`}
        onClick={() => setBilling("monthly")}
      >
        Monthly
      </button>

      <button
        type="button"
        className={`billing-toggle__option ${
          billing === "yearly"
            ? "billing-toggle__option--active"
            : ""
        }`}
        onClick={() => setBilling("yearly")}
      >
        Yearly

        <span className="billing-toggle__save">
          Save 17%
        </span>

      </button>

    </div>
  );
}