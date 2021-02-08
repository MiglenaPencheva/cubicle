const express = require('express');

const config = require('./config/config');
const routes = require('./routs');
const app = express();

const expressConfig = require('./config/express');
expressConfig(app);
// съкратен запис:  require('./config/express')(app);

app.use(routes);

app.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}...`));