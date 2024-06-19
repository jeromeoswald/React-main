import React from 'react';
import { useCart } from './CartContext';
import { Button, Image } from 'react-bootstrap';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <tr>
      <td>
        <Image src={item.thumbnail} thumbnail style={{ width: '100px', height: '100px' }} />
        <p>{item.title}</p>
      </td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <Button variant="danger" onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}>-</Button>
        <Button variant="success" onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })} className="ms-2">+</Button>
      </td>
    </tr>
  );
};

export default CartItem;
