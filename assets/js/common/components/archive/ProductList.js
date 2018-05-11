import React from 'react';
import ProductLink from './ProductLink';

export default class ProductList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      products: this.props.products,
      query: '',
      pageCount: 0,
      page: 1,
      resultsReceived: false,
      pageSize: 0,
      totalItems: 0,
    };
    this.onSearch = this.onSearch.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onChangeSearch(evt) {
    this.setState({ query: evt.target.value });
  }

  handleKeyPress(event) {
    // When user removes search query fetch products again to return to the original state 
    if (event.key === 'Delete' || (event.key === 'Backspace' && this.state.query.length <= 1)) {
      this.props.fetchProducts().then(data => {
        this.setState({
          products: data,
          resultsReceived: false,
        });
      });
    }
  }

  onSearch() {
    if (this.state.query.length > 0) {
      return fetch(`/api/search/${this.state.query}/${this.state.page}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({
            resultsReceived: true,
            pageCount: data.page_count,
            products: data._embedded.product,
            pageSize: data.page_size,
            totalItems: data.total_items,
          });
        });
    }
  }

  pageChange(context) {
    let pageNum = this.state.page;
    if (context === 'up') {
      pageNum++;
      this.setState({
        pageType: 'up',
        page: pageNum,
      });
    }
    if (context === 'down') {
      pageNum--;
      this.setState({
        page: pageNum,
      });
    }
    this.onSearch();
  }

  render() {
    let pageSize = this.state.pageSize;
      if (this.state.totalItems === 0) {
          pageSize = 0;
      }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 heading">
            <h1 className="title">
              {this.state.resultsReceived ? `Searching for ${this.state.query}` : 'Shop'}
            </h1>
            <div id="search-box">
              <input
                type="text"
                className="form-control"
                onKeyDown={this.handleKeyPress}
                value={this.state.filterText}
                placeholder="Search for..."
                onChange={this.onChangeSearch.bind(this)}
              />
              <button onClick={() => this.onSearch()}>SEARCH</button>
            </div>
          </div>
        </div>
        <div className="row results">
          <div className="col-xs-12">
            <p>
              {this.state.resultsReceived
                ? `Showing ${pageSize} of ${this.state.totalItems} results`
                : null}
            </p>
          </div>
        </div>
        <ProductLink
          products={this.state.products}
          routePrefix={this.props.routePrefix}
        />
        <div className="pagination">
            {this.state.page > 1
            ? <button onClick={() => this.pageChange('down')}>&laquo; Previous </button>
            : null}
            {this.state.resultsReceived && this.state.page < this.state.pageCount
            ? <button onClick={() => this.pageChange('up')}>Next &raquo;</button>
            : null}
          </div>
      </div>
    );
  }
}
