import React, { useState } from "react";
import { Input, Button } from '@mui/joy';


export const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event) => {
    const { value } = event.target;

    setSearchText(value);
  }

  const handleSearch = () => {
    onSearch(searchText);
  }

  return (
    <Input
      placeholder="Search..."
      value={searchText}
      sx={{width: 400}}
      onChange={handleSearchTextChange}
      id="searchField"
      endDecorator={
        <Button
          variant="solid"
          color="primary"
          type="submit"
          disabled={!searchText || searchText.length < 3}
          onClick={handleSearch}
        >
          Find
        </Button>
      }
    />
  );
} 