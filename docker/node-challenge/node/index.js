const express = require("express");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql");

const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);

connection.query(
  `create table people(id int not null auto_increment, name varchar(60), primary key(id))`
);

const sql = `INSERT INTO people(name) values('${faker.name.firstName()}')`;
connection.query(sql);

var names = [];
connection.query(`select * from people`, (err, res) => {
  res.forEach((e) => {
    names.push(`<p>${e.name}</p>`);
  });
});
connection.end();

function generateRows(names) {
  var rows = "";
  names.forEach((name) => {
    rows += `<tr>${name}</tr>`;
  });
  return rows.trim();
}

app.get("/", (req, res) => {
  var table = `<table>${generateRows(names)}</table>`;
  res.send(`<h1>Full Cycle</h1><br />${table}`);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
