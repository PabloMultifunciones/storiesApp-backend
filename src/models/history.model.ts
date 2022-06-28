import mongoose from 'mongoose';

const { Schema } = mongoose;

const History = new Schema(
    {
        title: String,
        author: String,
        year: String,
        deleted: Date,
        description: String,
    },
    { timestamps: true }
);

const HISTORY_MODEL = mongoose.model('History', History);

export default HISTORY_MODEL;
