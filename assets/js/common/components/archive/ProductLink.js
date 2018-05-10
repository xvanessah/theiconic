import React from 'react'
import Product from './Product'
import { Link } from 'react-router-dom'


export default class ProductLink extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            products: this.props.products
        }
    }
    render(){
        return (
            <div className="row">
                {this.state.products.map((product, idx) => (
                    <div className="product col-xs-6 col-sm-4 col-md-4 col-lg-3 columns" key={idx}>
                        <Link to={'/product/' + product.sku}>
                            <Product key={idx} product={product} id={idx} />
                        </Link>
                    </div>
                    )
                )}
            </div>
        )
    }
}