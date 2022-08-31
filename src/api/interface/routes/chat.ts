import express, { Request, Response } from "express"
import { verifyToken, validateRequest } from "../../middlewares"
import { generateQRByApi } from '../controllers/app/chat/qrController'
import {
    addFollowRequestValidate,
    addReportRequestValidate
  } from "../../domain/services/chat.services";

const route = express.Router();


/** create user router function */
export const ChatRoutes = (router: express.Router):void=>{

    /** get all users */
    router.get('/generate-qr-code',generateQRByApi);
}