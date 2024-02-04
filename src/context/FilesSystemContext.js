import { createContext, useState } from "react";

const FileSystemContext = createContext();

const FileSystemProvider = ({ children }) => {
  const [filePath, setFilePath] = useState({});

  return (
    <FileSystemContext.Provider value={{ filePath, setFilePath }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export { FileSystemContext, FileSystemProvider };