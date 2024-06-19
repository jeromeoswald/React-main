import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CartPage from './features/cart/CartPage';
import { setItems } from './features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        const items = data.map(item => ({ ...item, quantity: 1 }));
        dispatch(setItems(items));
      });
  }, [dispatch]);

  return (
    <div className="App">
      <CartPage />
    </div>
  );
}

export default App;

