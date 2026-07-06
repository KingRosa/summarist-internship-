"use client";

import {
  FaCheckCircle,
  FaBook,
  FaHeadphones,
  FaCloudDownloadAlt,
  FaMobileAlt,
  FaStar,
  FaClock,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBook />,
    title: "Unlimited Reading",
    description:
      "Read as many book summaries as you want without limits.",
  },
  {
    icon: <FaHeadphones />,
    title: "Unlimited Audio",
    description:
      "Listen to every available audiobook summary anytime.",
  },
  {
    icon: <FaCloudDownloadAlt />,
    title: "Offline Listening",
    description:
      "Download summaries and enjoy them without an internet connection.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Read Anywhere",
    description:
      "Access your library across desktop, tablet, and mobile devices.",
  },
  {
    icon: <FaStar />,
    title: "Premium Library",
    description:
      "Unlock every premium summary and exclusive collection.",
  },
  {
    icon: <FaClock />,
    title: "New Releases",
    description:
      "Get access to newly added summaries every week.",
  },
  {
    icon: <FaSyncAlt />,
    title: "Sync Progress",
    description:
      "Your reading and listening progress follows you across devices.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Cancel Anytime",
    description:
      "No contracts. Upgrade or cancel your membership whenever you want.",
  },
];

export default function FeatureComparison() {
  return (
    <section className="feature-comparison">

      <h2 className="feature-comparison__title">
        Why Upgrade?
      </h2>

      <p className="feature-comparison__subtitle">
        Everything included with your membership.
      </p>

      <div className="feature-comparison__grid">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="feature-comparison__card"
          >

            <div className="feature-comparison__icon">
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}