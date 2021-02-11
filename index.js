const express = require('express');

const config = require('./config/config');
const routes = require('./routs');
const app = express();

require('./config/express')(app);
// дълъг запис:
// const expressConfig = require('./config/express');
// expressConfig(app);

require('./config/mongoose')(app);

app.use(routes);

app.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}...`));