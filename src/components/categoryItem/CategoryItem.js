import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './CategoryItem.css';

class CategoryItem extends Component {

    categorySelectedClass(isSelected) {
        return isSelected ?
            'category-item__button category-item__button--selected' :
            'category-item__button';
    }

    render() {
        return (
            <li className="category-item">
                <button onClick={() => this.props.clickHandler(this.props.id)}
                        className={this.categorySelectedClass(this.props.selected)}>
                    <h2>
                        {this.props.value}
                    </h2>
                </button>
            </li>
        );
    }
}

CategoryItem.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    selected: PropTypes.bool
};

export default CategoryItem;