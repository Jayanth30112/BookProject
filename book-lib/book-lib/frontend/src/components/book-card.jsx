"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function BookCard({ book, onUpdate, onDelete }) {
  const { id, title, author, genre, publishedDate, isAvailable } = book;

  return (
    <Card className="w-full max-w-md shadow-md flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-sm text-gray-500">By {author}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm">
          <span className="font-medium">Book ID:</span> {id}
        </div>
        <div className="text-sm">
          <span className="font-medium">Genre:</span> {genre}
        </div>
        <div className="text-sm">
          <span className="font-medium">Published Date:</span> {publishedDate}
        </div>
        <div className="text-sm">
          <span className="font-medium">Availability:</span>{" "}
          <Badge variant={isAvailable ? "default" : "destructive"}>
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={() => onUpdate(id)}>
            <Pencil className="w-4 h-4 mr-1" /> Update
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
