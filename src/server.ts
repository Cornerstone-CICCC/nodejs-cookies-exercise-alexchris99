import express,{Response, Request} from "express"
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"
import pageRoutes from "./routes/page.routes"
dotenv.config()

// create the server
const app = express()

//middleware
app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
app.use(express.json())// accept jason data like from sub
app.use(express.urlencoded({extended: true}))// allow post submicion
app.set("view engine","EJS")// set the engine to ejs
app.set("views",path.join(__dirname,"../src/views"))// dir route

// routes
app.use("/",pageRoutes)


// fallback
app.use((req: Request, res: Response)=>{
    res.status(404).render("404")
})

// start the server
const PORT = process.env.PORT || 3500
app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})