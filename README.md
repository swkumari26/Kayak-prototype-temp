# kayak-prototype
A group project to create a simple Kayak replica. It uses NodeJS, ExpressJS, ReactJS, MongoDB and Apache Kafka.

## Git Repository

```
  git clone https://github.com/ChintanVachhani/kayak-prototype.git
```

**Note : Please make sure your MongoDB, Zookeeper and Kafka are running.** Refer https://kafka.apache.org/quickstart for kafka setup. Use the createTopicsScript.bat for windows or createTopicsScript.sh for other OS to create the required topics on kafka. Instructions on where to put the scripts file to run are present in the file. Also `npm3` is required to install dependencies properly.

## Boilerplate Reference
![](http://res.cloudinary.com/hashnode/image/upload/w_200/v1466495663/static_imgs/mern/v2/mernio-logo.png)

### mern-starter

MERN is a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. It minimises the setup time and gets you up to speed using proven technologies.

- [Website](http://mern.io)
- [Documentation](http://mern.io/documentation.html)
- [Discussions](https://hashnode.com/n/mern)

### Quickstart

```
  npm install -g mern-cli
  mern init your_new_app
  cd your_new_app
  npm install
  npm start
```

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm3` is required to install dependencies properly.

### Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors

### File Structure

#### Webpack Configs

MERN uses Webpack for bundling modules. There are four types of Webpack configs provided `webpack.config.dev.js` (for development), `webpack.config.prod.js` (for production), `webpack.config.server.js` (for bundling server in production) and `webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).

The Webpack configuration is minimal and beginner-friendly. You can customise and add more features to it for production build.

#### Server

MERN uses express web framework. Our app sits in server.js where we check for NODE_ENV.

If NODE_ENV is development, we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

We use React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. React Router renders components according to route requested.

```js
// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            return res.status(404).end('Not found!');
        }

        const initialState = {
            posts: [],
            post: {}
        };

        const store = configureStore(initialState);

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialView = renderToString(
                <Provider store = {store} >
                  <RouterContext {...renderProps}/>
                </Provider>
            );

            const finalState = store.getState();

            res.status(200).end(renderFullPage(initialView, finalState));
        }).catch(() => {
            res.end(renderFullPage('Error', {}));
        });
    });
});
```

`match` takes two parameters, first is an object that contains routes, location and history and second is a callback function which is called when routes have been matched to a location.

If there's an error in matching we return 500 status code, if no matches are found we return 404 status code. If a match is found then, we need to create a new Redux Store instance.

**Note:** A new Redux Store has populated afresh on every request.

`fetchComponentData` is the essential function. It takes three params: first is a dispatch function of Redux store, the second is an array of components that should be rendered in current route and third is the route params. `fetchComponentData` collects all the needs (need is an array of actions that are required to be dispatched before rendering the component) of components in the current route. It returns a promise when all the required actions are dispatched. We render the page and send data to the client for client-side rendering in `window.__INITIAL_STATE__`.

#### Client

Client directory contains all the shared components, routes, modules.

##### components
This folder contains all the common components which are used throughout the project.

##### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

##### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following
```
| - Post
  | - __tests__ // all the tests for this module goes here
      | - components // Sub components of this module
          | - Post.spec.js
          | - PostList.spec.js
          | - PostItem.spec.js
          | - PostImage.spec.js
      | - pages
          | - PostPage.spec.js
          | - PostViewPage.spec.js
      | - PostReducer.spec.js
      | - PostActions.spec.js
  | - components // Sub components of this module
      | - Post.js
      | - PostList.js
      | - PostItem.js
      | - PostImage.js
  | - pages // React Router Pages from this module
      | - PostPage
          | - PostPage.js
          | - PostPage.css
      | - PostViewPage
          | - PostViewPage.js
          | - PostViewPage.css
  | - PostReducer.js
  | - PostActions.js
```

### Misc

#### Importing Assets
Assets can be kept where you want and can be imported into your js files or css files. Those fill be served by webpack in development mode and copied to the dist folder during production.

#### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.

#### Docker
There are docker configurations for both development and production.

To run docker for development,
```
docker-compose -f docker-compose-development.yml build
docker-compose -f docker-compose-development.yml up
```

To run docker for production,
```
docker-compose build
docker-compose up
```

#### Caveats

##### FOUC (Flash of Unstyled Content)
To make the hot reloading of CSS work, we are not extracting CSS in development. Ideally, during server rendering, we will be extracting CSS, and we will get a .css file, and we can use it in the html template. That's what we are doing in production.

In development, after all scripts get loaded, react loads the CSS as BLOBs. That's why there is a second of FOUC in development.

##### Client and Server Markup Mismatch
This warning is visible only on development and totally harmless. This occurs to hash difference in `react-router`. To solve it, react router docs asks you to use `match` function. If we use `match`, `react-hot-reloader` stops working.

### License
MERN is released under the [MIT License](http://www.opensource.org/licenses/MIT).
>>>>>>> b249417c5b711fb22e9218157a56f1dd17e0f3ef
