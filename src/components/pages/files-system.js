import React, { useContext } from "react";
import { TreeView } from "../tree-view/tree-view";
import response from "../../responses/fileSystem.json";
import { FileSystemContext } from "../../context/FilesSystemContext";
import { Search } from "../fields/search";
import { Card, CardContent, Typography } from "@mui/material";

const FilesSystem = () => {
  const { setFilePath } = useContext(FileSystemContext);

  const search = (data, text, p = '') => {
    let path = p;

    for (let i = 0; i < data.length; i++) {
      const parent = data[i];
      path = path + '/' + parent.name;
      if (parent.name.toLowerCase().includes(text.toLowerCase())) {
        return path;
      }
      if (parent.children) {
        const result = search(parent.children, text, path);
        if (result) {
          return result;
        }
      }
      path = path.replace('/' + parent.name, '');
    }

    return null;
  };

  const onSearch = (searchText) => {
    setFilePath({});
    const path = search(response.fileSystem, searchText);
    if (!path) return;
    const filePatchObject = {};
    path.split('/').forEach(i => filePatchObject[i] = true)
    setFilePath(prev => ({ ...prev, ...filePatchObject }))
  }

  return (
    <Card sx={{ width: 450, m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Files System
        </Typography>
        <Search onSearch={onSearch} />
        <TreeView data={response.fileSystem} />
      </CardContent>
    </Card>
  );
}

export default FilesSystem;