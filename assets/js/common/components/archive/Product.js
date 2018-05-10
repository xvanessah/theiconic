import React from 'react';

export default class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="image">
          <img
            src={this.props.product._embedded.images[0].url}
            className="img-responsive"
          />
        </div>
        <div className="description">
          <h3 className="brand text">{this.props.product._embedded.brand.name}</h3>
          <h2 className="title text">{this.props.product.name}</h2>
          <p className="price text">{`$${this.props.product.price}`}</p>
        </div>
      </div>
    );
  }
}
