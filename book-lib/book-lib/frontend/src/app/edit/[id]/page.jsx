"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedDate: "",
    isAvailable: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/books/edit/${id}`);
        const { title, author, genre, publishedDate, isAvailable } = res.data;
        setFormData({
          title,
          author,
          genre,
          publishedDate: publishedDate.slice(0, 10),
          isAvailable,
        });
      } catch (err) {
        setError("Failed to load book data.");
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/books/edit/${id}`, formData);
      router.push("/list-books");
      toast.success("Book Updated!");
    } catch (err) {
      setError("Failed to update book.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-28 p-6 border rounded shadow ">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="pb-2">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="author" className="pb-2">
            Author
          </Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="genre" className="pb-2">
            Genre
          </Label>
          <Select
            value={formData.genre}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, genre: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Non-fiction">Non-fiction</SelectItem>
              <SelectItem value="History">History</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="publishedDate" className="pb-2">
            Published Date
          </Label>
          <Input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="isAvailable"
            name="isAvailable"
            checked={formData.isAvailable}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isAvailable: !!checked }))
            }
          />
          <Label htmlFor="isAvailable">Available</Label>
        </div>

        <Button type="submit" className="w-full">
          Update Book
        </Button>
      </form>
    </div>
  );
}
