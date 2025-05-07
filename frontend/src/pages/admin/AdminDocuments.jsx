import React from "react";

export const documents = [
  {
    _id: "doc1",
    title: "Company Guidelines",
    status: "Published",
    updatedAt: "2025-05-04T12:00:00Z",
  },
  {
    _id: "doc2",
    title: "Onboarding Manual",
    status: "Draft",
    updatedAt: "2025-05-03T10:30:00Z",
  },
  {
    _id: "doc3",
    title: "Marketing Strategy",
    status: "Review",
    updatedAt: "2025-05-01T08:45:00Z",
  },
];
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/shared/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
const AdminDocuments = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p>54</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p>7</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p>32</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc._id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{doc.status}</Badge>
                </TableCell>
                <TableCell>date</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="sm">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to={"/editor"}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Assign</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDocuments;
