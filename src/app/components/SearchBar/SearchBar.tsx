"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import { api } from "@/app/services/api";

import "./SearchBar.css";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

export default function SearchBar() {
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [recommended, suggested, selected] = await Promise.all([
          api.get("/getBooks?status=recommended"),
          api.get("/getBooks?status=suggested"),
          api.get("/getBooks?status=selected"),
        ]);

        const allBooks = [
          ...recommended.data,
          ...suggested.data,
          ...selected.data,
        ];

        const uniqueBooks = allBooks.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.id === book.id)
        );

        setBooks(uniqueBooks);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    }

    fetchBooks();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return [];

    return books
      .filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8);
  }, [books, search]);

  function handleSelectBook(id: string) {
    setSearch("");
    setShowDropdown(false);
    router.push(`/book/${id}`);
  }

  // New function to handle the Enter key
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (filteredBooks.length > 0) {
        handleSelectBook(filteredBooks[0].id);
      }
    }
  }

  return (
    <div className="search-bar" ref={wrapperRef}>
      <FaSearch className="search-bar__icon" />

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown} // Added this
        className="search-bar__input"
      />

      {showDropdown && filteredBooks.length > 0 && (
        <div className="search-bar__dropdown">
          {filteredBooks.map((book) => (
            <button
              key={book.id}
              className="search-bar__result"
              onClick={() => handleSelectBook(book.id)}
            >
              <Image
                src={book.imageLink}
                alt={book.title}
                width={48}
                height={70}
                className="search-bar__image"
              />

              <div className="search-bar__info">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {showDropdown && search && filteredBooks.length === 0 && (
        <div className="search-bar__dropdown">
          <div className="search-bar__empty">No books found.</div>
        </div>
      )}
    </div>
  );
}