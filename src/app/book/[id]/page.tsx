import { notFound } from "next/navigation";

import BookDetails from "@/app/components/BookDetails/BookDetails";
import { getBook } from "../../services/book";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function BookPage({
  params,
}: PageProps) {
  const { id } = await params;

  try {
    const book = await getBook(id);

    if (!book) {
      notFound();
    }

    return <BookDetails book={book} />;
  } catch (error) {
    console.error("Failed to fetch book:", error);

    notFound();
  }

  
}















