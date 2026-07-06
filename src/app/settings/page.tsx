"use client";

import { useAuth } from "@/app/context/AuthContext";
import "./Settings.css";

export default function Settings() {
  const { user, hasSubscription, activateSubscription } = useAuth();

  if (!user) {
    return (
      <div className="settings">
        <div className="container">
          <p>Please log in to view your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="settings">
      <div className="container">
        <h1>Settings</h1>

        <div className="settings__card">
          <h3>Account Information</h3>
          
          <div className="settings__info-group">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
          
         <div className="settings__info-group">
  <label>Subscription Status</label>
  <p className="settings__status">
    {hasSubscription ? "Premium Plan" : "Free Plan"}
  </p>
  
  {!hasSubscription && (
    <button 
      className="settings__upgrade-btn" 
      onClick={activateSubscription}
    >
      Upgrade to Premium
    </button>
  )}
</div>
        </div>
      </div>
    </section>
  );
}