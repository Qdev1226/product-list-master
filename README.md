# Products list react app
This app lists products in their corresponding categories using the [Gousto](https://www.gousto.co.uk) APIs. The app uses the [create-react-app](https://github.com/facebookincubator/create-react-app) node module.

## Set up
### Prerequisites
- [Node](https://nodejs.org/en/) / npm (see [package.json](./package.json) engine properties)

### Installation
To download all required dependencies run `npm install`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode. You may need to press `a` after this to run all tests. There will be 2 error messages logged to the console when the tests to fail the api calls are run.

### `npm test -- --coverage`

Calculates code coverage for all test suites.

## Folder Structure

The majority of code is in the `src/` folder, with `App` and `index` files in the root of `src/` and all components and related files in `components/`.

```
gousto-tech-test/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    components/
      categories/
      categoryItem/
      productItem/
      products/
        Products.css
        Products.js
        Products.test.js
      search/
```

## Components
`App.js` is the main wrapper component that renders the `Categories`, `Search` and `Products` components. The `Categories` component is a list that renders individual `CategoryItem` components. Similarly the `Products` component is a list that renders `ProductItem` components, while the `Search` component just renders the search input box.

```text
App/
  Categories/
    CategoryItem
  Search/
  Products/
    ProductItem
```
