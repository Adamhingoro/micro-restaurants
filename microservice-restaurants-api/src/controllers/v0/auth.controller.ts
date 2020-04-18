import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { config } from "../../config/config";

class AuthController{
    static async CheckAuthentication(req : Request , res : Response , next : NextFunction ){
        try {
            const token = req.headers.authorization.split(' ')[1] as string;

            let jwtPayload;

            try {
                jwtPayload = (jwt.verify(token, config.jwt.secret) as any);
                res.locals.jwtPayload = jwtPayload;
            } catch (error) {
                res.status(401).send();
                return;
            }

            const { userId, email , ownership , type , fullName} = jwtPayload;

            req.user = jwtPayload;

            const newToken = jwt.sign({ userId, email , ownership , type , fullName }, config.jwt.secret, {
                expiresIn: "1h"
            });
            res.setHeader("Authorization-Token", newToken);
            req.token = newToken;
            next();
        } catch (error) {
            console.log("Error " , error.message);
            res.status(401).send();
            return;
        }

    }

    static async OnlyAdmin(req : Request , res : Response , next : NextFunction ){
        if(req.user.type !== 1){
            return res.status(401).send();
        } else {
            next();
        }
    }

    static async OnlyRestaurantOwners(req : Request , res : Response , next : NextFunction ){
        if(req.user.type !== 2){
            return res.status(401).send();
        } else {
            next();
        }
    }
}

export default AuthController;