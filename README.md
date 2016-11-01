# Foobarbot

Web application built with the purpose of having fun and learning new web technologies. Built with **Heroku** and **MEAN stack**.

## Preview

Site is available at [http://project-lines.herokuapp.com/](http://project-lines.herokuapp.com/).

## Structure

Changes may occour in structure.

**2016-10-10**

  - `app` contains the server side and client side applications
  - `app/client` contains the `source` and `dist` (production - compiled code)
  - `gulp_tasks` contians gulp tasks such as TypeScript compiling, concatenating, minifying etc.
  - `typings` contains libraries for TypeScript compiler

## Workflow

  1. Pick an issue assigned to you, or create a new one and assign it to yourself. When creating a new issue provide detailed information about the task.
  2. Create a new branch with the branch name referencing the issue (e.g.: `f-set-up-app` -> Set up app (feature))
  3. After solving the issue, test, test and then test
  4. Pull master, merge it to your branch
  5. If you have conflicts, resolve them
  6. Push changes to your branch
  5. On GitLab create a Merge Request assigned to someone else to review your code. Also reference the issue with ID (e.g.: `#1`).

## Tutorials

  1. Read about how to set up Heroku: [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
  2. Nodejs basics: [Node Hero - Node.js Project Structure Tutorial](https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/)
  3. Mean stack with DBaS: [Create a Web App and RESTful API Server Using the MEAN Stack](https://devcenter.heroku.com/articles/mean-apps-restful-api)
  4. Get started with Angular 2: [Angular Quickstart](https://angular.io/docs/ts/latest/quickstart.html#!#create-and-configure)