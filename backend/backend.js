const Flickr = require('flickr-sdk');
const Constants = require('./Constants.js')
const flickr = new Flickr(Constants.flickrApiKey);

const express = require('express')
const app = express()
const port = 3001
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/:keywords?', (req, res) => {
  searchFlickrForImages(req.query.keywords)
    .then(function (results) {
      console.log("results", req.query.keywords, results.body.photos.photo[0])
      let arrPicture = results.body.photos.photo
      let arrPictureUrls = arrPicture.map((picture)=>buildFlickrUrl(picture.farm, picture.server, picture.id, picture.secret))
      res.status(200).send(arrPictureUrls)
    }).catch(function (err) {
      console.error(err);
    });

})
function buildFlickrUrl(farmId, serverId, photoId, secretId){
  return `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secretId}.jpg`

}

function searchFlickrForImages(keywords)
{
  let promise;
  if(keywords == null)
  {
    promise = flickr.photos.getRecent()
  }
  else {
    promise = flickr.photos.search({text: keywords, sort:"relevance", safe_search:1})
  }
  return promise;
}

app.listen(port, () => console.log(`app listening on port ${port}!`))
