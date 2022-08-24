import { Request, Response } from "express"
import {logger} from '../../../../lib/logger'
import lan from '../../../../locales/en.json';
import QRCode from 'qrcode'
import { s3Upload, s3UploadBase64 } from '../../../../lib/awsS3'
import { randomNumber,randomString } from '../../../../helpers/utility'

  /**
     * generate qr code
     * @param {string}
  */
export const generateQR = async (callback:any) =>{

    /** QR generate and save s3 file and update in store document*/
    const qrOption: any = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFF',
        },
    }
    const qrCode:string = randomString(8)+Math.floor(Date.now() / 1000);
    const fileName = "CHAT-QR-"+qrCode+".png";
    const bufferImage = await QRCode.toDataURL(qrCode,qrOption);
    let buf:any = Buffer.from(bufferImage.replace(/^data:image\/\w+;base64,/, ""),'base64')
    s3UploadBase64('store',buf,fileName,(err:any,responseFile:any)=>{             
        callback(null,responseFile);
    })
    
}