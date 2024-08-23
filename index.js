const express = require('express');
const bodyParser = require('body-parser');
const { morganLog } = require('./config/morgan')
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;
const router = require('./router');

app.use(morganLog());

app.use(bodyParser.json());

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

