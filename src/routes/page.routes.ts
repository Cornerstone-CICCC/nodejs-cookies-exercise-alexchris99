import {Router, Request, Response} from  "express"
import { User } from "../types/user"
import { checkAuth } from "../middleware/chechauth"

// create a router
const pageRoutes = Router()

// in memory db
const users: User[] = [
    {username: "admin", password: "admin12345"}
]

// home page
pageRoutes.get("/",(req:Request, res:Response)=>{
    res.status(200).render("index")
})

// loging page get
pageRoutes.get("/login",(req: Request, res: Response)=>{
    res.status(200).render("login")
})

// login page post
pageRoutes.post("/login",(req: Request, res: Response)=>{
    const {username, password} = req.body
    const userInDb = users.find(user => user.username === username && user.password === password)
    if(!userInDb){
        res.status(403).redirect("/login")
        return
    }
    res.cookie("username", username,{
        maxAge: 5 * 60 * 1000,
        signed: true
    })
    res.cookie("isLoggedIn", true,{
        maxAge: 5 * 60 * 1000,
        signed: true
    })
    res.status(200).render("profile",{username})
})

// logout
pageRoutes.get("/logout",(req: Request, res:Response)=>{
    res.clearCookie("username")// clear the cookie
    res.clearCookie("isLoggedIn")// clear the cookie
    res.status(301).redirect("/login")
})


// profile page
pageRoutes.get("/profile", checkAuth, (req: Request, res:Response)=>{
    res.status(200).render("profile")
})


export default pageRoutes


