const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");



const app = express()
require('dotenv').config();
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

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

const port = process.env.PORT || 8000
app.listen(port, ()=>{

  console.log(`server at http://localhost:${port}`);
})
