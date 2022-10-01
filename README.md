# Editable User Profile Page

Hello! Welcome to the User Profile Page update! I hope you enjoy poking around this repo.

This simple application was created using React and Firebase!

## Description

A SPA comprising of a form that a user can fill up with their personal details and submit to a database.  
The form features field-level validation and error checking for the following fields:

1. Name (required)

- Only strings allowed

2. Profile Picture (required)
3. Age (required)

- Only numbers allowed
- Only above 18 allowed

4. Work Experience

- Start Date (required field)
- End Date (required field, if current position checkbox not clicked)
- Company (required)
- Company logo (required)
- Job Description (required)

It also comes with a reset profile button to allow the user to completely reset/clear his profile data.

## Installation

### Via terminal

```
$ git clone https://github.com/xianjinseow92/profile-page-edit.git <your-folder-name>
$ yarn start
```

## Tech Stacks

React  
Firebase
Material UI

## Packages

```
yup (for form validation)
react-spinner
react-scroll
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

### `yarn deploy`

Builds the app and deploys to github using gh-pages.

# End Notes

Should you have any questions, feel free to reach out to xianjinseow92@gmail.com.
