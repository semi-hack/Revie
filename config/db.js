import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.URI

const options = {
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
}

const ConnectDB = async () => {
    await mongoose.connect(URI, options);
    console.log('Db connected.....')
}

export default ConnectDB;