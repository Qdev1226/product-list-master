import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryItem from '../categoryItem/CategoryItem'
import './Categories.css';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.selectCategory = this.selectCategory.bind(this);
        this.state = {
            selectedCategory: ''
        };
    }

    selectCategory(categoryId) {
        this.setState({selectedCategory: categoryId});
        if (this.props.clickHandler) {
            this.props.clickHandler(categoryId);
        }
    }

    render() {
        const categoryList = this.props.categoriesData.map(category =>
            <CategoryItem key={category.id}
                          value={category.title}
                          id={category.id}
                          clickHandler={this.selectCategory}
                          selected={this.state.selectedCategory === category.id}/>
        );

        return (
            <ul className="category-list">
                {categoryList}
            </ul>
        );
    }
}

Categories.propTypes = {
    categoriesData: PropTypes.array.isRequired,
    clickHandler: PropTypes.func
};

export default Categories;