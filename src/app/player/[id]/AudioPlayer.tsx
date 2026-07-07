"use client";

import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioLink: string;
  isPlaying: boolean;
  currentTime: number;
  playbackRate: number;
  onDurationChange: (duration: number) => void;
  onTimeUpdate: (time: number) => void;
}

export default function AudioPlayer({
  audioLink,
  isPlaying,
  currentTime,
  playbackRate,
  onDurationChange,
  onTimeUpdate,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // 1. Handle Play/Pause with safety check
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 2. Seek control
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  // 3. Playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // 4. Ensure component resets if link changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioLink]);

  return (
    <audio
      ref={audioRef}
      src={audioLink}
      preload="metadata"
      onLoadedMetadata={() =>
        onDurationChange(audioRef.current?.duration ?? 0)
      }
      onTimeUpdate={() =>
        onTimeUpdate(audioRef.current?.currentTime ?? 0)
      }
    />
  );
}