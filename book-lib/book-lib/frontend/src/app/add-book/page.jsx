"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Ensure uuid is installed
import axios from "axios";

const genres = ["Select Genre", "Fiction", "Non-fiction", "History"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(["Select Genre", "Fiction", "Non-fiction", "History"]),
  publishedDate: z.string().refine(
    (val) => {
      const today = new Date().toISOString().split("T")[0];
      return val <= today;
    },
    {
      message: "Published date cannot be in the future",
    }
  ),
  isAvailable: z.boolean().default(true),
});

export default function AddBookForm() {
  // Inside the component
  const today = new Date().toISOString().split("T")[0];
  const [bookId] = useState(uuidv4());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAvailable: true,
    },
  });

  const onSubmit = async (data) => {
    const bookData = {
      ...data,
    };

    try {
      const res = await axios.post("http://127.0.0.1:5000/books", bookData);
      console.log("Book added successfully:", res.data);

      // Optional: redirect or reset form
      window.location.href = "/list-books";
      toast.success("Book added!");
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[620px] bg-gray-50 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-6 p-6 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Add a New Book</h2>

        <div>
          <Label htmlFor="title" className="pb-2">
            Title
          </Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-600 text-sm ">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author" className="pb-2">
            Author
          </Label>
          <Input id="author" {...register("author")} />
          {errors.author && (
            <p className="text-red-600 text-sm">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="genre" className="pb-2">
            Genre
          </Label>
          <Select
            onValueChange={(val) => setValue("genre", val)}
            defaultValue="Select Genre"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && (
            <p className="text-red-600 text-sm">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="publishedDate" className="pb-2">
            Published Date
          </Label>
          <Input
            id="publishedDate"
            type="date"
            max={today} // ✅ restrict future dates at UI level
            {...register("publishedDate")}
          />
          {errors.publishedDate && (
            <p className="text-red-600 text-sm">
              {errors.publishedDate.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isAvailable"
            defaultChecked
            onCheckedChange={(val) => setValue("isAvailable", Boolean(val))}
          />
          <Label htmlFor="isAvailable">Available</Label>
        </div>

        <Button type="submit" className="w-full">
          Add Book
        </Button>
      </form>
    </div>
  );
}
