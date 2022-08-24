import { Request, Response, NextFunction } from "express";
import { decode } from '../lib/jwt'
import { unauthorizedResponse, notFoundResponse } from '../helpers/apiResponse'
import { Constants } from '../config/constants'
const verifyToken =async (  
    req: Request,
    res: Response,
    next: NextFunction) => {
        const accessToken = req.headers.authorization;
        if (accessToken) {
            const token = accessToken.split(' ')[1];
            const { decoded, expired } = decode(token);
            if (decoded) {
              // @ts-ignore
               req.body.user = decoded;
                if(req.body.userId != undefined){
                  if(req.body.userId != ""){
                    if(req.body.userId != req.body.user.userId){
                      notFoundResponse(res,Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID_WITH_USERID);
                    }else{
                      return next();
                    }
                  }else{
                    return next();
                  }
                }else{
                  return next();
                }
              }
              if (expired) {
                unauthorizedResponse(res,Constants.ERROR_MESSAGES.SESSION_TOKEN_EXPIRED);
              }
        }else{
          unauthorizedResponse(res,Constants.ERROR_MESSAGES.AUTHORIZATION_REQUIRED);
        }
}

export default verifyToken;