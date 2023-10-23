import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (this.props.handler) {
            this.props.handler(event.target.value);
        }
    }

    render() {
        return (
            <input type="text" onChange={this.handleChange}/>
        );
    }
}

Search.propTypes = {
    handler: PropTypes.func
};

export default Search;