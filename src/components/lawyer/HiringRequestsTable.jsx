"use client";

import { Button, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getLawyerHiringReq, updateHiringReqStatus } from "@/lib/api/lawyer/lawyer";

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Declined: "danger",
  Rejected: "danger",
};

export default function HiringRequestsTable({ sessionUser }) {
  const [hiringRequests, setHiringRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      if (sessionUser?.email) {
        const data = await getLawyerHiringReq(sessionUser.email);
        setHiringRequests(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hiring requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [sessionUser]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateHiringReqStatus(id, status);
      toast.success(`Request ${status.toLowerCase()}`);
      fetchRequests(); // Refresh the data
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const renderCell = (request, columnKey) => {
    switch (columnKey) {
      case "client":
        return <span className="text-sm font-medium text-[#0A2519]">{request.userName}</span>;
      case "date":
        return <span className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleDateString()}</span>;
      case "fee":
        return <span className="text-sm font-medium">${request.fee}</span>;
      case "status":
        return (
          <div className="flex flex-col gap-1 items-start">
            <Chip
              className="capitalize"
              color={statusColorMap[request.status] || "default"}
              size="sm"
              variant="flat"
            >
              {request.status}
            </Chip>
          </div>
        );
      case "actions":
        if (request.status === "Pending") {
          return (
            <div className="flex items-center gap-2">
              <Button onPress={() => handleStatusUpdate(request._id, "Accepted")} isIconOnly variant="light" color="success" aria-label="Accept" size="sm" className="text-green-600 hover:bg-green-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </Button>
              <Button onPress={() => handleStatusUpdate(request._id, "Rejected")} isIconOnly variant="light" color="danger" aria-label="Reject" size="sm" className="text-red-600 hover:bg-red-50">
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
    <div className="flex flex-col gap-6 w-full">
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
          className="bg-[#F3F5F2] p-0 shadow-none rounded-none pt-12 min-h-[200px] min-w-full"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader className="bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6">CLIENT</Table.Column>
                <Table.Column className="bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6">DATE ISSUED</Table.Column>
                <Table.Column className="bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6">RETAINER FEE</Table.Column>
                <Table.Column className="bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6">STATUS</Table.Column>
                <Table.Column className="bg-[#F3F5F2] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6">ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body isLoading={isLoading} items={hiringRequests} emptyContent={isLoading ? "Loading..." : "No hiring requests found."}>
                {(item) => (
                  <Table.Row key={item._id} className="hover:bg-white/40 transition-colors">
                    <Table.Cell className="px-6 py-4 border-b border-gray-200/60">{renderCell(item, "client")}</Table.Cell>
                    <Table.Cell className="px-6 py-4 border-b border-gray-200/60">{renderCell(item, "date")}</Table.Cell>
                    <Table.Cell className="px-6 py-4 border-b border-gray-200/60">{renderCell(item, "fee")}</Table.Cell>
                    <Table.Cell className="px-6 py-4 border-b border-gray-200/60">{renderCell(item, "status")}</Table.Cell>
                    <Table.Cell className="px-6 py-4 border-b border-gray-200/60">{renderCell(item, "actions")}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
