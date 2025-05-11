import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const socket = io("http://localhost:8000", { withCredentials: true });

export default function LiveTimeline() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    socket.on("activity-log", (activity) => {
      setActivities((prev) => [activity, ...prev.slice(0, 19)]);
    });

    return () => socket.off("activity-log");
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700">
        Live Activity Timeline
      </h2>
      <div className="relative border-l-2 border-cyan-600 pl-6 space-y-8">
        {activities.map((activity, idx) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-[15px] top-7 w-4 h-4 bg-cyan-600 rounded-full border-2 border-white group-hover:scale-110 transition" />
            <Card className="p-4 shadow-md">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-gray-900">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <Badge
                      className={cn(
                        "capitalize",
                        activity.badgeColor === "green" &&
                          "bg-green-100 text-green-700",
                        activity.badgeColor === "red" &&
                          "bg-red-100 text-red-700",
                        activity.badgeColor === "yellow" &&
                          "bg-yellow-100 text-yellow-800",
                        activity.badgeColor === "purple" &&
                          "bg-purple-100 text-purple-700"
                      )}
                    >
                      {activity.target}
                    </Badge>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.time).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
