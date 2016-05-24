Express Auto Routes
---------
In most of the time, we need to mount handlers/controllers to routes manually.  

***e.g.***

```javascript
/** now we are in [root]/routes/index.js **/
var homeRouter = require('./home/'),
  userCtrl = require('../controllers/user');

// Method 1: mount a sub router to a path. kinda code splitting but still complicated
app.use('/', homeRouter);

// Method 2: mount controllers to routes directly, sucks
app.get('/user', userCtrl.index);
app.post('/user/login', userCtrl.login);
app.get('/user/logout', userCtrl.logout);
...
```

----------
It's hardly elegant, so here comes **express-auto-routes**.
Firstly, ```npm install express-auto-routes --save``` please.

***e.g.***

```javascript
/** now we are in [root]/app.js **/
var path = require('path'),
  express = require('express'),
  app = express();

var autoRoutes = require('express-auto-routes')(app); // you don't need a `routes` folder now
autoRoutes(path.join(__dirname, './controllers')); // auto mounting... done!

// ...other configures

app.listen(8080);
```

```javascript
/** now we are in [root]/controllers/hello/world.js **/
exports.get = function (req, res, next) {
  res.send('hello world');
};

// method case insensitive
exports.POST = function (req, res, next) {
  // database operation...
};
```

Then visit `localhost:8080/hello/world`, you will see `hello world`

----------
The magic is just globbing all the **valid** controller files and resolve them based on relative path.
Since we glob file recursively, without doubt it supports **unlimited** sub folders.

***e.g.***
```javascript
[root]/controllers/a/b/c/d/e/f/g => localhost:8080/a/b/c/d/e/f/g
```


----------
Here I highly recommend you checking out the `example/` folder for more detail.
