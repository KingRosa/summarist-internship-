import { api } from "./api";

/* ===========================
   BOOK CARD
=========================== */

export interface BookCardData {
  id: string;

  title: string;
  author: string;
  subTitle: string;

  imageLink: string;

  averageRating: number;
  totalRating: number;

  audioLink?: string;

  subscriptionRequired: boolean;

  keyIdeas: number;

  type: string;

  status: string;
}

/* ===========================
   BOOK DETAILS
=========================== */

export interface BookDetailsData extends BookCardData {
  summary: string;

  bookDescription: string;

  authorDescription: string;

  tags: string[];
}

/* ===========================
   GET BOOKS
=========================== */

export async function getBooks(
  status: string
): Promise<BookCardData[]> {
  const { data } = await api.get(
    `/getBooks?status=${status}`
  );

  console.log("Books:", data);

  return data.map((book: any) => ({
    id: book.id,

    title: book.title,

    author: book.author,

    subTitle: book.subTitle ?? "",

    imageLink: book.imageLink,

    averageRating: Number(book.averageRating ?? 0),

    totalRating: Number(book.totalRating ?? 0),

    audioLink: book.audioLink,

    subscriptionRequired:
      book.subscriptionRequired ?? false,

    keyIdeas: Number(book.keyIdeas ?? 0),

    type: book.type ?? "",

    status: book.status ?? "",
  }));
}

/* ===========================
   GET BOOK
=========================== */

export async function getBook(
  id: string
): Promise<BookDetailsData> {
  const { data } = await api.get(
    `/getBook?id=${id}`
  );

  console.log("GET BOOK RESPONSE:", data);

  return {
    id: data.id,

    title: data.title,

    author: data.author,

    subTitle: data.subTitle ?? "",

    imageLink: data.imageLink,

    averageRating: Number(data.averageRating ?? 0),

    totalRating: Number(data.totalRating ?? 0),

    audioLink: data.audioLink,

    subscriptionRequired:
      data.subscriptionRequired ?? false,

    keyIdeas: Number(data.keyIdeas ?? 0),

    type: data.type ?? "",

    status: data.status ?? "",

    summary: data.summary ?? "",

    bookDescription:
      data.bookDescription ?? "",

    authorDescription:
      data.authorDescription ?? "",

    tags: data.tags ?? [],
  };
}































