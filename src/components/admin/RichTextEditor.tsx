'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { convertToWebP, resizeImage, generateFilePath } from '@/lib/imageUtils';
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaListUl, FaListOl, FaQuoteLeft, FaImage, FaLink,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaHeading, FaUndo, FaRedo, FaCode,
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm prose-stone max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  });

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor || !supabase) return;

    try {
      const resized = await resizeImage(file, 1200, 1200);
      const webp = await convertToWebP(resized);
      const path = generateFilePath('blog', webp.name);

      const { error } = await supabase.storage
        .from('site-media')
        .upload(path, webp, { contentType: 'image/webp', upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from('site-media').getPublicUrl(path);

      await supabase.from('media_library').insert({
        file_name: webp.name,
        file_url: data.publicUrl,
        file_size: webp.size,
        mime_type: 'image/webp',
        folder: 'blog',
      });

      editor.chain().focus().setImage({ src: data.publicUrl, alt: file.name.replace(/\.[^/.]+$/, '') }).run();
    } catch (err) {
      alert('Image upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter URL:', editor.getAttributes('link').href || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return <div className="h-[400px] bg-stone-50 rounded-xl animate-pulse" />;

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title?: string }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
        active ? 'bg-teal-100 text-teal-700' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-stone-200 bg-stone-50 px-2 py-1.5 flex flex-wrap gap-0.5">
        {/* Text formatting */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <FaBold />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <FaItalic />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <FaUnderline />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <FaStrikethrough />
        </ToolBtn>

        <div className="w-px bg-stone-200 mx-1" />

        {/* Headings */}
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <span className="font-bold text-[10px]">H2</span>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <span className="font-bold text-[10px]">H3</span>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive('heading', { level: 4 })} title="Heading 4">
          <FaHeading className="w-3 h-3" />
        </ToolBtn>

        <div className="w-px bg-stone-200 mx-1" />

        {/* Lists */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <FaListUl />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
          <FaListOl />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
          <FaQuoteLeft />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <FaCode />
        </ToolBtn>

        <div className="w-px bg-stone-200 mx-1" />

        {/* Alignment */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <FaAlignLeft />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <FaAlignCenter />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <FaAlignRight />
        </ToolBtn>

        <div className="w-px bg-stone-200 mx-1" />

        {/* Media */}
        <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Add Link">
          <FaLink />
        </ToolBtn>
        <ToolBtn onClick={() => fileInputRef.current?.click()} title="Insert Image (auto WebP)">
          <FaImage />
        </ToolBtn>

        <div className="w-px bg-stone-200 mx-1" />

        {/* Undo/Redo */}
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <FaUndo />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <FaRedo />
        </ToolBtn>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </div>
  );
}
