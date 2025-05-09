import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState } from "react";
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
  Minus,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RichTextEditor({ content, setContent }) {
  const [showToolbar, setShowToolbar] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: content || "",
    onUpdate: ({ editor }) => {
      const plainText = editor.getText();
      setContent(plainText);
    },
  });

  const toggle = (fn) => () => editor && fn();

  if (!editor) return null;

  return (
    <div
      className="relative border border-muted rounded-lg p-4"
      onClick={() => setShowToolbar(true)}
    >
      {showToolbar && (
        <div className="flex gap-2 flex-wrap mb-4">
          <Button
            title="Bold"
            onClick={toggle(() => editor.chain().focus().toggleBold().run())}
            variant={editor.isActive("bold") ? "default" : "outline"}
          >
            <Bold size={16} />
          </Button>
          <Button
            title="Italic"
            onClick={toggle(() => editor.chain().focus().toggleItalic().run())}
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
            onClick={toggle(() => editor.chain().focus().toggleStrike().run())}
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
          {/* <Button
            title="Horizontal Rule"
            onClick={toggle(() =>
              editor.chain().focus().setHorizontalRule().run()
            )}
          >
            <Minus size={16} />
          </Button> */}
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
      )}

      <div className="min-h-[200px] overflow-y-auto border border-gray-200 rounded-md px-4 py-2 ">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>
    </div>
  );
}
