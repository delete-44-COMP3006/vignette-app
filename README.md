# Vignette App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running locally

Use `yarn start` to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

By default, the application is connected to the staging server via an environment variable.

If running the API locally, you should change the environment variable defined in `.env`.\
to point to `http://localhost:9000` instead

**Important**: make sure you include the `http://`, otherwise the connection will fail

## Testing

Use `yarn test` to run the tests found under the `src\__test__` directory. The.\
tests here mirror the layout of the components.

In tests, API calls are replaced using Jest to mock the `http` module defined at `src\http-common.js`.

## CI

Travis CI is used to run tests when changes are pushed to the repo.

## Deployment

Changes merged into `main` are automatically deployed to a stagin server on heroku..\
From here manual deployments to production can be made to allow testing on staging.
