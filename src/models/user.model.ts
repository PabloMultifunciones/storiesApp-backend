import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
});

const USER_MODEL = mongoose.model('User', User);

export default USER_MODEL;
