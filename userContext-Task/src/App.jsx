import React, { useEffect } from 'react';
import { CartProvider, useCart } from './CartContext';
import Cart from './Cart';
import data from './data'; // Import your data here
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const { dispatch } = useCart();

  useEffect(() => {
    // Here you can fetch the data if it were coming from an API
  }, []);

  return (
    <Container>
      <Row className="my-4">
        {data.products.map(product => (
          <Col key={product.id} md={4}>
            <div className="card mb-4">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price: ${product.price}</strong></p>
                <Button variant="primary" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>Add to Cart</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const App = () => {
  return (
    <CartProvider>
      <div>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
