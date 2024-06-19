import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="mt-4">
        <h4>Total Quantity: {totalQuantity}</h4>
        <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CartPage;
