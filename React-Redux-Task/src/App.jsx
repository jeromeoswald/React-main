import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, increaseQuantity, decreaseQuantity } from './features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => dispatch(setItems(data)));
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1>Cart</h1>
      <div className="row">
        <div className="col-8">
          {items.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.thumbnail} className="img-fluid rounded-start" alt={item.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      Add
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-4">
          <h2>Summary</h2>
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
