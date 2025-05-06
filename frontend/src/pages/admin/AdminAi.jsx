import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
export const aiTools = [
  { id: "ai1", label: "Generate Summary" },
  { id: "ai2", label: "Grammar Check" },
  { id: "ai3", label: "Rewrite Section" },
];

const AdminAi = () => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="outline">Generate Summary</Button>
          <Button variant="outline">Grammar Check</Button>
          <Button variant="outline">Rewrite Section</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAi;
