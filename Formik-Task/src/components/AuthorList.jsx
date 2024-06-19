import React from 'react';

const AuthorList = ({ authors }) => {
  return (
    <div>
      <h3>Author List</h3>
      <ul>
        {authors.map((author, index) => (
          <li key={index}>
            {author.name} (Born: {author.birthDate}) - {author.biography}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
