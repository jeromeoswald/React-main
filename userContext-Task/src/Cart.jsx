import React from 'react';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import { Container, Row, Col, Table } from 'react-bootstrap';

const Cart = () => {
  const { state } = useCart();

  const totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container>
      <h1 className="my-4">Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
      <Row className="mt-4">
        <Col>
          <h4>Total Quantity: {totalQuantity}</h4>
          <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
