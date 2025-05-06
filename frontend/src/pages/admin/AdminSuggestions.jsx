import React from "react";
export const suggestions = [
  {
    _id: "s1",
    content: "Replace 'employees' with 'team members'",
    user: { name: "Bob Smith" },
  },
  {
    _id: "s2",
    content: "Add a conclusion section",
    user: { name: "Carol Danvers" },
  },
];

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/shared/Navbar";
const AdminSuggestions = () => {
  return (
    <div>
      <div>
        <div>
          {suggestions.map((s) => (
            <Card key={s._id}>
              <CardHeader>
                <CardTitle>{s.content}</CardTitle>
                <CardDescription>Suggested by: {s.user.name}</CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button onClick={() => handleAccept(s._id)} variant="success">
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(s._id)}
                  variant="destructive"
                >
                  Reject
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSuggestions;
