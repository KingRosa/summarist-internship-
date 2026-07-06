"use client";

import { useEffect, useRef, useState } from "react";

interface ReadingPaneProps {
  bookId: string;
  title: string;
  summary: string;
}

export default function ReadingPane({
  bookId,
  title,
  summary,
}: ReadingPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [fontSize, setFontSize] = useState(20);

  const fontKey = `reading-font-${bookId}`;
  const scrollKey = `reading-scroll-${bookId}`;

  // Restore font size
  useEffect(() => {
    const savedFont = localStorage.getItem(fontKey);

    if (savedFont) {
      setFontSize(Number(savedFont));
    }
  }, [fontKey]);

  // Restore scroll position
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const savedScroll = localStorage.getItem(scrollKey);

    if (savedScroll) {
      requestAnimationFrame(() => {
        container.scrollTop = Number(savedScroll);
      });
    }
  }, [scrollKey]);

  // Save scroll position
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      localStorage.setItem(
        scrollKey,
        container.scrollTop.toString()
      );
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [scrollKey]);

  function updateFont(size: number) {
    setFontSize(size);
    localStorage.setItem(fontKey, size.toString());
  }

  function increaseFont() {
    updateFont(Math.min(fontSize + 2, 34));
  }

  function decreaseFont() {
    updateFont(Math.max(fontSize - 2, 14));
  }

  function resetFont() {
    updateFont(20);
  }

  const paragraphs = summary
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <section className="reading-pane">

      <div className="reading-pane__header">

        <h2 className="reading-pane__title">
          {title}
        </h2>

        <div className="reading-pane__font">

          <button
            onClick={decreaseFont}
            aria-label="Decrease font size"
          >
            A-
          </button>

          <button
            onClick={resetFont}
            aria-label="Reset font size"
          >
            A
          </button>

          <button
            onClick={increaseFont}
            aria-label="Increase font size"
          >
            A+
          </button>

        </div>

      </div>

      <div
        ref={containerRef}
        className="reading-pane__content"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>

    </section>
  );
}