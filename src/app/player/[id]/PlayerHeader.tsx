"use client" 
import Image from "next/image"





interface PlayerHeaderProps{
    imageLink: string, 
    title: string, 
    author: string, 
    
    averageRating: number, 
    totalRating: number, 
}


export default function PlayerHeader({
  imageLink,
  title,
  author,
  averageRating,
  totalRating,
}: PlayerHeaderProps) {
  return (
    <aside className="player__sidebar">

      <Image
  src={imageLink}
  alt={title}
  width={300}
  height={450}
  className="player__cover"
  priority
  // Add these styles to ensure the image behaves on mobile
  style={{
    width: "100%",
    height: "auto",
    maxWidth: "300px" // Keeps it at 300px on desktop but allows it to shrink on mobile
  }}
/>

      <h1 className="player__title">
        {title}
      </h1>

      <h2 className="player__author">
        {author}
      </h2>

      <div className="player__meta">

        <span>
          ⭐ {averageRating.toFixed(1)}
        </span>

        <span>
          {totalRating} Ratings
        </span>

      </div>

    </aside>
  );
}


















