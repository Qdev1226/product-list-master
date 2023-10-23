import React from 'react';
import {shallow} from 'enzyme';
import Categories from './Categories';
import Jest from 'jest-mock';

let categories,
    selectCategory,
    clickHandler,
    category = {id: '1234', title: 'Snacks'},
    categoriesData = [{
        id: '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
        title: 'Snacks'
    }];

describe('Product item component', () => {
    beforeEach(() => {
        clickHandler = Jest.fn();
        categories = shallow(
            <Categories categoriesData={categoriesData}
                        clickHandler={clickHandler}/>
        );
        selectCategory = categories.instance().selectCategory;
    });


    it('renders a list of categories', () => {
        expect(categories.find('CategoryItem').length).toEqual(1);
    });

    it('renders nothing with empty array', () => {
        categoriesData = [];
        categories = shallow(
            <Categories categoriesData={categoriesData}/>
        );
        expect(categories.find('CategoryItem').length).toEqual(0);
    });

    it('renders 3 items', () => {
        categoriesData = [category, category, category];
        categories = shallow(
            <Categories categoriesData={categoriesData}/>
        );
        expect(categories.find('CategoryItem').length).toEqual(3);
    });

    it('calls the click handler and changes state', () => {
        selectCategory('abcd-123');
        expect(clickHandler.mock.calls.length).toEqual(1);
        expect(clickHandler).toBeCalledWith('abcd-123');
        expect(categories.state().selectedCategory).toEqual('abcd-123');

        selectCategory('xyz-9876');
        expect(clickHandler.mock.calls.length).toEqual(2);
        expect(clickHandler).toBeCalledWith('xyz-9876');
        expect(categories.state().selectedCategory).toEqual('xyz-9876');
    });

    it('doesnt call the click handler', () => {
        categories = shallow(
            <Categories categoriesData={categoriesData}/>
        );
        selectCategory = categories.instance().selectCategory;

        selectCategory('abcd-123');
        expect(clickHandler.mock.calls.length).toEqual(0);
        expect(categories.state().selectedCategory).toEqual('abcd-123');
    });
});


