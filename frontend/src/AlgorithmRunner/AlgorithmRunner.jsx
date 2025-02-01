import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import style from "./AlgorithmRunner.module.css";
import themeConfig from "/src/config/monaco-theme.json";


// Get files from database looking like this:
const files = {
  "algorithm.cs" : {
      name: "algorithm.cs",
      code: "// Enter your code here",
      language: "csharp"
  },
  "README.md" : {
    name: "README.md",
    code: "This is a README file",
    language: "markdown"
  }
}


const AlgorithmRunner = () => {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("algorithm.cs");
  const file = files[fileName];

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

      <div className={style.fileSelector}>
          {Object.keys(files).map((fileName) => (
            <button className={style.fileButton} key={fileName} value={fileName} onClick={(e) => setFileName(e.target.value)}>
              {fileName}
            </button>
          ))}

        <button className={style.AddFile}>
          Add File
        </button>
      </div>

        <div className={style.codeEditorWrapper}>
          <Editor
            height="100%"
            language={file.language}
            value={file.code}
            path={file.name}
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
