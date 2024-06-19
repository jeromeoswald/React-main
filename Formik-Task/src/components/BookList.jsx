import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      <h3>Book List</h3>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author} (ISBN: {book.isbn}, Published on: {book.publicationDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
