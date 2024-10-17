import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDb Connect : ${conn.connection.host}`);
  } catch (e) {
    console.error('Error connecting to MongoDB', e.message);
    process.exit(1);
  }
};

export default connectDB;
