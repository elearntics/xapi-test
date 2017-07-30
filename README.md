# Map Widget CARTO

This project is a code test for a front-end position in CARTO. It has been developed using Vanilla JavaScript and written in ES6.

## Setup

No framework was needed to build this tiny project, and one of the main purposes was to use only a few libraries, which are listed below.

* Gulp
* Babel
* Browserify
* Livereload
* Handlebars
* SASS
* Leaflet

### Installation guide

1. Instal npm packages

```
npm install
```

## Run

```
gulp run
```

## Tests

```
gulp test
```


### Testing

I have decided to use the following libraries to write the tests.

* Mocha
* Chai
* Sinon


The main reasons why I have picked up these libraries are:
- I wanted a simple setup to be easily understood.
- I did not wanted to use a boilerplate with many options, that is why I preferred to write the entire gulpfile by myself.
- Most of the testing suites and libraries for FrontEnd projects are very similar. I wanted to use mocha because it was easy to install and integrate with gulp, and because I have not used it before in a project and I wanted to give it a try.
- Chai and Sinon because I have use them before for assertions and asynchronous tests, I like them and I think they are widely used in many projects.

### Tests

I have only written integration and unit tests. Actually, one of my favourite tests are both assertion and e2e tests, but for this tasks I knew I was going to need more time to build this environment properly. 

I am testing the different elements (components, services...) separately in the unit tests, and I am testing the behaviour of these elements together in the integration tests.

## Structure

I have separated the project in different areas:

- Services: The main service we find is Carto Api Service, whose purpose is to gather GeoJSON Data by connecting to the SQL Carto API or load it from a local file. (I have not been at home most of the time lately and I needed to work without Internet connection, that is why I have both solutions. Not my favourite solution, but enough to code and write tests while travelling).

- Utils: Small pieces of code to that can be shared across the project and that handle an specific task.

- Components: I have organized the components in three files: template, style and script, in order to group the code by functionality.


### index.hbs

In this file we find all the elements of our map editor. We identify five types of elements:

* Nav Bar
  The navigation sidebar.

* Map Widget
  This is the widget that shows the map. It has all the logic to hide / show markers and provides functions to interact with other components.

* Map Widget Editor
  This type of widget is configured to edit in real time the markers shown in the map.

* Dropdown Select
  Component to show a dropdown and send a callback with the selected item from a given list of data.

* Colors Range
  Displays the color range that is applied in the map editor when a filter is active. At the beginning, I wanted this component to be customizable, but due to the lack of time I have, I decided to left it like this, only to show the applied colors range.

## index.js

In this file, we initialize all the components we want to display in our editor. It is the main file, where we have defined all the elements that are going to be present.
