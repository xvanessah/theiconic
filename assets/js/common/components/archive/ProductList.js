import React from 'react'
import ProductLink from './ProductLink'

export default class ProductList extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            products: this.props.products,
            filterText: '',
            maxPages: 1,
            page: 1
        }
        this.onSearch = this.onSearch.bind(this)
        this.pageChangeUp = this.pageChangeUp.bind(this)
        this.pageChangeDown = this.pageChangeDown.bind(this)
        
    }

    onChangeSearch(evt) {
        this.setState({ filterText: evt.target.value })
    }

    onSearch(){
        return fetch(`/api/search/${this.state.filterText}/${this.state.page}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.setState({
            maxPages: data.page_count,
            products: data._embedded.product,
            loading: false
          });
        });
    }

    pageChangeUp () {
        let pageNum = this.state.page;
        console.log(pageNum);
        this.setState({
            page: pageNum
        })
        this.onSearch()
    }

    pageChangeDown () {
        let pageNum = this.state.page;
        pageNum--;
        this.setState({
            page: pageNum
        })
        this.onSearch()
    }
    
    render() {
        return (
            <div className="container">
                <div id="search-box" className="pull-right">
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.state.filterText} placeholder="Search for..." onChange={this.onChangeSearch.bind(this)} />
                        <button onClick={() => this.onSearch()}> search </button>
                    </div>
                </div>
                <h1 className="heading">Shop</h1>
                <ProductLink products={this.state.products} routePrefix={this.props.routePrefix}/>
                <button onClick={() => this.pageChangeUp()}> Up </button>
                <button onClick={() => this.pageChangeDown()}> Down </button>                
            </div>
        )
    }
}
