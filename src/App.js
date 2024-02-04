import React from "react";
import FilesSystem from "./components/pages/files-system";
import { FileSystemProvider } from "./context/FilesSystemContext";

function App() {
  return (
    <FileSystemProvider>
      <FilesSystem />
    </FileSystemProvider>
  );
}

export default App;
