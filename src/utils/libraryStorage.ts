export interface LibraryBook {
    id: string,
    title: string, 
    author: string, 
    subTitle: string, 
    imageLink: string, 

    averageRating: number, 
    totalRating: number, 
    duration: number, 

    audioLink?: string, 
    
    subscriptionRequired: boolean, 

    keyIdeas: number,

    type: string, 
    summary: string, 
    bookDescription: string, 
    authorDescription: string, 

    tags: string[]; 
}

const STORAGE_KEY = "summarist-library";

/**
 * Get every saved book
 */
export function getLibraryBooks(): LibraryBook[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load library:", error);

    return [];
  }
}

/**
 * Save all books
 */
function saveLibraryBooks(books: LibraryBook[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(books)
  );
}

/**
 * Add a book
 */
export function addBook(book: LibraryBook) {
  const books = getLibraryBooks();

  const alreadyExists = books.some(
    (item) => item.id === book.id
  );

  if (alreadyExists) {
    return;
  }

  books.push(book);

  saveLibraryBooks(books);
}

/**
 * Remove a book
 */
export function removeBook(id: string) {
  const books = getLibraryBooks().filter(
    (book) => book.id !== id
  );

  saveLibraryBooks(books);
}

/**
 * Check if saved
 */
export function isBookSaved(id: string) {
  return getLibraryBooks().some(
    (book) => book.id === id
  );
}

/**
 * Toggle save/remove
 */
export function toggleBook(book: LibraryBook) {
  if (isBookSaved(book.id)) {
    removeBook(book.id);
  } else {
    addBook(book);
  }
}

/**
 * Clear library
 */
export function clearLibrary() {
  localStorage.removeItem(STORAGE_KEY);
}