import mongoose from "mongoose";
// import logger from "./logger";

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://coderhouse:%405PmAPWakmq%40GHx@coderhouse.q5mhnd3.mongodb.net/coderhouse-project?retryWrites=true&w=majority');
        // logger.info('Connected to database');
        console.log('Connected to database');
        
    } catch (error) {
        // logger.error('Error connecting to database', error);
        console.log('Error connecting to database', error);
        
    }
}

connectToDatabase();