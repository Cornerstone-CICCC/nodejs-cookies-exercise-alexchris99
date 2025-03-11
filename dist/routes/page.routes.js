"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chechauth_1 = require("../middleware/chechauth");
// create a router
const pageRoutes = (0, express_1.Router)();
// in memory db
const users = [
    { username: "admin", password: "admin12345" }
];
// home page
pageRoutes.get("/", (req, res) => {
    res.status(200).render("index");
});
// loging page get
pageRoutes.get("/login", (req, res) => {
    res.status(200).render("login");
});
// login page post
pageRoutes.post("/login", (req, res) => {
    const { username, password } = req.body;
    const userInDb = users.find(user => user.username === username && user.password === password);
    if (!userInDb) {
        res.status(403).redirect("/login");
        return;
    }
    res.cookie("username", username, {
        maxAge: 5 * 60 * 1000,
        signed: true
    });
    res.cookie("isLoggedIn", true, {
        maxAge: 5 * 60 * 1000,
        signed: true
    });
    res.status(200).render("profile", { username });
});
// logout
pageRoutes.get("/logout", (req, res) => {
    res.clearCookie("username"); // clear the cookie
    res.clearCookie("isLoggedIn"); // clear the cookie
    res.status(301).redirect("/login");
});
// profile page
pageRoutes.get("/profile", chechauth_1.checkAuth, (req, res) => {
    res.status(200).render("profile");
});
exports.default = pageRoutes;
