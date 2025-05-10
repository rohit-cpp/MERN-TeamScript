import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";
import { useSelector } from "react-redux";
import RichTextEditor from "@/components/shared/Editor";
import RephraseContent from "../geminiAI/RephraseContent";
import GenerateTitle from "../geminiAI/GenerateTitle";
import GenerateKeywords from "../geminiAI/GenerateKeywords";
import OptimizeSEO from "../geminiAI/OptimizeSeo";

const socket = io("http://localhost:8000");

const CollaborativeEditor = () => {
  const { id: docId } = useParams();
  const [content, setContent] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [aiOutput, setAiOutput] = useState(null);
  const typingTimeout = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);
  const { data } = useGetMyTeamsQuery();
  const teams = data?.teams || [];

  useEffect(() => {
    if (!currentUser || !selectedTeam) return;

    socket.emit("join-document", {
      docId,
      username: currentUser.name,
      teamId: selectedTeam,
      profilePhoto: currentUser.profile?.profilePhoto || "",
    });

    socket.on("receive-changes", (newContent) => {
      setContent(newContent); // this sets HTML content
    });

    socket.on("active-users", (users) => setActiveUsers(users));

    return () => {
      socket.off("receive-changes");
      socket.off("active-users");
    };
  }, [docId, currentUser, selectedTeam]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    socket.emit("user-activity", { docId });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("send-changes", { docId, content: newContent }); // send HTML
    }, 300);
  };

  const updateContentWithAI = (newText) => {
    setContent(newText);
    setAiOutput(newText);
    socket.emit("send-changes", { docId, content: newText });
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen mt-18">
        <div className="w-64 border-r border-gray-300 p-4">
          <h3 className="font-semibold mb-2">Team Members</h3>
          {selectedTeam ? (
            <div className="space-y-2">
              {activeUsers.map((user, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.profilePhoto} alt={user.username} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`text-sm font-medium ${
                      user.active ? "text-green-700 font-bold" : "text-gray-700"
                    }`}
                  >
                    {user.username}
                  </span>
                  {user.active && (
                    <span className="h-2 w-2 bg-green-500 rounded-full ml-auto" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select a team to begin</p>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="mb-4 max-w-sm">
            <Select onValueChange={setSelectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h2 className="text-xl font-semibold mb-3 text-cyan-800">
            Collaborative Editor
          </h2>

          {selectedTeam && (
            <>
              <RichTextEditor
                content={content}
                setContent={handleEditorChange}
                incomingContent={content}
              />
              {/* 
              <div className="mt-6 space-y-4">
                <RephraseContent
                  text={content}
                  onResult={updateContentWithAI}
                />
                <GenerateTitle text={content} onResult={updateContentWithAI} />
                <GenerateKeywords
                  text={content}
                  onResult={updateContentWithAI}
                />
                <OptimizeSEO text={content} onResult={updateContentWithAI} />
              </div> */}

              {aiOutput && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                  <h4 className="font-medium mb-2">AI Output</h4>
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {aiOutput}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;
