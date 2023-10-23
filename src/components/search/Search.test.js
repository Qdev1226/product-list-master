import React from 'react';
import {shallow} from 'enzyme';
import Search from './Search';
import Jest from 'jest-mock';

let search,
    searchHandler;

describe('Product item component', () => {
    beforeEach(() => {
        searchHandler = Jest.fn();
        search = shallow(
            <Search handler={searchHandler}/>
        );
    });

    it('renders an input box', () => {
        expect(search.find('input').length).toEqual(1);
    });

    it('should call the handler 4 times', () => {
        let searchInput = search.find('input');
        searchInput.simulate('change', {target: {value: 'w'}});
        searchInput.simulate('change', {target: {value: 'wi'}});
        searchInput.simulate('change', {target: {value: 'win'}});
        searchInput.simulate('change', {target: {value: 'wine'}});
        expect(searchHandler.mock.calls.length).toEqual(4);

    });

    it('doesnt call a handler', () => {
        search = shallow(
            <Search />
        );
        let searchInput = search.find('input');
        searchInput.simulate('change', {target: {value: 'w'}});
        searchInput.simulate('change', {target: {value: 'wi'}});
        expect(searchHandler.mock.calls.length).toEqual(0);

    });
});


