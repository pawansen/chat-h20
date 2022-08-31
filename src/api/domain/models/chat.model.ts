import  ChatUser   from '../../domain/schema/chat'
import { logger } from '../../lib/logger'

/** find ChatUser */
export async function findOneRequest (where: object,callback: any){
    try{
        await ChatUser.findOne(where,callback)
    }catch(error: any){
        logger.error(error);
        throw new Error(error);
    }
}


/** create ChatUser */
export function createSocialSubscriber(data: any,callback:any){
    try{
        ChatUser.create(data,callback);
    }catch(error: any){
        logger.error(error);
        throw new Error(error);
    }
}

/** find single chat room user */
export async function findChatRoom (projection: object,where: object, callback:any){
    try{
         ChatUser.aggregate([
            { 
                $match: where
            },
            {
                $project: projection
            },
        ],callback);
    }catch(error: any){
        logger.error(error);
        throw new Error(error);
    }
}

