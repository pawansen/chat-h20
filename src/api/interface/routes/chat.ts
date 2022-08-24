import express, { Request, Response } from "express"
import { verifyToken, validateRequest } from "../../middlewares"
import { getAllUsers } from '../controllers/app/chat/getAllUsersController'
import { addFollowRequest } from '../controllers/app/chat/addFollowRequestController'
import { removeFollowUser } from '../controllers/app/chat/removeFollowUserController'
import { addBlockUser } from '../controllers/app/chat/addBlockUserController'
import { removeBlockUser } from '../controllers/app/chat/removeBlockUserController'
import { addReportUser } from '../controllers/app/chat/addReportUserController'
import { getFollowUsers,getFollowingUsers } from '../controllers/app/chat/getFollowUsersController'
import { getBlockUsers } from '../controllers/app/chat/getBlockUsersController'
import { getReportUsers,getChatUsers } from '../controllers/app/chat/getReportUsersController'
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
    verifyToken,
    getAllUsers);

    /** add follow request */
    route.post('/add-follow-request',
    verifyToken,
    validateRequest(addFollowRequestValidate),
    addFollowRequest);

    /** remove follow user */
    route.post('/remove-follow-user',
    verifyToken,
    validateRequest(addFollowRequestValidate),
    removeFollowUser);

    /** add block user */
    route.post('/add-block-user',
    verifyToken,
    validateRequest(addFollowRequestValidate),
    addBlockUser);

    /** add block user */
    route.post('/remove-block-user',
    verifyToken,
    validateRequest(addFollowRequestValidate),
    removeBlockUser);

    /** add report user */
    route.post('/add-report-user',
    verifyToken,
    validateRequest(addReportRequestValidate),
    addReportUser);

    /** get all users follow */
    route.get('/get-follow-users',
    verifyToken,
    getFollowUsers);

    /** get all users follow */
    route.get('/get-following-users',
    verifyToken,
    getFollowingUsers);

    /** get all users block */
    route.get('/get-block-users',
    verifyToken,
    getBlockUsers);

    /** get all users reported */
    route.get('/get-reported-users',
    verifyToken,
    getReportUsers);

    /** get all users reported */
    route.get('/get-chat-users',
    verifyToken,
    getChatUsers);

}