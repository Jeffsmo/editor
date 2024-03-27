import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";

function EditorBox() {
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1
        }
      }
    ]
  };

  const ejInstance = useRef(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      }
    });
    ejInstance.current = editor;
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };

  }, []);

  return (
    <div id="editorjs">
      {/* Render editor container */}
    </div>
  );
}

export { EditorBox };
