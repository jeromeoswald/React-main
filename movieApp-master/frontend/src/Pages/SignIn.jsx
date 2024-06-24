import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
// import './SignIn.css';

const { Title } = Typography;

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data.token);
      if (response.ok) {
        message.success(data.message); // Show success message
        localStorage.setItem('token', data.token); // Save token to localStorage
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/'; // Redirect to dashboard
      } else {
        message.error(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to sign in. Please try again later.');
    }
  };

  return (
    <div className="sign-in-container">
      <Title level={2}>Sign In</Title>
      <Form
        name="signInForm"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        className="sign-in-form"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default SignInPage;
