/**  
 * Notification Request Param
 * 
 */

 export type getUserResponse ={
    patternType: String
    userId: String,
    toUserId: String,
    notificationText: String,
    notificationMessage: String,
    entityId ?:String,
}