import express, { Request, Response } from "express"
import { ApiDocs  } from "../../../../api/interface/routes/apiDocs"
/** crate global router */
export const createRouter = (): express.Router =>{
    const router = express.Router();
    ApiDocs(router);
    return router;
}
