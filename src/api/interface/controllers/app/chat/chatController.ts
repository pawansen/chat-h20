import { Request, Response } from "express"
import {logger} from '../../../../lib/logger'
import lan from '../../../../locales/en.json';
import { ErrorResponse, successResponse, notFoundResponse } from '../../../../helpers/apiResponse'
import { getOffset } from '../../../../helpers/utility'
import { sentPushNotification } from '../../../../lib/notification'
import { authSocketToken }  from '../../../../middlewares/authorizationSocket'
import { toLowerCase } from "fp-ts/lib/string";
import { generateQR } from '../chat/qrController'
import  mongoose  from 'mongoose'
/** Object id data type */
const ObjectId = mongoose.Types.ObjectId;

export default class Socket {
    constructor(socket:any,io:any) {
            var self = this;
            let users: any = [];

            /**
			 * To manage user generate qr code
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on('qr_code', function(requestData:any){
                var token: string = requestData.token;
                generateQR((err:any,s3File:any)=>{
                    io.emit("qr_code",{status:1,"message":lan['User status updated successfully'],'response':{ QrCode: s3File.QrCode, QrImage:s3File.Location }})
                })
            });


            /**
             * To manage user generate qr code
             * @param {string} userId
             * @param {string} token
            */
            socket.on('join_room', function(requestData:any){
                let fromToken: any = requestData.fromToken;
                let toToken : any = requestData.toToken;
                var user:any = {};
                user[socket.id] = fromToken
                let roomname = fromToken+toToken;
                if(users[roomname]){
                    users[roomname].push(user);
                }else{
                    users[roomname] = [user];
                }

            });

            
            /**
			 * To manage user online
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on('online', function(requestData:any){

                //var token: string = requestData.token;
                io.emit("online",{status:1,"message":lan['User status updated successfully'],'response':requestData})
            });

            /**
			 * To manage user join room
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on('join_room', function(requestData:any){
                var token: string = requestData.token;
                requestData.socketID = socket.id;
                const user = {
                    socketID :  socket.id,
                    token : token,
                    roomname:token
                  }
                users.push(user)


                io.emit("join_room",{status:1,"message":lan['User status updated successfully'],'response':requestData})
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
                console.log("socket disconnected")
                io.emit("disconnect_data",{status:1,"message":lan['User status updated successfully'],'response':requestData});
            });
    }

}
