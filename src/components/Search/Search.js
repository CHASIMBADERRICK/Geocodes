import React from 'react';

const Search = () => {
  return (
    // <div>
    //     <h1>Search</h1>
    // </div>
    <div class="row">
      <div
        className="col-4"
        style={{
          background: 'whitesmoke',
          height: '104vh',
          marginBottom: '-30px',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
          width: '700px',
        }}
      >
        <div className="input">
          <div
            className="container"
            style={{ display: 'flex', marginTop: '20px' }}
          >
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search Location"
              aria-label="Search"
            />
            <button className="btn btn-success">
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
        <div className="select">
          <select
            class="form-select form-select-md"
            style={{ marginTop: '20px', marginLeft: '10px' }}
            aria-label=".form-select-sm example"
          >
            <option style={{ fontWeight: 'bold' }} selected>
              Select Facility
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
