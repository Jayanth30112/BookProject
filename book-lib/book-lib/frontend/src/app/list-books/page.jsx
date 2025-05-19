"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "@/components/book-card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/books");
      setBooks(res.data);
    } catch (err) {
      setError("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleUpdate = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/books/${id}`);
      toast.warning("Book Deleted!");

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete book");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-4">Library Books</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={{
              id: book._id,
              title: book.title,
              author: book.author,
              genre: book.genre,
              publishedDate: book.publishedDate.slice(0, 10),
              isAvailable: book.isAvailable,
            }}
            onUpdate={() => handleUpdate(book._id)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
