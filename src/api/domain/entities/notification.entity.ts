/**  
 * Notification Request Param
 * 
 */

export type textNotificationRequest ={
    patternType: String
    userId: String,
    toUserId: String,
    notificationText: String,
    notificationMessage: String,
    entityId ?:String,
}

/**  
 * Push Notification Request Param
 * 
 */

 export type pushNotificationRequest ={
     registrationDeviceToken: any,
     title: string,
     body: string,
     id: string,
     url: string,
     deviceType: string,
     redirectType: any,
     dataObjects: any
    }

    /**  
 * Push Notification Request Param
 * 
 */

 export type insertNotificationRequest ={
    patternType: String
    userId: String,
    toUserId: String,
    notificationText: String,
    notificationMessage: String,
    entityId:String,
    status: String,
    readStatus:String,
    modifiedDate:Date,
    entryDate: Date
   }