import { Request, Response } from "express"
import {logger} from '../../../../lib/logger'
import lan from '../../../../locales/en.json';
import { ErrorResponse, successResponse, notFoundResponse } from '../../../../helpers/apiResponse'
import { getOffset } from '../../../../helpers/utility'
import { sentPushNotification } from '../../../../lib/notification'
import { authSocketToken }  from '../../../../middlewares/authorizationSocket'
import { toLowerCase } from "fp-ts/lib/string";
import  mongoose  from 'mongoose'
/** Object id data type */
const ObjectId = mongoose.Types.ObjectId;

export default class Socket {
    constructor(socket:any,io:any) {
            var self = this;

            /**
			 * To manage user online
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on('online', function(requestData:any){
                var token: string = requestData.token;
                io.emit("online",{status:1,"message":lan['User status updated successfully'],'response':requestData})
            });

            /**
			 * To manage user typing
			 * @param {string} token
			*/
            socket.on('typing', function(requestData:any){
                var token: string = requestData.token;
                io.emit("typing",{status:1,"message":"typing",'response':requestData});
            });

            /**
			 * To manage user disconnect
			 * @param {string} userId
			*/
	 	    socket.on("disconnect",function(requestData:any){
                var token = requestData.token;
                io.emit("disconnect_data",{status:1,"message":lan['User status updated successfully'],'response':requestData});
            });
    }

}
