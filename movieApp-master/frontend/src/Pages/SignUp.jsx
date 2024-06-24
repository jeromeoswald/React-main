import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is User

  const onFinish = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        message.success(data.message); // Show success message
        window.location.href = '/signin'; // Redirect to sign-in page
      } else {
        message.error(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to sign up. Please try again later.');
    }
  };

  return (
    <div className="sign-up-container">
      <Title level={2}>Sign Up</Title>
      <Form
        name="signUpForm"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        className="sign-up-form"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select
            placeholder="Select a role"
            value={role}
            onChange={(value) => setRole(value)}
          >
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
};

export default SignUpPage;
