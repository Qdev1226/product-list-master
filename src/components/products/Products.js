import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../productItem/ProductItem';
import './Products.css';

class Products extends Component {

    render() {
        const productList = this.props.productsData.map((product) =>
            <ProductItem key={product.id}
                         title={product.title}
                         description={product.description}/>
        );

        return (
            <ul className="product-list">
                {productList}
            </ul>
        );
    }
}

Products.propTypes = {
    productsData: PropTypes.array.isRequired
};

export default Products;