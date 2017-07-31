# Map Widget CARTO

This project is a code test for a Front End position in CARTO. It has been developed writing vanilla JavaScript in ES6. More details about the test [here](https://gist.github.com/xavijam/8bf55f5e4da51bc79d94d676a471f77b).

I decided to focus on proving I am able to:

- Meet the code test objectives.
- Set up a project from zero, using no generators, frameworks or someone's boilerplate (Neither a JavaScript framework nor a CSS framework).\*
- Set up a test environment, using only a couple of libraries and anything else.
- Write reusable components that can be used more than once.
- Write clean, readable and understandable code.


\* *I am only using a tiny css framework I developed by myself some time ago. It can be found at [GitHub](http://elenatorro.github.io/phoenix-toolkit/)*

## Set up

No framework was needed to build this project, and one of the main purposes was to use only a few libraries, which are listed below:

* Gulp
* Babel
* Browserify
* Livereload
* Handlebars
* SASS
* Leaflet

I like Leaflet because I like the story that is behind: [Vladimir Agafonkin](https://twitter.com/Mourner) built it in two weeks, because he needed a map tool and he did not find anything better (although his boss told him not to). Very inspiring!

Handlebars was chosen for the purpose of being able to separate and reuse templates.

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
- I wanted a simple set up to be easily understood.
- I did not wanted to use a boilerplate with many options, that is why I preferred to write the entire gulpfile by myself.
- Most of the testing suites and libraries for FrontEnd projects are very similar. I wanted to use mocha because it was easy to install and integrate with gulp, and because I have not used it before in any project and I wanted to give it a try.
- Chai and Sinon because I have used them before for assertions and asynchronous tests.

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

* **Nav Bar**
  The navigation sidebar.

* **Map Widget**
  This is the widget that shows the map. It has all the logic to hide / show markers and provides functions to interact with other components.

* **Map Widget Editor**
  This type of widget is configured to edit in real time the markers shown in the map.

* **Dropdown Select**
  Component to show a dropdown and send a callback with the selected item from a given list of data.

* **Colors Range**
  Displays the color range that is applied to the map when a filter is active. At the beginning, I wanted this component to be editable, but due to the lack of time I had, I decided to left it like this, only to show the applied colors.

## index.js

In this file, we initialize all the components we want to display in our editor. It is the main file, where we have defined all the elements that are going to be present.

## Notes and improvements

- To draw the markers, I developed a ShapeMarker based in an [external Leaflet library](https://github.com/Esri/Leaflet.shapeMarkers/blob/master/src/ShapeMarker.js). I did not wanted to use any other external code. Even though Leaflet has many plugins and libraries, I wanted to know how they work and add something else, such as the "hexagon" shape.

- This project is totally Leaflet oriented. Instead of importing Leaflet using: `import L from 'Leaflet'`, I would improve this by injecting Leaflet as a dependency to the MapWidget object. By doing so, you can use any map library and implement the same interface, so you can change it whenever you want to.

- Usually, I tend to write private functions in order to improve readability, and then I move them to a utils file so they can be easily tested. In this case, I would have liked to refactor a couple of these functions.

- There are a couple of accessibility issues in the dropdowns I am concerned about. I have worked on this before, and this will be one of the steps I would like take to improve this project. [This is an example](https://github.com/elenatorro/accessibility-examples/tree/master/menu-bar) I did of how to improve accessibility in menus and submenus.

- Yes, there is a small easter egg. Just execute 'showEmoji()' in the console!
