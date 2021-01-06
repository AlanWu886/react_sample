import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

import product from './product.js'

const app = express()

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));




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
