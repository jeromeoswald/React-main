// src/components/BookList.js

import React, { useEffect, useState } from 'react';
import BookDetail from './BookDetail';

function BookList({ query }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => setBooks(data.docs))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [query]);

  return (
    <div className="row mt-4">
      {books.length > 0 ? (
        books.map((book, index) => (
          <div className="col-md-4" key={index}>
            <BookDetail book={book} />
          </div>
        ))
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
}

export default BookList;
