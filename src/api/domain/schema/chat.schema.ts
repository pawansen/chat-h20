import { object, string, number } from "yup";
import lan from '../../locales/en.json';

/** add follow request validate */
export const addFollowRequestValidate = object({
    body: object({
      toUserId: string().required(lan['Follow User id field is require']),
    }),
});

/** add report request validate */
export const addReportRequestValidate = object({
  body: object({
    toUserId: string().required(lan['Follow User id field is require']),
    reportProblem: string().required(lan['Please select at least one problem']),
    reportReason: string().required(lan['Reason field is require'])
  }),
});