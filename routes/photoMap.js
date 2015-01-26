var express = require('express');
var router = express.Router();
var flickr = require('../helper/helper.js');

/* GET users listing. */
router.get('/', function(req, res, next) {	
	if(req.query.photoId === undefined){
		res.render('photoMap', {FlickrLocationPhotos : true});
	}
	else{
		getPhotoLocation(req.query.photoId,req.query.photoSecretId,res);	
	}
	
});

module.exports = router;
//Gets location of the photo
function getPhotoLocation(photoId, photoSecretId, res){	
	var flickrObject = flickr.initialiseFlickr();
	var Flickr = flickrObject.Flickr;
	var flickrOptions = flickrObject.flickrOptions;
	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		flickr.photos.getInfo({
		  photo_id: photoId,
		  secret : photoSecretId
		}, function(err, result) {			
			var failed = false;		
			var photo = result["photo"];
			var location = photo["owner"]["location"];
			if(location == ''){
				location = 'Bangalore',
				failed = true;
			}			
			res.render('photoMap', {location : location, failed : failed,FlickrLocationPhotos : false});     		
		});
	});
}