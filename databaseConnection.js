const mysql = require("mysql2/promise");

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
  host: "sql.freedb.tech",
  user: "freedb_2350_main.",
  password: "&c!gQXSFgVweD*4",
  database: "freedb_COMP2350_A01342823",
  multipleStatements: false,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: "abc123!",
  database: "freedb_COMP2350_A01342823",
  multipleStatements: false,
};

if (is_qoddi) {
  var database = mysql.createPool(dbConfigQoddi);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
