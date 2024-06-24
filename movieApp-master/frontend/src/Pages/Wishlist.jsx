import React, { useState, useEffect } from 'react';
import { Button, Card, Empty } from 'antd';
import "./Wishlist.css"

const { Meta } = Card;

const WishlistPage = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const fetchWishlistMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/user/wishlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setWishlistMovies(jsonData.wishlist);
      } catch (error) {
        console.error('Error fetching wishlist movies:', error);
      }
    };
    fetchWishlistMovies();
  }, []);

  const handleRemoveFromWishlist = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/user/removeFromWishlist/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the movie from the wishlistMovies state
      setWishlistMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error('Error removing movie from wishlist:', error);
    }
  };

  return (
    <div className="wishlist-page-container">
      {wishlistMovies.length === 0 ? (
        <Empty description="No movies added to the wishlist yet." />
      ) : (
        <div className="movie-list">
          {wishlistMovies.map(movie => (
            <Card
              key={movie._id}
              hoverable
              style={{ width: 240, marginBottom: 20 }}
              cover={<img alt={movie.title} src={movie.image} />}
            >
              <Meta title={movie.title} description={`Genre: ${movie.genre}`} />
              <p>Release Year: {new Date(movie.releaseDate).getFullYear()}</p>
              <p className="movie-description">{movie.description}</p>
              <Button onClick={() => handleRemoveFromWishlist(movie._id)} type="primary">Remove from Wishlist</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
