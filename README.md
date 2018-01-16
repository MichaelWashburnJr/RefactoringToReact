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
These steps assume you are using the project in [Part 0](./part-0-jquery/).

### Part 1: Building with Webpack and Babel

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

#### Remove main.js from index.html
In the base project, there is a line in the `index.html` file like this:
```
<script src="main.js"></script>
```
This can now be deleted. Webpack will automatically include our `bundle.js` file at the bottom of the `index.html`.

### Part 2: Wrapping your App with a React Component
In this part we're going to wrap the application logic in a large react component. This will make it easier to start building smaller React components in the next step.

#### Step 1: Install React
For this part, we'll need to install React and ReactDOM.
```
npm install --save react react-dom
```

#### Step 2: Create a React Component
Create a new file `src/components/App.js`. This will be the top-most component in our app.

Import React and create a new component.
```
// import react. equivalent to `var React = require('react');`
import React from 'react';

export default class App extends React.Component {

}
```
Cut and Paste the `updateTableWithPeople`, `insertPersonIntoTable`, and `fetchPeople` functions into the class. Note the slight changes that need to be made when moving JavaScript functions into a React component.
```
export default class App extends React.Component {

  //CHANGED: Needed to add this. before function call
  updateTableWithPeople(people) {
    people.forEach(this.insertPersonIntoTable);
  }

  // no changes here
  insertPersonIntoTable(person) {
    $("#people-table-body").append(
      "<tr>" +
        "<td>" + person.name.first + ' ' + person.name.last + '</td>' +
        "<td>" + person.dob + '</td>' +
        "<td>" + person.email + '</td>' +
        "<td>" + person.phone + '</td>' +
        "<td>" + person.cell + '</td>' +
      "</tr>"
    );
  }

  //CHANGED: Needed to add this. before function call and use an
  // arrow function. This lets you keep the same scope as the calling function.
  // In this case, it means "this" still refers to the parent class. 
  fetchPeople() {
    $.get('https://randomuser.me/api/?results=10',
      // use () => { ... } instead of function() { ... }
      // to keep the same scope as the parent function.
      // this lets us still use the "this." keyword
      // within the callback function.
      (response) => {
        this.updateTableWithPeople(response.results);
      }
    );
  }

}
```
Now, instead of just calling `fetchPeople()` at the end of the JavaScript file as was done in Part 0, we can call this function in
the `componentDidMount` function. This way, it's only called after all the HTML has initially been rendered, preventing any errors if the document isn't ready to be manipulated.
```
export default class App extends React.Component {
  ...
  componentDidMount(){
    this.fetchPeople();
  }
}
```
Lastly, in our `render()` function we can add all the HTML from the body in our `index.html` file. 

Cut everything inside the `<body>` tags of the `index.html` and paste it into the render function like so:
```
export default class App extends React.Component {
  ...
  render() {
    return (
      <div className="container">
        <h1>Contact Information for Random People</h1>
        ...
      </div>
    );
  }
}
```
Notice that the `class` attributes are now `className`. This is a quirk of using JSX.

Now we have a complete React component. But we still need to render it.

#### Step 3: Render the Component

In order to render the component we just made, we'll have to modify the `index.html` and `main.js` files to insert the component into
the `<body>`. 

First, update the `index.html` `<body>` to look like so:
```
<body>
  <div id="app"/>
</body>
```
Now, we're going to make the `main.js` file render the component we defined on the element where the id is `app`.

All the previous code inside `main.js` can be deleted if you haven't aleady. Then, add the following:
```
// import react and the render function which comes from react-dom
import React from 'react';
import { render } from 'react-dom';
// import the App wrapper component we just defined
import App from './components/App';

// call the render function so that <App/> is rendered on the element with the ID "app"
render(
  <App/>,
  document.getElementById('app')
);
```
That's all! The project should now build successfully and run without errors.

### Part 3: Pure React
Now that we have React working, and a React component wrapping our entire app, it's easy to build smaller components to replace
any JQuery being used.

#### Step 1: Create a PeopleTable Component
First, we're going to make a new component just for rendering the table in our website. Create a new file
`src/components/PeopleTable.js`.

Inside the `render` function, return all the HTML for the `<table>` which is currently returned in the `App` component.
```
import React from 'react';

export default class PeopleTable extends React.Component {

  render() {
    return (
      <table className="table">...</table>
    );
  }
  
}
```
Now, where in JQuery we would insert people into our table by building a new `<tr>` as a string and inserting it into the DOM,
in React we can just create a list of JSX elements and include it in the JSX being returned.
```
export default class PeopleTable extends React.Component {

  render(){
  
    // assume a list of people is being passed to this component via props
    const people = this.props.people;
    
    // build a list of JSX elements for the people to render rows
    const rows = people.map((person, index) => {
      return (
        <tr key={index}>
          <td>{people.name.first} {people.name.last}</td>
          <td>{person.dob}</td>
          <td>{person.email}</td>
          <td>{person.phone}</td>
          <td>{person.cell}</td>
        </tr>
      );// this would be cleaner if this were another component entirely (e.g. <PersonRow person={person}/>)
    });
    
    return (// include the rows we built in the table body using the {...} syntax
      <table>
        ...
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
```
Now we have a fully functioning `PeopleTable` component. It expects one prop: `people`. If done correctly, this should be able
to be used in another component's `render` method like so: `<PeopleTable people={[p1, p2, p3]}/>`.

#### Step 2: Make the App Component Render the PeopleTable Component
Now that the `PeopleTable` component is available, we need to refactor the `App` component to render it instead of doing the
work itself.

First, remove the `updateTableWithPeople` and `insertPersonIntoTable` methods. Instead of calling `fetchPeople` and inserting the
results into the table with JQuery, we're going to save the results to our component's [state](https://reactjs.org/docs/state-and-lifecycle.html) and pass the state into the `PeopleTable`.

To do this, first initialize the state in the component's constructor method.
```
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      people: [],
    }; 
  }
  
  ...
}
```

Changes to the component state trigger a re-render. Thus, once our API request returns results, the render function will fire with
the updated state.

Now, move the API request into the `componentDidMount` method, and change it to use the `fetch()` method instead of JQuery. We'll
also need to update it to use the `setState` method to save the results once they're returned.

```
export default class App extends React.Component {
  ...
  componentDidMount() {
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())// needs to parse the JSON first
      .then(json => {
        // now save the results to the state
        this.setState({people: json.results});
      });
  }
  ...
}
```

Finally, we can make the `render` method return the `PeopleTable` with the component state.

```
// don't forget to import the PeopleTable Component
import PeopleTable from './PeopleTable';

export default class App extends React.Component {
  ...
  render() {
    return (
      <div className="container">
        <h1>Contact Information for Random People</h1>
        <PeopleTable people={this.state.people}/>
      </div>
    );
  }
}
```
Now the App will render, fetch the list of people, save the people to the app state, and re-render.

### Part 4: Introducing Redux
Sometimes, managing application state becomes too complex. This project is not a good example of one that benefits from using Redux. See the article ["You Might Not Need Redux"](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
to figure out if you should use it or not.




