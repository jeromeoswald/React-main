import React, { useState } from 'react';

const Card = ({item, setCartCount }) => {
    const [status, setStatus] = useState(true)
    const cartAdd = () => {
        setStatus(false)
        setCartCount((pval) => pval + 1)
    }
    const cartRemove = () => {
        setStatus(true)
        setCartCount((pval) => pval - 1)
    }
    return (
        <div key={item}>
            <div className="col mb-5" id="card">
                <div className="card" id="cards">
                    <img src={item.Image} className="card-img-top" id='card-img' alt="..." ></img>
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name-->  */}
                            <h5 className="fw-bolder">{item.name}</h5>
                            {item.rating ? (

                                <div className="text-warning  text-center mb-2 small">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* <!-- Product price--> */}
                            <p className="card-price text-center" id="original-price">{item.price}</p>
                            <p className="card-price text-muted" id="del-price">{item.delprice}</p>

                            {/* <p class="card-price text-muted text-center"><del>{item.delPrice}</del></p> */}
                         <div className='button' id="btn-div">
                        {status ? <button className="btn btn-success" id="btn" onClick={cartAdd}>Add to Cart</button> : <button className="btn btn-danger" id="btn" onClick={cartRemove}>Remove from Cart</button>}
                    </div>
                    </div>
                    </div>

                   

                </div>
            </div>
        </div>
    );
};

export default Card;