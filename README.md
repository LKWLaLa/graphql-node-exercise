# GraphQL Events/Locations CRUD

## This was a practice exercise in learning GraphQL

### Dependencies:

- This project is built with node `v9.11.1`, express, and graphQL. 

- [Yarn](https://yarnpkg.com/en/) is used for package management.  

- If you do not already have one, create an [mLab account](https://mlab.com/home) for access to the MongoDB database.  

- You will also need a Google Maps API key, for access to Google's geocoding API.  To do so:

```
 - Create a google developer account.
 - Navigate to: console.developers.google.com
 - Create a new project.
 - Within the dashboard, click on "enable APIs and services."
 - Search for "geocode" and select the geocoding API.
 - Click "enable."
 - Click the "creditials" tab.
 - Either create new API key, or use an existing API key.
```
    

### Directions to run:

 - Fork or clone this repo, then cd in the directory on your local machine. 
 - Create a `.env` file to add your mLab and Google Maps API keys.
 - Run `yarn install` to install node modules.
 - Run the seed file with `node seeds.js`.
 - Start the app with `node app.js`.  (You can alternatively run it with [nodemon](https://github.com/remy/nodemon) for automatic server restarts.) 
 - Navigate to `localhost:3000/graphql` to open the GraphiQL GUI in your browser.

