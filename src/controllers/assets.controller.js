const getImage = async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'public', 'images', imageName);

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(err.status).end();
    }
  });
};

module.exports = {
  getImage,
};
