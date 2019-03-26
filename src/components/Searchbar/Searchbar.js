import React from "react";
import "./Searchbar.css";

function Searchbar({ inputRef, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="search" autoComplete="off">
      <div className="form__field">
        <input
          type="search"
          name="search"
          ref={inputRef}
          placeholder="Your city name"
          className="form__input"
        />
        <input
          type="submit"
          value="Search"
          className="button"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default Searchbar;
