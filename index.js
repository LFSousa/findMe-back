let properties = require('./config/properties');

let app = require('./config/express');
let package = require('./package.json');

app.listen(properties.PORT, (req, res) => {
  console.log(`Server is running on ${properties.PORT} port. DB ${properties.DB.NAME}`);
});

app.get('/', async (req, res) => {
  res.status(200).json({
    version: package.version,
  });
});