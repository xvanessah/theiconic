import React from 'react';

const Product = (props) => {
    return (
      <div>
        <div className="image">
          <img
            src={props.product._embedded.images[0].url}
            className="img-responsive"
          />
        </div>
        <div className="description">
          <h3 className="brand text">{props.product._embedded.brand.name}</h3>
          <h2 className="title text">{props.product.name}</h2>
          <p className="price text">{`$${props.product.price}`}</p>
        </div>
      </div>
    );
}

export default Product;