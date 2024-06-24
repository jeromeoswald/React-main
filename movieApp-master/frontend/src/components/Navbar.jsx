import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import './Navbar.css'; // Your custom CSS file

const { Header } = Layout;

function NavBar({ isLoggedIn, handleLogout }) {
  return (
    <Header className="header">
      <div className="logo">
        <Link to="/">Movie APP</Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        {isLoggedIn ? (
          <>
            <Menu.Item key="2">
              <Link to="/wishlist">Wishlist</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Button onClick={handleLogout}>Logout</Button>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="4">
            <Link to="/signin">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default NavBar;
