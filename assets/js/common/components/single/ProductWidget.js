import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

export default class ProductWidget extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      product: this.props.product,
    };
  }
  render() {
    const { product } = this.state;
    return (
      <div className="row product-single">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="image">
            <img src={product._embedded.images[0].url} className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="brand-image">
            <img src={product._embedded.brand.image_url} className="img-responsive" />
          </div>
          <h1 className="title">{product.name}</h1>
          <p className="price">{`$${product.price}`}</p>
          <div className="description">
            {ReactHtmlParser(product.short_description)}
          </div>
          <div className="sku">SKU: {product.sku}</div>
        </div>
      </div>
    );
  }
}
