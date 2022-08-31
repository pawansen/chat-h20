import express, { Request, Response } from "express"
import { ApiDocs  } from "../../../../api/interface/routes/apiDocs"
import { ChatRoutes  } from "../../../../api/interface/routes/chat"
/** crate global router */
export const createRouter = (): express.Router =>{
    const router = express.Router();
    ApiDocs(router);
    ChatRoutes(router);
    return router;
}
