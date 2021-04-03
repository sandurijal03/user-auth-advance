import mongoose from 'mongoose';

const connectDb = async () => {
  await mongoose
    .connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log('database connected'))
    .catch((err) => console.log('failed to connect to db', err));
};

export default connectDb;
