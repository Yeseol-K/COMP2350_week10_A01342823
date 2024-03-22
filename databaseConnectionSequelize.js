const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = "mysql://freedb_2350_main.:&c!gQXSFgVweD*4@sql.freedb.tech:3306/freedb_COMP2350_A01342823";

const dbConfigLocal = "mysql://root:abc123!@localhost/freedb_COMP2350_A01342823";

if (is_qoddi) {
  var databaseConnectionString = dbConfigQoddi;
} else {
  var databaseConnectionString = dbConfigLocal;
}

module.exports = databaseConnectionString;
