import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Jest from 'jest-mock';

let app,
    saveCategoryApiData,
    saveProductApiData,
    filterProductsByCategory,
    filterProductsBySearch,
    componentDidMount;

let rawCategoryData = [
    {
        id: "faeedf8a-bf7d-11e5-a0f9-02fada0dd3b1",
        title: 'Wines',
        hidden: false
    },
    {
        id: "faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9",
        title: "Drinks Cabinet",
        hidden: false
    },
    {
        id: "faeedf8a-bf7d-11e5-a0f9-02fada0dd3b2",
        title: "Desserts",
        hidden: true
    }
];

let rawProductData = [
    {
        id: "0009468c-33e9-11e7-b485-02859a19531d",
        title: "Borsao Macabeo",
        description: "A flavoursome Summer wine made from the indigenous Macabeo grape in northern Spain. A balanced, modern white with flavours of ripe peach, zesty lemon and nutty undertones, it leaves the palate with a clean and fruity finish.",
        categories: [
            {
                id: "faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9",
                title: "Drinks Cabinet",
                hidden: false
            },
            {
                id: "785741fc-3854-11e6-87a5-06f9522b85fb",
                title: "Large Alcohol",
                hidden: true
            }
        ],
    },
    {
        id: "073079f4-0265-11e7-9ce9-06e91e000dc9",
        title: "Green & Blacks Sea Salt Dark Chocolate Thins",
        description: "Infusing rich, dark chocolate with a subtle hint of Anglesey Sea Salt - nothing says 'treat yourself' like this new delight from Green & Black's. Delicately thin but deliciously crunchy, these squares of dark, organic chocolate are best broken and enjoyed alone. (Only share if you really must!)",
        categories: [
            {
                id: "17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9",
                title: "Snacks",
                hidden: false
            }
        ],
    }
];

describe('Product item component', () => {
    beforeEach(() => {
        app = shallow(
            <App />
        );
        saveCategoryApiData = app.instance().saveCategoryApiData;
        saveProductApiData = app.instance().saveProductApiData;
        filterProductsByCategory = app.instance().filterProductsByCategory;
        filterProductsBySearch = app.instance().filterProductsBySearch;
        componentDidMount = app.instance().componentDidMount.bind(app.instance());
    });

    it('renders Categories, Search and Products components', () => {
        expect(app.find('Categories').length).toEqual(1);
        expect(app.find('Search').length).toEqual(1);
        expect(app.find('Products').length).toEqual(1);
    });

    it('saves category api data', () => {
        let expectedCategories = [rawCategoryData[0], rawCategoryData[1]];

        expect(app.state().categories).toEqual([]);
        let categories = saveCategoryApiData(rawCategoryData);
        expect(app.state().categories).toEqual(categories);
        expect(categories).toEqual(expectedCategories);
    });

    it('dosent save category api data when no data', () => {
        expect(app.state().categories).toEqual([]);
        let categories = saveCategoryApiData([]);
        expect(app.state().categories).toEqual([]);
        expect(categories).toEqual([]);
    });

    it('saves product api data', () => {
        expect(saveProductApiData(rawProductData)).toEqual(rawProductData);
        expect(app.state().products).toEqual(rawProductData);
        expect(app.instance().allProducts).toEqual(rawProductData);

    });

    it('dosent save product api data when no data', () => {
        expect(saveProductApiData([])).toEqual([]);
    });

    it('filters products by category', () => {
        expect(app.state().selectedCategory).toEqual('');
        expect(app.state().products).toEqual([]);

        //set the product data
        saveProductApiData(rawProductData);

        let products = filterProductsByCategory(rawCategoryData[1].id);
        expect(app.state().selectedCategory).toEqual(rawCategoryData[1].id);
        expect(app.state().products).toEqual([rawProductData[0]]);
        expect(products).toEqual([rawProductData[0]]);
    });

    it('filters products by category of no products', () => {
        //set the product data
        saveProductApiData(rawProductData);

        let products = filterProductsByCategory(rawCategoryData[0].id);
        expect(app.state().selectedCategory).toEqual(rawCategoryData[0].id);
        expect(app.state().products).toEqual([]);
    });

    it('filters products by search query', () => {
        //set the product data
        saveProductApiData(rawProductData);

        let products = filterProductsBySearch('chocolate');
        expect(app.state().selectedCategory).toEqual('');
        expect(app.state().products).toEqual([rawProductData[1]]);
        expect(products).toEqual([rawProductData[1]]);
    });

    it('tests failed promise', (done) => {
        global.fetch = Jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                reject('an error');
            });
        });
        app.instance().saveCategoryApiData = Jest.fn();
        componentDidMount();
        expect(app.instance().saveCategoryApiData).toHaveBeenCalledTimes(0);
        done();
    });

    it('tests failed api call', (done) => {
        global.fetch = Jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                resolve({
                    status: 404
                });
            });
        });
        app.instance().saveCategoryApiData = Jest.fn();
        componentDidMount();
        expect(app.instance().saveCategoryApiData).toHaveBeenCalledTimes(0);
        done();
    });
});


