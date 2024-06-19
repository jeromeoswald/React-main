// Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Card, Image, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes();
    }, []);

    

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/apiRecipe/recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            message.error('Failed to fetch recipes');
        }
    };

    const editRecipe = (recipeId) => {
        navigate(`/update-recipe/${recipeId}`);
    };

    const deleteRecipe = async (recipeId) => {
        try {
          await axios.delete(`http://localhost:3000/apiRecipe/recipes/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          message.success("Recipe deleted successfully");
          fetchRecipes(); // Fetch updated recipes after successful deletion
        } catch (error) {
          console.error('Error deleting recipe:', error);
          message.error('Failed to delete recipe');
        }
      };
      

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={recipes}
            renderItem={recipe => (
                <List.Item key={recipe._id}>
                    <Card
                        title={recipe.title}
                        extra={
                            <div>
                                <Button type="link" onClick={() => editRecipe(recipe._id)}>Edit</Button>
                                <Popconfirm
                                    title="Are you sure you want to delete this recipe?"
                                    onConfirm={() => deleteRecipe(recipe._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="link" danger>Delete</Button>
                                </Popconfirm>
                            </div>
                        }
                    >
                        <Image
                            width='100%'
                            src={recipe.images && recipe.images.length > 0 ? recipe.images[0] : 'https://via.placeholder.com/150'}
                            alt={recipe.title}
                            style={{ marginBottom: '1rem' }}
                        />
                        {recipe.description}
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default Home;
