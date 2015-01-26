var express = require('express');
var router = express.Router();
var flickrHelper = require('../helper/helper.js');

router.post('/', function(req, res, next) {		
  getPhotoDetails(req.body.PhotoId,req.body.PhotoSecretId,res);
});

module.exports = router;

function getPhotoDetails(photoId, photoSecretId, res){
	var flickrObject = flickrHelper.initialiseFlickr();
	var Flickr = flickrObject.Flickr;
	var flickrOptions = flickrObject.flickrOptions;
	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		flickr.photos.getInfo({
		  photo_id: photoId,
		  secret : photoSecretId
		}, function(err, result) {									
			var photo = result["photo"];
			var info = "Owner's Name : " + photo["owner"]["realname"] +"</br>" 
			+ "Title : " + photo["title"]["_content"] + "</br>"
			+ "Taken on : " + photo["dates"]["taken"] + "</br>"
			+ "Views : " + photo["views"];			
			res.send(info);     		
		});
	});
}

