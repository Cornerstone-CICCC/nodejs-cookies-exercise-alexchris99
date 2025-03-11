"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies; // look for the signed cookie
    if (!isLoggedIn) {
        res.status(403).render("login");
        return;
    }
    next(); // continue qith the next middle ware o next route
};
exports.checkAuth = checkAuth;
