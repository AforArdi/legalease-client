"use client";

import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SearchLawyer() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    const params = new URLSearchParams(window.location.search);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/lawyers?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Input
        name="search"
        type="search"
        placeholder="Search by name..."
        className="w-64"
        aria-label="Search lawyers"
      />
      <Button
        type="submit"
        size="sm"
        className="bg-[#0A2519] text-white font-medium rounded-md px-4"
      >
        Search
      </Button>
    </form>
  );
}