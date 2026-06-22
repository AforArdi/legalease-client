"use client";

import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ServerPagination({ totalPages, currentPage }) {
  const router = useRouter();

  if (!totalPages || totalPages <= 1) return null;

  const setPage = (p) => {
    router.push(`?page=${p}`);
  };

  return (
    <Pagination className="justify-center mt-8">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={currentPage === 1} onPress={() => setPage(currentPage - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === currentPage} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next isDisabled={currentPage === totalPages} onPress={() => setPage(currentPage + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
