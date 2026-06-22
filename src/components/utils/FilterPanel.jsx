"use client";

import { Button, Input, Label, Select, ListBox } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Corporate", "Family", "Criminal", "Intellectual Property", "Cyber"];

export default function FilterPanel() {
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const router = useRouter();

  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (availability) {
      params.set("status", availability);
    } else {
      params.delete("status");
    }
    params.delete("page");
    router.push(`/lawyers?${params.toString()}`);
  };

  const handleReset = () => {
    setCategory("");
    setAvailability("");
    router.push("/lawyers");
  };

  return (
    <div className="flex flex-wrap items-end gap-4">
      {/* Category Filter */}
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Category</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 bg-white border border-gray-200 rounded-md px-3 text-sm text-[#0A2519] outline-none focus:border-[#A48039]"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Availability</Label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="h-10 bg-white border border-gray-200 rounded-md px-3 text-sm text-[#0A2519] outline-none focus:border-[#A48039]"
        >
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
        </select>
      </div>

      {/* Action Buttons */}
      <Button
        onPress={handleApplyFilters}
        className="h-10 bg-[#0A2519] text-white font-medium text-sm rounded-md px-5"
      >
        Apply
      </Button>
      <Button
        onPress={handleReset}
        variant="light"
        className="h-10 text-gray-500 hover:text-[#0A2519] font-medium text-sm"
      >
        Reset
      </Button>
    </div>
  );
}