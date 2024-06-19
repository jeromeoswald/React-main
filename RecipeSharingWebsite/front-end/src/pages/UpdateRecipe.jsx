// UpdateRecipe.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UpdateRecipe() {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        fetchRecipe();
    }, [recipeId]);

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/apiRecipe/recipes/${recipeId}`);
            setRecipe(response.data);
        } catch (error) {
            message.error('Failed to fetch recipe!');
        }
    };

    const handleUpload = ({ fileList }) => {
        setMedia(fileList);
    };

    const onFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        media.forEach(file => {
            formData.append('media', file.originFileObj);
        });

        try {
            const response = await axios.put(`http://localhost:3000/apiRecipe/recipes/${recipeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 200) {
                message.success('Recipe updated successfully');
                setLoading(false);
                navigate('/');
            } else {
                throw new Error('Failed to update recipe');
            }
        } catch (error) {
            message.error(`Error updating recipe: ${error.message}`);
            setLoading(false);
        }
    };

    if (!recipe) {
        return <Spin tip="Loading recipe..." />;
    }

    return (
        <Form name="update-recipe" initialValues={recipe} onFinish={onFinish}>
            <Form.Item name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
                <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" rules={[{ required: true, message: 'Please input your description!' }]}>
                <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="ingredients" rules={[{ required: true, message: 'Please input your ingredients!' }]}>
                <Input placeholder="Ingredients (comma separated)" />
            </Form.Item>
            <Form.Item name="instructions" rules={[{ required: true, message: 'Please input your instructions!' }]}>
                <Input.TextArea placeholder="Instructions" />
            </Form.Item>
            <Form.Item name="category" rules={[{ required: true, message: 'Please input your category!' }]}>
                <Input placeholder="Category" />
            </Form.Item>
            <Form.Item>
                <Upload fileList={media} beforeUpload={() => false} onChange={handleUpload} multiple>
                    <Button icon={<UploadOutlined />}>Upload Media</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Update Recipe
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdateRecipe;
