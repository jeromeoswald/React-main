// src/components/BookDetail.js

import React from 'react';

function BookDetail({ book }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author_name?.join(', ')}</h6>
        <p className="card-text">
          First published in {book.first_publish_year}
        </p>
        <a href={`https://openlibrary.org${book.key}`} className="btn btn-primary">More Info</a>
      </div>
    </div>
  );
}

export default BookDetail;
