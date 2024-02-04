import { Box, Button, Typography } from "@mui/material";
import React, { useContext} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FileSystemContext } from "../../context/FilesSystemContext";

export const TreeView = ({ data, index = 0 }) => {
  const { filePath, setFilePath } = useContext(FileSystemContext);

  const toggleNested = (name) => {
    setFilePath({ ...filePath, [name]: !filePath[name] });
  };

  const renderFolderIcon = (parent) => {
    if(!parent.children || parent.children.length === 0) {
      return null;
    }
    if(filePath[parent.name]) {
      return <KeyboardArrowUpIcon />;
    }
    return <KeyboardArrowDownIcon />;
  }

  return (
    <Box sx={{ml: (2*index)}}>
      {data.map((parent, i) => {
        return (
          <Box key={parent.name} sx={{ml: (2*index)}}>
            {parent.isFolder && (
              <Button
                ariant="outlined"
                color={filePath[parent.name] ? 'secondary' : 'primary'}
                startIcon={renderFolderIcon(parent)}
                onClick={() => toggleNested(parent.name)}>
                {parent.name}
              </Button>
            )}
            {!parent.isFolder && <Typography color={filePath[parent.name] ? 'secondary' : 'default'}>{parent.name}</Typography>}
            <Box style={{ display: !filePath[parent.name] && "none" }}>
              {parent.children && <TreeView data={parent.children} index={++i} />}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}