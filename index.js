const express = require("express");
const path = require("path");

const app = express();
//const router = express.Router();
//router.get(...)
//module.exports = router;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
const acronymsRoute = require('./routes/acronyms');
const golinksRoute = require('./routes/golinks');
const config = require('./config');
const port = config.port;


app.listen(port, () => {
    console.log(`Server is listening as http://localhost:${port}`);
});

// GET /
app.get("/", (req, res) => {
  res.render("index");
});


app.use('/acronyms', acronymsRoute);

//Short alias
app.get("/a/:name", (req, res) => {
  res.redirect("/acronyms/view/" + req.params.name);
});

app.use('/golinks', golinksRoute);

//Short alias
app.get("/go/:name", (req, res) => {
  res.redirect("/golinks/go/" + req.params.name);
});

// GET /about
app.get("/about", (req, res) => {
  res.render("about");
});



// Closing the database connection.
// app.get('/close', function(req,res){
//   db.close((err) => {
//     if (err) {
//       res.send('There is some error in closing the database');
//       return console.error("Error closing the database connection", err);
//     }
//     console.log('Closing the database connection.');
//     res.send('Database connection successfully closed');
//   });
// });
// process.on('SIGTERM', () => {
//   console.log('About to exit.');
// });
