import React, { useRef, useEffect, useState  } from "react";
import EditorJS from "@editorjs/editorjs";
import SimpleImage from 'editorjs-simple-image-updated';
import Header from '@editorjs/header';
//import Image from '@editorjs/image';
//import SimpleImage from '@editorjs/simple-image';

import './styles.css'

function EditorBox() {
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "Header",
        data: {
          text: "Escribe aquí un nuevo texto!",
          level: 1
        }
      }
    ]
  };

  const [editorReady, setEditorReady] = useState(false);
  const ejInstance = useRef(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        Image:SimpleImage,
        Header: Header},
    });
    ejInstance.current = editor;
    setEditorReady(true);
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
        setEditorReady(false);
      }
    };

  }, []);

  useEffect(() => {
    if (editorReady) {
      try {
        const saveButton = document?.getElementById('save-button');
        const output = document?.getElementById("output");

        saveButton.addEventListener("click", () => {
          console.log("click")
          ejInstance.current?.saver.save()?.then(savedData => {
            output.innerHTML = JSON.stringify(savedData, null, 4);
          })
        })
      } catch (error) {
        console.error(error);
      }
    }
  }, [editorReady]);


  return (

    <div id="editorjs">
    </div>
  );
}

export { EditorBox };
