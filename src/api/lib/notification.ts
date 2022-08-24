var FCM = require('fcm-node');
var APN = require('apn');
import { env } from '../../infrastructure/env'
import { logger } from '../lib/logger'
import {
    textNotificationRequest,
    pushNotificationRequest,
    insertNotificationRequest
} from '../domain/entities/notification.entity'
import { createNotification } from '../domain/services/notification.service'
import { Request, Response } from "express"
const fcm = new FCM(env.FCM_SERVER_KEY);
import  axios  from "axios"
import * as appRoot from "app-root-path";
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')
/**
 * push notification
 * * @param {string} value
*/

export function sentPushNotification(dataObj: any, callback: any) {
   // if (dataObj['deviceType'] === "Android") {
        sentAndroidPush(dataObj, callback)
   // } else if (dataObj['deviceType'] === "Ios") {
       // sentApplePush(dataObj, callback);
   // }
}

/**
 * push notification android
 * * @param {string} value
*/

const sentAndroidPush = (dataObj: pushNotificationRequest, callback: any): any => {
    var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: dataObj['registrationDeviceToken'],
        collapse_key: env.SITE_TITLE,

        notification: {
            title: dataObj['title'],
            body: dataObj['body']
        },

        data: {  //you can send only notification or only data(or include both)
            id: dataObj['id'],
            url: dataObj['url'],
            redirectType: dataObj['redirectType'],
            dataObjects: dataObj['dataObjects']
        }

    };
    fcm.send(message, function (err: any, response: any) {
        if (err) {
            logger.error(err)
            callback(err)
        } else {
            logger.info(response)
            callback(response)
        }
    });
}

/**
 * push notification Apple
 * * @param {string} value
*/

const sentApplePush = (dataObj: pushNotificationRequest, callback: any): any => {
    let self = this;
    let options = {
        token: {
            key: appRoot + "/apns/Certificates_devlms_pet.p12",
            keyId: env.IOS_NOTIFICATION_PASSWARD,
            teamId: env.IOS_NOTIFICATION_TEAM_ID,
        },
        production: false
    };
    let redirectType = dataObj['redirectType'];
    let apnProvider = new APN.Provider(options);
    let note = new APN.Notification();
    let notificationSound = "SIMPLE_NOTIFICATION_APP_IN_BACKGROUND.caf";
    note.badge = 1;
    note.alert = dataObj['body'];
    note.payload = dataObj;
    note.sound = notificationSound;
    note.topic = "com.app.jompet"; // BUNDEL ID

    apnProvider.send(note, dataObj['registrationDeviceToken']).catch( function (error:any) {
        console.log("Faled to send message to ", error);
    }).then((result: any) => {
        console.log('result', JSON.stringify(result));
        callback(result);
    });
}

/**
 * text notification
 * * @param {string} value
*/

export function sentTextNotification(dataObj: textNotificationRequest, callback: any) {
    let insertNotificationRequest: object = {
        patternType: dataObj['patternType'],
        userId: dataObj['userId'],
        toUserId: dataObj['toUserId'],
        notificationText: dataObj['notificationText'],
        notificationMessage: dataObj['notificationMessage'],
        entityId: dataObj['entityId'] ? dataObj['entityId'] : null
    }
    //createNotification(insertNotificationRequest, callback);
}
/**

* send sms

* * @param {string} value

*/
export function sentTextSMS(Request: any, dataObj: any, callback: any) {
axios.put(
        "http://api.trumpia.com/rest/v1/vikaslms/mobilemessage",
        {
            "sender": "8445667676",
            "country_code": dataObj['country_code'],
            "mobile_number": dataObj['mobile_number'],
            "message":
            {
                "text": dataObj['message']
            }
        },
        {headers: {

            'X-Apikey': '3408ed77f870b4a7f856d871bf547520',

            'Content-Type': 'application/json'

        }}
    )
    .then(r => logger.info(r))
    .catch(err => logger.error(err));
}    


/**

* send email trumpia

* * @param {string} value

*/
export function sentEmailTrumpia(Request: any, dataObj: any, callback: any) {
    axios.put(
            "http://api.trumpia.com/rest/v1/vikaslms/authentication/email",
            {
                "to_addr" : dataObj['to_addr'],
                "from_addr" : dataObj['from_addr'],
                "content_html" : "Hi, <br> This is a verification email request from Organization Name."
            },
            {headers: {
    
                'X-Apikey': '3408ed77f870b4a7f856d871bf547520',
    
                'Content-Type': 'application/json'
    
            }}
        )
        .then(r =>  
            
            console.log(r)
            )
        .catch(err => logger.error(err));
    }  

/**

* send email sandgrid

* * @param {string} value

*/
export function sentEmail(Request: any, dataObj: any, callback: any) {

    const msg = {
        to: dataObj['to'], // Change to your recipient
        from: env.EMAIL_FROM_TEXT, // Change to your verified sender
        subject: dataObj['subject'],
        //text: 'JOM PET APP',
        html: dataObj['message'],
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error:any) => {
          console.error(error)
        })

    }  