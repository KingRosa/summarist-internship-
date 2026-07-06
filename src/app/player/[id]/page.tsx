"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PlayerHeader from "../[id]/PlayerHeader";
import ReadingPane from "../[id]/ReadingPane";
import AudioControls from "./AudioControls";
import ProgressBar from "./ProgressBar";
import AudioPlayer from "./AudioPlayer";



import {
  getBook,
  BookDetailsData,
} from "../../services/book";

import "./Player.css";




export default function PlayerPage() {
  const params = useParams();

  const id = params.id as string;

  const [book, setBook] =
    useState<BookDetailsData | null>(null);

  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [playbackRate, setPlaybackRate] = useState(1);


const [duration, setDuration] = useState(0);

function handleSeek(time: number) {
  setCurrentTime(time);
}


  function handlePlayPause() {
  setIsPlaying((prev) => !prev);
}

function handleSkipForward() {
  setCurrentTime((prev) =>
    Math.min(prev + 10, duration)
  );
}

function handleSkipBackward() {
  setCurrentTime((prev) =>
    Math.max(prev - 10, 0)
  );
}

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await getBook(id);

        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadBook();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="player-loading">

        <div className="player-loading__spinner" />

      </section>
    );
  }

  if (!book) {
    return (
      <section className="player-error">

        <h2>Book not found.</h2>

      </section>
    );
  }

  return (
    <section className="player">

      <div className="player__container">

        {/* LEFT */}

       <PlayerHeader
  imageLink={book.imageLink}
  title={book.title}
  author={book.author}
  averageRating={book.averageRating}
  totalRating={book.totalRating}
/>
        {/* RIGHT */}

        <main className="player__content">

    <ReadingPane
  bookId={book.id}
  title="Summary"
  summary={book.summary}
/>

          {/* AUDIO CONTROLS */}

          <AudioControls
  isPlaying={isPlaying}
  onPlayPause={handlePlayPause}
  onSkipForward={handleSkipForward}
  onSkipBackward={handleSkipBackward}
/>

          {/* PROGRESS */}

         <ProgressBar
  currentTime={currentTime}
  duration={duration}
  onSeek={handleSeek}
/>

<AudioPlayer
  audioLink={book.audioLink}
  isPlaying={isPlaying}
  currentTime={currentTime}
  playbackRate={playbackRate}
  onDurationChange={setDuration}
  onTimeUpdate={setCurrentTime}
/>

          {/* SPEED */}

          <div className="player__speed">

            <button>0.5x</button>

            <button className="active">
              1x
            </button>

            <button>1.25x</button>

            <button>1.5x</button>

            <button>2x</button>

          </div>

          {/* FONT */}

          <div className="player__font">

            <button>A−</button>

            <button>A</button>

            <button>A+</button>

          </div>

        </main>

      </div>

    </section>

    
  );
}










