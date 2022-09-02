import { Request, Response } from "express"
import {logger} from '../../../../lib/logger'
import lan from '../../../../locales/en.json';
import { ErrorResponse, successResponse, notFoundResponse } from '../../../../helpers/apiResponse'
import { addUser,getUserInRoom } from '../../../../helpers/utility'
import { sentPushNotification } from '../../../../lib/notification'
import { authSocketToken }  from '../../../../middlewares/authorizationSocket'
import { toLowerCase } from "fp-ts/lib/string";
import { generateQR } from '../chat/qrController'
import  mongoose  from 'mongoose'
/** Object id data type */
const ObjectId = mongoose.Types.ObjectId;
let userConnectionList: any = [];
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
                    userConnectionList.push({
                        id:socket.id,
                        qrCode:s3File.QrCode,
                        qrImage:s3File.Location,
                        status:false
                    })
                    io.to(socket.id).emit("qr_code",{status:1,"message":lan['User status updated successfully'],'response':{ QrCode: s3File.QrCode, QrImage:s3File.Location }})
                })
            });

            /**
			 * To manage user disconnect
			 * @param {string} userId
			*/
	 	    socket.on("disconnect",function(requestData:any){
                var token = requestData.token;
                for (var i = userConnectionList.length - 1; i >= 0; --i) {
                    if (userConnectionList[i].id == socket.id) {
                        userConnectionList.splice(i,1);
                    }
                }
                io.to(socket.id).emit("disconnect_data",{status:1,"message":lan['User status updated successfully'],'response':requestData});
            });
            

            /**
             * To manage user generate qr code
             * @param {string} userId
             * @param {string} token
            */
            socket.on('join_room', function(requestData:any){
                console.log("join==",requestData)
                let fromToken: any = requestData.fromToken;
                let toToken : any = requestData.toToken;
                let room : any = toToken;
                let flag : boolean = false;
                let toSokectId:any;
                for (var i = userConnectionList.length - 1; i >= 0; --i) {
                        if (userConnectionList[i].qrCode == toToken) {
                            toSokectId = userConnectionList[i].id;
                            flag = true;
                            continue;
                        }
                }
                //console.log(userConnectionList)
                if(flag){
                    const { error, user } = addUser(socket.id,room,fromToken)
                    const { errors, users } = addUser(toSokectId,room,toToken)
                    let roomArr: any =[];
                    roomArr.push(user)
                    roomArr.push(users)
                    if (error) {
                        io.to(socket.id).emit("join_room",{status:0,"message":error});
                    }else if(errors){
                        io.to(socket.id).emit("join_room",{status:0,"message":errors});
                    }else{
                        socket.join(user.room)
                        //socket.join(user.room)
                        socket.broadcast.to(user.room).emit("join_room",{status:1,"message":"Room created",'response':roomArr});
                        io.to(user.room).emit("roomData",{status:1,"message":"Room created",'response': {
                            room: user.room,
                            users: getUserInRoom(user.room)
                        }})
                        //io.to(socket.id).emit("join_room",{status:1,"message":"Room created",'response':requestData});
                    }
                }else{
                    io.to(socket.id).emit("join_room",{status:0,"message":"Invalid QR code"});
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
            /*socket.on('join_room', function(requestData:any){
                var token: string = requestData.token;
                requestData.socketID = socket.id;
                const user = {
                    socketID :  socket.id,
                    token : token,
                    roomname:token
                  }
                users.push(user)


                io.emit("join_room",{status:1,"message":lan['User status updated successfully'],'response':requestData})
            });*/

            /**
			 * To manage user typing
			 * @param {string} token
			*/
            socket.on('typing', function(requestData:any){
                var token: string = requestData.token;
                io.emit("typing",{status:1,"message":"typing",'response':requestData});
            });
        

            
    }

}
