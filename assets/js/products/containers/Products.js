import React from 'react'
import ProductList from '../../common/components/archive/ProductList'
import { Helmet } from "react-helmet";

export default class Products extends React.Component {

    constructor(props, context) {
        
        super(props, context);

        this.state = {
            products: this.props.products,
            loading: false,
        }
    }

    componentDidMount() {
        return fetch(this.props.base + '/api/products').then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                products : data,
                loading: false
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.products ? 
                    <div>
                        <Helmet>
                            <title>Products List</title>
                        </Helmet>
                        <ProductList products={this.state.products} routePrefix={this.props.base}/>
                    </div> 
                : null}
            </div>
        )
    }
}

