## Foursquare API with Angular

Playing around with angular to access the foursquare api, get the recommended location for a location. This is my first project that I'm posting to github,

## General Approach
I wanted to use a css framework so that the code can look presentable without spending too much time on the css. I used Bootstrap.
I used an javascript framework for maintainability, reusibility and the overall structure of the code. I used angularjs
I used npm as my package manager and gulp as my build tool. This makes the build process quicker, using all the plugins and css preprocessors etc.

## Dev Approach
- First wanted to set myself up with the build tool before starting development and installing all the plugins and the build process that I would usually do.
- Create a template that I can base my work, thoughts and ideas around.
- Build the skeleton of how I would want the app to look once everything is working.
- Make the connection to the API
- Make the app look pretty(ish)
- Ensure build proccess works

Firstly download the files and install all the node modules
```sh
npm install
```

Run gulp default task, (this will also load the app)
```sh
gulp
```

Build the project
```sh
gulp build
```

Serve the final build
```sh
gulp build:serve
```
