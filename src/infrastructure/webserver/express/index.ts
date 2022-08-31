import { env } from '../../env'
import express from 'express'
import bodyParser from 'body-parser'
import { dbConnectionCreate } from '../../../api/config/db'
import Socket from '../../../api/interface/controllers/app/chat/chatController'
import { generateQR } from '../../../api/interface/controllers/app/chat/qrController'
import { createRouter } from './v1/routes'
import {logger, loggerFile} from '../../../api/lib/logger'
import path from 'path'
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

/** create server module */
export const createServerApp = ():void =>{

 const port = env.APPPORT;
 const host = env.HOST;

/* To handle invalid JSON data request */
app.use(bodyParser.json({limit: '50mb'}));

/* For parsing urlencoded data */
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'));

/** add header */
app.use(function(req,res,next){
    if(env.NODE_ENV == "development"){
        /** set logger every http request */
        loggerFile.info(req.originalUrl);
        loggerFile.info(req.body)
    }
    /*CORS headers*/
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": 'true'
    };
        // Set custom headers for CORS
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
    if ('OPTIONS' == req.method) {
        res.send(200).end();
    }
    else {
        next();
    }
});

/** create database connection */
dbConnectionCreate();

app.get("/app", function(req, res) {
	res.render('index.ejs');
});

app.get("/chat", function(req, res) {
    console.log(req.query.id)
	res.render('chat-inbox.ejs');
});


app.get("/connect", function(req, res) {
    generateQR((err:any,s3File:any)=>{
        console.log(s3File)
        res.render('connect.ejs',{ QrCode: s3File.QrCode, QrImage:s3File.Location });
    })
});

app.get("/test", function(req, res) {
    res.render('chat.ejs');
});


io.on("connection", function(socket: any) {
    console.log("Socket connected");
    logger.info(socket.id);

    //io.emit('joined', {username: "yogesh"});

    // socket.on('event1', function(requestData:any){
    //     console.log('requestData',requestData)
    // });

    new Socket(socket,io.sockets);
});

/** router */
app.use("/v1",createRouter());
/** listen server */
http.listen(port,()=>{
    logger.info(`PetApp listening on port http://${host}:${port}`);
})

}