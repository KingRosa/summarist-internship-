"use client";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {
  return (
    <div className="progress-bar">

      <span className="progress-bar__time">
        {formatTime(currentTime)}
      </span>

      <input
        className="progress-bar__slider"
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) =>
          onSeek(Number(e.target.value))
        }
      />

      <span className="progress-bar__time">
        {formatTime(duration)}
      </span>

    </div>
  );
}