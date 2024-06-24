import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, Typography } from 'antd';
import './Homepage.css';

const { Search } = Input;
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3001/movie/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setMovies(jsonData.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <div className="search-container">
        <Search
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          enterButton
          style={{ maxWidth: 400, marginBottom: 20 }}
        />
      </div>
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-link">
            <Card
              hoverable
              style={{ width: 240, marginBottom: 20 }}
              cover={<img alt={movie.title} src={movie.image} style={{ height: 300, objectFit: 'cover' }} />}
            >
              <Meta
                title={<Title level={4} style={{ marginBottom: 0 }}>{movie.title}</Title>}
                description={
                  <>
                    <Paragraph style={{ marginBottom: 10 }}>Genre: {movie.genre}</Paragraph>
                    <Paragraph style={{ marginBottom: 10 }}>Release Year: {new Date(movie.releaseDate).getFullYear()}</Paragraph>
                    <Paragraph ellipsis={{ rows: 2 }} className="movie-description">{movie.description}</Paragraph>
                  </>
                }
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
