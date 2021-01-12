# Vignette App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running locally

On a first-time run, node modules need to be installed using the command `yarn install`, or just `yarn`.
Use `yarn start` to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

By default, the application is connected to the staging server via an environment variable.

If running the API locally, you should change the environment variable defined in `.env`.\
to point to `http://localhost:9000` instead

**Important**: make sure you include the `http://`, otherwise the connection will fail

## Testing

Use `yarn test` to run the tests found under the `src\__test__` directory

In tests, API calls are replaced using Jest to mock the `http` module defined at `src\http-common.js`.
(`src\http-common.js` is a module used to define default behaviour for the axios package)

## CI

Travis CI is used to run tests when changes are pushed to the repo.

## Hosting

The application is hosted on Heroku.
The staging server can be found at: [https://vignette-api-staging.herokuapp.com/](https://vignette-api-staging.herokuapp.com/)
The production serve can be found at: [https://vignette-api.herokuapp.com/](https://vignette-api.herokuapp.com/)

## Project structure

### Components

- `src/index.js` is the main entrypoint for the file. Primarily, it's role is to render the `src/App.js` component
- `src/App.js` is the global page in the application. It defines HTML elements that are present on all pages, such as the navigation bar. The rest of the page contents are determined by the router used on this page, which determines which component to show based on the visited path.
- Other than this, components are stored under `src/components/`. SVGs, which have been componentised to allow for keyboard functionality and the use of some logic, have been grouped under `src/components/icons/`

### Styling

- This app is largely styled with bootstrap. However, bootstrap has been heavily customised to personalise the style of the app. These custom overrides along with the SCSS variables used in the app are declared under `src\custom.scss`.
- Components where specific styling is required have styleshseets declared in a file structure mirroring that of components, under `src/scss`.

### Tests

- Each component has a test suite associated with it to confirm functionality
- Tests are stored under the `src/__tests__` directory, once again mirroring the layout of components
