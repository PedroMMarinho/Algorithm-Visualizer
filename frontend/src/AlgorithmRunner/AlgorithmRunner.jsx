import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import style from "./AlgorithmRunner.module.css";
import themeConfig from "/src/config/monaco-theme.json";

const AlgorithmRunner = () => {
  const [code, setCode] = useState("");
  const editorRef = useRef(null);

  // Handle editor mount
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme("vscode-dark-plus", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1E1E1E",
      },
    });
    monaco.editor.setTheme("vscode-dark-plus");
  };

  return (
    <div className={style.editorContainer}>
      <div className={style.editorContent}>
        <div className={style.codeEditorWrapper}>
          <Editor
            height="100%"
            language="csharp"
            value={code}
            theme="vscode-dark-plus"
            defaultValue="// Enter your code here"
            onChange={(value) => setCode(value)}
            onMount={handleEditorMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className={style.deleteFile}>
          <button onClick={() => setCode("")}>Delete File</button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmRunner;
