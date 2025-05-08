import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentForm from "./DocumentForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetMyTeamsQuery } from "@/store/api/teamApi";

const DocumentFormPage = () => {
  const navigate = useNavigate();
  const { data: teamsData } = useGetMyTeamsQuery();
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const handleViewDocs = () => {
    if (selectedTeamId) {
      navigate(`/document/manage/${selectedTeamId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div>
          {/* Card 1: Create Document */}
          <DocumentForm
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
            onSuccess={() => {}} // no redirect
          />
        </div>
        <div>
          {/* Card 2: View All Documents */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>View All Documents for a Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team" />
                </SelectTrigger>
                <SelectContent>
                  {teamsData?.teams?.map((team) => (
                    <SelectItem key={team._id} value={team._id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleViewDocs}
                disabled={!selectedTeamId}
                className="w-full"
              >
                View Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentFormPage;
