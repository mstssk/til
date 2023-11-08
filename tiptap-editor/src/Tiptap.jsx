import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document,Text],
    // content: "<p>Hello World! 🌎️</p>",
    content:"Hellow World! 🌏"
  });
  // editor.on("update", ({ editor }) => {
  //   console.log(editor.getHTML());
  // });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
