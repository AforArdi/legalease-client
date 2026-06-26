"use client";

import { Table, Button } from "@heroui/react";
import { Copy } from '@gravity-ui/icons';
import toast from "react-hot-toast";

export default function AllTransactionsTable({ transactions }) {
  const validTransactions = Array.isArray(transactions) ? transactions : [];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Transaction ID copied to clipboard!");
  };

  const renderCell = (transaction, columnKey) => {
    switch (columnKey) {
      case "transactionId": {
        const fullId = transaction.transactionId || "N/A";
        // Format: show first 8 chars... then last 4 chars (e.g., cs_test_...abcd)
        const shortId = fullId.length > 15
          ? `${fullId.substring(0, 10)}...${fullId.substring(fullId.length - 4)}`
          : fullId;

        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-600" title={fullId}>
              {shortId}
            </span>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-gray-400 hover:text-gray-800 min-w-8 w-8 h-8"
              onPress={() => handleCopy(fullId)}
              aria-label="Copy Transaction ID"
            >
              <Copy width={16} height={16} />
            </Button>
          </div>
        );
      }
      case "userEmail":
        return <span className="text-sm text-[#0A2519]">{transaction.userEmail}</span>;
      case "lawyerEmail":
        return <span className="text-sm text-[#0A2519]">{transaction.lawyerEmail}</span>;
      case "amount":
        return <span className="text-sm font-medium text-gray-800">${transaction.fee}</span>;
      case "date": {
        let displayDate = "N/A";
        if (transaction.createdAt) {
          const dateStr = typeof transaction.date === 'string' ? transaction.createdAt : String(transaction.createdAt);
          displayDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.substring(0, 10);
        }
        return <span className="text-sm text-gray-500">{displayDate}</span>;
      }
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-x-auto">
        <Table aria-label="Transactions Table" className="bg-[#F3F5F2] min-w-max md:min-w-full rounded-none">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>TRANSACTION ID</Table.Column>
                <Table.Column>USER EMAIL</Table.Column>
                <Table.Column>LAWYER EMAIL</Table.Column>
                <Table.Column>AMOUNT</Table.Column>
                <Table.Column>DATE</Table.Column>
              </Table.Header>
              <Table.Body items={validTransactions} emptyContent="No transactions found.">
                {(item) => (
                  <Table.Row key={item._id || item.transactionId || Math.random()} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <Table.Cell>{renderCell(item, "transactionId")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "userEmail")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "lawyerEmail")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "amount")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "date")}</Table.Cell>
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