import { Request, Response } from "express"
import {logger} from '../../../../lib/logger'
import lan from '../../../../locales/en.json';
import { ErrorResponse, successResponse, notFoundResponse } from '../../../../helpers/apiResponse'
import { addUser,getUserInRoom,removeUser,findUser,findUserByRoom,findUserUsername } from '../../../../helpers/utility'
import { sentPushNotification } from '../../../../lib/notification'
import { authSocketToken }  from '../../../../middlewares/authorizationSocket'
import { toLowerCase } from "fp-ts/lib/string";
import { generateQR } from '../chat/qrController'
import  mongoose  from 'mongoose'
let thisRoom:any = "";
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
                console.log('requestData',requestData)
                var token: string = requestData.token;
                generateQR((err:any,s3File:any)=>{
                    userConnectionList.push({
                        id:socket.id,
                        qrCode:s3File.QrCode,
                        qrImage:s3File.Location,
                        status:false,
                        icon:s3File.icon
                    })
                    io.to(socket.id).emit("qr_code",{status:1,"message":lan['User status updated successfully'],'response':{ QrCode: s3File.QrCode, QrImage:s3File.Location,icon:s3File.icon,id:socket.id}})
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
                const user = removeUser(socket.id);
                if(thisRoom != ""){
                    io.to(thisRoom).emit("disconnect_data", {status:1,"message":"Left room",'response':user});
                }else{
                    io.to(socket.id).emit("disconnect_data",{status:1,"message":lan['User status updated successfully'],'response':requestData});
                }
            });
            

            /**
             * To manage user generate qr code
             * @param {string} userId
             * @param {string} token
            */
            socket.on('join_room', async function(requestData:any){
                console.log("join==",requestData)
                let fromToken: any = requestData.fromToken;
                let toToken : any = requestData.toToken;
                let room : any = toToken;
                let flag : boolean = false;
                var toSokectId:any;
                var iconRec: any ="";
                var iconSender: any ="";
                for (var i = userConnectionList.length - 1; i >= 0; --i) {
                        if (userConnectionList[i].qrCode == toToken) {
                            toSokectId = userConnectionList[i].id;
                            iconRec = userConnectionList[i].icon;
                            flag = true;
                            continue;
                        }
                }
                for (var i = userConnectionList.length - 1; i >= 0; --i) {
                    if (userConnectionList[i].qrCode == fromToken) {
                        iconSender = userConnectionList[i].icon;
                        flag = true;
                        continue;
                    }
               }
                //console.log('toSokectId',toSokectId)
                if(flag){
                    const user  = await addUser(socket.id,room,fromToken,iconSender)
                    const users  = await addUser(toSokectId,room,toToken,iconRec)

                    let roomArr: any =[];
                    roomArr.push(user)
                    roomArr.push(users)
   
                    //socket.join(user.room)

                    thisRoom = user.room;
                    //console.log('thisRoom',thisRoom)
                    //console.log('thisRoom',roomArr)
                    io.to(socket.id).emit("roomData", users);
                    socket.to(toSokectId).emit("roomData", user);
                    // socket.emit('roomData' , {status:1,"message":"roomData created",'response':users});
                    // io.to(thisRoom).emit("joined", {status:1,"message":"joined created",'response':users});
                    
                }else{
                    io.to(socket.id).emit("join_room",{status:0,"message":"Invalid QR code"});
                }

            });

            /**
			 * To manage join_room_sender
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on("join_room_sender", (requestData:any) => {
                thisRoom = requestData.room;
                //socket.join(thisRoom)
                io.to(socket.id).emit('receiverRoomData' , {status:1,"message":"receiverRoomData created",'response':findUserByRoom(thisRoom,requestData.username)});
            });

            /**
			 * To manage getMessageUser
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on("getMessageUser", (requestData:any) => {
                //socket.join(thisRoom)
                console.log('fromIdfromIdfromId',requestData)
                io.to(socket.id).emit('getMessageUser',findUser(requestData.id));
                io.to(requestData.id).emit('getMessageUser',findUser(requestData.toId));
            });

            /**
			 * To manage user chatMessage
			 * @param {string} userId
			 * @param {string} token
			*/
            socket.on("chatMessage", (requestData:any) => {
                io.to(thisRoom).emit("chatMessage", {data:requestData,id : socket.id});
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
                var id: string = requestData.id;
                socket.to(id).emit("typing", {type:true});
            });
        
            /**
			 * To manage user message
			 * @param {string} token
			*/
            socket.on('message', function(requestData:any){
                console.log(requestData)
                if(requestData.toUser != "" && requestData.fromUser){
                    socket.to(requestData.toUser.id).emit("messageTo", requestData);
                    io.to(requestData.fromUser.id).emit("messageFrom", requestData);
                }
            });
            
    }

}
