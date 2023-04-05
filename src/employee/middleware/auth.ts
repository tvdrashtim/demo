import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class Authmiddleware implements NestMiddleware{

    use(req: Request, res: Response, next: NextFunction){
        console.log('request coming...',req.url)
        next();
    }
}