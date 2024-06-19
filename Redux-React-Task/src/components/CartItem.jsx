import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={item.thumbnail} className="img-fluid rounded-start" alt={item.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text"><small className="text-muted">{item.brand}</small></p>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button className="btn btn-outline-secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-outline-secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>
              <div>
                <p className="mb-0">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
