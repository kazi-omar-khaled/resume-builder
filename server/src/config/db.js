import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", ()=> {console.log('Database connected successfully')})

   let mongoDBURI = 'mongodb+srv://course_management:FjTpCrqvl3wxNoJj@cluster0.7u1ebyq.mongodb.net/?appName=Cluster0'; 
    //let mongoDBURI = process.env.MONGODB_URI; 
    const projectName = 'resume_builder'; 

    if(!mongoDBURI) {
        throw new Error('MONGODB_URI environment variable not set'); 
    } 
    if(mongoDBURI.endsWith('/')) {
        mongoDBURI = mongoDBURI.slice(0,1)
    }

    await mongoose.connect(`${mongoDBURI}/${projectName}`)

    }
     catch (error) {
        console.log('Error: connecting to MongoDB:', error); 
    }
}

export default connectDB; 