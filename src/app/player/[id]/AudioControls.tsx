"use client";

import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
} from "react-icons/fa";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
}

export default function AudioControls({
  isPlaying,
  onPlayPause,
  onSkipForward,
  onSkipBackward,
}: AudioControlsProps) {
  return (
    <div className="audio-controls">

      <button
        className="audio-controls__button"
        onClick={onSkipBackward}
        aria-label="Skip Backward 10 Seconds"
      >
        <FaBackward />
      </button>

      <button
        className="audio-controls__play"
        onClick={onPlayPause}
        aria-label="Play Pause"
      >
        {isPlaying ? (
          <FaPause />
        ) : (
          <FaPlay />
        )}
      </button>

      <button
        className="audio-controls__button"
        onClick={onSkipForward}
        aria-label="Skip Forward 10 Seconds"
      >
        <FaForward />
      </button>

    </div>
  );
}