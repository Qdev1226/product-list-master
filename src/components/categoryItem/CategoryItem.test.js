import React from 'react';
import {shallow} from 'enzyme';
import CategoryItem from './CategoryItem';
import Jest from 'jest-mock';

let categoryItem,
    clickHandler,
    categorySelectedClass,
    category = {
        id: 'abcd-123',
        title: 'Wines'
    };

describe('Category item component', () => {
    beforeEach(() => {
        clickHandler = Jest.fn();
        categoryItem = shallow(
            <CategoryItem key={category.id}
                          value={category.title}
                          id={category.id}
                          clickHandler={clickHandler}
                          selected={false}/>
        );
        categorySelectedClass = categoryItem.instance().categorySelectedClass;
    });

    it('renders an button', () => {
        expect(categoryItem.find('button').length).toEqual(1);
    });

    it('calls click handler on click', () => {
        expect(clickHandler.mock.calls.length).toEqual(0);
        categoryItem.find('button').simulate('click');
        expect(clickHandler.mock.calls.length).toEqual(1);
    });

    it('returns selected classes', () => {
        expect(categorySelectedClass(true)).toEqual('category-item__button category-item__button--selected');
    });

    it('returns unselected classes', () => {
        expect(categorySelectedClass(false)).toEqual('category-item__button');
    });
});