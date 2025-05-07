import React from "react";

const comments = [
  {
    id: 1,
    user: "John Doe",
    message: "Great update on the AI feature!",
    date: "2025-05-05",
  },
  {
    id: 2,
    user: "Jane Smith",
    message: "Please fix the document upload bug.",
    date: "2025-05-04",
  },
  {
    id: 3,
    user: "Alex Johnson",
    message: "Loved the new suggestions panel!",
    date: "2025-05-03",
  },
];

const AdminComment = () => {
  return (
    <div>
      <div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Comments
          </h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">
                    {comment.user}
                  </span>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-600">{comment.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComment;
