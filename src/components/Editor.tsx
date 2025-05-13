import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <div className="border-b border-white/10 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("bold") ? "bg-white/20" : ""
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("italic") ? "bg-white/20" : ""
          }`}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("underline") ? "bg-white/20" : ""
          }`}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("link") ? "bg-white/20" : ""
          }`}
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-white/10 transition-colors"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("bulletList") ? "bg-white/20" : ""
          }`}
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("orderedList") ? "bg-white/20" : ""
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: "left" }) ? "bg-white/20" : ""
          }`}
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: "center" }) ? "bg-white/20" : ""
          }`}
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${
            editor.isActive({ textAlign: "right" }) ? "bg-white/20" : ""
          }`}
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-white/10 transition-colors"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-white/10 transition-colors"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
};

export default Editor;
