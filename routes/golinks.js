const express = require("express");
const router = express.Router();

const config = require('./../config');
const db = require('../services/db');

const utils = require('../services/utils');

// GET /golinks
router.get("/", (req, res) => {
    const page = req.query.page ? req.pafram.page : 1
    const offset = (page - 1) * config.itemsPerPage;
    const sql = "SELECT * FROM golinks ORDER BY name LIMIT ?,? ";
    db.all(sql, [offset, config.itemsPerPage], (err, rows) => {
      if (err) {
        console.error("Error getting existing GoLinks.", err);
        res.render("golinks", { model: [], error: "Error getting existing GoLinks." });
      } else {
        res.render("golinks", { model: rows, error: null });
      }
    });
});
  
  
  
// GET /golinks/create
router.get("/create", (req, res) => {
    res.render("golinks/create", { model: {}, error: null });
});
  
// POST /golinks/create
router.post("/create", (req, res) => {
    const sql = "INSERT INTO golinks (name, link) VALUES (?, ?)";
    const golink = [req.body.name, req.body.link];
    db.run(sql, golink, err => {
        if (err) {
            console.error("Error creating existing GoLink.", err);
            res.render("golinks/create", { model: {name: req.body.name, link: req.body.link}, 
                error: "Error creating the GoLink." });
        } else {
            console.log("[AUDIT] GoLink " + golink + " was created by " + utils.getRemoteHostId(req));
            res.redirect("/golinks");
        }
    });
});

// GET /golinks/go/:name - note by name!
router.get("/go/:name", (req, res) => {
    const name = req.params.name;
    const sql = "SELECT * FROM golinks WHERE name = ?";
    db.all(sql, name, (err, row) => {
        console.log(row);
        if (err) {
            console.error("Error getting the GoLink.", err);
            res.render("golinks/go", { model: {}, error: "Error getting the GoLink for name " + name});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one GoLink for name " + name);
            res.render("golinks/go", { model: {}, error: "Error getting the GoLink for name " + name});
        } else {
            res.render("golinks/go", { model: row[0], error: null });
        }
    });
});


// GET /golinks/edit/:id
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM golinks WHERE id = ?";
    db.all(sql, id, (err, row) => {
        if (err) {
            console.error("Error getting the GoLink.", err);
            res.render("golinks/edit", { model: {}, error: "Error getting the GoLink for id " + id});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one GoLink for id " + id);
            res.render("golinks/edit", { model: {}, error: "Error getting the GoLink for id " + id});
        } else {
            res.render("golinks/edit", { model: row[0], error: null });
        }
    });
});

// POST /golinks/edit/:id
router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const golink = [req.body.name, req.body.link, id];
    const sql = "UPDATE golinks SET name = ?, link = ? WHERE (id = ?)";
    db.run(sql, golink, err => {
        if (err) {
            console.error("Error updating the GoLink.", err);
            res.render("golinks/edit", { model: {}, error: "Error updating the GoLink for id " + id});
        } else {
            console.log("[AUDIT] GoLink " + golink + " was edited by " + utils.getRemoteHostId(req));
            res.redirect("/golinks");
        }
    });
});

// GET /golinks/delete/:id
router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM golinks WHERE id = ?";
    db.all(sql, id, (err, row) => {
        if (err) {
            console.error("Error getting the GoLink to delete.", err);
            res.render("golinks/delete", { model: {}, error: "Error getting the GoLink to delete for id " + id});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one GoLink for id " + id);
            res.render("golinks/delete", { model: {}, error: "Error getting the GoLink to delete for id " + id});
        } else {
            res.render("golinks/delete", { model: row[0], error: null });
        }
    });
});

// POST /delete/:id
router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM golinks WHERE id = ?";
    db.run(sql, id, err => {
        if (err) {
            console.error("Error deleting the GoLink.", err);
            res.render("golinks/delete", { model: {}, error: "Error deleting the GoLink for id " + id});
        } else {
            console.log("[AUDIT] GoLink by id " + id + " was deleted by " + utils.getRemoteHostId(req));
            res.redirect("/golinks");
        }
    });
});
  

module.exports = router;
