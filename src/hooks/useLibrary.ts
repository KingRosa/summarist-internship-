"use client";
import { useCallback, useEffect, useState } from "react";

// 1. Alias the imported function as 'removeFromStorage' to avoid naming conflicts
import { 
  LibraryBook, 
  getLibraryBooks, 
  addBook, 
  removeBook as removeFromStorage, 
  toggleBook, 
  isBookSaved 
} from "@/utils/libraryStorage";

export default function useLibrary() {
  const [books, setBooks] = useState<LibraryBook[]>([]);

  const refresh = useCallback(() => {
    setBooks(getLibraryBooks());
  }, []);

  useEffect(() => {
    refresh();

    function handleStorage() {
      refresh();
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  function saveBook(book: LibraryBook) {
    addBook(book);
    refresh();
  }

  // 2. This function now calls the imported utility, not itself
  function removeBook(id: string) {
    removeFromStorage(id);
    refresh();
  }

  function toggleSavedBook(book: LibraryBook) {
    toggleBook(book);
    refresh();
  }

  function bookIsSaved(id: string) {
    return isBookSaved(id);
  }

  return {
    books,
    saveBook,
    removeBook,
    toggleSavedBook,
    bookIsSaved,
    refresh,
  };
}


















