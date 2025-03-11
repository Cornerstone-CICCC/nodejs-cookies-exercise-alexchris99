"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
dotenv_1.default.config();
// create the server
const app = (0, express_1.default)();
//middleware
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET_KEY));
app.use(express_1.default.json()); // accept jason data like from sub
app.use(express_1.default.urlencoded({ extended: true })); // allow post submicion
app.set("view engine", "EJS"); // set the engine to ejs
app.set("views", path_1.default.join(__dirname, "../src/views")); // dir route
// routes
app.use("/", page_routes_1.default);
// fallback
app.use((req, res) => {
    res.status(404).render("404");
});
// start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
