import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import style from "./AlgorithmRunner.module.css";
import themeConfig from "/src/config/monaco-theme.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faTrash  } from '@fortawesome/free-solid-svg-icons';


// Get files from database looking like this:
const initialFiles  = {
  "algorithm.cs": {
    name: "algorithm.cs",
    code: "// Enter your code here",
    language: "csharp",
  },
  "README.md": {
    name: "README.md",
    code: "## Readme\n\nThis is a readme file",
    language: "markdown",
  },
};

const AlgorithmRunner = () => {

  const editorRef = useRef(null);


  const [files, setFiles] = useState(initialFiles);
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


  // Create new file
  const handleCreateNewFile = () => {
    const newFileName = prompt("Enter the file name:");
    if (newFileName && !files[newFileName]) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [newFileName]: { name: newFileName, code: "", language: "plaintext" },
      }));
      setFileName(newFileName);
    }
  };

  // Delete file
  const handleDeleteFile = () => {
    if (fileName && files[fileName]) {
      const updatedFiles = { ...files };
      delete updatedFiles[fileName];
      setFiles(updatedFiles);

      // Switch to another file or clear the editor
      const remainingFiles = Object.keys(updatedFiles);
      setFileName(remainingFiles.length ? remainingFiles[0] : "");
    }
  };
  
  // Handle file switching
  const handleCodeChange = (newCode) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [fileName]: {
        ...prevFiles[fileName],
        code: newCode,
      },
    }));
  };


  return (
    <div className={style.editorContainer}>
      <div className={style.editorContent}>
        <div className={style.fileSelector}>
          <div className={style.fileSelectorLeft}></div>

          {Object.keys(files).map((name) => (
            <button
              className={`${style.fileButton} ${
                fileName === name ? style.activeFile : style.innactiveFile
              }`}
              key={name}
              value={name}
              onClick={() => setFileName(name)}
            >
              {name}
            </button>
          ))}

          <button className={style.AddFile} onClick={handleCreateNewFile}><FontAwesomeIcon icon={faPlus}/></button>

          <div className={style.fileSelectorRight}></div>
        </div>
        <div className={style.codeEditorWrapper}>
          {file ? (<Editor
            height="100%"
            language={file?.language || "plaintext"}
            value={file.code}
            path={file.name}
            theme="vscode-dark-plus"
            onChange={handleCodeChange}
            onMount={handleEditorMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />): (<div className={style.noCurrentFiles}>Create a new file to start visualizing</div>)}
        </div>

        <div className={style.deleteFile}>
          <button onClick={handleDeleteFile} disabled={!fileName}>
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
            Delete File
            </button>
        </div>

      </div>
    </div>
  );
};

export default AlgorithmRunner;
