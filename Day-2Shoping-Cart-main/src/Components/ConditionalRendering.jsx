import React from 'react';
import Card from './Card';

const ConditionalRendering = ({setCartCount, cartCount, setProducts, products}) => {


    return (
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 justify-content-center">
                {products.map((item, index) => {
                    return (
                        <>
                            <Card item={item} index={index} setCartCount={setCartCount} cartCount={cartCount} />

                        </>
                    )
                })}
            </div>
        </div>
    );
};

export default ConditionalRendering;