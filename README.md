## Blueprint
Blueprint is, as the name suggest, a blueprint for your SASS and Grunt projects. It is a minimal boilerplate with tools to let you focus on crafting your projects rather than on setting up an environment. It includes a minimal CSS reset, typography, grid and media query mixins.

## Jump Start

Make sure to have NodeJS, SASS, NPM, and Grunt (Grunt-CLI too) installed to download all project required files. Once you have the tools, from the Terminal run `npm install` on the project directory to install all necessary dependancies.

You can grab all the tools here:
* <a href="https://nodejs.org/">NodeJS</a>
* <a href="https://github.com/sass/node-sass/">Node-SASS</a>
* <a href="https://www.npmjs.com/">NPM</a>
* <a href="http://gruntjs.com/">Grunt</a>

## File Structure
````
├── assets
│   ├── assets
│   ├── css
│   ├── images
│   └── js
│
├── src
│   ├── images
│   ├── js
│   │   ├── vendor
│   │   ├── main.js
│   └── stylesheets
│       ├── base
│       ├── components
│       ├── layout
│       ├── pages
│       ├── utils
│       ├── vendor
│       └── main.sass
├── docs
├── Gruntfile.js
├── index.html
├── package.json
├── README.md
└── .gitignore
````

## Grid
Blueprint includes an easy to use grid system for building quick layouts that works with a syntax similar to Susy and other grid systems.

Settings such as the container width and gutter are defined in the utils/_variables.sass file.

````
// Input
.wrap
    @include row
    
.content
    @include col(8/12)

// Output
.wrap {
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.wrap:after {
  clear: both;
  content: '';
  display: table;
}

.content {
  float: left;
  width: 66.6666666667%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
````



## Further Documentation
* <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html">SASS Reference</a>
* <a href="http://gruntjs.com/getting-started/">Grunt: Getting Started</a>