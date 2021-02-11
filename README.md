This project is built with Create React APP

It can be run in the root directory using the command

### `npm start`

This project is a list of tasks that any user can write himself.
The project has the ability to authenticate and register. Each user has their own task list. Users cannot view each other's task lists.

For launch you need to install Node.JS

### 'sudo apt-get install -y nodejs'

Also you need to install PostgreSQL 

### 'sudo apt install postgresql postgresql-contrib' 

Next, you need to create a role with the password specified in .env

And with SequelizeCLI, you can create the DB. Use

### 'db:create'
in root of project, in terminal