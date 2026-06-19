"use client";

import { Button, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { User } from "@heroui/user";

const hiringRequests = [
  {
    id: "REQ-001",
    client: {
      name: "Eleanor Vance",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    date: "2023-10-24",
    fee: "$5,000.00",
    summary: "Intellectual property dispute re...",
    status: "Pending",
  },
  {
    id: "REQ-002",
    client: {
      name: "Marcus Thorne",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    },
    date: "2023-10-22",
    fee: "$12,500.00",
    summary: "Corporate restructuring and em...",
    status: "Accepted",
    subStatus: "PAYMENT READY",
  },
  {
    id: "REQ-003",
    client: {
      name: "Acme Corp Ltd.",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    date: "2023-10-18",
    fee: "$2,000.00",
    summary: "Drafting standard NDA template...",
    status: "Declined",
  },
];

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Declined: "danger",
};

export default function HiringHistoryPage() {
  const renderCell = (request, columnKey) => {
    switch (columnKey) {
      case "client":
        return (
          <User
            avatarProps={{ radius: "lg", src: request.client.avatar }}
            name={request.client.name}
          />
        );
      case "date":
        return <span className="text-sm text-gray-600">{request.date}</span>;
      case "fee":
        return <span className="text-sm font-medium">{request.fee}</span>;
      case "summary":
        return <span className="text-sm text-gray-500">{request.summary}</span>;
      case "status":
        return (
          <div className="flex flex-col gap-1 items-start">
            <Chip
              className="capitalize"
              color={statusColorMap[request.status]}
              size="sm"
              variant="flat"
            >
              {request.status}
            </Chip>
            {request.subStatus && (
              <span className="text-[10px] font-bold text-[#A48039] uppercase tracking-wider flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 4H3C1.89 4 1 4.89 1 6v12c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H3V6h18v12zm-9-2h2v-2h-2v2zm0-4h2V7h-2v5z" />
                </svg>
                {request.subStatus}
              </span>
            )}
          </div>
        );
      case "actions":
        if (request.status === "Pending") {
          return (
            <div className="flex items-center gap-2">
              <Button isIconOnly variant="light" color="success" aria-label="Accept" size="sm" className="text-green-600 hover:bg-green-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </Button>
              <Button isIconOnly variant="light" color="danger" aria-label="Reject" size="sm" className="text-red-600 hover:bg-red-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </Button>
            </div>
          );
        } else if (request.status === "Accepted") {
          return (
            <Button size="sm" className="bg-[#A48039] text-white font-medium hover:bg-[#8e6e30] rounded-sm px-6">
              Details
            </Button>
          );
        } else {
          return <span className="text-sm text-gray-400 italic">Archived</span>;
        }
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Hiring Requests</h1>
          <p className="text-gray-600 text-sm">Review and manage incoming consultation and representation inquiries.</p>
        </div>
      </div>

      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 bg-[#EAECE8] text-xs font-mono px-4 py-1.5 text-gray-500 rounded-br-lg z-10 border-b border-r border-white/50">
          LEDGER-409A
        </div>
        <Table
          aria-label="Hiring requests table"
          classNames={{
            wrapper: "bg-[#F3F5F2] p-0 shadow-none rounded-none pt-12",
            th: "bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6",
            td: "px-6 py-4 border-b border-gray-200/60",
            table: "min-w-full",
          }}
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column>CLIENT</Table.Column>
                <Table.Column>DATE ISSUED</Table.Column>
                <Table.Column>RETAINER FEE</Table.Column>
                <Table.Column>SUMMARY</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                {hiringRequests.map((item) => (
                  <Table.Row key={item.id} className="hover:bg-white/40 transition-colors">
                    <Table.Cell>{renderCell(item, "client")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "date")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "fee")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "summary")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "status")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "actions")}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <div className="flex w-full justify-between items-center px-6 py-4 bg-[#F3F5F2]">
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                Showing 1 to 3 of 12 requests
              </span>
              <div className="flex gap-2 text-gray-400">
                <button className="hover:text-[#0A2519]">&lt;</button>
                <button className="hover:text-[#0A2519]">&gt;</button>
              </div>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}