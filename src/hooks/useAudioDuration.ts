"use client";

import { useEffect, useState } from "react";

export default function useAudioDuration(
  audioLink?: string
) {
  const [duration, setDuration] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!audioLink) {
      setLoading(false);
      return;
    }

    const audio = new Audio(audioLink);

    const handleLoaded = () => {
      setDuration(audio.duration);
      setLoading(false);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoaded
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );
    };
  }, [audioLink]);

  return {
    duration,
    loading,
  };
}