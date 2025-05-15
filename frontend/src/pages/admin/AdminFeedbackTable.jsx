import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Star, Loader2 } from "lucide-react";
import { useGetAllFeedbackQuery } from "@/store/api/feedbackApi";

const AdminFeedbackTable = () => {
  const { data, isLoading } = useGetAllFeedbackQuery();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 overflow-x-auto">
      <div className="text-3xl sm:text-5xl font-semibold text-center mb-6 underline">
        Users who gave <span className="text-cyan-800 font-bold">Feedback</span>
      </div>

      <div className="text-xl sm:text-2xl font-semibold mb-6 text-purple-800">
        Total Users:{" "}
        <span className="font-bold ml-2 text-cyan-700">
          {data?.feedbacks?.length || 0}
        </span>
      </div>

      <Table className="min-w-[700px] w-full">
        <TableCaption>A list of all user feedbacks</TableCaption>
        <TableHeader>
          <TableRow className="text-base sm:text-lg">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Feedback</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.feedbacks?.map((item) => (
            <TableRow key={item._id} className="text-sm sm:text-base">
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill={i < item.rating ? "#facc15" : "none"}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>{item.createdAt?.split("T")[0]}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-60 text-sm">
                    <div className="font-semibold text-gray-800 mb-1">
                      Feedback:
                    </div>
                    <div className="text-gray-600 whitespace-pre-line">
                      {item.feedback}
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminFeedbackTable;
