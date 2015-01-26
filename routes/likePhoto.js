	var express = require('express');
	var router = express.Router();
	var FlickrPhotos = require('../models/flickrphoto.js');

	router.post('/', function(req, res, next) {
		try{			
			if(req.body.Like == "true"){
				UpdatePhotoUpvotes(req.body);
			}
			else{
				UpdatePhotoDownvotes(req.body);
			}
				
		}catch(err){
			console.log(err);
			res.send(500);
		}

		
	  
	  res.send(200);
	});

	module.exports = router;
// method to update the upvotes 
	function UpdatePhotoUpvotes(details){
		
		FlickrPhotos.findOne({PhotoId : details.PhotoId}, 'PhotoId Upvotes Downvotes', function(err, Photo){									
		Photo.Upvotes += 1;								
		Photo.save();			
		});
	}
	// method to update the downvotes 
	function UpdatePhotoDownvotes(details){
			FlickrPhotos.findOne({PhotoId : details.PhotoId}, 'PhotoId Upvotes Downvotes', function(err, Photo){			
			Photo.Downvotes += 1;
			Photo.save();									
		});
	}