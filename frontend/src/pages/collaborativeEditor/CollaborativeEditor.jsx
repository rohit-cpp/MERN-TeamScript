import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // or your backend URL

const CollaborativeEditor = () => {
  const { id: docId } = useParams();
  const [content, setContent] = useState("");
  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.emit("join-document", docId);

    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.disconnect();
    };
  }, [docId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("send-changes", { docId, content: value });
    }, 300);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-cyan-800">
        Collaborative Editor
      </h2>
      <textarea
        className="min-h-[300px] w-full resize-none "
        value={content}
        onChange={handleChange}
        placeholder="Start editing with your team..."
      />
    </div>
  );
};

export default CollaborativeEditor;
