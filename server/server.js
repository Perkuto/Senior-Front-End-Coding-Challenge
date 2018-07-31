/**
 * Mock API server with json-server
 */
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const url = require('url');
const fs = require('fs');
const ROOT_DIR = "server/";
const IMAGE_DIR = ROOT_DIR + "img-examples/";
const router = jsonServer.router(ROOT_DIR + "db.json");

// Override router to manage JSONP responses and images
router.render = (req, res) => {
  const urlData = url.parse(req.url, true);
  // JSONP rest service responses
  const pathname = urlData.pathname.replace(/\//g, '');
  if (pathname === 'services-rest') {
    const callback = urlData.query.jsoncallback;
    if (callback) {
      if (res.locals.data && res.locals.data.length > 0) {
        res.end(callback + '('+ JSON.stringify(res.locals.data[0].body) + ')')
      } else {
        res.status(400).send('No data found for request, check db.json: ' + req.url);
      }
    } else {
      res.status(400).send('Missing jsoncallback parameter');
    }
  }
  // Image responses, look into IMAGE_DIR directory
  else if (pathname === 'image') {
    if (!fs.existsSync(IMAGE_DIR)) {
      res.status(500).send(IMAGE_DIR + ' not found');
    } else {
      const files = fs.readdirSync(IMAGE_DIR).filter((f) => f.endsWith('jpg') || f.endsWith('jpeg'));
      if (files && files.length > 0) {
        const randomIndex = Math.floor(Math.random() * (files.length - 1));
        const img = fs.readFileSync(IMAGE_DIR + files[randomIndex]);
        res.writeHead(200, {'Content-Type': 'image/jpeg', 'filename': files[randomIndex] });
        res.end(img, 'binary');
      } else {
        res.status(500).send('No image found in: ' + IMAGE_DIR);
      }
    }
  }
  // Bad request for other pathnames
  else {
    res.status(400).send('Bad pathname: ' + pathname);
  }
};

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});
