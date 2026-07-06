"use client";

import "./Help.css";

export default function Help() {
  const faqs = [
    { q: "How do I update my account details?", a: "Go to the Settings page and click on 'Edit' next to your information." },
    { q: "Can I cancel my subscription at any time?", a: "Yes, you can manage or cancel your subscription directly from the Settings page." },
    { q: "Is there a free trial available?", a: "We offer a limited free plan, but you can upgrade to Premium for full access to all features." },
  ];

  return (
    <section className="help">
      <div className="container">
        <h1>Help & Support</h1>
        <p>How can we help you today?</p>
        
        <div className="help__card">
          <h3>Frequently Asked Questions</h3>
          <ul className="help__faq-list">
            {faqs.map((faq, index) => (
              <li key={index} className="help__faq-item">
                <h4 className="help__faq-question">{faq.q}</h4>
                <p className="help__faq-answer">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}