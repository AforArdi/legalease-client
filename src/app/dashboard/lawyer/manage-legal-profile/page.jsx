"use client";

import {
  Table,
  Button,
  Input,
  Chip
} from "@heroui/react";
import { Textarea } from "@heroui/input";
import Image from "next/image";

const currentOfferings = [
  {
    id: "SRV-001",
    service: "Corporate Restructuring",
    category: "Corporate Law",
    fee: "$450/hr",
    availability: "AVAILABLE",
  },
  {
    id: "SRV-002",
    service: "Intellectual Property Dispute",
    category: "Litigation",
    fee: "$500/hr",
    availability: "AVAILABLE",
  },
  {
    id: "SRV-003",
    service: "Startup Consultation Package",
    category: "Advisory",
    fee: "$1200 Flat",
    availability: "UNPUBLISHED",
  },
  {
    id: "SRV-004",
    service: "Contract Drafting & Review",
    category: "Corporate Law",
    fee: "$350/hr",
    availability: "AVAILABLE",
  },
];

export default function ManageLegalProfilePage() {
  const renderCell = (service, columnKey) => {
    switch (columnKey) {
      case "service":
        return <span className="text-sm font-semibold text-[#0A2519]">{service.service}</span>;
      case "category":
        return <span className="text-sm text-gray-600">{service.category}</span>;
      case "fee":
        return <span className="text-sm font-medium">{service.fee}</span>;
      case "availability":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={service.availability === "AVAILABLE" ? "success" : "default"}
            className="text-[10px] tracking-widest font-mono"
          >
            {service.availability}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-4 text-sm">
            {service.availability === "UNPUBLISHED" ? (
              <button className="text-[#0A2519] font-bold hover:underline">Publish</button>
            ) : (
              <button className="text-[#A48039] font-bold hover:underline">Edit</button>
            )}
            <button className="text-gray-500 hover:text-red-600 transition-colors">Delete</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-10 p-6 md:p-10 w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Manage Legal Profile</h1>
        <p className="text-gray-600 text-sm">Define your professional offerings and fee schedule.</p>
      </div>

      {/* Update Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* Left Sidebar: Photo & Status */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#0A2519] mb-4 bg-gray-100">
              <Image
                src="https://i.ibb.co/2z3YTpG/phero-logo.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-[#0A2519]">Jane Doe</h3>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Senior Partner</p>

            <Button variant="light" size="sm" className="mt-4 text-gray-600 hover:text-[#0A2519]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Update Photo
            </Button>
          </div>

          <div className="bg-[#F3F5F2] p-4 rounded-lg border border-gray-200/60">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold">Account Status:</span>
              <span className="text-xs font-medium text-[#0A2519]">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold">Member Since:</span>
              <span className="text-xs font-medium text-gray-600">Oct 2021</span>
            </div>
          </div>
        </div>

        {/* Right Form: Personal Details */}
        <div className="flex-1 w-full bg-white border-t-2 border-[#A48039] p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-xl rounded-tr-xl">
          <h2 className="text-xl font-bold text-[#0A2519] mb-6">Personal Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input
              label="Full Name"
              labelPlacement="outside"
              placeholder="Jane Doe"
              defaultValue="Jane Doe"
              variant="bordered"
              radius="none"
              classNames={{ inputWrapper: "border-gray-300 shadow-none rounded-none" }}
            />
            <Input
              label={
                <div className="flex justify-between items-center w-full">
                  <span>Email Address</span>
                  <span className="text-[10px] text-gray-400 font-mono">{"{Archival}"}</span>
                </div>
              }
              labelPlacement="outside"
              placeholder="jane.doe@lexmarket.com"
              defaultValue="jane.doe@lexmarket.com"
              variant="bordered"
              radius="none"
              classNames={{ inputWrapper: "border-gray-300 shadow-none rounded-none" }}
            />
            <Input
              label="Phone Number"
              labelPlacement="outside"
              placeholder="+1 (555) 123-4567"
              defaultValue="+1 (555) 123-4567"
              variant="bordered"
              radius="none"
              classNames={{ inputWrapper: "border-gray-300 shadow-none rounded-none" }}
            />
            <Input
              label="Location (Office)"
              labelPlacement="outside"
              placeholder="New York, NY"
              defaultValue="New York, NY"
              variant="bordered"
              radius="none"
              classNames={{ inputWrapper: "border-gray-300 shadow-none rounded-none" }}
            />
          </div>

          <h2 className="text-xl font-bold text-[#0A2519] mb-6">Professional Biography</h2>

          <div className="flex gap-4">
            <span className="text-sm font-medium text-gray-700 w-32 shrink-0 pt-2">Biography Overview</span>
            <Textarea
              variant="bordered"
              radius="none"
              minRows={5}
              defaultValue="Specializing in corporate litigation and intellectual property disputes. Over 15 years of experience managing high-stakes negotiations for Fortune 500 companies."
              classNames={{ inputWrapper: "border-gray-300 shadow-none rounded-none" }}
            />
          </div>

          <div className="w-full h-px bg-gray-200 my-8"></div>

          <div className="flex justify-end items-center gap-4">
            <Button variant="light" className="font-medium text-gray-600 hover:text-[#0A2519]">Cancel</Button>
            <Button className="bg-transparent border border-gray-300 rounded-none font-medium hover:bg-gray-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Manage Services Section */}
      <div className="w-full relative shadow-sm border border-gray-100 rounded-lg overflow-hidden mt-8">
        <div className="absolute top-0 left-0 bg-white text-[10px] font-mono px-4 py-1 text-gray-500 rounded-br-lg z-10 border border-gray-200">
          SERVICE_LEDGER_001
        </div>

        <Table
          aria-label="Manage Services table"
          classNames={{
            wrapper: "bg-[#F9F9F9] p-0 shadow-none rounded-none pt-12",
            th: "bg-[#F9F9F9] text-gray-500 font-medium tracking-widest uppercase text-xs border-b border-gray-200 py-4 px-6",
            td: "px-6 py-4 border-b border-gray-200/60 bg-white",
            table: "min-w-full",
          }}
          topContent={
            <div className="flex justify-between items-center w-full px-6 pb-2 border-b border-gray-200 bg-[#F9F9F9]">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0A2519]">Current Offerings</span>
              <Button size="sm" variant="light" className="text-[#0A2519] font-bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Entry
              </Button>
            </div>
          }
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column>SERVICE</Table.Column>
                <Table.Column>CATEGORY</Table.Column>
                <Table.Column>FEE</Table.Column>
                <Table.Column>AVAILABILITY</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body>
                {currentOfferings.map((item) => (
                  <Table.Row key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <Table.Cell>{renderCell(item, "service")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "category")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "fee")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "availability")}</Table.Cell>
                    <Table.Cell>{renderCell(item, "actions")}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}