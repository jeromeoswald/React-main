import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Form, Modal } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles
// import './MovieDetailPage.css'; // Your custom CSS file

const { confirm } = Modal;

const MovieDetailPage = ({ userRole }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: '',
    genre: '',
    description: ''
  });
  const [isUpdating, setIsUpdating] = useState(false); // State to control update form visibility

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movie/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data.movie);
        setUpdateData({
          title: data.movie.title,
          genre: data.movie.genre,
          description: data.movie.description
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/movie/update/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (response.ok) {
        Modal.success({
          title: 'Update Successful',
          content: data.message,
          onOk: () => window.location.reload()
        });
      } else {
        Modal.error({
          title: 'Update Failed',
          content: data.message
        });
      }
      setIsUpdating(false); // Hide update form after successful update
    } catch (error) {
      console.error('Error updating movie details:', error);
      Modal.error({
        title: 'Error',
        content: 'Failed to update movie details. Please try again later.'
      });
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this movie?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/movie/delete/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        Modal.success({
          title: 'Delete Successful',
          content: data.message,
          onOk: () => {
            // Redirect or update UI after successful deletion
          }
        });
      } else {
        Modal.error({
          title: 'Delete Failed',
          content: data.message
        });
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      Modal.error({
        title: 'Error',
        content: 'Failed to delete movie. Please try again later.'
      });
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/user/addtowishlist/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        Modal.success({
          title: 'Wishlist',
          content: data.message,
          onOk: () => {
            // Redirect or update UI after successful addition to wishlist
          }
        });
      } else {
        Modal.error({
          title: 'Wishlist',
          content: data.message
        });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Modal.error({
        title: 'Error',
        content: 'Failed to add to wishlist. Please try again later.'
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-image">
        <img src={movie?.image} alt={movie?.title} />
      </div>
      <div className="movie-details">
        <h2>{movie?.title}</h2>
        <p>Genre: {movie?.genre}</p>
        <p>Release Year: {new Date(movie?.releaseDate).getFullYear()}</p>
        <p className="movie-description">{movie?.description}</p>
        <div className="buttons-container">
          {userRole === 'Admin' && (
            <div className="admin-buttons">
              <Button type="primary" onClick={() => setIsUpdating(true)}>Update</Button>
              <Button type="danger" onClick={showDeleteConfirm}>Delete</Button>
            </div>
          )}
          <Button className="add-to-wishlist-button" onClick={handleAddToWishlist}>Add to Wishlist</Button>
        </div>
        {isUpdating && (
          <div className="update-form">
            <Form onSubmit={handleUpdate}>
              <Form.Item label="Title">
                <Input name="title" value={updateData.title} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Genre">
                <Input name="genre" value={updateData.genre} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea name="description" value={updateData.description} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update</Button>
                <Button type="danger" className="cancel-icon" onClick={() => setIsUpdating(false)}>Cancel</Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
