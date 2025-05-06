"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  FileText,
  UserPlus,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function GettingStarted() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="bg-cyan-600 hover:bg-cyan-700 font-semibold text-xl"
        >
          Get Started
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh] overflow-y-auto px-6 py-6 max-w-xl mx-auto rounded-t-lg">
        <DrawerHeader>
          <DrawerTitle className="text-4xl font-bold text-orange-600">
            Get Started with TeamScript
          </DrawerTitle>
          <DrawerDescription className="text-cyan-700">
            Follow these easy steps to start collaborating.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-6 mt-4">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <UserPlus className="text-cyan-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">
                Step 1: Sign Up & Log In
              </h3>
              <p className="text-muted-foreground text-sm">
                Create your account, choose your role (Admin or Member), and log
                in to your dashboard.
              </p>
            </div>
          </div>

          <Separator />

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <FileText className="text-cyan-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">
                Step 2: Create or Join a Document
              </h3>
              <p className="text-muted-foreground text-sm">
                Admins can create documents. Members can join shared ones.
                Everything is version-controlled.
              </p>
            </div>
          </div>

          <Separator />

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <MessageCircle className="text-cyan-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">
                Step 3: Suggest Edits & Comment
              </h3>
              <p className="text-muted-foreground text-sm">
                Select text to suggest edits or leave comments. Collaborate with
                your team effectively.
              </p>
            </div>
          </div>

          <Separator />

          {/* Step 4 */}
          <div className="flex gap-4 items-start">
            <Sparkles className="text-cyan-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">
                Step 4: Use AI Suggestions
              </h3>
              <p className="text-muted-foreground text-sm">
                Let AI help you generate, rewrite, or polish content. Boost
                productivity and quality.
              </p>
            </div>
          </div>

          <Separator />

          {/* Done */}
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="text-green-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">You’re All Set!</h3>
              <p className="text-muted-foreground text-sm">
                Start collaborating, tracking versions, and creating amazing
                documents with your team.
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
