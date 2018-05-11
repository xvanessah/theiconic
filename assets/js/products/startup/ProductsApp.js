import React from 'react';
import Products from '../containers/Products';
import Product from '../containers/Product';
import { Route } from 'react-router-dom';

const ProductsApp = ({ initialProps, appContext }) => {
  return (
    // Handle the routes for product archive and product single pages
    <div>
      <Route
        path={'/product/:id'}
        render={props => <Product {...initialProps} base={appContext.base} {...props} />}
      />
      <Route
        path={'/'}
        exact
        render={props => {
          return <Products {...initialProps} base={appContext.base} {...props} />;
        }}
      />
    </div>
  );
};

export default ProductsApp;
