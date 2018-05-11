import React from 'react';
import ProductList from '../../common/components/archive/ProductList';
import { Helmet } from 'react-helmet';

export default class Products extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      products: this.props.products,
      isFetching: false,
    };
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.setState({
      isFetching: true,
    });
    this.fetchProducts().then(data => {
      this.setState({
        products: data,
        isFetching: false,
      });
    });
  }

  fetchProducts() {
    return fetch(this.props.base + '/api/products').then(response => {
      return response.json();
    });
  }

  render() {
    return (
      <div>
        {this.state.products
          ? <div>
              <Helmet>
                <title>The Iconic | Shop</title>
              </Helmet>
              <ProductList
                isFetching={this.state.isFetching}
                fetchProducts={this.fetchProducts}
                products={this.state.products}
                routePrefix={this.props.base}
              />
            </div>
          : null}
      </div>
    );
  }
}
