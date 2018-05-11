import React from 'react';
import Product from './Product';
import { Link } from 'react-router-dom';

const ProductLink = (props) => {
    return (
      <div className="row shop">
        {props.products.map((product, idx) => (
          <div className="product col-xs-6 col-sm-4 col-md-4 col-lg-3 columns" key={idx}>
            <Link to={'/product/' + product.sku}>
              <Product
                key={idx}
                product={product}
                id={idx}
              />
            </Link>
          </div>
        ))}
      </div>
    );
}

export default ProductLink;