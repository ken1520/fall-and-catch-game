const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

app.get('/', (req, res) => {
  res.render('game', req.query);
});

// Route to serve images
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'public', 'images', imageName);

  res.sendFile(imagePath, (err) => {
      if (err) {
          res.status(err.status).end();
      }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

