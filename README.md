This project is built with Create React APP
Uses Express, Sequelize, React-Router, Redux

System requirements: 
### Node.JS, PostgreSQL

This project is a list of tasks that any user can write himself.
The project has the ability to authenticate and register. Each user has their own task list. Users cannot view each other's task lists.

For begin, you need to create a role with the password in PSQL, specified in .env

And with SequelizeCLI, you can create the DB. Use
### 'db:create'
in root of project, in terminal

After create DB, project can be run in the root directory using the command

### `npm start`

The working version is located on 
### https://danila-todo.herokuapp.com/todolist