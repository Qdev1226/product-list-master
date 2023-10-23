import React from 'react';
import {shallow} from 'enzyme';
import ProductItem from './ProductItem';

let productItem,
    productDesc,
    productHeaderClasses,
    product = {
        id: '0009468c-33e9-11e7-b485-02859a19531d',
        title: 'Borsao Macabeo',
        description: 'A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.'
    };

describe('Product item component', () => {
    beforeEach(() => {
        productItem = shallow(
            <ProductItem key={product.id}
                         title={product.title}
                         description={product.description}/>
        );
        productDesc = productItem.instance().productDescription;
        productHeaderClasses = productItem.instance().productHeaderClasses;
    });


    it('renders title and description', () => {
        expect(productItem.find('button').text()).toContain(product.title);
        expect(productItem.text()).not.toContain(product.description);
    });

    it('renders description after click', () => {
        expect(productItem.text()).not.toContain(product.description);
        productItem.find('button').simulate('click');
        expect(productItem.text()).toContain(product.description);
    });

    it('returns null when productDescription is called', () => {
        expect(productDesc()).toEqual(null);
    });

    it('returns element when productDescription is called after click', () => {
        productItem.find('button').simulate('click');
        expect(productDesc().props.children).toContain(product.description);
    });

    it('returns default header class', () => {
        expect(productHeaderClasses()).toEqual('product__header');
    });

    it('returns additional header class when state changes', () => {
        productItem.find('button').simulate('click');
        expect(productHeaderClasses()).toEqual('product__header product__header--bold');
    });
});


