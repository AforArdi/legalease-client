"use client";

import { Button, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getMyHiringReq } from "@/lib/api/user/user";

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Declined: "danger",
  Rejected: "danger",
};

export default function UserHiringHistoryTable({ sessionUser }) {
  const [hiringRequests, setHiringRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      if (sessionUser?.email) {
        const data = await getMyHiringReq(sessionUser.email);
        setHiringRequests(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load hiring history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [sessionUser]);

  const renderCell = (request, columnKey) => {
    switch (columnKey) {
      case "lawyer":
        return <span className="text-sm font-medium text-[#0A2519]">{request.lawyerName}</span>;
      case "date":
        return <span className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleDateString()}</span>;
      case "fee":
        return <span className="text-sm font-medium">${request.fee}/HR</span>;
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
        if (request.status === "Accepted") {
          return (
            <form action={'/api/checkout_sessions'} method="POST">
              <input type="text" name="hiringReqId" value={request._id} readOnly hidden />
              <input type="text" name="lawyerName" value={request.lawyerName} readOnly hidden />
              <input type="text" name="lawyerEmail" value={request.lawyerEmail} readOnly hidden />
              <input type="number" name="fee" value={request.fee} readOnly hidden />
              <Button type="submit" size="sm" className="bg-[#A48039] text-white font-medium hover:bg-[#8e6e30] rounded-sm px-6">
                Pay Now
              </Button>
            </form>
          );
        } else {
          return <span className="text-sm text-gray-400 italic">No action available</span>;
        }
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Hiring History</h1>
          <p className="text-gray-600 text-sm">Review the status of your lawyer hiring requests.</p>
        </div>
      </div>

      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        <Table
          aria-label="User hiring history table"
          className="bg-[#F3F5F2] min-h-[200px] min-w-full rounded-none"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>LAWYER</Table.Column>
                <Table.Column>DATE SENT</Table.Column>
                <Table.Column>FEE</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body isLoading={isLoading} items={hiringRequests} emptyContent={isLoading ? "Loading..." : "No hiring requests found."}>
                {(item) => (
                  <Table.Row key={item._id} className="hover:bg-white/40 transition-colors">
                    <Table.Cell>{renderCell(item, "lawyer")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "date")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "fee")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "status")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "actions")}</Table.Cell>
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
