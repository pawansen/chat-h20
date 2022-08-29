import express, { Request, Response } from "express"
import { verifyToken, validateRequest } from "../../middlewares"
import {
    addFollowRequestValidate,
    addReportRequestValidate
  } from "../../domain/schema/chat.schema";

const route = express.Router();


/** create user router function */
export const ChatRoutes = (router: express.Router):void=>{
    router.use("/chat",route);

    /** get all users */
    route.get('/get-all-users',
    verifyToken);
}