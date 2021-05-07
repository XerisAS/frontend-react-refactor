# Intent
This application is badly written application created to be used in interview situations to evaluate reasoning and problem solving skills in the candidates. The candidate is **NOT** expected to solve all issues in the code, but rather find a few issues to focus on. During an interview, questions on how the candidate may want to solve some of the other issues may surface, so a basic knowledge of the rest of the code and technologies used is recommended.

## Tasks
1. Identify what you consider to be the worst issues in the code. These may be:
   * Consistency
   * Abstractions
   * Logic
   * other
2. Fix 2-5 of the most troublesome issues

During the interview you may also be expected to assist another developer to fix one or more issues in a pair programming exercise to evaluate a debugging/code review situation. 
# What is the application?
The application is a simple(ish) Singe Page Application (SPA) blog with comments. There is no backend, so all posts, comments, and data is distributed on page load.

The application is created using [Create React App](https://github.com/facebook/create-react-app), and rely on a minimum of extra libraries. 

## Technologies
### Create React App
The application was created with [Create React App (CRA)](https://create-react-app.dev/docs/getting-started) which sets up the basic commands for building both production and development builds. To run the application, it should be enough to run `npm install` to install all the dependencies, and `npm start` to start a development server at [http://localhost:3000/](http://localhost:3000/) which reloads on changes to the code.

### ES6 Modules
The application uses ES6 Modules. This allows for the use of `import` and `export` to access modules.

### React
The application uses [React](https://reactjs.org/) with [JSX](https://reactjs.org/docs/jsx-in-depth.html).

### Redux Toolkit
The application uses [Redux Toolkit](https://redux-toolkit.js.org/) to handle state.

The reason for Redux Toolkit rather than pure Redux is that it handles some of the intricasies with handling of state in functional components by providing hooks like `useSelector` to get data from the Redux state and `useDispatch` to provide a dispatcher that can be used to send actions to the reducers.

Redux Toolkit ships with some middleware. In production, it ships with only one, `redux-thunk`, but in development, it also provide middleware to detect any mutations from outside of reducers. Redux Toolkit also utilize [Immer](https://redux-toolkit.js.org/usage/immer-reducers#redux-toolkit-and-immer) internally, providing multiple ways to safely mutate the state.

### React Router (next)
The application uses [React Router v6 (beta)](https://github.com/ReactTraining/react-router/tree/dev/docs) to handle routing.

The choice of using v6 which is currently in beta is to play around a bit with it. But the routing in and of itself is not a major point in this repository.