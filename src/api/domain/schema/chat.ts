
import mongoose from 'mongoose'
import { Constants } from '../../config/constants'

/** Object id data type */
const ObjectId = mongoose.Types.ObjectId;

const ChatSchema = new mongoose.Schema({
	fromUserCode:{type:String,required:true},
	toUserCode:{type:String,required:true},
	status:{type:String,enum: ['Active','Delete','Pending','Reject','Block'], default:'Active'},
	entryDate:{type: Date, default: Date.now}
});

var ChatUser = mongoose.model(Constants.TABLES.CHAT_USERS, ChatSchema);

export default ChatUser