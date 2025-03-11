import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction)=>{
    const {isLoggedIn} = req.signedCookies// look for the signed cookie
    if(!isLoggedIn){
        res.status(403).render("login")
        return
    }
    next()// continue qith the next middle ware o next route
}