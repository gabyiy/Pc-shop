import React, { useState } from "react";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <input
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
