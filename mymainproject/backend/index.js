const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb://localhost:27017/mymainprojectdb';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Schema for users of app
const UserSchema = new mongoose.Schema({
  ename: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  remarks: {
      type: String,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now,
  },
  id:{
      type:Number,
      required:true
  },
  mobile:{
      type:Number,
      required:true,
  }
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  const testSchema = new mongoose.Schema({
    id: Number,
    address: String,
    country: String,
    description: String,
    price: Number,
    photo: String,
    likes: Number,
  });
  const Enquiries = mongoose.model('enquiries', UserSchema);
  Enquiries.createIndexes();
  const TestModel = mongoose.model('houses', testSchema);

  app.get('/api/data', (req, res) => {
    TestModel.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).json({ error: 'Something Went Wrong' });
        console.error(err);
        // res.sendStatus(500);
      });
  });
  app.post("/register", async (req, resp) => {
    try {
        const enquiry = new Enquiries(req.body);
        let result = await enquiry.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);

        } else {
            console.log("could not store enquiry");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  });
});


  