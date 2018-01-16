# RefactoringToReact
This is an example project showing how a JQuery website can be refactored to use React with ES6 and JSX.

In this ReadMe I'll review all the steps necessary to go from a standard JQuery website (Part 0), to a React Website,
and even how to start using Redux.

## Background

### Who is React?
React is a component-based UI library. It is not a fully fledges application framework or an architectural pattern.

### What's a ES6?
ES6 is just the next big version of JavaScript. Some browsers don't support the full featureset yet, so we transpile it 
to plain-old (ES5) JavaScript using a tool like Babel.

We will be using ES6 because it makes writing React, and JavaScript in general, much cleaner.

Take the following example.

This is a react component written with ES6 syntax.
```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
This is the same react component written with ES5 syntax.
```
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

It's doable, just not great. [Read more here.](https://reactjs.org/docs/react-without-es6.html)

### Why JSX?
>JSX is an XML-like syntax extension to ECMAScript without any defined semantics.

JSX just extends JavaScript to allow us to build and pass around XML-like structures in JavaScript. This allows us to build HTML
components in code without having to treat them as strings.

This snippet uses JSX:
```
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

This snippet does not use JSX:
```
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

As you can see, not using JSX further complicates the render function of components, making the code much less readable.

[Read more here.](https://reactjs.org/docs/react-without-jsx.html)

### Who is Babel?
Babel is a JavaScript compiler which takes in next-generation JavaScript and outputs browser-compatible JavaScript.

We are going to use this in webpack to compile our ES6 JavaScript to ES5.

### Webpack What?
Webpack is a package bundler. It can be used on its own or with build systems like Gulp or Grunt. It takes in files and tries
to produce the smallest possible bundle of HTML/JS/CSS/Images

## Refactoring Steps

### Part 1: Building with Webpack and Babel
This part assumes you are using the project in [Part 0](./part-0-jquery/).

#### Step 1: Install Node
Node.js can be downloaded and installed [here](https://nodejs.org/en/). Node.js is simply a JavaScript runtime environment.
We will be running a lot of commands in the Node.js environment during development.

#### Step 2: Initialize a Node Package
To stay organized, first move `index.html` and `main.js` into a `src/` folder.

```
mkdir src
mv index.html src/
mv main.js src/
```

Now, initialize the project folder as an NPM package. The following command does this by taking you through the creation of
a `package.json` file.

```
npm init
```
Here is example output from when I ran npm init on the project folder:
```
> npm init
name: people-app
version: (1.0.0)
description: A website for viewing people in a table.
entry point: (src/main.js)
test command:
git repository:
keywords:
author: Michael Washburn Jr
license: MIT
About to write to /home/mike/dev/learn-react/part-1-webpack/package.json:

{
  "name": "people-app",
  "version": "1.0.0",
  "description": "A website for viewing people in a table.",
  "main": "src/main.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "Michael Washburn Jr",
  "license": "MIT"
}

Is this ok? (yes)
```

#### Step 3: Install Webpack and Babel Packages
We'll need to install the following packages to get webpack and babel working for this demo.
```
npm install --save-dev webpack webpack-dev-server html-webpack-plugin babel-loader babel-core babel-preset-es2015 babel-preset-react
```

#### Step 4: Configure Webpack
Now that we have webpack installed, we can configure the way it will build.

Review the following commented configuration file line-by-line, and copy it to `webpack.config.js`.
```
// require imports a package to the file. 
// path is used to normalize paths, similar to os.path.join in python
var path = require('path');
// we'll obviously need webpack
var webpack = require('webpack');
// We'll use this to handle the copying of our index.html file
var HtmlWebpackPlugin = require('html-webpack-plugin');

// define the build and source directory.
var BUILD_DIR = path.join(__dirname, 'dist');
var SRC_DIR = path.join(__dirname, 'src');

// these values get made public to anything importing this file
module.exports = {
  // Defines the top-most javascript file so the bundler knows where to start
  entry: './src/main.js',
  // The final javascript bundle will be put here
  output: { path: BUILD_DIR, filename: 'bundle.js' },
  // webpack has plugins that can be used to build other types of files
  plugins: [
    // this plugin will take the src/index.html file, add a reference to the bundle.js, and copy it to the dist/ folder.
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: SRC_DIR + '/index.html'
    }),
  ],
  // this is how the webpack-dev-server is configured. 
  devServer: {
    // this tells the webpack-dev-server to serve content from the build directory
    contentBase: BUILD_DIR,
  },
};
```
Before we run webpack, we're also going to edit the `package.json`. Put the following two lines in the `scripts` list, like so:
```
...
  "scripts": {
    ...
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --progress --colors"
  }
...
```
Now, if we run `npm run build`, the project will be built using webpack. Additionally, if we run `npm run start`, the project will
be build and served on `localhost`.

The project should now build. It should now work exactly as the source does in the [part-1-webpack folder](./part-1-webpack/).
