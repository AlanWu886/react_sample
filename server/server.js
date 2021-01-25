const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const router = express.Router();
const User = require('./models/user');

const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')


const app = express();
require('dotenv').config();
// app.use(bodyParser.json());

const port = process.env.PORT || 8000

const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@sssbadminton-test.ctpz7.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,
    collection: 'sessions'
});

app.use(session({
    secret: 'nicerack',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: store,
    name: 'session cookie name',
    cookie: {
      maxAge: 1000*60*60*2,
      sameSite: false
    }
}));

const mongoDBURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@sssbadminton-test.ctpz7.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
mongoose.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(result => app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
  }))
  .catch(err =>console.log(err));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../build')));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productApi"));

// app.get('/', function (req, res) {
//   console.log(req.cookies);
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
})

app.post('/api/sendEmail', function (req, res) {
  console.log("sending email...");
  console.log(req.body);
  const mailjet = require ('node-mailjet')
  .connect(process.env.MAILJET_PUBLIC, process.env.MAILJET_PRIVATE)
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "mlwu860401@gmail.com",
          "Name": "Alan"
        },
        "To": [
          {
            "Email": "mlwu860401@gmail.com",
            "Name": "Alan"
          }
        ],
        "Subject": req.body.subject,
        "TextPart": req.body.body

      }
    ]
  })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
  res.end();
});

// SSR
// app.get('/', (req, res) => {
//   const app = ReactDOMServer.renderToString(<App />);
//
//   const indexFile = path.resolve('./build/index.html');
//   fs.readFile(indexFile, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Something went wrong:', err);
//       return res.status(500).send('Oops, better luck next time!');
//     }
//
//     return res.send(
//       data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
//     );
//   });
// });
//
// app.use(express.static('./build'));



// product.js api call
// app.get("/api/productList", (req, res)=>{
//   res.send(product)
// })
//
// app.get("/api/productList/racquets", (req, res)=>{
//   res.send(product.racquets)
// })
//
// app.get("/", (req, res)=>{
//   res.send("server online")
// })
//
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
