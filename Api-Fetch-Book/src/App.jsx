// src/App.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList';

function App() {
  const [query, setQuery] = useState(''); // State to store the search query

  const handleSearch = (e) => {
    e.preventDefault();
    // You can implement additional search logic here
  };

  return (
    <div className="container">
      <h1 className="my-4">OpenLibrary Book Search</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <BookList query={query} />
    </div>
  );
}

export default App;
