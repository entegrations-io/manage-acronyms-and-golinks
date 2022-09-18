const express = require("express");
const router = express.Router();

const config = require('./../config');
const db = require('../services/db');

const utils = require('../services/utils');

// GET /acronyms
router.get("/", (req, res) => {
    const page = req.query.page ? req.pafram.page : 1
    const offset = (page - 1) * config.itemsPerPage;
    const sql = "SELECT * FROM acronyms ORDER BY name LIMIT ?,? ";
    db.all(sql, [offset, config.itemsPerPage], (err, rows) => {
      if (err) {
        console.error("Error getting existing Acronyms.", err);
        res.render("acronyms", { model: [], error: "Error getting existing Aronyms." });
      } else {
        res.render("acronyms", { model: rows, error: null });
      }
    });
});
  
  
  
// GET /acronyms/create
router.get("/create", (req, res) => {
    res.render("acronyms/create", { model: {}, error: null });
});
  
// POST /acronyms/create
router.post("/create", (req, res) => {
    const sql = "INSERT INTO acronyms (name, description) VALUES (?, ?)";
    const acronym = [req.body.name, req.body.description];
    db.run(sql, acronym, err => {
        if (err) {
            console.error("Error creating the Acronym.", err);
            res.render("acronyms/create", { model: {name: req.body.name, description: req.body.description}, 
                error: "Error creating the Acronym." });
        } else {
            console.log("[AUDIT] Acronym " + acronym + " was created by " + utils.getRemoteHostId(req));
            res.redirect("/acronyms");
        }
    });
});

// GET /acronyms/view/:name - note by name!
router.get("/view/:name", (req, res) => {
    const name = req.params.name;
    const sql = "SELECT * FROM acronyms WHERE name = ?";
    db.all(sql, name, (err, row) => {
        if (err) {
            console.error("Error getting the Acronym.", err);
            res.render("acronyms/view", { model: {}, error: "Error getting the Acronym for name " + name});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one Acronym for name " + name);
            res.render("acronyms/view", { model: {}, error: "Error getting the Acronym for name " + name});
        } else {
            res.render("acronyms/view", { model: row[0], error: null });
        }
    });
});


// GET /acronyms/edit/:id
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM acronyms WHERE id = ?";
    db.all(sql, id, (err, row) => {
        if (err) {
            console.error("Error getting the Acronym.", err);
            res.render("acronyms/edit", { model: {}, error: "Error getting the Acronym for id " + id});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one Acronym for id " + id);
            res.render("acronyms/view", { model: {}, error: "Error getting the Acronym for id " + id});
        } else {
            res.render("acronyms/edit", { model: row[0], error: null });
        }
    });
});

// POST /acronyms/edit/:id
router.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const acronym = [req.body.name, req.body.description, id];
    const sql = "UPDATE acronyms SET name = ?, description = ? WHERE (id = ?)";
    db.run(sql, acronym, err => {
        if (err) {
            console.error("Error updating the Acronym.", err);
            res.render("acronyms/edit", { model: {}, error: "Error updating the Acronym for id " + id});
        } else {
            console.log("[AUDIT] Acronym " + acronym + " was edited by " + utils.getRemoteHostId(req));
            res.redirect("/acronyms");
        }
    });
});

// GET /acronyms/delete/:id
router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM acronyms WHERE id = ?";
    db.all(sql, id, (err, row) => {
        if (err) {
            console.error("Error getting the Acronym to delete.", err);
            res.render("acronyms/delete", { model: {}, error: "Error getting the Acronym to delete for id " + id});
        } else if (row && row.length != 1) {
            console.error("Didn't get exactly one Acronym for id " + id);
            res.render("acronyms/delete", { model: {}, error: "Error getting the Acronym to delete for id " + id});
        } else {
            res.render("acronyms/delete", { model: row[0], error: null });
        }
    });
});

// POST /delete/:id
router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM acronyms WHERE id = ?";
    db.run(sql, id, err => {
        if (err) {
            console.error("Error deleting the Acronym.", err);
            res.render("acronyms/delete", { model: {}, error: "Error deleting the Acronym for id " + id});
        } else {
            console.log("[AUDIT] Acronym by id " + id + " was deleted by " + utils.getRemoteHostId(req));
            res.redirect("/acronyms");
        }
    });
});
  

module.exports = router;
