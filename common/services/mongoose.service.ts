import debug from "debug";
import mongoose from "mongoose";

const log: debug.IDebugger = debug("app:mongoose-service");
const dbUrl =
  "mongodb+srv://sajid:1234@nodejs-typescript.1cep1bq.mongodb.net/?retryWrites=true&w=majority";
class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    console.log("Attempting MongoDB connection (will retry if needed)");
    mongoose
      .connect(dbUrl, this.mongooseOptions)
      .then(() => {
        console.log("MongoDB is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}
export default new MongooseService();
