"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";

import SelectedBook from "@/app/components/SelectedBook/SelectedBook";
import BookList from "@/app/components/BookList/BookList";

export default function ForYouPage() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <SelectedBook />

      <BookList
        title="Recommended For You"
        status="recommended"
      />

      <BookList
        title="Suggested Books"
        status="suggested"
      />
    </>
  );
}





















