import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  List,
  ListOrdered,
  Quote,
  Code,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RephraseContent from "@/pages/geminiAI/RephraseContent";
import GenerateTitle from "@/pages/geminiAI/GenerateTitle";
import GenerateKeywords from "@/pages/geminiAI/GenerateKeywords";
import OptimizeSEO from "@/pages/geminiAI/OptimizeSeo";

export default function RichTextEditor({
  content,
  setContent,
  incomingContent,
}) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html); // send HTML back
    },
  });

  useEffect(() => {
    if (editor && incomingContent && incomingContent !== editor.getHTML()) {
      editor.commands.setContent(incomingContent, false); // update without firing onUpdate
    }
  }, [incomingContent, editor]);

  const toggle = (fn) => () => editor && fn();

  if (!editor) return null;

  return (
    <div
      className="relative border border-muted rounded-lg p-4 space-y-6"
      onClick={() => setShowToolbar(true)}
    >
      {showToolbar && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              title="Bold"
              onClick={toggle(() => editor.chain().focus().toggleBold().run())}
              variant={editor.isActive("bold") ? "default" : "outline"}
            >
              <Bold size={16} />
            </Button>
            <Button
              title="Italic"
              onClick={toggle(() =>
                editor.chain().focus().toggleItalic().run()
              )}
              variant={editor.isActive("italic") ? "default" : "outline"}
            >
              <Italic size={16} />
            </Button>
            <Button
              title="Underline"
              onClick={toggle(() =>
                editor.chain().focus().toggleUnderline().run()
              )}
              variant={editor.isActive("underline") ? "default" : "outline"}
            >
              <UnderlineIcon size={16} />
            </Button>
            <Button
              title="Strikethrough"
              onClick={toggle(() =>
                editor.chain().focus().toggleStrike().run()
              )}
              variant={editor.isActive("strike") ? "default" : "outline"}
            >
              <Strikethrough size={16} />
            </Button>
            <Button
              title="Heading 1"
              onClick={toggle(() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              )}
              variant={
                editor.isActive("heading", { level: 1 }) ? "default" : "outline"
              }
            >
              <Heading1 size={16} />
            </Button>
            <Button
              title="Bullet List"
              onClick={toggle(() =>
                editor.chain().focus().toggleBulletList().run()
              )}
              variant={editor.isActive("bulletList") ? "default" : "outline"}
            >
              <List size={16} />
            </Button>
            <Button
              title="Ordered List"
              onClick={toggle(() =>
                editor.chain().focus().toggleOrderedList().run()
              )}
              variant={editor.isActive("orderedList") ? "default" : "outline"}
            >
              <ListOrdered size={16} />
            </Button>
            <Button
              title="Blockquote"
              onClick={toggle(() =>
                editor.chain().focus().toggleBlockquote().run()
              )}
              variant={editor.isActive("blockquote") ? "default" : "outline"}
            >
              <Quote size={16} />
            </Button>
            <Button
              title="Code Block"
              onClick={toggle(() =>
                editor.chain().focus().toggleCodeBlock().run()
              )}
              variant={editor.isActive("codeBlock") ? "default" : "outline"}
            >
              <Code size={16} />
            </Button>
            <Button
              title="Insert Link"
              onClick={() => {
                const url = window.prompt("Enter a URL");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              variant={editor.isActive("link") ? "default" : "outline"}
            >
              <LinkIcon size={16} />
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-cyan-700">AI Tools</h3>
            <div className="flex flex-wrap gap-2">
              <RephraseContent
                content={content}
                setGeneratedContent={setGeneratedContent}
              />
              <GenerateTitle
                content={content}
                setGeneratedContent={setGeneratedContent}
              />
              <GenerateKeywords
                content={content}
                setGeneratedContent={setGeneratedContent}
              />
              <OptimizeSEO
                content={content}
                setGeneratedContent={setGeneratedContent}
              />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[200px] overflow-y-auto border border-gray-200 rounded-md px-4 py-2">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>

      {generatedContent && (
        <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-md">
          <h4 className="text-md font-medium text-gray-800 mb-2">AI Output:</h4>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {generatedContent}
          </p>
        </div>
      )}
    </div>
  );
}
