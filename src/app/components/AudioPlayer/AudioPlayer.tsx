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

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <audio
      ref={audioRef}
      src={audioLink}
      preload="metadata"
      onLoadedMetadata={() => onDurationChange(audioRef.current?.duration ?? 0)}
      onTimeUpdate={() => onTimeUpdate(audioRef.current?.currentTime ?? 0)}
    />
  );
}