# 12-employee-tracker

## Description

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Tests](#tests)

- [Contributing](#contributing)

- [Questions](#questions)

## Installation

1. Go to root directory
2. Type `npm i inquirer@8.2.4` in the terminal (install node modules)
3. Type `npm install --save mysql2` [Reference docs](https://www.npmjs.com/package/mysql2)
4. Type `npm install dotenv`
5. Open the mysql shell using `mysql -u root -p` (enter your password when prompted)
6. Within mysql shell, type `USE employee_db;`
7. Type `source db/schema.sql`
8. Leave mysql shell by either typing `exit` or Ctrl+`c`
9. Back in the main bash terminal, type either `node index.js` or `npm start` to begin the CLI application

## Usage

For your team of employess, ...

## Tests

The Pacakge.json will list dependencies that the command npm i has installed. Node modules is needed to work out of the file name package.json.

Jest is only used during development not during production and will create separate dependency in package.json (see
[Jest Docs](https://jestjs.io/docs/getting-started) for more info.).

## Contributing

[Katie Vlasic](https://github.com/katievlasic)

## Questions

Contact [me](https://github.com/katievlasic) with any questions!
