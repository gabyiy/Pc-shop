import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Search.css";

const Search = (props) => {
  const view1 = useMediaQuery({
    query: "(max-width:800px)",
  });
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        className={view1 ? "search-input" : ""}
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
