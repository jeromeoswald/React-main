import React, { useState } from 'react';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import BookList from './BookList';
import AuthorList from './AuthorList';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const addAuthor = (author) => {
    setAuthors([...authors, author]);
  };

  return (
    <div className="container">
      <h1>Library Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Add Book</h2>
          <BookForm onSubmit={addBook} />
          <BookList books={books} />
        </div>
        <div className="col-md-6">
          <h2>Add Author</h2>
          <AuthorForm onSubmit={addAuthor} />
          <AuthorList authors={authors} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
