import generateModel from "./generateModel";
import mongoose, { Schema } from "mongoose";
import aggrigatePaginate from 'mongoose-aggregate-paginate-v2';

const schemaObj = {
    videoFile: {
        type: String, //Cloudinary 
        required: true
    },
    thumbnail: {
        type: String, //Cloudinary 
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}

const VideoSchema=new Schema(schemaObj,{timestamps:true});

VideoSchema.plugin(aggrigatePaginate);

const Video = mongoose.model('Video',VideoSchema);

export { Video }