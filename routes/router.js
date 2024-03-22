const router = require("express").Router();
// const database = include('databaseConnection');
// const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');
const userModel = include("models/web_user");

// router.get("/", async (req, res) => {
//   console.log("page hit");

//   try {
//     const result = await dbModel.getAllUsers();
//     res.render("index", { allUsers: result });

//     //Output the results of the query to the Heroku Logs
//     console.log(result);
//   } catch (err) {
//     res.render("error", { message: "Error reading from MySQL" });
//     console.log("Error reading from mysql");
//   }
// });
router.get("/", async (req, res) => {
  console.log("page hit");
  try {
    const users = await userModel.findAll({ attributes: ["web_user_id", "first_name", "last_name", "email"] });
    //{where: {web_user_id:1}}
    if (users === null) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to userModel");
    } else {
      console.log(users);
      res.render("index", { allUsers: users });
    }
  } catch (ex) {
    res.render("error", { message: "Error connecting to MySQL" });
    console.log("Error connecting to MySQL");
    console.log(ex);
  }
});

router.get("/deleteUser", async (req, res) => {
  try {
    console.log("delete user");
    let userId = req.query.id;
    if (userId) {
      console.log("userId: " + userId);
      let deleteUser = await userModel.findByPk(userId);
      console.log("deleteUser: ");
      console.log(deleteUser);
      if (deleteUser !== null) {
        await deleteUser.destroy();
      }
    }
    res.redirect("/");
  } catch (ex) {
    res.render("error", { message: "Error connecting to MySQL" });
    console.log("Error connecting to MySQL");
    console.log(ex);
  }
});

router.post("/addUser", async (req, res) => {
  try {
    console.log("form submit");
    const password_salt = crypto.createHash("sha512");
    password_salt.update(uuid());
    const password_hash = crypto.createHash("sha512");
    password_hash.update(req.body.password + passwordPepper + password_salt);
    let newUser = userModel.build({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password_salt: password_salt.digest("hex"),
      password_hash: password_hash.digest("hex"),
    });
    await newUser.save();
    res.redirect("/");
  } catch (ex) {
    res.render("error", { message: "Error connecting to MySQL" });
    console.log("Error connecting to MySQL");
    console.log(ex);
  }
});

const Pet = require("./models/pet");

router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.findAll();

    res.render("pets", { pets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).send("Internal Server Error");
  }
});

const crypto = require("crypto");
const { v4: uuid } = require("uuid");
const passwordPepper = "SeCretPeppa4MySal+";

module.exports = router;
