import React from 'react';
import ProductWidget from '../../common/components/single/ProductWidget';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default class Product extends React.Component {
  constructor(props, context) {
    super(props, context);

    if (
      !this.props.product ||
      (this.props.match.params.id && this.props.match.params.id != this.props.product.id)
    ) {
      this.state = {
        product: null,
        loading: true,
      };
    } else {
      this.state = {
        product: this.props.product,
        loading: false,
      };
    }
  }

  componentDidMount() {
    return fetch(this.props.base + '/api/product/' + this.props.match.params.id)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          product: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.product
          ? <div>
              <Helmet>
                <title>{this.state.product.name}</title>
              </Helmet>
              <ProductWidget product={this.state.product} />
            </div>
          : null}
      </div>
    );
  }
}
