import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";

export default function DocumentLayout() {
  return (
    <div>
      <Navbar />

      <div className="p-6 space-y-4 mt-10">
        <Outlet />
      </div>
    </div>
  );
}
