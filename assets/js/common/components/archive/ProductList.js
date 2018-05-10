import React from 'react'
import ProductLink from './ProductLink'

export default class ProductList extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            products: this.props.products,
            query: '',
            maxPages: 1,
            page: 1,
            resultsReceived: false,
        }
        this.onSearch = this.onSearch.bind(this)
        this.pageChange = this.pageChange.bind(this);
        
    }

    onChangeSearch(evt) {
        this.setState({ query: evt.target.value })
    }

    onSearch(){
        if(this.state.query.length > 0) {
            return fetch(`/api/search/${this.state.query}/${this.state.page}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              this.setState({
                resultsReceived: true,
                maxPages: data.page_count,
                products: data._embedded.product,
                loading: false
              });
            });
        }
    }

    pageChange(context){
        let pageNum = this.state.page;        
        if(context === 'up') {
            pageNum++;
            this.setState({
                pageType: 'up',
                page: pageNum
            })
        }

        if (context === 'down') {
            pageNum--;
            this.setState({
                page: pageNum
            })
        }
        this.onSearch()        
    }
  
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 heading">
                        <h1 className="title">Shop</h1>
                        <div id="search-box">
                            <input type="text" className="form-control" value={this.state.filterText} placeholder="Search for..." onChange={this.onChangeSearch.bind(this)} />
                            <button onClick={() => this.onSearch()}>SEARCH</button>
                        </div>
                    </div>
                </div>
                <ProductLink products={this.state.products} routePrefix={this.props.routePrefix}/>
                {this.state.resultsReceived && this.state.page < this.state.maxPages  ? <button onClick={() => this.pageChange('up')}> Up </button> : null}
                {this.state.page > 1 ? <button onClick={() => this.pageChange('down')}> Down </button> : null}               
            </div>
        )
    }
}
