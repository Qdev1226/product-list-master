import React, {Component} from 'react';
import Categories from './components/categories/Categories';
import Products from './components/products/Products';
import Search from './components/search/Search';
import api from './apiEndpoints.json';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.saveCategoryApiData = this.saveCategoryApiData.bind(this);
        this.saveProductApiData = this.saveProductApiData.bind(this);
        this.filterProductsByCategory = this.filterProductsByCategory.bind(this);
        this.filterProductsBySearch = this.filterProductsBySearch.bind(this);
        this.allProducts = [];
        this.state = {
            categories: [],
            products: [],
            selectedCategory: ''
        };
    }

    saveCategoryApiData(data) {
        let categories = data.filter(category => !category.hidden);
        this.setState({categories});
        return categories;
    }

    saveProductApiData(data) {
        this.allProducts = data;
        this.setState({products: data});
        return data;
    }

    componentDidMount() {
        let categories = fetch(api.CATEGORIES_API);
        let products = fetch(api.PRODUCTS_API);

        Promise.all([categories, products])
            .then(response => {
                    let categoryData = response[0],
                        productData = response[1];

                    if (categoryData.status !== 200 || productData.status !== 200) {
                        console.log('Looks like there was a problem.');
                        return;
                    }

                    categoryData.json().then(data => {
                        this.saveCategoryApiData(data.data);
                    });

                    productData.json().then(data => {
                        this.saveProductApiData(data.data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error', err);
            });
    }

    filterProductsByCategory(categoryId) {
        this.setState({selectedCategory: categoryId});

        let products = this.allProducts.filter(product => {
            let required = false;
            product.categories.forEach(category => {
                required = required || category.id === categoryId;
            });
            return required;
        });
        this.setState({products});
        return products;
    }

    filterProductsBySearch(query) {
        let products = this.allProducts,
            filteredProducts;

        if (this.state.selectedCategory) {
            products = this.filterProductsByCategory(this.state.selectedCategory);
        }

        query = query.toLowerCase();
        filteredProducts = products.filter(product => {
            let queryInTitle = product.title.toLowerCase().includes(query);
            let queryInDesc = product.description.toLowerCase().includes(query);
            return queryInTitle || queryInDesc;
        });
        this.setState({products: filteredProducts});
        return filteredProducts;
    }

    render() {
        return (
            <div className="app">
                <Categories categoriesData={this.state.categories}
                            clickHandler={this.filterProductsByCategory}/>
                <Search handler={this.filterProductsBySearch}/>
                <Products productsData={this.state.products}/>
            </div>
        );
    }
}

export default App;
