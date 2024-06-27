<p align="center">
  <a href="#">
    <img alt="Gatsby" src="https://sdn.signalhire.co/storage/company/d072/6b7a/da7d/91c2/51d0/4ac6/f76b/bcb1.webp" width="120" />
  </a>
</p>
<h1 align="center">
  Events Manager
</h1>
<p align="left">
  This project contains backend code built with NodeJS and frontend with ReactJS. It generates an interface where a user can create an event in an interface and register it.
</p>
<p align="left"> 
  Time to build the backend code: 4h30.
  Time to build the frontend code: 5h45.
</p>

You can get this project on your local dev environment in 2 minutes with these four steps:

1. **Clone this repository.**

   ```shell
   git clone https://github.com/ipdmartins/events_manager.git
   ```

2. **How to run the backend.**
   After cloning the project, follow these steps:

- cd backend
- npm install
- npm test
- npm start

  The backend code has 3 routes. You can test them by using a tool like Insomnia or Postman.

- Base url: http://localhost:3333
- POST (http://localhost:3333/event) with body {name: string, description: string, initial_date: string, final_date: string}
- GET (http://localhost:3333/event/{event uuid})
- GET (http://localhost:3333/event)

3. **How to run the backend.**
   After cloning the project, follow these steps:

- cd frontend
- npm install
- npm start

  Both backend and frontend need to run at the same time, using distinct terminals.

4. **Problems**

- I struggled with some backend issues with TypeScript. I know it's better, but I left it out.
- For the frontend I found an error when installing Jest:
  TypeError: Cannot read properties of undefined (reading 'html')
  "at new JSDOMEnvironment (node_modules/jest-environment-jsdom/build/index.js:72:44)

  (node:101967) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
  (Use `node --trace-deprecation ...` to show where the warning was created)"

  After several attempts the error did not disappear. So, unfortunately I didn't cover the frontend with tests.
