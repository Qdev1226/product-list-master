import React from 'react';
import {shallow} from 'enzyme';
import Products from './Products';

let products,
    product = {id: '1234', title: 'Borsao Macabeo'},
    productsData = [{
        id: '0009468c-33e9-11e7-b485-02859a19531d',
        title: 'Borsao Macabeo',
        description: 'A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.'
    }];

describe('Product item component', () => {
    beforeEach(() => {
        products = shallow(
            <Products productsData={productsData}/>
        );
    });


    it('renders a list of products', () => {
        expect(products.find('ProductItem').length).toEqual(1);
    });

    it('renders nothing with empty array', () => {
        productsData = [];
        products = shallow(
            <Products productsData={productsData}/>
        );
        expect(products.find('ProductItem').length).toEqual(0);
    });

    it('renders 3 items', () => {
        productsData = [product, product, product];
        products = shallow(
            <Products productsData={productsData}/>
        );
        expect(products.find('ProductItem').length).toEqual(3);
    });
});


