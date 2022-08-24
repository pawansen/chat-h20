import { Request, Response, NextFunction } from "express";
import { unauthorizedResponse, notFoundResponse } from '../helpers/apiResponse'
import lan from '../locales/en.json'
import { findSingleUserDetails } from '../domain/services/user.service'
import  mongoose  from 'mongoose'
/** Object id data type */
const ObjectId = mongoose.Types.ObjectId;

/** verify referral code */
export const verifyReferralCode =async (  
    req: Request,
    res: Response,
    next: NextFunction) => {
        const referralCode = req.body.referralCode;
        if (referralCode !== undefined  && referralCode !== "") {

            let where : object = {$and:[{referralCode:referralCode}]};
            let projection : object = {_id: 1,"userId":"$_id",fullName: 1,referralCode: 1}
            await findSingleUserDetails(projection,where,(err:any,responseData:any)=>{
                if(err){
                    notFoundResponse(res,lan['Invalid referral code']); 
                }else{
                    if(responseData !== null){
                        if(responseData._id == req.body.user.userId){
                            notFoundResponse(res,lan['You can not use self referral code']);
                        }else{
                            req.body.referralUserId = responseData._id;
                            return next();
                        }
                    }else{
                        notFoundResponse(res,lan['Invalid referral code']); 
                    }
                }
            });
        }else{
            return next();
        }
}