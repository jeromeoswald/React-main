import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Button } from 'react-bootstrap';

// Step 1: Set up Context
const CartContext = createContext();

// Step 2: Fetch Data
const fetchData = async () => {
  try {
    const response = await fetch('https://drive.google.com/file/d/1fOadeM1liwbUK38z92F0XYugk2jwqK2r/view?usp=sharing');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Step 3: Manage State
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Add item to cart and update total quantity and amount
      // You need to implement this logic
      return state;
    case 'INCREASE_QUANTITY':
      // Increase quantity of an item and update total quantity and amount
      // You need to implement this logic
      return state;
    case 'DECREASE_QUANTITY':
      // Decrease quantity of an item and update total quantity and amount
      // You need to implement this logic
      return state;
    case 'REMOVE_FROM_CART':
      // Remove item from cart and update total quantity and amount
      // You need to implement this logic
      return state;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    fetchData().then(data => {
      // Set initial cart items if needed
      // dispatch({ type: 'SET_CART_ITEMS', payload: data });
    });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Step 4: Create Components
const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div>
      {/* Render cart items */}
      {state.cartItems.map(item => (
        <CartItem key={item.id} item={item} dispatch={dispatch} />
      ))}
      {/* Render total quantity and amount */}
      <div>
        Total Quantity: {state.totalQuantity}
      </div>
      <div>
        Total Amount: {state.totalAmount}
      </div>
    </div>
  );
};

const CartItem = ({ item, dispatch }) => {
  const handleIncrease = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item.id });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item.id });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
  };

  return (
    <div>
      <div>{item.name}</div>
      <div>Price: {item.price}</div>
      <div>Quantity: {item.quantity}</div>
      <Button onClick={handleIncrease}>+</Button>
      <Button onClick={handleDecrease}>-</Button>
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  );
};

// Step 5: Use Context
const App = () => {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
};

export default App;
