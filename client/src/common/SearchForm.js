import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  // console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(e) {
    // take care of accidentally trying to search for just spaces
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div class="SearchForm input-group mb-2">
      <input
        className="form-control form-control-md flex-grow-1"
        name="searchTerm"
        placeholder="Enter search term.."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
      <div class="input-group-append">
        <button
          class="btn btn-md btn-outline-secondary"
          type="button"
          onClick={handleSubmit}
        >Search</button>
      </div>
    </div>
  );
}

export default SearchForm;
