"use client" 
import { FaBolt, FaBookOpen, FaFile, FaLightbulb } from "react-icons/fa"
import "./Features.css"; 

export default function Features() {
    const features = [
        {
            icon: <FaBolt />,
        title: "Enhance your knowledge", 
        description: "Build better habits with practical ideas from bestselling books.",

        },

        {
            icon: <FaBookOpen />,
            title: "Achieve greater success",
            description: "Build better habits with practical ideas from bestselling books.",

        },

        {
            icon: <FaLightbulb />,
            title: "Improve your thinking", 
            description: "Discover powerful concepts in just a few minutes.",

        },

    ];

    return (
        <section id="features">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        Understand books in minutes 
                    </h2>

                    <div className="features__wrapper">
                        {features.map((feature, index) => (
              <div
                className="features"
                key={index}
              >
                <div className="features__icon">
                  {feature.icon}
                </div>

                <h3 className="features__title">
                  {feature.title}
                </h3>

                <p className="features__sub--title">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
    );

    
}

























