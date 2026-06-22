"use client";

import { Table } from "@heroui/react";

export default function AllTransactionsTable({ transactions }) {

  const validTransactions = Array.isArray(transactions) ? transactions : [];

  const renderCell = (transaction, columnKey) => {
    switch (columnKey) {
      case "transactionId":
        return <span className="text-sm font-mono text-gray-600">{transaction.transactionId}</span>;
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
      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        <Table aria-label="Transactions Table" className="bg-[#F3F5F2] min-h-[200px] min-w-full rounded-none">
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
