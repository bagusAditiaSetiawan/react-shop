
var admin = require("firebase-admin");

var serviceAccount = require("./../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://saeshop-43bc0.firebaseio.com"
});

module.exports = admin;
