import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import * as dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected.."))
    .catch((err) => console.error(err));

app.listen(5000, () => {
    console.log('App listening on port: 5000')
})